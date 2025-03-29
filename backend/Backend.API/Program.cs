using Backend.Persistence;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Backend.Infrastructure.Configurations;
using System.Net;
using System.Net.Mail;
using Backend.Logic.Entities;
using Microsoft.AspNetCore.Identity;
using Backend.Infrastructure.Options;
using Backend.Application.Abstracts;
using Backend.Persistence.Repositories;
using Backend.Application.Services;
using Backend.Infrastructure.Handlers;
using FastEndpoints;

var builder = WebApplication.CreateBuilder(args);

// Adding the database context to the DI container
builder.Services.AddDbContext<DataContext>(options =>
{
    // Using the PostgreSQL provider for EF Core
    options.UseNpgsql(
        // Getting the connection string from configuration
        builder.Configuration.GetConnectionString("DefaultConnection"),
        assembly =>
        {
            // Configuring the location for migration files
            assembly.MigrationsAssembly("Backend.Persistence.Migrations");
        }
    );
});

// Configuring JwtOptions by binding settings from appsettings.json
builder.Services.Configure<JwtOptions>(
    builder.Configuration.GetSection(JwtOptions.JwtOptionsKey)
);

builder.Services.AddIdentity<UserEntity, IdentityRole<Guid>>(options =>
{
    options.Password.RequireDigit = true;
    options.Password.RequireUppercase = true;
    options.Password.RequireLowercase = true;
    options.Password.RequireNonAlphanumeric = true;
    options.Password.RequiredLength = 8;
    options.User.RequireUniqueEmail = true;
})
.AddEntityFrameworkStores<DataContext>();

builder.Services.AddScoped<IAuthTokenProcessor, AuthTokenProcessor>();
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IAccountService, AccountService>();

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options =>
{
    var jwtOptions = builder.Configuration.GetSection(JwtOptions.JwtOptionsKey)
        .Get<JwtOptions>() ?? throw new ArgumentException(nameof(JwtOptions));

    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = jwtOptions.Issuer,
        ValidAudience = jwtOptions.Audience,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtOptions.Secret))
    };

    options.Events = new JwtBearerEvents
    {
        OnMessageReceived = context =>
        {
            context.Token = context.Request.Cookies["ACCESS_TOKEN"];
            return Task.CompletedTask;
        }
    };
});

builder.Services.AddAuthorization();
builder.Services.AddExceptionHandler<GlobalExceptionHandler>();
builder.Services.AddHttpContextAccessor();

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var emailSettings = builder.Configuration.GetSection("EmailSettings").Get<EmailSettings>();
builder.Services.AddFluentEmail(emailSettings!.SenderEmail)
    .AddSmtpSender(() => new SmtpClient(emailSettings.SmtpServer)
    {
        UseDefaultCredentials = false,
        Credentials = new NetworkCredential(emailSettings.SenderEmail, emailSettings.SenderPassword),
        EnableSsl = emailSettings.UseSsl,
        Port = emailSettings.SmtpPort
    }
);

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowLocalhost4200");
app.UseExceptionHandler(_ => { });
app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();
app.UseFastEndpoints();
app.Run();
