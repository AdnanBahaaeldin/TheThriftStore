package com.TheThriftStore.TheThriftStore.SecondaryRepositories;

import com.TheThriftStore.TheThriftStore.Models.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SecondaryAdminRepository extends JpaRepository<Admin,Long> {
}
