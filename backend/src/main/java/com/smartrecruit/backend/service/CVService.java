package com.smartrecruit.backend.service;

import com.smartrecruit.backend.dto.response.CVResponse;
import com.smartrecruit.backend.entity.CV;
import com.smartrecruit.backend.entity.Candidate;
import com.smartrecruit.backend.entity.User;
import com.smartrecruit.backend.enums.CVFileType;
import com.smartrecruit.backend.enums.CVStatus;
import com.smartrecruit.backend.enums.RoleName;
import com.smartrecruit.backend.exception.ForbiddenException;
import com.smartrecruit.backend.exception.ResourceNotFoundException;
import com.smartrecruit.backend.repository.CVRepository;
import com.smartrecruit.backend.repository.CandidateRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CVService {

    private final CVRepository cvRepository;
    private final CandidateRepository candidateRepository;
    private final FileStorageService fileStorageService;

    @Transactional
    public CVResponse uploadCV(User currentUser, MultipartFile file) {

        Candidate candidate = getCandidateForUser(currentUser);

        FileStorageService.StoredFile storedFile =
                fileStorageService.storeCV(file);

        try {

            CVFileType fileType =
                    detectFileType(storedFile.originalName());

            cvRepository
                    .findByCandidateIdAndIsActiveTrue(candidate.getId())
                    .ifPresent(oldCV -> {
                        oldCV.setIsActive(false);
                        cvRepository.save(oldCV);
                    });

            CV cv = new CV();

            cv.setCandidate(candidate);

            cv.setFileName(storedFile.originalName());
            cv.setStoredFileName(storedFile.storedName());
            cv.setFilePath(storedFile.path());

            cv.setMimeType(storedFile.mimeType());
            cv.setFileSize(file.getSize());
            cv.setFileType(fileType);

            cv.setIsActive(true);
            cv.setAnalysisStatus(CVStatus.UPLOADED);

            cv.setUploadedAt(LocalDateTime.now());

            CV savedCV = cvRepository.save(cv);

            return buildResponse(savedCV);

        } catch (RuntimeException e) {

            fileStorageService.deleteFile(storedFile.path());

            throw e;
        }
    }

    @Transactional(readOnly = true)
    public List<CVResponse> getMyCVs(User currentUser) {

        Candidate candidate = getCandidateForUser(currentUser);

        return cvRepository
                .findByCandidateIdOrderByUploadedAtDesc(candidate.getId())
                .stream()
                .map(this::buildResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public CVResponse getActiveCV(User currentUser) {

        Candidate candidate = getCandidateForUser(currentUser);

        CV cv = cvRepository
                .findByCandidateIdAndIsActiveTrue(candidate.getId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Active CV not found"
                        )
                );

        return buildResponse(cv);
    }

    private Candidate getCandidateForUser(User user) {

        if (user == null || user.getRole() != RoleName.CANDIDATE) {

            throw new ForbiddenException(
                    "Only candidates can access CV resources"
            );
        }

        return candidateRepository
                .findByUserId(user.getId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Candidate profile not found"
                        )
                );
    }

    private CVFileType detectFileType(String fileName) {

        String lowerName = fileName.toLowerCase();

        if (lowerName.endsWith(".pdf")) {
            return CVFileType.PDF;
        }

        if (lowerName.endsWith(".docx")) {
            return CVFileType.DOCX;
        }

        throw new IllegalArgumentException(
                "Unsupported CV file type"
        );
    }

    private CVResponse buildResponse(CV cv) {

        return CVResponse.builder()
                .id(cv.getId())
                .candidateId(cv.getCandidate().getId())
                .fileName(cv.getFileName())
                .filePath(cv.getFilePath())
                .fileType(cv.getFileType())
                .mimeType(cv.getMimeType())
                .active(cv.getIsActive())
                .status(cv.getAnalysisStatus())
                .uploadedAt(cv.getUploadedAt())
                .analyzedAt(cv.getAnalyzedAt())
                .analysisError(cv.getAnalysisError())
                .build();
    }
}