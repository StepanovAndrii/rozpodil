﻿using System.Text.Json.Serialization;

namespace Rozpodil.Domain.Entities
{
    public class User
    {
        public Guid Id { get; set; }
        public required string Username { get; set; }
        public string? PhotoUrl { get; set; }
        public bool IsEmailConfirmed { get; set; }

        public required UserCredentials Credentials { get; set; }
        public ICollection<RoomUser> RoomUsers { get; set; } = new List<RoomUser>();
        public ICollection<UserAchievement> UserAchievements { get; set; } = new List<UserAchievement>();
        //TODO: як зробити щоб це залишилось, але не було loop
        //public ICollection<Assignment> Assignments { get; set; } = new List<Assignment>();
    }
}
