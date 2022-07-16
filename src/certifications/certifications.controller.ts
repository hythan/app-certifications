import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CertificationsService } from './certifications.service';

@Controller()
export class CertificationsController {
  constructor(private readonly certificationsService: CertificationsService) {}

  @MessagePattern('create-certification')
  async createOrUpdate(@Payload() payload: any) {
    return await this.certificationsService.create(payload.data);
  }

  @MessagePattern('find-all-certifications')
  async findAll() {
    return await this.certificationsService.findAll();
  }

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

  // @MessagePattern('generate-certifications')
  // async generateCertifications(@Payload() payload: any) {
  //   return await this.certificationsService.generateCertifications(payload);
  // }
}
