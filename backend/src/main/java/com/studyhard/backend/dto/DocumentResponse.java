package com.studyhard.backend.dto;

import com.studyhard.backend.model.DocType;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Builder
public class DocumentResponse {
    private Long id;
    private String title;
    private String description;
    private DocType type;
    private BigDecimal price;
    private String uploaderName;
    private LocalDateTime createdAt;
}
