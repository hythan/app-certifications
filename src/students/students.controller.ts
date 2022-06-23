import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { Prisma } from '@prisma/client';
import { StudentsService } from './students.service';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @EventPattern('all-certifications-students')
  async findAll() {
    console.log('ENTROU NO DO CERTIFICATIONS');

    // return await this.studentsService.all();
    // return this.studentsService.all();
  }

  @EventPattern('create-student')
  async create(postData: any) {
    return await this.studentsService.create(
      this.studentsService._prepareData(postData),
    );
  }

  // @Get(':id')
  // async findOne(@Param('id') id: string) {
  //   return this.studentsService.findBy({ where: { id: Number(id) } });
  // }

  @EventPattern('update-student')
  async update(@Payload() data: any) {
    return await this.studentsService.update(
      +data.id,
      this.studentsService._prepareData(data.data),
    );
  }

  @EventPattern('delete-student')
  async remove(@Payload() id: number) {
    return await this.studentsService.remove(+id);
  }
}
