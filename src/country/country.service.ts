import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { DatabaseService } from '../database/database.service';
import { INITIAL_PAGE, ITEMS_PER_PAGE } from './country.constants';
import {
  Border,
  GetCountryResponse,
  GetListRequest,
  GetListResponse,
} from './dto/country.dto';

@Injectable()
export class CountryService {
  constructor(private readonly databaseService: DatabaseService) {}

  async getList(query: GetListRequest): Promise<GetListResponse> {
    const page = query.page ?? INITIAL_PAGE;
    const perPage = ITEMS_PER_PAGE;
    const q = query.q;
    const region = query.region;

    const skip = page > 0 ? perPage * (page - 1) : 0;

    let where: Prisma.CountryWhereInput = {};

    if (q) {
      where = {
        ...where,
        name: {
          contains: q,
          mode: 'insensitive',
        },
      };
    }

    if (region) {
      where = {
        ...where,
        region: {
          contains: region,
          mode: 'insensitive',
        },
      };
    }

    const [total, data] = await Promise.all([
      this.databaseService.country.count({ where }),
      this.databaseService.country.findMany({
        where,
        select: {
          flag: true,
          name: true,
          population: true,
          capital: true,
          region: true,
          id: true,
        },
        orderBy: [
          {
            name: 'asc',
          },
        ],
        take: perPage,
        skip,
      }),
    ]);
    const lastPage = Math.ceil(total / perPage);

    return {
      data,
      meta: {
        total,
        lastPage,
        currentPage: page,
        perPage,
        prev: page > 1 ? page - 1 : null,
        next: page < lastPage ? page + 1 : null,
      },
    };
  }

  private async getCountryBorders(borders: string[]): Promise<Border[]> {
    const countries = await this.databaseService.country.findMany({
      where: {
        alpha3Code: { in: borders },
      },
      select: { name: true, id: true },
    });

    return countries.map((v) => ({ name: v.name, id: v.id }));
  }

  async getCountry(id: number): Promise<GetCountryResponse> {
    const country = await this.databaseService.country.findUnique({
      where: { id },
      include: {
        currencies: true,
        languages: true,
      },
    });

    if (!country) {
      throw new NotFoundException();
    }

    const borders = await this.getCountryBorders(country.borders);

    const result = {
      ...country,
      borders,
    };

    return result;
  }
}
