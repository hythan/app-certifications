import { Module } from '@nestjs/common';
import { CertificationsService } from './certifications.service';
import { CertificationsController } from './certifications.controller';
import { PrismaService } from 'src/prisma.service';
import { StudentsService } from 'src/students/students.service';
import { CoursesService } from 'src/courses/courses.service';

@Module({
  controllers: [CertificationsController],
  providers: [
    CertificationsService,
    PrismaService,
    StudentsService,
    CoursesService,
  ],
})
export class CertificationsModule {}
