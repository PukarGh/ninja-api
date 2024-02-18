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
import { NinjaService } from './ninja.service';
import {
  NinjaCollectionInterceptor,
  NinjaResourceInterceptor,
} from './transformers/response.interceptor';
import { NinjaRequestPipe } from './transformers/request.pipe';
import { CreateNinjaDto } from './dto/create-ninja.dto';
import { UpdateNinjaDto } from './dto/update-ninja.dto';

@Controller('ninjas')
export class NinjaController {
  constructor(private readonly ninjasService: NinjaService) {}

  @Get()
  @UseInterceptors(NinjaCollectionInterceptor)
  index() {
    return this.ninjasService.getAll();
  }

  @Get(':id')
  @UseInterceptors(NinjaResourceInterceptor)
  show(@Param('id') id: string) {
    return this.ninjasService.get(id);
  }

  @Post()
  @UseInterceptors(NinjaResourceInterceptor)
  create(@Body(NinjaRequestPipe) createNinjaDto: CreateNinjaDto) {
    return this.ninjasService.create(createNinjaDto);
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
