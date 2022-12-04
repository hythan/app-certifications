import { Test } from '@nestjs/testing';
import { CertificationsModule } from 'src/certifications/certifications.module';
import { CertificationsService } from 'src/certifications/certifications.service';
import { PrismaService } from 'src/prisma.service';

describe('Courses Int', () => {
  let prisma: PrismaService;
  let certificationsService: CertificationsService;
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [CertificationsModule],
    }).compile();
    prisma = moduleRef.get(PrismaService);
    certificationsService = moduleRef.get(CertificationsService);
    await prisma.cleanDatabase();
  });

  describe('registrations CRUD', () => {
    let newCourse: any;
    let newStudent: any;
    let newCertification: any;
    it('should create a course', async () => {
      newCourse = await prisma.courses.create({
        data: {
          name: 'Curso 1',
          externalCode: 1,
          duration: 40,
        },
      });
    });

    it('should create a student', async () => {
      newStudent = await prisma.students.create({
        data: {
          name: 'José da Silva',
          externalCode: 1,
          cpf: '082.123.135-33',
        },
      });
    });

    it('should create a certification', async () => {
      newCertification = await certificationsService.create({
        studentId: newStudent.id,
        courseId: newCourse.id,
        teacherName: 'Professor Pedro',
      });

      expect(newCertification.teacherName).toBe('Professor Pedro');
    });

    it('should update a certification', async () => {
      await certificationsService.update(newCertification.id, {
        teacherName: 'Novo Nome do professor',
      });
      const updatedCertification = await certificationsService.findOne(
        newCertification.id,
      );
      expect(updatedCertification.teacherName).toBe('Novo Nome do professor');
    });

    it('should list all certifications', async () => {
      const certifications = await certificationsService.findAll();
      expect(certifications).toBeInstanceOf(Array);
      expect(certifications.length).toBeGreaterThan(0);
    });

    it('should remove a certification', async () => {
      const response = await certificationsService.remove(newCertification.id);
      expect(response).toBe('Successfuly removed!');
    });
  });

  it.todo('should pass Registrations test');
});
