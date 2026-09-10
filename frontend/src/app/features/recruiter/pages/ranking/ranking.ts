import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';


interface MissingSkill {
  skillId: number;
  name: string;
}


interface MatchingResult {
  skillScore: number;
  experienceScore: number;
  educationScore: number;
  finalScore: number;
  missingSkills: MissingSkill[];
}


interface RankedCandidate {
  candidateId: number;
  applicationId: number;
  jobOfferId: number;

  firstName: string;
  lastName: string;

  jobTitle: string;

  matchingResult: MatchingResult;
}


@Component({
  selector: 'app-ranking',

  standalone: true,

  imports: [
    RouterLink
  ],

  templateUrl: './ranking.html',

  styleUrl: './ranking.scss'
})
export class Ranking {

  readonly candidates:
    RankedCandidate[] = [

      {
        candidateId: 1,

        applicationId: 1,

        jobOfferId: 1,

        firstName:
          'Jamie',

        lastName:
          'Diaz',

        jobTitle:
          'Java Backend Developer',

        matchingResult: {

          skillScore:
            75,

          experienceScore:
            100,

          educationScore:
            100,

          finalScore:
            87.5,

          missingSkills: [
            {
              skillId: 6,
              name: 'Docker'
            }
          ]

        }

      },


      {
        candidateId: 2,

        applicationId: 2,

        jobOfferId: 2,

        firstName:
          'Sara',

        lastName:
          'Benali',

        jobTitle:
          'Angular Frontend Developer',

        matchingResult: {

          skillScore:
            82,

          experienceScore:
            80,

          educationScore:
            80,

          finalScore:
            81,

          missingSkills: [
            {
              skillId: 4,
              name: 'TypeScript'
            }
          ]

        }

      },


      {
        candidateId: 3,

        applicationId: 3,

        jobOfferId: 3,

        firstName:
          'Omar',

        lastName:
          'El Idrissi',

        jobTitle:
          'Junior Software Engineer',

        matchingResult: {

          skillScore:
            72,

          experienceScore:
            80,

          educationScore:
            80,

          finalScore:
            76,

          missingSkills: [
            {
              skillId: 12,
              name: 'Testing'
            }
          ]

        }

      }

    ];


  get rankedCandidates():
    RankedCandidate[] {

    return [
      ...this.candidates
    ].sort(
      (a, b) =>
        b.matchingResult.finalScore -
        a.matchingResult.finalScore
    );

  }


  calculateFinalScore(
    candidate: RankedCandidate
  ): number {

    const matching =
      candidate.matchingResult;


    const score =
      matching.skillScore * 0.50 +
      matching.experienceScore * 0.30 +
      matching.educationScore * 0.20;


    return Number(
      score.toFixed(2)
    );

  }


  isScoreConsistent(
    candidate: RankedCandidate
  ): boolean {

    return (
      this.calculateFinalScore(
        candidate
      ) ===
      candidate
        .matchingResult
        .finalScore
    );

  }

}