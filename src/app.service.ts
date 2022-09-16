import { Injectable } from '@nestjs/common';
import { ScrapperService } from './scrapper.service';
import * as HttpProxyAgent from 'https-proxy-agent';

@Injectable()
export class AppService {
  constructor(private scrapperService: ScrapperService) {}
  async getPrice() {
    const httpAgent = HttpProxyAgent({
      host: 'p.webshare.io',
      port: 80,
      auth: 'osgkkrzc-rotate:kap3r2z2j0if',
      rejectUnauthorized: false,
    });

    try {
      const html = await this.scrapperService.getHTML({
        method: 'get',
        url: 'https://www.etstur.com/Adora-Calma-Beach-Hotel-16-',
        params: {
          check_in: '23.10.2022',
          check_out: '29.10.2022',
          adult_1: 2,
        },
        timeout: 10000,
        httpAgent: httpAgent,
        headers: {
          accept:
            'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
          'accept-encoding': 'gzip, deflate, br',
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
