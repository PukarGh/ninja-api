import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { NinjasService } from './ninjas.service';
import { CreateNinjaDto } from './dto/create-ninja.dto';
import { UpdateNinjaDto } from './dto/update-ninja.dto';
import { NinjaRequestPipe } from './transformers/request.pipe';
import {
  NinjaCollectionInterceptor,
  NinjaResourceInterceptor,
} from './transformers/response.interceptor';

@Controller('ninjas')
export class NinjasController {
  constructor(private readonly ninjasService: NinjasService) {}

  @Get()
  @UseInterceptors(NinjaCollectionInterceptor)
  index() {
    return this.ninjasService.getAll();
  }

  @Post()
  @UseInterceptors(NinjaResourceInterceptor)
  create(@Body(NinjaRequestPipe) createNinjaDto: CreateNinjaDto) {
    return this.ninjasService.create(createNinjaDto);
  }

  @Get(':id')
  @UseInterceptors(NinjaResourceInterceptor)
  show(@Param('id') id: string) {
    return this.ninjasService.get(id);
  }

  @Patch(':id')
  @UseInterceptors(NinjaResourceInterceptor)
  update(
    @Param('id') id: string,
    @Body(NinjaRequestPipe) updateNinjaDto: UpdateNinjaDto,
  ) {
    return this.ninjasService.update(id, updateNinjaDto);
  }

  @Delete(':id')
  @UseInterceptors(NinjaResourceInterceptor)
  delete(@Param('id') id: string) {
    return this.ninjasService.delete(id);
  }
}
