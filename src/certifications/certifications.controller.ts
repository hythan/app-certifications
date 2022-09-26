import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CertificationsService } from './certifications.service';

@Controller()
export class CertificationsController {
  constructor(private readonly certificationsService: CertificationsService) {}

  @MessagePattern('create-certification')
  async createOrUpdate(@Payload() payload: any) {
    if (payload.data.certificationsList) {
      return await this.certificationsService.massCreate(
        this.certificationsService._prepareMassData(
          payload.data.certificationsList,
        ),
      );
    }

    return await this.certificationsService.create(
      this.certificationsService._prepareData(payload),
    );
  }

  @MessagePattern('find-all-certifications')
  async findAll() {
    return await this.certificationsService.findAll();
  }

  @MessagePattern('find-certification')
  async findOne(@Payload() payload: any) {
    return await this.certificationsService.findOne(payload.id);
  }

  @MessagePattern('update-certification')
  async update(@Payload() payload: any) {
    return await this.certificationsService.update(payload.id, payload.data);
  }

  @MessagePattern('delete-certification')
  remove(@Payload() payload: any) {
    return this.certificationsService.remove(+payload.id);
  }
}
