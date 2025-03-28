package com.rentadavid.controller;

import com.rentadavid.model.Category;
import com.rentadavid.service.CategoryService;
import com.rentadavid.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private CategoryService categoryService;

    @PostMapping
    public ResponseEntity<?> createCategory(@RequestBody Category category) {
        System.out.println("🧪 Recibido: " + category.getId());
        try {
            Category newCat = categoryService.addCategory(category);
            return ResponseEntity.ok(newCat);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error al guardar la categoría: " + e.getMessage());
        }
    }
    

    @GetMapping
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCategory(@PathVariable Long id) {
        categoryService.deleteCategory(id);
        return ResponseEntity.ok().build();
}

}

