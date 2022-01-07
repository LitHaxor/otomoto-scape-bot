import { Injectable } from '@nestjs/common';
import { CreatePortalDto } from './dto/portal-dto';
import Cheerio from 'cheerio';
import axios from 'axios';
import { ScapperService } from 'src/scaper/scaper-service';
import { PortalScaper } from './portal-scaper.service';
import { MobileURI } from 'src/scaper/CONSTANTS';
@Injectable()
export class PortalService {
  constructor(
    private readonly scaperService: ScapperService,
    private readonly portalScapper: PortalScaper,
  ) {}

  async findAll() {
    const $ = await this.scaperService.loadHTML('/');

    return {
      ['OferOfTheDay']: this.portalScapper.scapeOferOftheday(
        $,
        '#__next > div > div > div > main > div.optimus-app-17jz538.eo51ucb1 > section.e78glkq0.optimus-app-bi7iba.e1a4cfxe1',
      ),
      ['highlighedAds']: this.portalScapper.scapeHighligtedOrFeatured(
        $,
        '#highlighted-ads > section',
      ),
      ['featuredAds']: this.portalScapper.scapeHighligtedOrFeatured(
        $,
        '#featured-ads-carousel > section',
      ),
    };
  }

  async mobileBot(page: number) {
    const nextPage = page + 1 ?? 2;
    const prevPage = nextPage > 2 ? nextPage - 2 : 0;
    const $ = await this.scaperService.loadHTML(
      this.portalScapper.getNextPageUrl(page),
    );
    const selector =
      '#__next > div > div > div > div.optimus-app-1ualm84.e19uumca1 > div.optimus-app-yqd9tx > div.optimus-app-grfr5v > div.optimus-app-ys55sm.e19uumca13 > div.optimus-app-njzfp.e19uumca12 > main > article';

    return {
      totalAds: this.portalScapper.getTotalAdsCount($),
      showingAds: this.portalScapper.scrapeTruckItem($, selector).length,
      data: this.portalScapper.scrapeTruckItem($, selector),
      nextPage: `http://localhost:5000/portal/bonus?page=${nextPage}`,
      prevPage:
        prevPage > 0
          ? `http://localhost:5000/portal/bonus?page=${prevPage}`
          : undefined,
    };
  }
}
