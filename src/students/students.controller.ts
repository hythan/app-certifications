import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { Prisma } from '@prisma/client';
import { StudentsService } from './students.service';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @EventPattern('students-all')
  async findAll(@Payload() data: number[], @Ctx() context: RmqContext) {
    console.log(await this.studentsService.all());
    return this.studentsService.all();
  }

  @EventPattern('create-student')
  @Post()
  create(postData: any) {
    console.log(postData);
    return this.studentsService.create(postData);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.studentsService.findBy({ where: { id: Number(id) } });
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateData: Prisma.StudentsUpdateInput,
  ) {
    return this.studentsService.update(+id, updateData);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentsService.remove(Number(id));
  }
}
