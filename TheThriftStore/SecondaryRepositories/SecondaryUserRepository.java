package com.TheThriftStore.TheThriftStore.SecondaryRepositories;

import com.TheThriftStore.TheThriftStore.Models.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SecondaryUserRepository extends JpaRepository<Users, Long> {

    Optional<Users> findByEmail(String email);

    boolean existsByEmail(String email);
    boolean existsByPhoneNumber(String phone);

    @Query(value = "SELECT ISNULL(MAX(id), 0) FROM users", nativeQuery = true)
    Long getLastAddedId();

    @Query("SELECT u FROM Users u WHERE u.name LIKE %:name%")
    List<Users> findUsersByName(@Param("name") String name);

}
