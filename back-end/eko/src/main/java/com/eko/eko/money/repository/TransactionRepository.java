package com.eko.eko.money.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.eko.eko.money.model.Transaction;

public interface TransactionRepository extends JpaRepository<Transaction, Integer> {
        @Query("SELECT t FROM Transaction t JOIN t.wallet w JOIN w.user u WHERE u.id = :userId ORDER BY t.dateTransaction ASC")
        List<Transaction> findTransactionsByUserId(@Param("userId") int userId);

        @Query("SELECT t FROM Transaction t WHERE t.wallet.id = :walletId ORDER BY t.dateTransaction DESC")
        List<Transaction> findAllByWalletId(@Param("walletId") int walletId);

        @Query("SELECT t FROM Transaction t WHERE t.wallet.id = :walletId ORDER BY t.dateTransaction ASC")
        List<Transaction> findAllByWalletIdASC(@Param("walletId") int walletId);

        @Query("SELECT t FROM Transaction t WHERE t.wallet.id = :walletId AND DATE(t.dateTransaction) <= CURRENT_DATE  ORDER BY t.dateTransaction DESC")
        List<Transaction> findAllByWalletIdReloadMoney(@Param("walletId") int walletId);

        @Query("SELECT t FROM Transaction t WHERE t.category.id = :categoryId")
        List<Transaction> findAllByCategoryId(@Param("categoryId") int categoryId);

        @Query("SELECT t FROM Transaction t WHERE t.category.id = :categoryId AND t.wallet.id = :walletId")
        List<Transaction> findAllByCategoryIdAndWalletId(@Param("categoryId") int categoryId,
                        @Param("walletId") int walletId);

        @Query("SELECT t FROM Transaction t WHERE DATE(t.dateTransaction) = CURRENT_DATE AND t.cycle IS NOT NULL")
        List<Transaction> findAllVerifyTransaction();

        @Query("SELECT t FROM Transaction t " +
                        "JOIN t.wallet w " +
                        "JOIN w.user u " +
                        "WHERE t.dateTransaction BETWEEN :dateStart AND :dateEnd " +
                        "AND u.id = :userId")
        List<Transaction> findAllBetweenDates(LocalDateTime dateStart, LocalDateTime dateEnd, int userId);
}
