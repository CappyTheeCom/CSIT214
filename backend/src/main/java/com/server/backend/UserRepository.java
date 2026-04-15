package com.server.backend;

import org.springframework.data.jpa.repository.JpaRepository;

//creates an interface to allow for the databse to insert the information from java
public interface UserRepository extends JpaRepository<User, String> {}