import { Controller } from '@nestjs/common';
import { Ctx, MessagePattern, Payload } from '@nestjs/microservices';
import { CoursesService } from './courses.service';

@Controller()
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @MessagePattern('create-certifications-course')
  create(@Payload() payload: any) {
    const response = this.coursesService.create(
      this.coursesService._prepareData(payload),
    );
    return response;
  }

  @MessagePattern('find-all-certifications-courses')
  async findAll() {
    return this.coursesService.findAll();
  }

  @MessagePattern('update-certifications-course')
  update(@Payload() data: any) {
    return this.coursesService.update(
      +data.id,
      this.coursesService._prepareData(data),
    );
  }

  @MessagePattern('remove-certifications-course')
  remove(@Payload() id: any) {
    return this.coursesService.remove(+id.id);
  }
}
