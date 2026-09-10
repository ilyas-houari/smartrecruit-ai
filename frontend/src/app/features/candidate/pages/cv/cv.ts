import { Component, OnDestroy, OnInit, inject } from '@angular/core';

import { Subscription } from 'rxjs';

import { CvService } from '../../../../core/services/cv.service';

import {
  CurrentCv,
  CvStatus,
  ExtractedEducation,
  ExtractedExperience,
  ExtractedSkill
} from '../../../../core/models/cv.model';


/*
 * EMPTY is frontend-only.
 * It means the candidate does not currently
 * have a CV loaded in the UI.
 *
 * EMPTY must never be sent to Spring Boot
 * as an official CV status.
 */
type CvUiStatus =
  | 'EMPTY'
  | CvStatus;


@Component({
  selector: 'app-cv',

  imports: [],

  templateUrl: './cv.html',

  styleUrl: './cv.scss'
})
export class Cv implements OnInit, OnDestroy {

  private readonly cvService = inject(CvService);

  private readonly subscriptions = new Subscription();


  /* ========================================
     FILE SELECTION
     ======================================== */

  selectedFile: File | null = null;

  fileError = '';

  isDragging = false;


  /* ========================================
     CV WORKFLOW (mirrored from CvService)
     ======================================== */

  status: CvUiStatus = 'EMPTY';

  currentCv: CurrentCv | null = null;


  /* ========================================
     EDITING
     ======================================== */

  isEditingAnalysis = false;


  /* ========================================
     EXTRACTED DATA (editable working copy)
     ======================================== */

  extractedSkills: ExtractedSkill[] = [];

  extractedExperiences: ExtractedExperience[] = [];

  extractedEducation: ExtractedEducation[] = [];


  /* ========================================
     LIFECYCLE
     ======================================== */

  ngOnInit(): void {

    this.subscriptions.add(
      this.cvService.getStatus().subscribe(
        status => {
          this.status = status;
        }
      )
    );


    this.subscriptions.add(
      this.cvService.getCurrentCv().subscribe(
        currentCv => {
          this.currentCv = currentCv;
        }
      )
    );


    this.subscriptions.add(
      this.cvService.getAnalysis().subscribe(
        analysis => {

          if (this.isEditingAnalysis) {
            return;
          }


          this.extractedSkills = analysis.skills.map(
            skill => ({ ...skill })
          );

          this.extractedExperiences = analysis.experiences.map(
            experience => ({ ...experience })
          );

          this.extractedEducation = analysis.educations.map(
            education => ({ ...education })
          );

        }
      )
    );

  }


  ngOnDestroy(): void {

    this.subscriptions.unsubscribe();

  }


  /* ========================================
     ANALYSIS SUMMARY
     ======================================== */

  get detectedInformation() {

    return [

      {

        label:
          'Skills',

        value:
          String(
            this.extractedSkills.length
          ),

        detail:
          'Technical skills identified'
      },

      {

        label:
          'Experiences',

        value:
          String(
            this.extractedExperiences.length
          ),

        detail:
          'Professional experiences'
      },

      {

        label:
          'Education',

        value:
          String(
            this.extractedEducation.length
          ),

        detail:
          'Academic qualifications'
      }

    ];

  }


  /* ========================================
     DRAG & DROP
     ======================================== */

  onDragOver(
    event: DragEvent
  ): void {

    event.preventDefault();

    event.stopPropagation();

    this.isDragging = true;

  }


  onDragLeave(
    event: DragEvent
  ): void {

    event.preventDefault();

    event.stopPropagation();

    this.isDragging = false;

  }


  onDrop(
    event: DragEvent
  ): void {

    event.preventDefault();

    event.stopPropagation();

    this.isDragging = false;


    const file =
      event.dataTransfer
        ?.files
        .item(0);


    if (file) {

      this.handleFile(file);

    }

  }


  /* ========================================
     FILE INPUT
     ======================================== */

  onFileSelected(
    event: Event
  ): void {

    const input =
      event.target as HTMLInputElement;


    const file =
      input.files
        ?.item(0);


    if (file) {

      this.handleFile(file);

    }


    /*
     * Allows selecting the same file again.
     */

    input.value = '';

  }


  /* ========================================
     FILE VALIDATION
     ======================================== */

  private handleFile(
    file: File
  ): void {

    this.fileError = '';


    const validationError =
      this.cvService.validateFile(file);


    if (validationError) {

      this.selectedFile = null;

      this.fileError = validationError;

      return;

    }


    this.selectedFile = file;

  }


