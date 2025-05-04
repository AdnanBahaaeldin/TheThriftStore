package com.TheThriftStore.TheThriftStore.PrimaryRepositories;

import com.TheThriftStore.TheThriftStore.Models.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PrimaryAdminRepository extends JpaRepository<Admin,Long> {
}
