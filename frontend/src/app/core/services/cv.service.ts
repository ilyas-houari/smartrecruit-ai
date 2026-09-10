import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';

import {
  CurrentCv,
  CvAnalysis,
  CvStatus
} from '../models/cv.model';


/*
 * CV file security (master prompt Section 49).
 * Only PDF/DOCX, non-empty, size-limited.
 */

const ALLOWED_EXTENSIONS = ['.pdf', '.docx'];

const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024;


@Injectable({
  providedIn: 'root'
})
export class CvService {


  /* ========================================
     STATE
     ======================================== */

  private statusSubject =
    new BehaviorSubject<CvStatus>('VALIDATED');

  private currentCvSubject =
    new BehaviorSubject<CurrentCv | null>({

      name: 'jamie-diaz-cv.pdf',

      format: 'PDF',

      uploadedAt: '22 Aug 2026',

      size: '1.8 MB'

    });

  private analysisSubject =
    new BehaviorSubject<CvAnalysis>({

      skills: [
        { name: 'Java', category: 'Programming Language', level: 'ADVANCED' },
        { name: 'Spring Boot', category: 'Backend', level: 'ADVANCED' },
        { name: 'MySQL', category: 'Database', level: 'ADVANCED' },
        { name: 'REST API', category: 'Backend', level: 'ADVANCED' },
        { name: 'Angular', category: 'Frontend', level: 'INTERMEDIATE' },
        { name: 'Git', category: 'Development Tool', level: 'INTERMEDIATE' }
      ],

      experiences: [
        {
          jobTitle: 'Backend Developer Intern',
          company: 'Nexa Technologies',
          period: 'Mar 2026 — Jul 2026',
          description: 'Developed REST APIs using Java, Spring Boot and MySQL.'
        },
        {
          jobTitle: 'Web Development Intern',
          company: 'Digital Horizon',
          period: 'Jul 2025 — Sep 2025',
          description: 'Built responsive interfaces and integrated REST services.'
        }
      ],

      educations: [
        {
          degree: 'Bachelor in Software Engineering',
          institution: 'Faculty of Science and Technology',
          period: '2023 — 2026',
          level: 'BAC+3'
        }
      ]

    });


  /* ========================================
     OBSERVABLES
     ======================================== */

  getStatus(): Observable<CvStatus> {

    return this.statusSubject.asObservable();

  }


  getCurrentCv(): Observable<CurrentCv | null> {

    return this.currentCvSubject.asObservable();

  }


  getAnalysis(): Observable<CvAnalysis> {

    return this.analysisSubject.asObservable();

  }


  get currentStatus(): CvStatus {

    return this.statusSubject.value;

  }


  /* ========================================
     FILE VALIDATION (Section 49)
     ======================================== */

  validateFile(file: File): string | null {

    if (file.size === 0) {
      return 'The selected file is empty.';
    }


    if (file.size > MAX_FILE_SIZE_BYTES) {
      return 'File is too large. Maximum size is 10 MB.';
    }


    const fileName = file.name.toLowerCase();

    const hasValidExtension = ALLOWED_EXTENSIONS.some(
      extension => fileName.endsWith(extension)
    );


    if (!hasValidExtension) {
      return 'Unsupported file. Please select a PDF or DOCX document.';
    }


    return null;

  }


  /* ========================================
     UPLOAD
     Later: POST /api/cv/upload -> POST /api/cv/{id}/analyze
     ======================================== */

  uploadCv(file: File): void {

    this.currentCvSubject.next({

      name: file.name,

      format: file.name.toLowerCase().endsWith('.pdf') ? 'PDF' : 'DOCX',

      uploadedAt: 'Just now',

      size: this.formatFileSize(file.size)

    });


    this.statusSubject.next('UPLOADED');


    this.runAnalysisPipeline();

  }


  /* ========================================
     RETRY AFTER FAILURE
     Later: POST /api/cv/{id}/analyze
     ======================================== */

  retryAnalysis(): void {

    if (this.currentStatus !== 'FAILED') {
      return;
    }


    this.statusSubject.next('PROCESSING');


    setTimeout(() => {

      this.statusSubject.next('ANALYZED');

    }, 1800);

  }


  /* ========================================
     VALIDATE ANALYSIS
     Later: PUT /api/cv/{id}/validate
     ======================================== */

  validateAnalysis(edited: CvAnalysis): void {

    if (this.currentStatus !== 'ANALYZED') {
      return;
    }


    this.analysisSubject.next(edited);

    this.statusSubject.next('VALIDATED');

  }


  /* ========================================
     SIMULATE FAILURE (demo/testing helper)
     ======================================== */

  simulateFailure(): void {

    if (this.currentStatus !== 'PROCESSING') {
      return;
    }


    this.statusSubject.next('FAILED');

  }


  /* ========================================
     MOCK AI PIPELINE
     UPLOADED -> PROCESSING -> ANALYZED
     ======================================== */

  private runAnalysisPipeline(): void {

    setTimeout(() => {

      this.statusSubject.next('PROCESSING');

    }, 700);


    setTimeout(() => {

      if (this.currentStatus !== 'PROCESSING') {
        return;
      }


      this.statusSubject.next('ANALYZED');

    }, 2000);

  }


  private formatFileSize(bytes: number): string {

    if (bytes === 0) {
      return '0 KB';
    }


    const megabytes = bytes / (1024 * 1024);


    if (megabytes >= 1) {
      return `${megabytes.toFixed(1)} MB`;
    }


    const kilobytes = bytes / 1024;


    return `${kilobytes.toFixed(0)} KB`;

  }


}
