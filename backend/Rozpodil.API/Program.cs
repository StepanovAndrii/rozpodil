// TODO: приєднати FluentValidation

using Microsoft.EntityFrameworkCore;
using Rozpodil.API.Extensions;
using Rozpodil.API.Mappings;
using Rozpodil.Infrastructure.DataConversion.Deserialization;
using Rozpodil.Infrastructure.DependencyInjectionExtention;
using Rozpodil.Persistence;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.Converters.Add(new DynamicNamingConverterFactory());
    });

builder.Services.AddHttpContextAccessor();
builder.Services.AddOpenApi();
builder.Services.AddMappingProfiles();
builder.Services.AddScopedServices();
builder.Services.AddHostedServices();
builder.Services.AddHttpClients();
builder.Services.AddFluentEmail(builder.Configuration);
builder.Services.AddJwtAuthentication(builder.Configuration);
builder.Services.AddHasherServices(builder.Configuration);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigins", policy =>
    {
        policy.WithOrigins(
            "http://localhost:4200",
            "http://localhost:4000")
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

builder.Configuration.AddEnvironmentVariables();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseCors("AllowSpecificOrigins");
app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.Run();
