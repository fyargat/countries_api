import { Module } from '@nestjs/common';

import { CountryModule } from './country/country.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [DatabaseModule, CountryModule],
})
export class AppModule {}
