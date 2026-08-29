package com.smartrecruit.backend.service;

import com.smartrecruit.backend.dto.request.LoginRequest;
import com.smartrecruit.backend.dto.request.RegisterRequest;
import com.smartrecruit.backend.dto.response.AuthResponse;
import com.smartrecruit.backend.entity.Candidate;
import com.smartrecruit.backend.entity.Recruiter;
import com.smartrecruit.backend.entity.User;
import com.smartrecruit.backend.enums.EducationLevel;
import com.smartrecruit.backend.enums.RoleName;
import com.smartrecruit.backend.enums.UserStatus;
import com.smartrecruit.backend.exception.BadRequestException;
import com.smartrecruit.backend.repository.CandidateRepository;
import com.smartrecruit.backend.repository.RecruiterRepository;
import com.smartrecruit.backend.repository.UserRepository;
import com.smartrecruit.backend.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final CandidateRepository candidateRepository;
    private final RecruiterRepository recruiterRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    @Transactional
    public AuthResponse register(RegisterRequest request) {

        String email = request.getEmail().trim().toLowerCase();

        if (userRepository.existsByEmail(email)) {
            throw new BadRequestException("Email already exists");
        }

        if (request.getRole() == RoleName.ADMIN) {
            throw new BadRequestException(
                    "ADMIN cannot be created through public registration"
            );
        }

        if (request.getRole() != RoleName.CANDIDATE
                && request.getRole() != RoleName.RECRUITER) {
            throw new BadRequestException("Invalid registration role");
        }

        User user = User.builder()
                .firstName(request.getFirstName().trim())
                .lastName(request.getLastName().trim())
                .email(email)
                .passwordHash(passwordEncoder.encode(request.getPassword()))
                .phone(cleanOptionalText(request.getPhone()))
                .role(request.getRole())
                .status(UserStatus.ACTIVE)
                .build();

        User savedUser = userRepository.save(user);

        if (savedUser.getRole() == RoleName.CANDIDATE) {
            createCandidateProfile(savedUser);
        } else {
            createRecruiterProfile(savedUser);
        }

        return buildAuthResponse(savedUser);
    }

    @Transactional(readOnly = true)
    public AuthResponse login(LoginRequest request) {

        String email = request.getEmail().trim().toLowerCase();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new BadRequestException("Invalid email or password")
                );

        if (!passwordEncoder.matches(
                request.getPassword(),
                user.getPasswordHash()
        )) {
            throw new BadRequestException("Invalid email or password");
        }

        if (user.getStatus() != UserStatus.ACTIVE) {
            throw new BadRequestException("Account is not active");
        }

        return buildAuthResponse(user);
    }

    private AuthResponse buildAuthResponse(User user) {

        String token = jwtService.generateToken(user);

        return AuthResponse.builder()
                .token(token)
                .tokenType("Bearer")
                .userId(user.getId())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .email(user.getEmail())
                .role(user.getRole())
                .build();
    }

    private void createCandidateProfile(User user) {

        Candidate candidate = Candidate.builder()
                .user(user)
                .country("Morocco")
                .totalExperienceMonths(0)
                .highestEducationLevel(EducationLevel.NONE)
                .profileCompleted(false)
                .build();

        candidateRepository.save(candidate);
    }

    private void createRecruiterProfile(User user) {

        Recruiter recruiter = Recruiter.builder()
                .user(user)
                .company(null)
                .position(null)
                .build();

        recruiterRepository.save(recruiter);
    }

    private String cleanOptionalText(String value) {

        if (value == null || value.isBlank()) {
            return null;
        }

        return value.trim();
    }
}