import { Injectable } from '@nestjs/common';
import { CreateNinjaDto } from './dto/create-ninja.dto';
import { NinjaRepository } from './ninja.repository';

@Injectable()
export class NinjaService {
  constructor(private readonly ninjaRepository: NinjaRepository) {}

  getAll() {
    return this.ninjaRepository.getAll();
  }

  get(id: string) {
    return this.ninjaRepository.get(id);
  }

  create(createNinjaDto: CreateNinjaDto) {
    return this.ninjaRepository.create(createNinjaDto);
  }

  update(id: string, updateNinjaDto: CreateNinjaDto) {
    return this.ninjaRepository.update(id, updateNinjaDto);
  }

  async delete(id: string) {
    return this.ninjaRepository.delete(id);
  }
}
