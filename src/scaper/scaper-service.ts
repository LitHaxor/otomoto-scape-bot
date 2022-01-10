import { BadRequestException, Injectable } from '@nestjs/common';
import { baseAPI } from './CONSTANTS';
import { AxiosError } from 'axios';
import cheerio from 'cheerio';
@Injectable()
export class ScapperService {
  async loadHTML(url: string) {
    const markup = await this.fetchHTML(
      url,
      'Failed to load  resources from OTOMOTO ',
    );
    return cheerio.load(markup);
  }

  private async fetchHTML(url: string, errMessage?: string) {
    try {
      const { data } = await baseAPI.get(url, {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.2 Safari/605.1.15',
        },
      });
      //   console.log(data);

      return data;
    } catch (error: any) {
      if (error as AxiosError) {
        new BadRequestException(
          errMessage ?? 'Failed to get resources from website!',
        );
      }
    }
  }
}
