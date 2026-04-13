package com.studyhard.backend.repository;

import com.studyhard.backend.model.OtpToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

public interface OtpTokenRepository extends JpaRepository<OtpToken, Long> {
    Optional<OtpToken> findByOtpAndUserEmail(String otp, String userEmail);
    
    @Transactional
    void deleteByUserEmail(String userEmail);
}
