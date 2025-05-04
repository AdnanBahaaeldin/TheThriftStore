package com.Adnan.SpringSecurity.Authentication.Controllers;

import com.Adnan.SpringSecurity.Authentication.DTOs.LoginDto;
import com.Adnan.SpringSecurity.Authentication.DTOs.LoginResponseDto;
import com.Adnan.SpringSecurity.Authentication.DTOs.RegisterDto;
import com.Adnan.SpringSecurity.Authentication.Mapper.UserMapper;
import com.Adnan.SpringSecurity.Users.Models.Users;
import com.Adnan.SpringSecurity.Authentication.Services.AuthService;
import com.Adnan.SpringSecurity.Authentication.DTOs.UserDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    @Autowired
    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/signup/customer")
    public ResponseEntity<UserDto> registerCustomer(@RequestBody RegisterDto registerDto) {
        Users registedUser = authService.registerUser(registerDto);

        return ResponseEntity.ok(UserMapper.toUserDTO(registedUser));

    }

    @PreAuthorize("hasAnyRole('ROLE_admin')")
    @PostMapping("/signup/admin")
    public ResponseEntity<UserDto> registerAdmin(@RequestBody RegisterDto registerDto) {
        Users registedUser = authService.registerAdmin(registerDto);
        return ResponseEntity.ok(UserMapper.toUserDTO(registedUser));
    }


    @RequestMapping("/login")
    public ResponseEntity<LoginResponseDto> login(@RequestBody LoginDto loginDto) {
        LoginResponseDto loginResponse = authService.authenticate(loginDto);
        return ResponseEntity.ok(loginResponse);
    }

}
