import { Module } from '@nestjs/common';
import { NinjaController } from './ninja.controller';
import { NinjaService } from './ninja.service';
import { NinjaRepository } from './ninja.repository';
import { CommonModule } from '../common.module';

@Module({
  imports: [CommonModule],
  controllers: [NinjaController],
  providers: [NinjaService, NinjaRepository],
})
export class NinjaModule {}
