import { Test } from '@nestjs/testing';
import { CoursesModule } from 'src/courses/courses.module';
import { CoursesService } from 'src/courses/courses.service';
import { PrismaService } from 'src/prisma.service';

describe('Courses Int', () => {
  let prisma: PrismaService;
  let coursesService: CoursesService;
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [CoursesModule],
    }).compile();
    prisma = moduleRef.get(PrismaService);
    coursesService = moduleRef.get(CoursesService);
    await prisma.cleanDatabase();
  });

  describe('courses CRUD', () => {
    let newCourse: any;
    it('should create a course', async () => {
      newCourse = await coursesService.create({
        name: 'Curso 1',
        externalCode: 1,
        duration: 40,
      });

      expect(newCourse.name).toBe('Curso 1');
    });

    it('should update a course', async () => {
      await coursesService.update(1, {
        name: 'Novo Nome de Curso',
      });
      const updatedCourse = await coursesService.findOne(
        newCourse.externalCode,
      );
      expect(updatedCourse.name).toBe('Novo Nome de Curso');
    });

    it('should list all courses', async () => {
      const courses = await coursesService.findAll();
      expect(courses).toBeInstanceOf(Array);
      expect(courses.length).toBeGreaterThan(0);
    });

    it('should remove a course', async () => {
      const toBeRemoved = await coursesService.create({
        name: 'Curso 2',
        externalCode: 2,
        duration: 40,
      });

      const response = await coursesService.remove(toBeRemoved.externalCode);
      expect(response).toBe('Successfuly removed!');
    });
  });

  it.todo('should pass Courses test');
});
