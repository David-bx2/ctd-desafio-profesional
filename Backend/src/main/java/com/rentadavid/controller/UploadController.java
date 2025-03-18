package com.rentadavid.controller;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.*;
import java.util.UUID;

@RestController
@RequestMapping("/api/uploads")
public class UploadController {

    private static final String UPLOAD_DIR = "uploads/";

    @PostMapping("/image")
    public ResponseEntity<String> uploadImage(@RequestParam("file") MultipartFile file, @RequestParam("productName") String productName) {
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body("No se seleccionó ningún archivo");
        }

        try {
            // Asegurar que el directorio de uploads existe
            Files.createDirectories(Paths.get(UPLOAD_DIR));

            // Obtener la extensión del archivo (ejemplo: .jpg, .png)
            String fileExtension = file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf("."));

            // Limpiar y estructurar el nombre del producto (ejemplo: "vocho" → "vocho_1.jpg")
            String cleanProductName = productName.replaceAll("\\s+", "_").toLowerCase();

            // Obtener la cantidad de imágenes existentes de este producto para numerarlas correctamente
            File folder = new File(UPLOAD_DIR);
            File[] matchingFiles = folder.listFiles((dir, name) -> name.startsWith(cleanProductName + "_") && name.endsWith(fileExtension));
            int imageIndex = (matchingFiles != null) ? matchingFiles.length + 1 : 1;

            // Crear el nuevo nombre de archivo: producto_1.jpg, producto_2.jpg, etc.
            String newFileName = cleanProductName + "_" + imageIndex + fileExtension;
            Path filePath = Paths.get(UPLOAD_DIR + newFileName);

            // Guardar el archivo en el servidor
            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

            // Retornar la URL accesible de la imagen
            String imageUrl = "http://localhost:8080/api/uploads/images/" + newFileName;
            return ResponseEntity.ok(imageUrl);

        } catch (IOException e) {
            return ResponseEntity.internalServerError().body("Error al subir la imagen: " + e.getMessage());
        }
    }

    @GetMapping("/images/{fileName}")
    public ResponseEntity<Resource> getImage(@PathVariable String fileName) {
        try {
            Path filePath = Paths.get(UPLOAD_DIR).resolve(fileName).normalize();
            Resource resource = new UrlResource(filePath.toUri());

            if (!resource.exists()) {
                return ResponseEntity.notFound().build();
            }

            return ResponseEntity.ok()
                    .contentType(MediaType.IMAGE_JPEG) // Puedes manejar diferentes tipos
                    .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + resource.getFilename() + "\"")
                    .body(resource);
        } catch (MalformedURLException e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
