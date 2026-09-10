import { CvService } from './cv.service';
import { CvAnalysis } from '../models/cv.model';


function makeFile(
  name: string,
  size: number,
  type = 'application/pdf'
): File {

  const file = new File(['x'.repeat(Math.max(size, 1))], name, { type });

  Object.defineProperty(file, 'size', { value: size });

  return file;

}


describe('CvService', () => {

  let service: CvService;


  beforeEach(() => {

    service = new CvService();

  });


  describe('validateFile', () => {

    it('rejects an empty file', () => {

      const file = makeFile('cv.pdf', 0);

      expect(service.validateFile(file)).toBe('The selected file is empty.');

    });


    it('rejects a file larger than 10 MB', () => {

      const file = makeFile('cv.pdf', 11 * 1024 * 1024);

      expect(service.validateFile(file)).toBe(
        'File is too large. Maximum size is 10 MB.'
      );

    });


    it('rejects an unsupported file extension', () => {

      const file = makeFile('cv.txt', 1024);

      expect(service.validateFile(file)).toBe(
        'Unsupported file. Please select a PDF or DOCX document.'
      );

    });


    it('accepts a valid PDF within the size limit', () => {

      const file = makeFile('cv.pdf', 1024);

      expect(service.validateFile(file)).toBeNull();

    });


    it('accepts a valid DOCX within the size limit', () => {

      const file = makeFile('cv.docx', 1024);

      expect(service.validateFile(file)).toBeNull();

    });

  });


  describe('upload pipeline', () => {

    beforeEach(() => {

      vi.useFakeTimers();

    });


    afterEach(() => {

      vi.useRealTimers();

    });


    it('moves through UPLOADED -> PROCESSING -> ANALYZED', () => {

      const file = makeFile('new-cv.pdf', 2048);

      service.uploadCv(file);

      expect(service.currentStatus).toBe('UPLOADED');

      vi.advanceTimersByTime(700);
      expect(service.currentStatus).toBe('PROCESSING');

      vi.advanceTimersByTime(1300);
      expect(service.currentStatus).toBe('ANALYZED');

    });


    it('updates the current CV metadata on upload', () => {

      const file = makeFile('new-cv.docx', 2048);

      service.uploadCv(file);

      let currentCv;
      service.getCurrentCv().subscribe(cv => { currentCv = cv; });

      expect(currentCv).toMatchObject({
        name: 'new-cv.docx',
        format: 'DOCX'
      });

    });

  });


  describe('validateAnalysis', () => {

    it('does nothing when the CV is not in ANALYZED status', () => {

      // Default mock state is VALIDATED, not ANALYZED.
      const edited: CvAnalysis = { skills: [], experiences: [], educations: [] };

      service.validateAnalysis(edited);

      expect(service.currentStatus).toBe('VALIDATED');

    });


    it('validates and stores the edited analysis once ANALYZED', () => {

      vi.useFakeTimers();

      service.uploadCv(makeFile('cv.pdf', 1024));
      vi.advanceTimersByTime(2000);

      expect(service.currentStatus).toBe('ANALYZED');

      const edited: CvAnalysis = {
        skills: [{ name: 'Docker', category: 'DevOps', level: 'BEGINNER' }],
        experiences: [],
        educations: []
      };

      service.validateAnalysis(edited);

      expect(service.currentStatus).toBe('VALIDATED');

      let analysis;
      service.getAnalysis().subscribe(result => { analysis = result; });
      expect(analysis).toEqual(edited);

      vi.useRealTimers();

    });

  });


  describe('retryAnalysis', () => {

    it('does nothing unless the current status is FAILED', () => {

      service.retryAnalysis();

      expect(service.currentStatus).toBe('VALIDATED');

    });

  });

});
