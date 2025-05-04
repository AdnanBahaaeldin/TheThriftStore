package com.Adnan.SpringSecurity.Users.Services;

import com.Adnan.SpringSecurity.Users.Models.Admin;
import com.Adnan.SpringSecurity.Users.Models.Users;
import com.Adnan.SpringSecurity.Users.Repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdminService {

    private final AdminRepository adminRepository;


    @Autowired
    public AdminService (AdminRepository adminRepository){
        this.adminRepository = adminRepository;
    }


    public void setStatus (Users user){
        Admin admin = adminRepository.findById(user.getId()).orElseThrow(
                () -> new RuntimeException("User doesn't exist"));

        admin.setActive(true);
        adminRepository.save(admin);
    }

}
