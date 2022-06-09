import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CoursesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.CoursesCreateInput) {
    return await this.prisma.courses.create({ data });
  }

  findAll() {
    return this.prisma.courses.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} course`;
  }

  async update(id: number, data: Prisma.CoursesUpdateInput) {
    return await this.prisma.courses.update({
      where: { externalCode: id },
      data,
    });
  }

  async remove(id: number) {
    return await this.prisma.courses.delete({ where: { externalCode: id } });
  }

  _prepareData(data) {
    const { id, name, duration } = data;
    return {
      externalCode: id,
      name: name,
      duration: duration,
    };
  }
}
