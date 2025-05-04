package com.Adnan.SpringSecurity.Authentication.DTOs;

import org.antlr.v4.runtime.misc.NotNull;

public record UserDto(@NotNull String name, @NotNull String password) {
}
