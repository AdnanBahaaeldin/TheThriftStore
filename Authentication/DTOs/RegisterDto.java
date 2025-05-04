package com.Adnan.SpringSecurity.Authentication.DTOs;

import jakarta.validation.constraints.Email;
import org.springframework.lang.NonNull;

public record RegisterDto(
        @NonNull
        String firstName,

       @NonNull
       String lastName,

       @Email
       String email,

       @NonNull
       String phone,

       @NonNull
       String password)
{
}
