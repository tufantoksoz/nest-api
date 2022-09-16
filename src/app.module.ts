import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScrapperService } from './scrapper.service';

@Module({
  imports: [HttpModule],
  controllers: [AppController],
  providers: [AppService, ScrapperService],
})
export class AppModule {}
