package com.smartrecruit.backend.service;

import com.smartrecruit.backend.exception.BadRequestException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

@Service
public class FileStorageService {

    private final Path cvStoragePath;

    public FileStorageService(
            @Value("${app.upload.cv-directory}") String cvDirectory
    ) {

        this.cvStoragePath = Paths.get(cvDirectory)
                .toAbsolutePath()
                .normalize();

        try {
            Files.createDirectories(this.cvStoragePath);
        } catch (IOException e) {
            throw new IllegalStateException(
                    "Could not create CV storage directory",
                    e
            );
        }
    }

    public StoredFile storeCV(MultipartFile file) {

        validateCV(file);

        String originalName = file.getOriginalFilename();

        String extension = getExtension(originalName);

        String storedName =
                UUID.randomUUID() + "." + extension;

        Path targetPath =
                cvStoragePath.resolve(storedName).normalize();

        if (!targetPath.getParent().equals(cvStoragePath)) {
            throw new BadRequestException("Invalid file path");
        }

        try {

            Files.copy(
                    file.getInputStream(),
                    targetPath,
                    StandardCopyOption.REPLACE_EXISTING
            );

        } catch (IOException e) {

            throw new BadRequestException(
                    "Could not store CV file"
            );
        }

        return new StoredFile(
                originalName,
                storedName,
                targetPath.toString(),
                file.getContentType()
        );
    }

    public void deleteFile(String filePath) {

        if (filePath == null || filePath.isBlank()) {
            return;
        }

        try {
            Files.deleteIfExists(
                    Paths.get(filePath).toAbsolutePath().normalize()
            );
        } catch (IOException ignored) {
        }
    }

    private void validateCV(MultipartFile file) {

        if (file == null || file.isEmpty()) {
            throw new BadRequestException(
                    "CV file is required"
            );
        }

        String originalName = file.getOriginalFilename();

        if (originalName == null || originalName.isBlank()) {
            throw new BadRequestException(
                    "Invalid CV file name"
            );
        }

        String extension = getExtension(originalName);

        if (!extension.equals("pdf")
                && !extension.equals("docx")) {

            throw new BadRequestException(
                    "Only PDF and DOCX CV files are allowed"
            );
        }
    }

    private String getExtension(String fileName) {

        int dotIndex = fileName.lastIndexOf('.');

        if (dotIndex < 0
                || dotIndex == fileName.length() - 1) {

            throw new BadRequestException(
                    "CV file must have an extension"
            );
        }

        return fileName
                .substring(dotIndex + 1)
                .toLowerCase();
    }

    public record StoredFile(
            String originalName,
            String storedName,
            String path,
            String mimeType
    ) {
    }
}