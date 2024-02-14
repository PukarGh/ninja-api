import { PipeTransform, Injectable } from '@nestjs/common';

@Injectable()
export class NinjaRequestPipe implements PipeTransform {
  transform(data: any) {
    return {
      name: data.name,
      skills_1: data.skills[0].name,
    };
  }
}
