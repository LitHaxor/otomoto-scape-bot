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
      const { data } = await baseAPI.get(url);
      // console.log(data);

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
