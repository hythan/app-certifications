import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CoursesService } from './courses.service';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @MessagePattern('create-certifications-course')
  create(@Payload() data: any) {
    return this.coursesService.create(this.coursesService._prepareData(data));
  }

  @MessagePattern('all-certifications-courses')
  async findAll() {
    console.log(await this.coursesService.findAll());
    // return this.coursesService.findAll();
  }

  // @MessagePattern('')
  // findOne(@Param('id') id: string) {
  //   return this.coursesService.findOne(+id);
  // }

  @MessagePattern('update-certifications-course')
  update(@Payload() data: any) {
    return this.coursesService.update(
      +data.id,
      this.coursesService._prepareData(data.data),
    );
  }

  @MessagePattern('delete-certifications-course')
  remove(@Payload() id: any) {
    return this.coursesService.remove(+id);
  }
}
