package com.TheThriftStore.TheThriftStore.Authentication.Services;


import com.TheThriftStore.TheThriftStore.Authentication.DTOs.*;
import com.TheThriftStore.TheThriftStore.Authentication.Enums.UserRole;
import com.TheThriftStore.TheThriftStore.Models.*;
import com.TheThriftStore.TheThriftStore.PrimaryRepositories.*;
import com.TheThriftStore.TheThriftStore.SecondaryRepositories.*;
import com.TheThriftStore.TheThriftStore.Users.Services.AdminService;
import com.TheThriftStore.TheThriftStore.Users.Services.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

import static java.lang.Math.max;

@Service
public class AuthService {

    private final PrimaryUserRepository primaryUserRepository;
    private final SecondaryUserRepository secondaryUserRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final CustomerService customerService;
    private final AdminService adminService;
    private final JwtService jwtService;

    @Autowired
    public AuthService (
            PrimaryUserRepository userRepository1,
            SecondaryUserRepository userRepository2,
            PasswordEncoder passwordEncoder,
            AuthenticationManager authenticationManager,
            CustomerService customerService,
            AdminService adminService,
            JwtService jwtService) {
        this.primaryUserRepository = userRepository1;
        this.secondaryUserRepository = userRepository2;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.customerService = customerService;
        this.adminService = adminService;
        this.jwtService = jwtService;
    }

    public Users registerUser(RegisterDto registerCustomerDto) {

        if(existsByIdAndPhone(registerCustomerDto)){
            throw new RuntimeException("User already exists with same email or phone number");
        }

        Customer customer = new Customer();
        Long maxId = max(primaryUserRepository.getLastAddedId(),secondaryUserRepository.getLastAddedId());
        customer.setId(maxId+1);
        customer.setPhoneNumber(registerCustomerDto.phone());
        customer.setName(registerCustomerDto.firstName()+ " " + registerCustomerDto.lastName());
        customer.setEmail(registerCustomerDto.email());
        customer.setPassword(passwordEncoder.encode(registerCustomerDto.password())); //Encode password using Bcrypt bean
        customer.setRole(UserRole.customer);
        customer.setLastLogin(LocalDateTime.now());

        if (maxId %2 != 0){
            secondaryUserRepository.save(customer);
        }else {
            primaryUserRepository.save(customer);
        }

        return customer;

    }

    public Admin registerAdmin(RegisterDto registerDto) {
        if(existsByIdAndPhone(registerDto)) {
            throw new RuntimeException("Admin already exists with same email or phone number");
        }

        Admin admin = new Admin();

        Long maxId = max(primaryUserRepository.getLastAddedId(),secondaryUserRepository.getLastAddedId());
        admin.setId(maxId+1);
        admin.setEmail(registerDto.email());
        admin.setName(registerDto.firstName() + " " + registerDto.lastName());
        admin.setPassword(passwordEncoder.encode(registerDto.password()));
        admin.setPhoneNumber(registerDto.phone());
        admin.setRole(UserRole.admin);
        admin.setJoinedAt(LocalDateTime.now());
        if (maxId %2 != 0){
            secondaryUserRepository.save(admin);
        }else {
            primaryUserRepository.save(admin);
        }
        return  admin;
    }


    public LoginResponseDto authenticate(LoginDto loginDto) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginDto.email(),
                        loginDto.password()
                )
        );

        Users authenticatedUser = primaryUserRepository.findByEmail(loginDto.email()).
                orElseGet(() -> secondaryUserRepository.findByEmail(loginDto.email())
                .orElseThrow(() -> {
                    return new RuntimeException("User not found");
                }));

        if (authenticatedUser.getRole() == UserRole.customer)
            customerService.setCustomerLastLogin(authenticatedUser);
        else {
            adminService.setStatus(authenticatedUser);
        }
        String jwtToken = jwtService.generateToken(authenticatedUser);
        return new LoginResponseDto(jwtToken, jwtService.getExpirationTime());
    }

    public boolean existsByIdAndPhone(RegisterDto registerCustomerDto) {
        boolean exists = false;

        if(primaryUserRepository.existsByEmail(registerCustomerDto.email()) ||
                primaryUserRepository.existsByPhoneNumber(registerCustomerDto.phone()) ||
                secondaryUserRepository.existsByEmail(registerCustomerDto.email())||
                secondaryUserRepository.existsByPhoneNumber(registerCustomerDto.phone())) {
            exists = true;
        }
        return exists;
    }
}
