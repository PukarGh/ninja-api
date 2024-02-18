import { Module } from '@nestjs/common';
import { NinjaModule } from './ninja/ninja.module';

@Module({
  imports: [NinjaModule],
  controllers: [],
})
export class AppModule {}
