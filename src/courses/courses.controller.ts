import { Controller, Get, Param } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { CoursesService } from './courses.service';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @EventPattern('create-course')
  create(@Payload() data: any) {
    return this.coursesService.create(this.coursesService._prepareData(data));
  }

  @EventPattern('all-course')
  async findAll() {
    console.log(await this.coursesService.findAll());
    // return this.coursesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coursesService.findOne(+id);
  }

  @EventPattern('update-course')
  update(@Payload() data: any) {
    return this.coursesService.update(
      +data.id,
      this.coursesService._prepareData(data.data),
    );
  }

  @EventPattern('delete-course')
  remove(@Payload() id: any) {
    return this.coursesService.remove(+id);
  }
}
