package com.TheThriftStore.TheThriftStore.DTOS;

import jakarta.persistence.Lob;

public record CustomerProductDto(
        Long id,
        String productName,
        @Lob
        byte[] imageData,
        String description,
        Double price,
        int quantity,
        String sellerName,
        String categoryName
) {
}
