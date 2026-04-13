package com.studyhard.backend.service;

import com.studyhard.backend.dto.DocumentResponse;
import com.studyhard.backend.model.*;
import com.studyhard.backend.repository.DocumentRepository;
import com.studyhard.backend.repository.TransactionRepository;
import com.studyhard.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigDecimal;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class DocumentService {

    private final Path fileStorageLocation;

    @Autowired
    private DocumentRepository documentRepository;

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private UserRepository userRepository;

    public DocumentService() {
        this.fileStorageLocation = Paths.get("uploads").toAbsolutePath().normalize();
        try {
            Files.createDirectories(this.fileStorageLocation);
        } catch (Exception ex) {
            throw new RuntimeException("Could not create the upload directory.", ex);
        }
    }

    @Transactional
    public DocumentResponse uploadDocument(String title, String description, DocType type,
                                           BigDecimal price, MultipartFile file, String username) {
        User uploader = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Guard against null original filename
        String originalFileName = StringUtils.cleanPath(
                Objects.requireNonNullElse(file.getOriginalFilename(), "file")
        );
        String fileName = System.currentTimeMillis() + "_" + originalFileName;

        try {
            if (fileName.contains("..")) {
                throw new RuntimeException("Filename contains invalid path sequence: " + fileName);
            }

            Path targetLocation = this.fileStorageLocation.resolve(fileName);
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

            Document document = Document.builder()
                    .title(title)
                    .description(description)
                    .type(type)
                    .price(type == DocType.FREE ? BigDecimal.ZERO : price)
                    .filePath(fileName)
                    .uploader(uploader)
                    .build();

            document = documentRepository.save(document);
            return mapToResponse(document);

        } catch (IOException ex) {
            throw new RuntimeException("Could not store file " + fileName + ". Please try again!", ex);
        }
    }

    /**
     * FIX: Added @Transactional(readOnly=true) so the JPA session stays open
     * when mapToResponse() accesses the lazy-loaded uploader.getUsername().
     * Without this, you get LazyInitializationException.
     */
    @Transactional(readOnly = true)
    public List<DocumentResponse> getAllDocuments() {
        return documentRepository.findAll().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public Document getDocumentById(Long id) {
        return documentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Document not found with id " + id));
    }

    @Transactional
    public void purchaseDocument(Long documentId, String username) {
        Document document = getDocumentById(documentId);
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (document.getType() == DocType.FREE) {
            throw new RuntimeException("This document is free — no purchase required.");
        }

        boolean alreadyBought = transactionRepository.existsByUserAndDocumentAndStatus(user, document, TxStatus.SUCCESS);
        if (alreadyBought) {
            throw new RuntimeException("You have already purchased this document.");
        }

        Transaction transaction = Transaction.builder()
                .user(user)
                .document(document)
                .amount(document.getPrice())
                .status(TxStatus.SUCCESS)
                .build();

        transactionRepository.save(transaction);
    }

    @Transactional(readOnly = true)
    public boolean canDownload(Long documentId, String username) {
        Document document = getDocumentById(documentId);

        if (document.getType() == DocType.FREE) {
            return true;
        }

        if (username == null) {
            return false;
        }

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // The uploader can always download their own document
        if (document.getUploader().getId().equals(user.getId())) {
            return true;
        }

        return transactionRepository.existsByUserAndDocumentAndStatus(user, document, TxStatus.SUCCESS);
    }

    @Transactional(readOnly = true)
    public Path getDocumentFilePath(Long documentId) {
        Document document = getDocumentById(documentId);
        return this.fileStorageLocation.resolve(document.getFilePath()).normalize();
    }

    private DocumentResponse mapToResponse(Document document) {
        return DocumentResponse.builder()
                .id(document.getId())
                .title(document.getTitle())
                .description(document.getDescription())
                .type(document.getType())
                .price(document.getPrice())
                .uploaderName(document.getUploader().getUsername())
                .createdAt(document.getCreatedAt())
                .build();
    }
}
