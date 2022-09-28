import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CertificationsService } from './certifications.service';

@Controller()
export class CertificationsController {
  constructor(private readonly certificationsService: CertificationsService) {}

  @MessagePattern('create-certification')
  async createOrUpdate(@Payload() payload: any) {
    return await this.certificationsService.massCreate(
      this.certificationsService._prepareMassData(
        payload.data.certificationsList,
      ),
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

  @MessagePattern('remove-certifications')
  remove(@Payload() payload: any) {
    return this.certificationsService.remove(+payload.id);
  }
}
