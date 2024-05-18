package com.eko.eko.user.repository;

import org.springframework.data.jpa.domain.Specification;

import com.eko.eko.user.entity.User;

public class UserSpecifications {
    public static Specification<User> filterByEmail(String email) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("email"), email);
    }

    public static Specification<User> filterByFirstname(String firstname) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.like(root.get("firstname"), firstname);
    }

    public static Specification<User> filterByLastname(String lastname) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.like(root.get("lastname"), lastname);
    }

    public static Specification<User> filterById(Integer id) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("id"), id);
    }

    public static Specification<User> filterByIsDelete(boolean isDelete) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("isDelete"), isDelete);
    }
}
