// src/common/logger/clickhouse.transport.ts

import Transport from 'winston-transport';
import { ConfigService } from '@nestjs/config';
import { createClickHouseClient } from './clickhouse.config';

export class ClickHouseTransport extends Transport {
  private client;

  constructor(configService: ConfigService) {
    super();
    this.client = createClickHouseClient(configService);
  }

  async log(info: any, callback: () => void) {
    try {
      const { level, message, context = 'Application' } = info;

      await this.client.insert({
        table: 'logs',
        values: [
          {
            timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
            level,
            message,
            context,
          },
        ],
        format: 'JSONEachRow',
      });

      callback();
    } catch (err) {
      console.error('ClickHouse log insert error:', err);
      callback();
    }
  }
}
