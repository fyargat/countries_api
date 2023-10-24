import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';

export class GetListRequest {
  @ApiPropertyOptional({ example: 0 })
  @IsNumber()
  @IsOptional()
  page?: number;

  @ApiPropertyOptional({ example: 'ar' })
  @IsString()
  @IsOptional()
  q?: string;

  @ApiPropertyOptional({ example: 'americas' })
  @IsString()
  @IsOptional()
  region?: string;
}

export class ResponseData {
  @ApiProperty({ example: 7328 })
  @IsNumber()
  id: number;

  @ApiProperty({ example: 'https://flagcdn.com/am.svg' })
  @IsString()
  flag: string;

  @ApiProperty({ example: 'Armenia' })
  @IsString()
  name: string;

  @ApiProperty({ example: 2963234 })
  @IsNumber()
  population: number;

  @ApiProperty({ example: 'Yerevan' })
  @IsString()
  capital: string;

  @ApiProperty({ example: 'Asia' })
  @IsString()
  region: string;
}

export class ResponseMeta {
  @ApiProperty({ example: 100 })
  @IsNumber()
  total: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  lastPage: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  currentPage: number;

  @ApiProperty({ example: 10 })
  @IsNumber()
  perPage: number;

  @ApiProperty({ example: null })
  @IsNumber()
  prev: number | null;

  @ApiProperty({ example: 2 })
  @IsNumber()
  next: number | null;
}

export class GetListResponse {
  @ApiProperty({
    type: ResponseData,
    isArray: true,
    example: [
      {
        flag: 'https://upload.wikimedia.org/wikipedia/commons/5/5c/Flag_of_the_Taliban.svg',
        name: 'Afghanistan',
        population: 40218234,
        capital: 'Kabul',
        region: 'Asia',
        id: 7204,
      },
    ],
  })
  @IsArray()
  data: ResponseData[];

  @ApiProperty({
    type: ResponseMeta,
    example: {
      total: 250,
      lastPage: 25,
      currentPage: 1,
      perPage: 10,
      prev: null,
      next: 2,
    },
  })
  @IsObject()
  meta: ResponseMeta;
}

export class Language {
  @ApiProperty({ example: 1 })
  @IsNumber()
  id: number;

  @ApiProperty({ example: 'es' })
  @IsString()
  iso639_1: string;

  @ApiProperty({ example: 'spa' })
  @IsString()
  iso639_2: string;

  @ApiProperty({ example: 'Spanish' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'Español' })
  @IsString()
  nativeName: string;
}

export class Border {
  @ApiProperty({ example: 1 })
  @IsString()
  id: number;

  @ApiProperty({ example: 'Bolivia' })
  @IsString()
  name: string;
}

export class Currency {
  @ApiProperty({ example: 1 })
  @IsNumber()
  id: number;

  @ApiProperty({ example: 'ARS' })
  @IsString()
  code: string;

  @ApiProperty({ example: 'Argentine peso' })
  @IsString()
  name: string;

  @ApiProperty({ example: '$' })
  @IsString()
  symbol: string;
}

export class GetCountryResponse {
  @ApiProperty({ example: 7328 })
  @IsNumber()
  id: number;

  @ApiProperty({ example: 'https://flagcdn.com/am.svg' })
  @IsString()
  flag: string;

  @ApiProperty({ example: 'Armenia' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'Argentina' })
  @IsString()
  nativeName: string;

  @ApiProperty({ example: 2963234 })
  @IsNumber()
  population: number;

  @ApiProperty({ example: 2780400 })
  @IsNumber()
  area: number;

  @ApiProperty({ example: 'Yerevan' })
  @IsString()
  capital: string;

  @ApiProperty({ example: 'Asia' })
  @IsString()
  region: string;

  @ApiProperty({ example: 'South America' })
  @IsString()
  subregion: string;

  @ApiProperty({ example: ['.ar'] })
  @IsArray()
  topLevelDomain: string[];

  @ApiProperty({ example: 'AR' })
  @IsString()
  alpha2Code: string;

  @ApiProperty({ example: 'ARG' })
  @IsString()
  alpha3Code: string;

  @ApiProperty({
    type: Language,
    isArray: true,
    example: [
      {
        id: 2276,
        iso639_1: 'es',
        iso639_2: 'spa',
        name: 'Spanish',
        nativeName: 'Español',
      },
    ],
  })
  @IsArray()
  languages: Language[];

  @ApiProperty({
    type: Currency,
    isArray: true,
    example: [
      {
        id: 5077,
        code: 'ARS',
        name: 'Argentine peso',
        symbol: '$',
      },
    ],
  })
  @IsArray()
  currencies: Currency[];

  @ApiProperty({
    type: Border,
    isArray: true,
    example: [
      {
        id: 1,
        name: 'Bolivia',
      },
    ],
  })
  @IsArray()
  borders: Border[];
}
