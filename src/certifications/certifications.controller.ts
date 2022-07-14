import { Controller, Get, Param } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { CertificationsService } from './certifications.service';

@Controller('certifications')
export class CertificationsController {
  constructor(private readonly certificationsService: CertificationsService) {}

  // @EventPattern('create-or-update-certification')
  // async createOrUpdate(@Payload() payload: any) {
  //   return await this.certificationsService.createOrUpdate(payload.data);
  // }

  // @EventPattern('all-certification')
  // async findAll() {
  //   console.log(await this.certificationsService.findAll());
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.certificationsService.findOne(+id);
  // }

  // // @EventPattern('update-certification')
  // // async update(@Payload() payload: any) {
  // //   return this.certificationsService.update(
  // //     +payload.id,
  // //     await this.certificationsService._prepareData(payload.data),
  // //   );
  // // }

  // @EventPattern('delete-certification')
  // remove(@Payload() id: any) {
  //   return this.certificationsService.remove(+id);
  // }

  @MessagePattern('generate-certifications')
  async generateCertifications(@Payload() payload: any) {
    return await this.certificationsService.generateCertifications(payload);
  }
}
