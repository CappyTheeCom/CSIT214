package com.server.backend.userinfo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

//creates an interface to allow for the databse to insert the information from java
@Repository
public interface UserRepository extends JpaRepository<User, String> {
    boolean existsByEmail(String email);
}