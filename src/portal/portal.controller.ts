import { Controller, Get, Query } from '@nestjs/common';
import { PortalService } from './portal.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('portal')
@ApiTags('OTO MOTO PORTAL')
export class PortalController {
  constructor(private readonly portalService: PortalService) {}

  @Get()
  async findAll() {
    return await this.portalService.findAll();
  }

  @Get('/bonus')
  async getBonus(@Query('page') page: number) {
    page = page === undefined ? 1 : Number(page);
    return await this.portalService.mobileBot(page);
  }
}
