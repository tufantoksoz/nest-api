import { lastValueFrom } from 'rxjs';
import { load as initCheerio } from 'cheerio';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

export interface ScrappQuery {
  checkIn: string;
  checkOut: string;
  adult: string;
  agencyName: [];
  hotelList: [];
}

@Injectable()
export class ScrapperService {
  constructor(private httpService: HttpService) {}

  async request(config: {
    method: 'get' | 'post';
    url: string;
    params?: { [key: string]: any };
    data?: { [key: string]: any };
    headers?: {};
    timeout?: number;
    proxy?: false;
    httpAgent?: any;
    httpsAgent?: any;
  }) {
    try {
      const { data } = await lastValueFrom(
        this.httpService.request({
          method: config.method,
          url: config.url,
          params: config.params,
          data: config.data,
          headers: config.headers,
          timeout: config.timeout,
          proxy: config.proxy,
          httpAgent: config.httpAgent,
          httpsAgent: config.httpsAgent,
        }),
      );

      return data;
    } catch (error) {
      console.log('date time : ', new Date().toLocaleString());
      console.log('code : ', error.code);
      if (error.response) {
        console.log('url : ', error.response.config.url);
        console.log('path : ', error.response.request.path);
        console.log('status : ', error.response.status);
        console.log('status text : ', error.response.statusText);
      } else {
        console.log('url : ', error?.config?.url);
      }
      console.log('**********************************************************');
      return {};
    }
  }

  async getHTML(config: {
    method: 'get' | 'post';
    url: string;
    params?: { [key: string]: any };
    headers?: {};
    timeout?: number;
    proxy?: false;
    httpAgent?: any;
    httpsAgent?: any;
  }) {
    const data = await this.request(config);

    return initCheerio(data);
  }
}
