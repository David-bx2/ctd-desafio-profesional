package com.rentadavid.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void enviarConfirmacionRegistro(String toEmail, String nombre, String apellido, String loginLink) {
        SimpleMailMessage mensaje = new SimpleMailMessage();
        mensaje.setTo(toEmail);
        mensaje.setSubject("Confirmación de Registro - Los Mejores Autos");
        mensaje.setText("Hola " + nombre + " " + apellido + ",\n\n" +
                "Tu registro fue exitoso. Aquí están tus datos:\n" +
                "Nombre: " + nombre + " " + apellido + "\n" +
                "Correo: " + toEmail + "\n\n" +
                "Puedes iniciar sesión en el siguiente enlace:\n" + loginLink + "\n\n" +
                "¡Gracias por registrarte!");

        mailSender.send(mensaje);
    }
}
