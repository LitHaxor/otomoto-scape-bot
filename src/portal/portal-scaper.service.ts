import { Injectable } from '@nestjs/common';
import { CheerioAPI } from 'cheerio';
import { AdsDto } from './dto/portal-dto';

@Injectable()
export class PortalScaper {
  scapeOferOftheday($: CheerioAPI, selector: string): AdsDto {
    const link = $(selector).children().first().attr('href');
    const name = $(selector).find('h3').text();
    const image = $(selector).find('a > article > img').attr('src');
    const price = $(selector)
      .find('div[data-testid="ad-price-value"]')
      .children()
      .text();
    const descriptions: Array<string> = [];
    $(selector)
      .find('section > ul > li > span')
      .each((i, el) => {
        descriptions.push($(el).text());
      });

    return {
      id: 'N/a',
      link,
      title: name ?? 'N/A',
      image: image ?? 'N/A',
      price: price ?? 'N/A',
      registrationDate: descriptions[0] ?? 'N/A',
      milage: descriptions[1] ?? 'N/A',
      power: descriptions[3] ?? 'N/A',
    };
  }

  scrapeTruckItem($: CheerioAPI, selector: string): AdsDto[] {
    const data: Array<AdsDto> = [];
    $(selector).each((i, article) => {
      if (i === 0) return;
      const header = $(article).find('div:nth-child(1)');

      const link = header.find('a').attr('href');
      const title = header.find('a').text();
      const id = $(article).attr('id');
      const specList = header.find('div > ul');

      const registationYear = specList
        .find('li:nth-child(1)')
        .first()
        .text()
        .trim();
      const milage = specList.find('li:nth-child(2)').first().text();
      let power = specList.find('li:nth-child(3)').first().text();
      let engine = specList.find('li:nth-child(4)').first().text();
      if (!engine) {
        engine = power;
        power = undefined;
      }

      const imagediv = $(article).find('div:nth-child(2)');
      const image = imagediv.find('img').attr('src');

      const pricingDiv = $(article).find('div:nth-child(3)');
      const price = pricingDiv.find('span').text();
      data.push({
        id: id ?? 'N/A',
        title: title ?? 'N/A',
        link: link ?? 'N/A',
        registrationDate: registationYear ?? 'N/A',
        milage: milage ?? 'N/A',
        power: power ?? 'N/A',
        price: price ?? 'N/A',
        engine: engine ?? 'N/A',
        productionDate: '2014',
        image: image ?? 'N/A',
      });
    });
    return data;
  }
  getTotalAdsCount($: CheerioAPI) {
    const r = /\d+/g;
    const total = $('h1[data-testid="results-heading"]').text()?.match(r);
    if (total && total[0]) return Number(total[0]);
    return Number(0);
  }

  getNextPageUrl(page: number) {
    if (page && page >= 2)
      return `/ciezarowe/uzytkowe/mercedes-benz/od-+2014/q-actros?search%5Bfilter_enum_damaged%5D=0&search%5Border%5D=created_at+%3Adesc&page=${page}`;
    return '/ciezarowe/uzytkowe/mercedes-benz/od-+2014/q-actros?search%5Bfilter_enum_damaged%5D=0&search%5Border%5D=created_at+%3Adesc';
  }

  scapeHighligtedOrFeatured($: CheerioAPI, selector: string): AdsDto[] {
    const data: Array<AdsDto> = [];
    $(selector)
      .find('a')
      .each((i, el) => {
        const link = $(el).attr('href');
        const name = $(el).find('h3').text();
        const image = $(el).find('a > article > img').attr('src');
        const price = $(el)
          .find(`div[data-testid="ad-card-price"]`)
          .children()
          .text();
        const descriptions: Array<string> = [];
        $(el)
          .find('section > ul > li > span')
          .each((j, elem) => {
            descriptions.push($(elem).text());
          });

        data.push({
          id: 'N/a',
          link,
          title: name ?? 'N/A',
          image: image ?? 'N/A',
          price: price ?? 'N/A',
          registrationDate: descriptions[0] ?? 'N/A',
          milage: descriptions[1] ?? 'N/A',
          power: descriptions[3] ?? 'N/A',
        });
      });
    return data;
  }
}
