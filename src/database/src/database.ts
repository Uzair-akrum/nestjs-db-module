import type { DynamicModule } from '@nestjs/common';
import { type DatabaseConfig } from './interface/database.interface.js';
import { TypeOrmModule, type TypeOrmModuleOptions } from '@nestjs/typeorm';
import type { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type.js';

export class DatabaseModule {
  static register(config: DatabaseConfig): DynamicModule {
    return {
      module: DatabaseModule,
      imports: [
        TypeOrmModule.forRootAsync({

          name: config.database,
          useFactory: (): TypeOrmModuleOptions => {


            // @ts-ignore
            return {
              ...config
            };
          },
        }),
      ],
      exports: [TypeOrmModule]
    }
  }

  static forEntity(config: DatabaseConfig, entities: EntityClassOrSchema[]): DynamicModule {
    return {
      module: DatabaseModule,
      imports: [
        TypeOrmModule.forFeature(entities, config.database)
      ],
      exports: [TypeOrmModule]
    };
  }
}