import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';

import { CountryService } from './country.service';
import {
  GetCountryResponse,
  GetListRequest,
  GetListResponse,
} from './dto/country.dto';

@Controller('country')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Get()
  @ApiOkResponse({ type: GetListResponse })
  async getList(
    @Query(
      new ValidationPipe({
        transform: true,
        transformOptions: { enableImplicitConversion: true },
        forbidNonWhitelisted: true,
      }),
    )
    query: GetListRequest,
  ): Promise<GetListResponse> {
    const result = await this.countryService.getList(query);
    return result;
  }

  @Get(':id')
  @ApiOkResponse({ type: GetCountryResponse })
  async getCountry(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<GetCountryResponse> {
    const result = await this.countryService.getCountry(id);
    return result;
  }
}
