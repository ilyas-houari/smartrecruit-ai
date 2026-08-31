package com.smartrecruit.backend.service;

import com.smartrecruit.backend.dto.response.MatchingResultResponse;

public interface MatchingService {

    MatchingResultResponse calculateMatching(Long applicationId);

    MatchingResultResponse getMatchingResult(Long applicationId);
}