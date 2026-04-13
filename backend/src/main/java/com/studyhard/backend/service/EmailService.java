package com.studyhard.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendOtpEmail(String to, String otp) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("chaudiensdk5@gmail.com");  // Default from address
        message.setTo(to);
        message.setSubject("StudyHard - Your Password Reset OTP");
        message.setText("Your OTP for password reset is: " + otp + "\n"
                + "This OTP will expire in 15 minutes. If you did not request a password reset, please ignore this email.");
        try {
            mailSender.send(message);
        } catch (Exception e) {
            throw new RuntimeException("Failed to send OTP email: " + e.getMessage());
        }
    }
}
