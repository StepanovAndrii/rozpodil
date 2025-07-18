﻿// TODO: приєднати FluentValidation
using Microsoft.EntityFrameworkCore;
using Rozpodil.API.Extensions;
using Rozpodil.API.Mappings;
using Rozpodil.Infrastructure.DependencyInjectionExtention;
using Rozpodil.Persistence;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.AspNetCore.Mvc.Authorization;
using Rozpodil.Domain.Events;
using Rozpodil.Infrastructure.Hubs;

var builder = WebApplication.CreateBuilder(args);

builder.Services
    .AddControllers(
        options =>
        {
            options.Filters.Add(new AuthorizeFilter());
        }
    ).AddNewtonsoftJson(options =>
    {
        options.SerializerSettings.Converters.Add(new Newtonsoft.Json.Converters.StringEnumConverter
        {
            AllowIntegerValues = false,
            NamingStrategy = null
        });
    });

builder.WebHost.ConfigureKestrel((context, options) =>
{
    options.Configure(context.Configuration.GetSection("Kestrel"));
});

JwtSecurityTokenHandler.DefaultMapInboundClaims = false;

builder.Services.AddHttpContextAccessor();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddMappingProfiles();
builder.Services.AddScopedServices();
builder.Services.AddHostedServices();
builder.Services.AddHttpClients();
builder.Services.AddSignalR();
builder.Services.AddFluentEmail(builder.Configuration);
builder.Services.AddJwtAuthentication(builder.Configuration);
builder.Services.AddHasherServices(builder.Configuration);
builder.Services.AddMediatR(cfg =>
{
    cfg.RegisterServicesFromAssembly(typeof(AchievementUnlockedEvent).Assembly);
});

builder.Configuration.AddEnvironmentVariables();
builder.Services.AddOAuthOptions(builder.Configuration);
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigins", policy =>
    {
        policy.WithOrigins(
            "https://localhost:4200")
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});

builder.Services.AddDbContext<DatabaseContext>(
    options => options.UseNpgsql
    (
        builder.Configuration.GetConnectionString("PostgreConnection"),
        assembly => assembly.MigrationsAssembly("Rozpodil.Persistence")
    )
);

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowSpecificOrigins");
app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.MapHub<AchievementsHub>("/hubs/achievements");
app.Run();
