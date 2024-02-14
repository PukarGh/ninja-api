import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ninja } from './entities/ninja.entity';
import { Repository } from 'typeorm';
import { CreateNinjaDto } from './dto/create-ninja.dto';

@Injectable()
export class NinjasService {
  constructor(
    @InjectRepository(Ninja)
    private readonly ninjaRepository: Repository<Ninja>,
  ) {}

  create(createNinjaDto: CreateNinjaDto) {
    const ninja = this.ninjaRepository.create(createNinjaDto);
    return this.ninjaRepository.save(ninja);
  }

  get(id: string) {
    return this.ninjaRepository.findOneBy({ id });
  }

  getAll() {
    return this.ninjaRepository.find();
  }

  async update(id: string, updateNinjaDto: CreateNinjaDto) {
    const ninja = await this.get(id);
    return this.ninjaRepository.save({ ...ninja, ...updateNinjaDto });
  }

  async delete(id: string) {
    const ninja = await this.get(id);
    return this.ninjaRepository.remove(ninja);
  }
}
