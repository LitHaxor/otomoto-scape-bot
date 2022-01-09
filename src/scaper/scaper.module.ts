import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScapperService } from './scaper-service';

@Module({
  imports: [],
  providers: [ScapperService],
})
export class ScaperModule {}
