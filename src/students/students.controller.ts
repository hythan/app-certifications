import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { StudentsService } from './students.service';

@Controller()
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @MessagePattern('all-certifications-students')
  async findAll() {
    return true;
  }

  @MessagePattern('create-certifications-student')
  async create(postData: any) {
    return await this.studentsService.create(
      this.studentsService._prepareData(postData),
    );
  }

  @MessagePattern('get-certifications-student')
  async findOne(@Payload() data: any) {
    return this.studentsService.findOne(data);
  }

  @MessagePattern('update-certifications-student')
  async update(@Payload() data: any) {
    return await this.studentsService.update(
      +data.id,
      this.studentsService._prepareData(data.data),
    );
  }

  @MessagePattern('delete-certifications-student')
  async remove(@Payload() id: number) {
    return await this.studentsService.remove(+id);
  }
}
