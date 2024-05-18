package com.eko.eko.money.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.eko.eko.money.model.Category;

public interface CategoryRepository extends JpaRepository<Category, Integer> {
    @Query("SELECT c FROM Category c JOIN FETCH c.user u WHERE u.id= :userId")
    List<Category> findAllByUserId(@Param("userId") int userId);
}
