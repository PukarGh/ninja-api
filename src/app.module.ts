import { Module } from '@nestjs/common';
import { NinjasModule } from './ninjas/ninjas.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    NinjasModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
