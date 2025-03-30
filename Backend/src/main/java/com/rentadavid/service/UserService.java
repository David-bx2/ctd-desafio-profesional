package com.rentadavid.service;

import com.rentadavid.model.User;
import com.rentadavid.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Autowired
    private EmailService emailService;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User registerUser(User user) {
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new IllegalArgumentException("El correo electrónico ya está registrado.");
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        User nuevoUsuario = userRepository.save(user);

        String loginLink = "http://localhost:3000/login";
        emailService.enviarConfirmacionRegistro(user.getEmail(), user.getFirstName(), user.getLastName(), loginLink);

        return nuevoUsuario;
    }

    public void resendConfirmationEmail(String email) {
        Optional<User> optionalUser = userRepository.findByEmail(email);
        if (optionalUser.isEmpty()) {
            throw new IllegalArgumentException("Usuario no encontrado con ese correo.");
        }

        User user = optionalUser.get();
        String loginLink = "http://localhost:3000/login";
        emailService.enviarConfirmacionRegistro(user.getEmail(), user.getFirstName(), user.getLastName(), loginLink);
    }

    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

}
