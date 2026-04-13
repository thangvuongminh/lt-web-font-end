package com.studyhard.backend.service;

import com.studyhard.backend.model.OtpToken;
import com.studyhard.backend.model.User;
import com.studyhard.backend.repository.OtpTokenRepository;
import com.studyhard.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Random;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private OtpTokenRepository otpTokenRepository;

    @Autowired
    private EmailService emailService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Transactional
    public void generateAndSendOtp(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found with email: " + email));

        // Delete any existing OTPs for the user
        otpTokenRepository.deleteByUserEmail(email);

        // Generate 6 digit OTP
        String otp = String.format("%06d", new Random().nextInt(999999));

        OtpToken otpToken = OtpToken.builder()
                .otp(otp)
                .userEmail(email)
                .expiryDate(LocalDateTime.now().plusMinutes(15))
                .build();

        otpTokenRepository.save(otpToken);

        emailService.sendOtpEmail(email, otp);
    }

    @Transactional
    public void resetPassword(String email, String otp, String newPassword) {
        OtpToken token = otpTokenRepository.findByOtpAndUserEmail(otp, email)
                .orElseThrow(() -> new RuntimeException("Invalid OTP or Email"));

        if (token.getExpiryDate().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("OTP has expired");
        }

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);

        // Discard the token after successful reset
        otpTokenRepository.delete(token);
    }
}
