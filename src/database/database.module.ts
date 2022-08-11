import { Module, Global } from '@nestjs/common';
import { Client } from 'pg';
import config from '../config';
import { ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

const API_KEY = '123123';
const API_KEY_PROD = 'prodKey';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [config.KEY],
      useFactory: (configeService: ConfigType<typeof config>) => {
        const { user, host, dbName, password, port } = configeService.postgres;
        return {
          type: 'postgres',
          host,
          port,
          username: user,
          password,
          database: dbName,
          synchronize: true,
          autoLoadEntities: true,
        };
      },
    }),
  ],
  providers: [
    {
      provide: 'API_KEY',
      useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY,
    },
    {
      provide: 'PG',
      useFactory: (configeService: ConfigType<typeof config>) => {
        const { user, host, dbName, password, port } = configeService.postgres;
        const client = new Client({
          user,
          host,
          database: dbName,
          password,
          port,
        });

        client.connect();
      },
      inject: [config.KEY],
    },
  ],
  exports: ['API_KEY', 'PG', TypeOrmModule],
})
export class DatabaseModule {}
