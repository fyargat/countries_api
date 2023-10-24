import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';
import { CountryController } from './country.controller';
import { CountryService } from './country.service';

@Module({
  imports: [DatabaseModule],
  controllers: [CountryController],
  providers: [CountryService],
})
export class CountryModule {}
