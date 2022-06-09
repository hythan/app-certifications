import { Module } from '@nestjs/common';
import { StudentsModule } from './students/students.module';
import { CoursesModule } from './courses/courses.module';
import { CertificationsModule } from './certifications/certifications.module';

@Module({
  imports: [StudentsModule, CoursesModule, CertificationsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
