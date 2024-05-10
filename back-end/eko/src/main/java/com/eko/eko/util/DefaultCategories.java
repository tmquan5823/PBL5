package com.eko.eko.util;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.eko.eko.cloudinary.CloudinaryService;
import com.eko.eko.money.entity.Category;
import com.eko.eko.money.entity.Wallet;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class DefaultCategories {
    @Value("${listIconUrlDefault.string-list}")
    private List<String> listIconUrlDefault;

    @Value("${listIconColorDefault.string-list}")
    private List<String> listIconColorDefault;

    List<String> listIconContentDefault = Arrays.asList(
            "Xe", "Ăn", "Hóa đơn", "Khác", "Trang điểm", "Sách", "Mua sắm",
            "Điện thoại", "Giáo dục", "Thể thao", "Giải trí", "Công việc",
            "Gia đình", "Xăng", "Du lịch", "Phim", "Quà", "Sức khỏe",
            "Thực phẩm", "Bảo hiểm", "Nhà", "Ngân hàng", "Doanh nghiệp",
            "Quà tặng", "Thừa kế", "Bảo hiểm", "Tiền bạc", "Khác", "Lương");

    private final CloudinaryService cloudinaryService;

    public List<Category> createListCategoriesDefault(Wallet wallet) {
        System.out.println("CHECK");
        System.out.println(
                listIconColorDefault.size() + " " + listIconContentDefault.size() + " " + listIconUrlDefault.size());
        List<Category> categories = new ArrayList<>();
        for (int i = 0; i < 21; i++) {
            Category temp = Category.builder().iconUrl(cloudinaryService.generateImageUrl(listIconUrlDefault.get(i)))
                    .iconColor(listIconColorDefault.get(i)).content(listIconContentDefault.get(i)).wallet(wallet)
                    .isIncome(false)
                    .build();
            categories.add(temp);
        }
        for (int i = 21; i < 29; i++) {
            Category temp = Category.builder().iconUrl(cloudinaryService.generateImageUrl(listIconUrlDefault.get(i)))
                    .iconColor(listIconColorDefault.get(i)).content(listIconContentDefault.get(i)).wallet(wallet)
                    .isIncome(true)
                    .build();
            categories.add(temp);
        }
        return categories;
    }
}
