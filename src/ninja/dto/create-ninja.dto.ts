import {
  MinLength,
  IsEnum,
  IsArray,
  ValidateNested,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';

class SkillsDto {
  @MinLength(3)
  name: string;

  @IsEnum(['skilled', 'proficient', 'expert', 'master', 'legendary'])
  level: 'skilled' | 'proficient' | 'expert' | 'master' | 'legendary';
}

export class CreateNinjaDto {
  @MinLength(3)
  name: string;

  @IsOptional()
  @IsArray()
  @ValidateNested()
  @Type(() => SkillsDto)
  skills: SkillsDto[];
}
