package com.Adnan.SpringSecurity.Authentication.DTOs;

import io.jsonwebtoken.security.Password;
import jakarta.annotation.Nonnull;
import jakarta.validation.constraints.Email;

public record LoginDto(
        @Nonnull String email,
        @Nonnull String password)
{}
