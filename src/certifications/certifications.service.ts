import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CertificationsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.CertificationsUncheckedCreateInput) {
    const exists = await this.prisma.certifications.count({
      where: {
        studentId: data.studentId,
        AND: {
          courseId: data.courseId,
        },
      },
    });

    if (exists > 0) {
      return { status: 304, statusText: 'The record already exists' };
    }

    return await this.prisma.certifications.create({ data });
  }

  async massCreate(data: Array<Prisma.CertificationsCreateManyInput>) {
    const myPromise = data.map(async (element) => {
      const exists = await this.prisma.certifications.count({
        where: {
          studentId: element.studentId,
          AND: {
            courseId: element.courseId,
          },
        },
      });

      return exists === 0 ? element : null;
    });

    let response = await Promise.all(myPromise);
    response = response.filter((n) => n);
    if (response.length === 0) {
      return { status: 304, message: 'These records already exists' };
    }

    await this.prisma.certifications.createMany({
      data: response,
      skipDuplicates: true,
    });
    return { status: 200, message: 'The certifications successfuly created.' };
  }

  async findAll(courseAndStudentsIds?: any) {
    if (!courseAndStudentsIds) {
      return await this.prisma.certifications.findMany({
        include: { student: true, course: true },
      });
    }

    if (
      courseAndStudentsIds &&
      Object.keys(courseAndStudentsIds).length === 0 &&
      courseAndStudentsIds.constructor === Object
    ) {
      return await this.prisma.certifications.findMany({
        include: { student: true, course: true },
      });
    }

    return await this.prisma.certifications.findMany({
      where: {
        AND: [
          { courseId: +courseAndStudentsIds.course_id },
          { studentId: { in: courseAndStudentsIds.students_ids } },
        ],
      },
      include: { student: true, course: true },
    });
  }

  async findOne(id: number) {
    return await this.prisma.certifications.findUnique({
      where: { id },
      include: { course: true, student: true },
    });
  }

  async update(id: number, data: Prisma.CertificationsUpdateInput) {
    return await this.prisma.certifications.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    await this.prisma.certifications.delete({
      where: { id },
    });
    return 'Successfuly removed!';
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
