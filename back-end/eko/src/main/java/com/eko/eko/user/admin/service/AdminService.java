package com.eko.eko.user.admin.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import com.eko.eko.config.JwtService;
import com.eko.eko.user.admin.dto.ListUserResponse;
import com.eko.eko.user.admin.dto.UserTableResponse;
import com.eko.eko.user.entity.User;
import com.eko.eko.user.repository.UserRepository;
import com.eko.eko.user.repository.UserSpecifications;
import com.eko.eko.user.rest.UserProfileResponse;
import com.eko.eko.util.FormatDate;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final FormatDate formatDate;

    public Page<User> getUsersWithFilter(String firstname, String lastname, String email, Integer id, Boolean isDelete,
            Pageable pageable) {
        Specification<User> specification = Specification.where(null);

        if (firstname != null) {
            specification = specification.and(UserSpecifications.filterByFirstname(firstname));
        }

        if (lastname != null) {
            specification = specification.and(UserSpecifications.filterByLastname(lastname));
        }

        if (email != null) {
            specification = specification.and(UserSpecifications.filterByEmail(email));
        }

        if (id != null) {
            specification = specification.and(UserSpecifications.filterById(id));
        }

        if (isDelete != null) {
            specification = specification.and(UserSpecifications.filterByIsDelete(isDelete));
        }
        return userRepository.findAll(specification, pageable);
    }

    // public ResponseEntity<ListUserResponse> getListUser(HttpServletRequest
    // request, int page, int size,
    // String sortField, String sortOrder) {
    // try {
    // String authHeader = request.getHeader("Authorization");
    // User user = jwtService.getUserFromAuthHeader(authHeader);
    // if (user == null) {
    // return new ResponseEntity<>(ListUserResponse.builder().state(false)
    // .message("Lỗi người dùng ; token hết hạn!!!").build(),
    // HttpStatus.BAD_REQUEST);
    // }
    // Pageable pageable;
    // if (sortField != null && sortOrder != null) {
    // Sort.Direction direction = sortOrder.equals("desc") ? Sort.Direction.DESC :
    // Sort.Direction.ASC;
    // pageable = PageRequest.of(page, size, direction, sortField);
    // } else {
    // pageable = PageRequest.of(page, size);
    // }
    // Page<User> usersPage = userRepository.findAll(pageable);
    // return new ResponseEntity<>(ListUserResponse.builder().state(true)
    // .message("Lấy danh sách người dùng thành công!!!").users(usersPage).build(),
    // HttpStatus.OK);

    // } catch (Exception e) {
    // return new ResponseEntity<>(
    // ListUserResponse.builder().state(false).message("Lỗi lấy danh sách người
    // dùng!!!").build(),
    // HttpStatus.BAD_REQUEST);
    // }
    // }

    public ResponseEntity<ListUserResponse> getListUser(HttpServletRequest request) {
        try {
            String authHeader = request.getHeader("Authorization");
            User user = jwtService.getUserFromAuthHeader(authHeader);
            if (user == null) {
                return new ResponseEntity<>(ListUserResponse.builder().state(false)
                        .message("Lỗi người dùng ; token hết hạn!!!").build(),
                        HttpStatus.BAD_REQUEST);
            }
            List<UserTableResponse> list = new ArrayList<>();
            List<User> users = userRepository.findAll();
            for (User userTemp : users) {
                if (userTemp.getRole().equals("ADMIN"))
                    continue;
                var data = UserTableResponse.builder()
                        .email(userTemp.getEmail())
                        .id(userTemp.getId())
                        .name(userTemp.getFirstname() + " " + userTemp.getLastname())
                        .phoneNum(userTemp.getTelephone())
                        .status(userTemp.isDelete())
                        .build();
                list.add(data);
            }
            return new ResponseEntity<>(ListUserResponse.builder().users(list)
                    .message("Lấy danh sách người dùng thành công!!!").state(true).build(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(
                    ListUserResponse.builder().state(false).message("Lỗi lấy danh sách người dùng!!!").build(),
                    HttpStatus.BAD_REQUEST);
        }
    }

    public ResponseEntity<Map<String, Object>> changeUserStatus(HttpServletRequest request, int userId) {
        Map<String, Object> responseMap = new HashMap<>();
        try {
            String authHeader = request.getHeader("Authorization");
            User user = jwtService.getUserFromAuthHeader(authHeader);
            if (user == null) {
                responseMap.put("message", "Lỗi người dùng ; token hết hạn!!!");
                responseMap.put("state", false);
                return new ResponseEntity<>(responseMap, HttpStatus.BAD_REQUEST);
            }
            User changeUser = userRepository.findById(userId).orElseThrow();
            changeUser.setDelete(!changeUser.isDelete());
            userRepository.save(changeUser);
            responseMap.put("message", "Sửa trạng thái người dùng thành công!!!");
            responseMap.put("state", true);
            return new ResponseEntity<>(responseMap, HttpStatus.OK);
        } catch (Exception e) {
            responseMap.put("message", "Lỗi sửa trạng thái người dùng!!!");
            responseMap.put("state", false);
            return new ResponseEntity<>(responseMap, HttpStatus.BAD_REQUEST);
        }
    }

    public ResponseEntity<UserProfileResponse> getUserProfile(HttpServletRequest request, int userId) {
        try {
            String authHeader = request.getHeader("Authorization");
            User user = jwtService.getUserFromAuthHeader(authHeader);
            if (user == null) {
                return new ResponseEntity<>(UserProfileResponse.builder()
                        .message("Lỗi người dùng ; token hết hạn!!!")
                        .state(false)
                        .build(), HttpStatus.BAD_REQUEST);
            } else {
                User getProfileUser = userRepository.findById(userId).orElseThrow();
                return new ResponseEntity<>(UserProfileResponse.builder()
                        .firstname(getProfileUser.getFirstname())
                        .lastname(getProfileUser.getLastname())
                        .phoneNum(getProfileUser.getTelephone())
                        .address(getProfileUser.getAddress())
                        .email(getProfileUser.getEmail())
                        .avatar_url(getProfileUser.getAvatarUrl())
                        .dateOfBirth(formatDate.formatLocalDateTimeToString(getProfileUser.getDateOfBirth()))
                        .message("Lấy hồ sơ người dùng thành công!!")
                        .state(true)
                        .build(), HttpStatus.OK);
            }

        } catch (Exception e) {
            return new ResponseEntity<>(UserProfileResponse.builder()
                    .message("Lỗi lấy hồ sơ người dùng!!!")
                    .state(false)
                    .build(), HttpStatus.BAD_REQUEST);
        }
    }

}
