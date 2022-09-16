import { Injectable } from '@nestjs/common';
import { ScrapperService } from './scrapper.service';
import * as HttpProxyAgent from 'https-proxy-agent';

@Injectable()
export class AppService {
  constructor(private scrapperService: ScrapperService) {}
  async getPrice() {
    // const httpAgent = HttpProxyAgent({
    //   host: 'p.webshare.io',
    //   port: 80,
    //   auth: 'osgkkrzc-rotate:kap3r2z2j0if',
    //   rejectUnauthorized: false,
    // });

    try {
      const html = await this.scrapperService.getHTML({
        method: 'get',
        url: 'https://www.etstur.com/Adora-Calma-Beach-Hotel-16-',
        params: {
          check_in: '23.10.2022',
          check_out: '29.10.2022',
          adult_1: 2,
        },
      });

      const result =
        html('.currencyChangeArea.priceText')?.[0]?.attribs?.[
          'data-price'
        ].replace('.', '') || '0';

      console.log(result);
      return result;
    } catch (error) {
      console.log(error);
    }
  }
}
