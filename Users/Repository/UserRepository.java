package com.Adnan.SpringSecurity.Users.Repository;

import com.Adnan.SpringSecurity.Users.Models.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<Users, Long> {

    Optional<Users> findByEmail(String email);

    boolean existsByEmail(String email);
    boolean existsByPhoneNumber(String phone);

    @Query("SELECT u FROM Users u WHERE u.name LIKE %:name%")
    List<Users> findUsersByName(@Param("name") String name);
}
