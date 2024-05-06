package com.eko.eko.money.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.eko.eko.money.entity.Transaction;

public interface TransactionRepository extends JpaRepository<Transaction, Integer> {

}
