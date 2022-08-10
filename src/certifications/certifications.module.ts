import { Module } from '@nestjs/common';
import { CertificationsService } from './certifications.service';
import { CertificationsController } from './certifications.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [PrismaService],
  controllers: [CertificationsController],
  providers: [CertificationsService],
})
export class CertificationsModule {}
