package com.Adnan.SpringSecurity.Authentication.Services;

import com.Adnan.SpringSecurity.Authentication.DTOs.LoginDto;
import com.Adnan.SpringSecurity.Authentication.DTOs.LoginResponseDto;
import com.Adnan.SpringSecurity.Authentication.DTOs.RegisterDto;
import com.Adnan.SpringSecurity.Authentication.Enums.UserRole;
import com.Adnan.SpringSecurity.Users.Models.Admin;
import com.Adnan.SpringSecurity.Users.Models.Customer;
import com.Adnan.SpringSecurity.Users.Models.Users;
import com.Adnan.SpringSecurity.Users.Repository.UserRepository;
import com.Adnan.SpringSecurity.Users.Services.AdminService;
import com.Adnan.SpringSecurity.Users.Services.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final CustomerService customerService;
    private final AdminService adminService;
    private final JwtService jwtService;

    @Autowired
    public AuthService (
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            AuthenticationManager authenticationManager,
            CustomerService customerService,
            AdminService adminService,
            JwtService jwtService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.customerService = customerService;
        this.adminService = adminService;
        this.jwtService = jwtService;
    }

    public Users registerUser(RegisterDto registerCustomerDto) {
        if(userRepository.existsByEmail(registerCustomerDto.email())){
            throw new RuntimeException("User Already Exists!");
        }

        if(userRepository.existsByPhoneNumber(registerCustomerDto.phone())){
            throw new RuntimeException("Phone number is already registered!");
        }

        Customer customer = new Customer();
        customer.setPhoneNumber(registerCustomerDto.phone());
        customer.setName(registerCustomerDto.firstName()+ " " + registerCustomerDto.lastName());
        customer.setEmail(registerCustomerDto.email());
        customer.setPassword(passwordEncoder.encode(registerCustomerDto.password())); //Encode password using Bcrypt bean
        customer.setRole(UserRole.customer);
        customer.setLastLogin(LocalDateTime.now());
        return userRepository.save(customer);
    }

    public Admin registerAdmin(RegisterDto registerDto) {
        if (userRepository.existsByEmail(registerDto.email())) {
            throw new RuntimeException("Email already exists");
        }
        if (userRepository.existsByPhoneNumber(registerDto.phone())) {
            throw new RuntimeException("Phone already exists");
        }
        Admin admin = new Admin();
        admin.setEmail(registerDto.email());
        admin.setName(registerDto.firstName() + " " + registerDto.lastName());
        admin.setPassword(passwordEncoder.encode(registerDto.password()));
        admin.setPhoneNumber(registerDto.phone());
        admin.setRole(UserRole.admin);
        admin.setJoinedAt(LocalDateTime.now());
        return userRepository.save(admin);
    }


    public LoginResponseDto authenticate(LoginDto loginDto) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginDto.email(),
                        loginDto.password()
                )
        );

        Users authenticatedUser = userRepository.findByEmail(loginDto.email())
                .orElseThrow(() -> {
                    return new RuntimeException("User not found");
                });

        if (authenticatedUser.getRole() == UserRole.customer)
            customerService.setCustomerLastLogin(authenticatedUser);
        else {
            adminService.setStatus(authenticatedUser);
        }
        String jwtToken = jwtService.generateToken(authenticatedUser);
        return new LoginResponseDto(jwtToken, jwtService.getExpirationTime());
    }
}
