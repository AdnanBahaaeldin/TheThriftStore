package com.Adnan.SpringSecurity.Users.Repository;

import com.Adnan.SpringSecurity.Users.Models.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminRepository extends JpaRepository<Admin,Long> {
}
