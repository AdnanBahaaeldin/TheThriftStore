package com.Adnan.SpringSecurity.Authentication.Utility;

import com.Adnan.SpringSecurity.Users.Models.Users;
import com.Adnan.SpringSecurity.Users.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

@Component
public class SecurityUtils {

    public static Long getCurrentUserId() {
        Users userDetails = (Users) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if(userDetails == null){
            throw new RuntimeException("User not found");
        }
        return userDetails.getId();
    }
}
