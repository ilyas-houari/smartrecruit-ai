package com.smartrecruit.backend.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.smartrecruit.backend.dto.request.CompanyRequest;
import com.smartrecruit.backend.dto.response.CompanyResponse;
import com.smartrecruit.backend.entity.Company;
import com.smartrecruit.backend.entity.Recruiter;
import com.smartrecruit.backend.entity.User;
import com.smartrecruit.backend.enums.CompanyStatus;
import com.smartrecruit.backend.enums.RoleName;
import com.smartrecruit.backend.exception.BadRequestException;
import com.smartrecruit.backend.exception.ForbiddenException;
import com.smartrecruit.backend.exception.ResourceNotFoundException;
import com.smartrecruit.backend.repository.CompanyRepository;
import com.smartrecruit.backend.repository.RecruiterRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CompanyService {

    private final CompanyRepository companyRepository;
    private final RecruiterRepository recruiterRepository;

    @Transactional
    public CompanyResponse createCompany(
            User currentUser,
            CompanyRequest request
    ) {
        Recruiter recruiter = getCurrentRecruiter(currentUser);

        if (recruiter.getCompany() != null) {
            throw new BadRequestException(
                    "Recruiter already belongs to a company"
            );
        }

        Company company = Company.builder()
                .name(request.getName().trim())
                .description(clean(request.getDescription()))
                .website(clean(request.getWebsite()))
                .city(clean(request.getCity()))
                .country(request.getCountry().trim())
                .industry(clean(request.getIndustry()))
                .logoUrl(clean(request.getLogoUrl()))
                .status(CompanyStatus.ACTIVE)
                .build();

        Company savedCompany =
                companyRepository.saveAndFlush(company);

        recruiter.setCompany(savedCompany);
        recruiterRepository.save(recruiter);

        return toResponse(savedCompany);
    }

    @Transactional(readOnly = true)
    public CompanyResponse getMyCompany(User currentUser) {
        Recruiter recruiter = getCurrentRecruiter(currentUser);

        if (recruiter.getCompany() == null) {
            throw new ResourceNotFoundException(
                    "Recruiter is not associated with a company"
            );
        }

        return toResponse(recruiter.getCompany());
    }

    @Transactional
    public CompanyResponse updateMyCompany(
            User currentUser,
            CompanyRequest request
    ) {
        Recruiter recruiter = getCurrentRecruiter(currentUser);

        Company company = recruiter.getCompany();

        if (company == null) {
            throw new ResourceNotFoundException(
                    "Recruiter is not associated with a company"
            );
        }

        company.setName(request.getName().trim());
        company.setDescription(clean(request.getDescription()));
        company.setWebsite(clean(request.getWebsite()));
        company.setCity(clean(request.getCity()));
        company.setCountry(request.getCountry().trim());
        company.setIndustry(clean(request.getIndustry()));
        company.setLogoUrl(clean(request.getLogoUrl()));

        Company updatedCompany =
                companyRepository.saveAndFlush(company);

        return toResponse(updatedCompany);
    }

    private Recruiter getCurrentRecruiter(User currentUser) {
        if (currentUser == null
                || currentUser.getRole() != RoleName.RECRUITER) {
            throw new ForbiddenException(
                    "Recruiter access required"
            );
        }

        return recruiterRepository.findByUserId(currentUser.getId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Recruiter profile not found"
                        )
                );
    }

    private String clean(String value) {
        if (value == null) {
            return null;
        }

        String cleaned = value.trim();

        return cleaned.isEmpty() ? null : cleaned;
    }

    private CompanyResponse toResponse(Company company) {
        return CompanyResponse.builder()
                .id(company.getId())
                .name(company.getName())
                .description(company.getDescription())
                .website(company.getWebsite())
                .city(company.getCity())
                .country(company.getCountry())
                .industry(company.getIndustry())
                .logoUrl(company.getLogoUrl())
                .status(company.getStatus())
                .createdAt(company.getCreatedAt())
                .updatedAt(company.getUpdatedAt())
                .build();
    }
}