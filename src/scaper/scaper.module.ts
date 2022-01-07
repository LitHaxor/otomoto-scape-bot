import { Module } from '@nestjs/common';
import { ScapperService } from './scaper-service';

@Module({
  imports: [],
  providers: [ScapperService],
})
export class ScaperModule {}
