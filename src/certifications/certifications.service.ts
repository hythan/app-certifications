import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CoursesService } from 'src/courses/courses.service';
import { PrismaService } from 'src/prisma.service';
import { StudentsService } from 'src/students/students.service';

@Injectable()
export class CertificationsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly coursesService: CoursesService,
    private readonly studentsService: StudentsService,
  ) {}
  // async create(data: Prisma.CertificationsCreateInput) {
  //   return this.prisma.certifications.create({ data });
  // }

  // findAll() {
  //   return this.prisma.certifications.findMany();
  // }

  // async findOne(id: number) {
  //   return await this.prisma.certifications.findUnique({
  //     where: { externalCode: id },
  //   });
  // }

  // async update(id: number, data: Prisma.CertificationsUpdateInput) {
  //   return await this.prisma.certifications.update({
  //     where: { externalCode: id },
  //     data,
  //   });
  // }

  // async remove(id: number) {
  //   return await this.prisma.certifications.delete({
  //     where: { externalCode: id },
  //   });
  // }

  // async _prepareData(data) {
  //   const _student = await this.studentsService.findOne(Number(data.studentId));
  //   const _course = await this.coursesService.findOne(Number(data.classId));
  //   return {
  //     externalCode: data.id,
  //     course: { connect: { id: +_course.id } },
  //     student: { connect: { id: +_student.id } },
  //   };
  // }

  // async createOrUpdate(data) {
  //   const _data = await this._prepareData(data);
  //   if (await this.findOne(data.id)) {
  //     return this.update(+data.id, _data);
  //   }

  //   return this.create(_data);
  // }

  async generateCertifications(payload) {
    // return this.prisma.certifications.createMany({
    //   where: { externalCode: payload.ids },
    //   data: { }
    // });
  }
}
