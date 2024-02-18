import { Injectable } from '@nestjs/common';
import { PrismaClient, Prisma } from '@prisma/client';

@Injectable()
export class NinjaRepository {
  relations: { [name: string]: boolean } = { belts: true };

  constructor(private readonly prismaClient: PrismaClient) {}

  /**
   * Get all ninjas
   */
  getAll() {
    return this.prismaClient.ninja.findMany({ include: this.relations });
  }

  /**
   * Get a ninja by id
   * @param id
   */
  get(id: string) {
    return this.prismaClient.ninja.findFirst({
      where: { id: +id },
      include: this.relations,
    });
  }

  /**
   * Create a new ninja
   * @param data
   */
  create(data: Prisma.NinjaCreateArgs['data']) {
    return this.prismaClient.ninja.create({ data, include: this.relations });
  }

  /**
   * Update a ninja
   * @param id
   * @param data
   */
  update(id: string, data: Prisma.NinjaUpdateArgs['data']) {
    return this.prismaClient.ninja.update({
      where: { id: +id },
      data,
      include: this.relations,
    });
  }

  /**
   * Delete a ninja
   * @param id
   */
  async delete(id: string) {
    return this.prismaClient.ninja.delete({
      where: { id: +id },
      include: this.relations,
    });
  }
}
