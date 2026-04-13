package com.studyhard.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
public class RevenueStatDto {
    private int month;
    private int year;
    private BigDecimal total;
}
