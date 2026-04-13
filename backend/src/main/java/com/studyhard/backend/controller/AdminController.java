package com.studyhard.backend.controller;

import com.studyhard.backend.dto.DocumentResponse;
import com.studyhard.backend.dto.RevenueStatDto;
import com.studyhard.backend.dto.UserAdminDto;
import com.studyhard.backend.model.Document;
import com.studyhard.backend.model.Role;
import com.studyhard.backend.model.User;
import com.studyhard.backend.repository.DocumentRepository;
import com.studyhard.backend.repository.TransactionRepository;
import com.studyhard.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*")
@PreAuthorize("hasAuthority('ADMIN')")
public class AdminController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private DocumentRepository documentRepository;

    @Autowired
    private TransactionRepository transactionRepository;

    // ====================== USER MANAGEMENT ======================

    @GetMapping("/users")
    public ResponseEntity<List<UserAdminDto>> getAllUsers() {
        List<UserAdminDto> users = userRepository.findAll().stream()
                .map(u -> new UserAdminDto(
                        u.getId(),
                        u.getUsername(),
                        u.getEmail(),
                        u.getRole().name(),
                        u.getCreatedAt() != null ? u.getCreatedAt().toString() : "N/A"
                ))
                .collect(Collectors.toList());
        return ResponseEntity.ok(users);
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        User target = userRepository.findById(id)
                .orElse(null);
        if (target == null) {
            return ResponseEntity.notFound().build();
        }
        // Block deletion of any ADMIN account
        if (target.getRole() == Role.ADMIN) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", "Cannot delete an ADMIN account. Demote to USER first."));
        }
        // Block self-deletion
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && target.getUsername().equals(auth.getName())) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", "You cannot delete your own account."));
        }
        userRepository.deleteById(id);
        return ResponseEntity.ok(Map.of("message", "User deleted successfully"));
    }

    @PutMapping("/users/{id}/role")
    public ResponseEntity<?> updateUserRole(@PathVariable Long id, @RequestBody Map<String, String> body) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        try {
            Role newRole = Role.valueOf(body.get("role").toUpperCase());

            // If demoting an ADMIN, ensure at least one admin remains
            if (user.getRole() == Role.ADMIN && newRole == Role.USER) {
                long adminCount = userRepository.findAll().stream()
                        .filter(u -> u.getRole() == Role.ADMIN)
                        .count();
                if (adminCount <= 1) {
                    return ResponseEntity.badRequest()
                            .body(Map.of("error", "Cannot demote the last ADMIN account."));
                }
            }

            user.setRole(newRole);
            userRepository.save(user);
            return ResponseEntity.ok(Map.of("message", "Role updated to " + newRole));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("error", "Invalid role"));
        }
    }

    // ====================== DOCUMENT MANAGEMENT ======================

    @GetMapping("/documents")
    public ResponseEntity<List<DocumentResponse>> getAllDocuments() {
        List<DocumentResponse> docs = documentRepository.findAll().stream()
                .map(d -> DocumentResponse.builder()
                        .id(d.getId())
                        .title(d.getTitle())
                        .description(d.getDescription())
                        .type(d.getType())
                        .price(d.getPrice())
                        .uploaderName(d.getUploader().getUsername())
                        .createdAt(d.getCreatedAt())
                        .build())
                .collect(Collectors.toList());
        return ResponseEntity.ok(docs);
    }

    @DeleteMapping("/documents/{id}")
    public ResponseEntity<?> deleteDocument(@PathVariable Long id) {
        if (!documentRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        documentRepository.deleteById(id);
        return ResponseEntity.ok(Map.of("message", "Document deleted successfully"));
    }

    // ====================== REVENUE STATISTICS ======================

    @GetMapping("/stats/revenue")
    public ResponseEntity<?> getMonthlyRevenue() {
        List<Object[]> raw = transactionRepository.getMonthlyRevenue();
        List<RevenueStatDto> stats = raw.stream()
                .map(row -> new RevenueStatDto(
                        ((Number) row[0]).intValue(),   // month
                        ((Number) row[1]).intValue(),   // year
                        (BigDecimal) row[2]             // total
                ))
                .collect(Collectors.toList());
        return ResponseEntity.ok(stats);
    }

    @GetMapping("/stats/summary")
    public ResponseEntity<?> getSummary() {
        long totalUsers = userRepository.count();
        long totalDocuments = documentRepository.count();
        long totalTransactions = transactionRepository.count();
        BigDecimal totalRevenue = transactionRepository.findAll().stream()
                .filter(t -> "SUCCESS".equals(t.getStatus().name()))
                .map(t -> t.getAmount())
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        return ResponseEntity.ok(Map.of(
                "totalUsers", totalUsers,
                "totalDocuments", totalDocuments,
                "totalTransactions", totalTransactions,
                "totalRevenue", totalRevenue
        ));
    }
}
