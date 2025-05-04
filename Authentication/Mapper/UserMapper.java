package com.Adnan.SpringSecurity.Authentication.Mapper;
import com.Adnan.SpringSecurity.Authentication.DTOs.UserDto;
import com.Adnan.SpringSecurity.Users.Models.Users;

public class UserMapper {
    public static UserDto toUserDTO(Users user) {
        if (user == null) {
            return null;
        }
        return new UserDto(user.getName(), user.getEmail());
    }
}
