package com.studyhard.backend.controller;

import com.studyhard.backend.dto.ForgotPasswordRequest;
import com.studyhard.backend.dto.JwtResponse;
import com.studyhard.backend.dto.LoginRequest;
import com.studyhard.backend.dto.RegisterRequest;
import com.studyhard.backend.dto.ResetPasswordRequest;
import com.studyhard.backend.model.Role;
import com.studyhard.backend.model.User;
import com.studyhard.backend.repository.UserRepository;
import com.studyhard.backend.security.JwtUtils;
import com.studyhard.backend.security.UserDetailsImpl;
import com.studyhard.backend.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder encoder;

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();     

        return ResponseEntity.ok(new JwtResponse(jwt,
                userDetails.getId(),
                userDetails.getUsername(),
                userDetails.getEmail(),
                userDetails.getAuthorities().iterator().next().getAuthority()));
    }

    @PostMapping("/google")
    public ResponseEntity<?> googleLogin(@RequestBody Map<String, Object> payload) {
        Object profileObj = payload.get("profile");
        String email = null;

        if (profileObj instanceof Map) {
            email = (String) ((Map<?, ?>) profileObj).get("email");
        }

        if (email == null || email.isBlank()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Google profile email không có"));
        }

        final String emailFinal = email;

        User user = userRepository.findByEmail(emailFinal).orElseGet(() -> {
            User newUser = User.builder()
                    .username(emailFinal)
                    .email(emailFinal)
                    .password(encoder.encode(java.util.UUID.randomUUID().toString()))
                    .role(Role.USER)
                    .build();
            return userRepository.save(newUser);
        });

        String jwt = jwtUtils.generateJwtTokenFromUsername(user.getUsername());

        return ResponseEntity.ok(Map.of("data", Map.of(
                "accessToken", jwt,
                "id", user.getId(),
                "username", user.getUsername(),
                "email", user.getEmail(),
                "role", user.getRole().name()
        )));
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody RegisterRequest signUpRequest) {
        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            return ResponseEntity
                    .badRequest()
                    .body(Map.of("error", "Error: Username is already taken!"));
        }

        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body(Map.of("error", "Error: Email is already in use!"));
        }

        // Create new user's account
        User user = User.builder()
                .username(signUpRequest.getUsername())
                .email(signUpRequest.getEmail())
                .password(encoder.encode(signUpRequest.getPassword()))
                .role(Role.USER) // Set default role
                .build();

        userRepository.save(user);

        return ResponseEntity.ok(Map.of("message", "User registered successfully!"));
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@Valid @RequestBody ForgotPasswordRequest request) {
        try {
            authService.generateAndSendOtp(request.getEmail());
            Map<String, String> response = new HashMap<>();
            response.put("message", "OTP sent to your email successfully.");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@Valid @RequestBody ResetPasswordRequest request) {
        try {
            authService.resetPassword(request.getEmail(), request.getOtp(), request.getNewPassword());
            Map<String, String> response = new HashMap<>();
            response.put("message", "Password reset successfully.");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }
}
