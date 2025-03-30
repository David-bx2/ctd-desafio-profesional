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

    public void enviarConfirmacionReserva(String toEmail, String nombreCompleto, String producto, String fechaInicio, String fechaFin, String telefono) {
        SimpleMailMessage mensaje = new SimpleMailMessage();
        mensaje.setTo(toEmail);
        mensaje.setSubject("Confirmación de Reserva - Los Mejores Autos");
    
        String cuerpo = "Hola " + nombreCompleto + ",\n\n" +
            "Tu reserva ha sido confirmada con éxito.\n\n" +
            "📌 Detalles de la reserva:\n" +
            "Producto: " + producto + "\n" +
            "Desde: " + fechaInicio + "\n" +
            "Hasta: " + fechaFin + "\n" +
            "Teléfono de contacto: " + telefono + "\n\n" +
            "Gracias por confiar en Los Mejores Autos.\n\n" +
            "🚗 ¡Te esperamos!";
    
        mensaje.setText(cuerpo);
        mailSender.send(mensaje);
    }
    
}
