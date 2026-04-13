package com.studyhard.backend.repository;

import com.studyhard.backend.model.Document;
import com.studyhard.backend.model.Transaction;
import com.studyhard.backend.model.TxStatus;
import com.studyhard.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    boolean existsByUserAndDocumentAndStatus(User user, Document document, TxStatus status);

    @Query("SELECT MONTH(t.createdAt) as month, YEAR(t.createdAt) as year, SUM(t.amount) as total " +
           "FROM Transaction t WHERE t.status = 'SUCCESS' " +
           "GROUP BY YEAR(t.createdAt), MONTH(t.createdAt) " +
           "ORDER BY YEAR(t.createdAt) DESC, MONTH(t.createdAt) DESC")
    List<Object[]> getMonthlyRevenue();
}
