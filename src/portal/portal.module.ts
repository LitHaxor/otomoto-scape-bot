import { Module } from '@nestjs/common';
import { PortalService } from './portal.service';
import { PortalController } from './portal.controller';
import { ScapperService } from 'src/scaper/scaper-service';
import { ScaperModule } from 'src/scaper/scaper.module';
import { PortalScaper } from './portal-scaper.service';

@Module({
  imports: [ScaperModule],
  controllers: [PortalController],
  providers: [PortalService, ScapperService, PortalScaper],
})
export class PortalModule {}
