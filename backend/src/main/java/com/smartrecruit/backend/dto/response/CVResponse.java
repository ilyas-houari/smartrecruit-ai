package com.smartrecruit.backend.dto.response;

import com.smartrecruit.backend.enums.CVFileType;
import com.smartrecruit.backend.enums.CVStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
@AllArgsConstructor
public class CVResponse {

    private Long id;
    private Long candidateId;

    private String fileName;
    private String filePath;

    private CVFileType fileType;
    private String mimeType;

    private Boolean active;
    private CVStatus status;

    private LocalDateTime uploadedAt;
    private LocalDateTime analyzedAt;

    private String analysisError;
}