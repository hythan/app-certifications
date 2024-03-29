import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class StudentsService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.StudentsCreateInput) {
    return await this.prisma.students.create({ data });
  }

  all() {
    return this.prisma.students.findMany();
  }

  async findOne(data: any) {
    return await this.prisma.students.findUnique({
      where: { cpf: data.params.cpf },
      include: { certifications: { include: { course: true, student: true } } },
    });
  }

  async update(id: number, data: Prisma.StudentsUpdateInput) {
    return await this.prisma.students.update({
      where: { externalCode: id },
      data,
    });
  }

  async remove(id: any) {
    await this.prisma.students.delete({ where: { externalCode: id } });
    return 'Successfuly removed!';
  }

  _prepareData(payload) {
    return {
      name: payload.data.name,
      externalCode: payload.id,
      cpf: payload.data.cpf,
    };
  }
}
