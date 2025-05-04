package com.TheThriftStore.TheThriftStore.Authentication.Mapper;
import com.TheThriftStore.TheThriftStore.Authentication.DTOs.UserDto;
import com.TheThriftStore.TheThriftStore.Models.Users;

public class UserMapper {
    public static UserDto toUserDTO(Users user) {
        if (user == null) {
            return null;
        }
        return new UserDto(user.getName(), user.getEmail());
    }
}
