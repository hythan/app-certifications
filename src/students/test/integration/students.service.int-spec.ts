import { Test } from '@nestjs/testing';
import { PrismaService } from 'src/prisma.service';
import { StudentsModule } from 'src/students/students.module';
import { StudentsService } from 'src/students/students.service';

describe('RegistrationService Int', () => {
  let prisma: PrismaService;
  let studentsService: StudentsService;
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [StudentsModule],
    }).compile();
    prisma = moduleRef.get(PrismaService);
    studentsService = moduleRef.get(StudentsService);
    await prisma.cleanDatabase();
  });

  describe('students CRUD', () => {
    let newStudent: any;

    it('should create a student', async () => {
      newStudent = await studentsService.create({
        name: 'José da Silva',
        externalCode: 1,
        cpf: '082.123.135-33',
      });

      expect(newStudent.name).toBe('José da Silva');
    });

    it('should update student', async () => {
      const updatedStudent = await studentsService.update(1, {
        name: 'José Barbosa',
      });

      expect(updatedStudent.name).toBe('José Barbosa');
    });

    it('should remove a student', async () => {
      const response = await studentsService.remove(1);

      expect(response).toBe('Successfuly removed!');
    });
  });

  it.todo('should pass Students test');
});
