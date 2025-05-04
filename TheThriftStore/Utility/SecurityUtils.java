package com.TheThriftStore.TheThriftStore.Utility;

import com.TheThriftStore.TheThriftStore.Models.Users;
import org.springframework.security.core.context.SecurityContextHolder;
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
