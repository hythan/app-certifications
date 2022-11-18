import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class StudentsService {
  constructor(private prisma: PrismaService) { }

  async create(data: Prisma.StudentsCreateInput) {
    return await this.prisma.students.create({ data });
  }

  all() {
    return this.prisma.students.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.students.findUnique({
      where: { externalCode: id },
      include: { certifications: { include: { course: true, student: true } } },
    });
  }

  async update(id: number, data: Prisma.StudentsUpdateInput) {
    return await this.prisma.students.update({
      where: { externalCode: id },
      data,
    });
  }

  async remove(id: number) {
    return this.prisma.students.delete({ where: { externalCode: id } });
  }

  _prepareData(payload) {
    return {
      name: payload.data.name,
      externalCode: payload.id,
      cpf: payload.data.cpf,
    };
  }
}
