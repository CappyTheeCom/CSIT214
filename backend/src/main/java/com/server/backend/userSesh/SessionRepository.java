package com.server.backend.usersesh;


import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SessionRepository extends JpaRepository<Session, String>{
    Optional<Session> findByToken(String token);
    void deleteByExpiresBefore(LocalDateTime now);
}
