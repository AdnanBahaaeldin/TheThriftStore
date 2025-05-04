package com.TheThriftStore.TheThriftStore.Authentication.DTOs;

import jakarta.validation.constraints.NotBlank;

public record LoginResponseDto
        (@NotBlank String token,
        @NotBlank long expiresIn) {
}
