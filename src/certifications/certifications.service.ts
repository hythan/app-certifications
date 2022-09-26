import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CertificationsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.CertificationsCreateInput) {
    return await this.prisma.certifications.create({ data });
  }

  async massCreate(data: Array<Prisma.CertificationsCreateManyInput>) {
    return await this.prisma.certifications.createMany({
      data,
      skipDuplicates: true,
    });
  }

  async findAll() {
    return await this.prisma.certifications.findMany({
      include: { student: true, course: true },
    });
  }

  async findOne(id: number) {
    return await this.prisma.certifications.findUnique({
      where: { id },
    });
  }

  async update(id: number, data: Prisma.CertificationsUpdateInput) {
    return await this.prisma.certifications.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    return await this.prisma.certifications.delete({
      where: { id },
    });
  }

  _prepareData(payload) {
    return {
      student: { connect: { externalCode: payload.data.studentId } },
      course: { connect: { externalCode: payload.data.courseId } },
      teacherName: payload.data.teacherName,
    };
  }

  _prepareMassData(payload) {
    const data = Array<Prisma.CertificationsCreateManyInput>();
    payload.forEach((element) => {
      data.push({
        studentId: element.studentId,
        courseId: element.courseId,
        teacherName: element.teacherName,
      });
    });

    return data;
  }
}