  removeSelectedFile(): void {

    this.selectedFile = null;

    this.fileError = '';

  }


  /* ========================================
     UPLOAD + ANALYSIS
     ======================================== */

  uploadCv(): void {

    if (!this.selectedFile) {
      return;
    }


    this.isEditingAnalysis = false;

    this.cvService.uploadCv(this.selectedFile);

    this.selectedFile = null;

  }


  /* ========================================
     ANALYSIS EDITING
     ======================================== */

  startEditingAnalysis(): void {

    if (
      this.status !== 'ANALYZED'
    ) {
      return;
    }


    this.isEditingAnalysis =
      true;

  }


  finishEditingAnalysis(): void {

    if (
      this.status !== 'ANALYZED'
    ) {
      return;
    }


    this.isEditingAnalysis =
      false;

  }


  /* ========================================
     SKILL CORRECTIONS
     ======================================== */

  updateSkill(
    index: number,
    field: keyof ExtractedSkill,
    value: string
  ): void {

    const skill =
      this.extractedSkills[index];


    if (!skill) {
      return;
    }


    skill[field] =
      value;

  }


  removeSkill(
    index: number
  ): void {

    if (
      this.status !== 'ANALYZED'
    ) {
      return;
    }


    this.extractedSkills.splice(
      index,
      1
    );

  }


  addSkill(): void {

    if (
      this.status !== 'ANALYZED'
    ) {
      return;
    }


    this.extractedSkills.push({

      name:
        'New skill',

      category:
        'Other',

      level:
        'BEGINNER'

    });

  }


  /* ========================================
     EXPERIENCE CORRECTIONS
     ======================================== */

  updateExperience(
    index: number,
    field: keyof ExtractedExperience,
    value: string
  ): void {

    const experience =
      this.extractedExperiences[index];


    if (!experience) {
      return;
    }


    experience[field] =
      value;

  }


  removeExperience(
    index: number
  ): void {

    if (
      this.status !== 'ANALYZED'
    ) {
      return;
    }


    this.extractedExperiences.splice(
      index,
      1
    );

  }


  addExperience(): void {

    if (
      this.status !== 'ANALYZED'
    ) {
      return;
    }


    this.extractedExperiences.push({

      jobTitle:
        'New experience',

      company:
        '',

      period:
        '',

      description:
        ''

    });

  }


  /* ========================================
     EDUCATION CORRECTIONS
     ======================================== */

  updateEducation(
    index: number,
    field: keyof ExtractedEducation,
    value: string
  ): void {

    const education =
      this.extractedEducation[index];


    if (!education) {
      return;
    }


    education[field] =
      value;

  }


  removeEducation(
    index: number
  ): void {

    if (
      this.status !== 'ANALYZED'
    ) {
      return;
    }


    this.extractedEducation.splice(
      index,
      1
    );

  }


  addEducation(): void {

    if (
      this.status !== 'ANALYZED'
    ) {
      return;
    }


    this.extractedEducation.push({

      degree:
        'New education',

      institution:
        '',

      period:
        '',

      level:
        ''

    });

  }


  /* ========================================
     VALIDATE CV
     ======================================== */

  validateAnalysis(): void {

    if (
      this.status !== 'ANALYZED'
    ) {
      return;
    }


    this.isEditingAnalysis =
      false;


    this.cvService.validateAnalysis({

      skills: this.extractedSkills,

      experiences: this.extractedExperiences,

      educations: this.extractedEducation

    });

  }


  /* ========================================
     RETRY FAILED ANALYSIS
     ======================================== */

  retryAnalysis(): void {

    this.cvService.retryAnalysis();

  }


  /* ========================================
     STATUS HELPERS
     ======================================== */

  isReached(
    step: CvUiStatus
  ): boolean {

    const statusRank:
      Record<CvUiStatus, number> = {

        EMPTY:
          0,

        UPLOADED:
          1,

        PROCESSING:
          2,

        FAILED:
          2,

        ANALYZED:
          3,

        VALIDATED:
          4

      };


    if (
      this.status === 'FAILED'
    ) {

      return (
        step === 'UPLOADED' ||
        step === 'PROCESSING'
      );

    }


    return (
      statusRank[this.status] >=
      statusRank[step]
    );

  }


  isCurrent(
    step: CvUiStatus
  ): boolean {

    return (
      this.status === step
    );

  }

}
