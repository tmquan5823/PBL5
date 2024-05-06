package com.eko.eko.money.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.eko.eko.money.entity.Category;

public interface CategoryRepository extends JpaRepository<Category, Integer> {

}
