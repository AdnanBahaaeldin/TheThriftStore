package com.Adnan.SpringSecurity.Authentication.DTOs;

import jakarta.validation.constraints.NotBlank;

public record LoginResponseDto
        (@NotBlank String token,
        @NotBlank long expiresIn) {
}
