package com.rentadavid.controller;

import com.rentadavid.model.User;
import com.rentadavid.service.UserService;
import com.rentadavid.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    @GetMapping
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @PostMapping("/register") // <- esta parte también
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        if (userRepository.existsByEmail(user.getEmail())) {
            return ResponseEntity.badRequest().body("El correo ya está registrado");
        }

        User savedUser = userService.registerUser(user);
        return ResponseEntity.ok(savedUser);
    }

    @PutMapping("/{id}/toggle-admin")
    public ResponseEntity<?> toggleAdmin(@PathVariable Long id) {
        Optional<User> optionalUser = userRepository.findById(id);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            user.setAdmin(!user.isAdmin());
            userRepository.save(user);
            return ResponseEntity.ok("Permiso de administrador actualizado");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuario no encontrado");
        }
    }
}
