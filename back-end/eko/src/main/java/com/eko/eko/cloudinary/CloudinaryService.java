package com.eko.eko.cloudinary;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class CloudinaryService {

    private final Cloudinary cloudinary;

    public void deleteImageByUrl(String imageUrl) throws IOException {
        // Phân tích URL để lấy public ID của ảnh
        String publicId = cloudinary.url().publicId(imageUrl).generate();
        // Thực hiện xóa ảnh từ Cloudinary bằng public ID
        // Map<?, ?> result = cloudinary.uploader().destroy(publicId,
        // ObjectUtils.emptyMap());
        cloudinary.uploader().destroy(publicId, ObjectUtils.emptyMap());
        // // Kiểm tra kết quả
        // if (result.get("result").equals("ok")) {
        // System.out.println("Image deleted successfully!");
        // } else {
        // System.out.println("Failed to delete image.");
        // }
    }

    public String uploadImage(MultipartFile image) throws IOException {
        // Thực hiện upload ảnh lên Cloudinary
        Map<?, ?> result = cloudinary.uploader().upload(image.getBytes(), null);
        // Trích xuất URL của ảnh từ kết quả upload
        String imageUrl = (String) result.get("secure_url");
        // Trả về URL của ảnh đã upload
        return imageUrl;
    }
}
