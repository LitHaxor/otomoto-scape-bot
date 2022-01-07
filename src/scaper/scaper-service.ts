import { Injectable } from '@nestjs/common';
import { baseAPI } from './CONSTANTS';
import { AxiosError } from 'axios';
import cheerio from 'cheerio';
@Injectable()
export class ScapperService {
  async loadHTML(url: string) {
    const markup = await this.fetchHTML(url);
    return cheerio.load(markup);
  }

  private async fetchHTML(url: string) {
    try {
      const { data } = await baseAPI.get(url);
      //   console.log(data);

      return data;
    } catch (error: any) {
      if (error as AxiosError) console.log(error.message);
    }
  }
}
