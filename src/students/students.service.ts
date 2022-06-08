import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class StudentsService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.StudentsCreateInput) {
    const { name, cpf, createAt, updateAt } = data;
    const _data = {
      name: name,
      cpf: cpf,
      createAt: createAt,
      updateAt: updateAt,
    };
    return await this.prisma.students.create({ data: _data });
  }

  all() {
    return this.prisma.students.findMany();
  }

  async findBy(params: { where: Prisma.StudentsWhereUniqueInput }) {
    return this.prisma.students.findUnique(params);
  }

  async update(id: number, data: Prisma.StudentsUpdateInput) {
    return await this.prisma.students.update({ where: { id }, data });
  }

  async remove(id: number) {
    return this.prisma.students.delete({ where: { id } });
  }
}
