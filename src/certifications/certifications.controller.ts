import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CertificationsService } from './certifications.service';
import { StudentsService } from '../students/students.service';

@Controller()
export class CertificationsController {
  constructor(
    private readonly certificationsService: CertificationsService,
    private readonly studentService: StudentsService,
  ) {}

  @MessagePattern('create-certification')
  async createOrUpdate(@Payload() payload: any) {
    const data = {
      student: { connect: { externalCode: payload.data.studentId } },
      course: { connect: { externalCode: payload.data.courseId } },
      teacherName: payload.data.teacherName,
    };

    return await this.certificationsService.create(data);
  }

  @MessagePattern('find-all-certifications')
  async findAll() {
    return await this.certificationsService.findAll();
  }

  @MessagePattern('find-certification')
  async findOne(@Payload() payload: any) {
    return await this.certificationsService.findOne(payload.id);
  }

  @MessagePattern('update-certification')
  async update(@Payload() payload: any) {
    return await this.certificationsService.update(payload.id, payload.data);
  }

  @MessagePattern('delete-certification')
  remove(@Payload() payload: any) {
    return this.certificationsService.remove(+payload.id);
  }
}
