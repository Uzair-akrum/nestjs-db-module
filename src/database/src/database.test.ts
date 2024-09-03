import { describe, it, expect, beforeEach, vi } from 'vitest';
import { DatabaseModule } from './database.js';
import { TypeOrmModule } from '@nestjs/typeorm';

vi.mock('@nestjs/typeorm', () => ({
  TypeOrmModule: {
    forRootAsync: vi.fn(),
    forFeature: vi.fn(),
  },
}));

describe('DatabaseModule', () => {
  const mockConfig = {
    database: 'test_db',
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'test',
    password: 'test',
    entities: [],
    synchronize: true,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('register', () => {
    it('should return a dynamic module with correct configuration', () => {
      const result = DatabaseModule.register(mockConfig);

      expect(result).toHaveProperty('module', DatabaseModule);
      expect(result.imports).toHaveLength(1);
      expect(TypeOrmModule.forRootAsync).toHaveBeenCalledWith(
        expect.objectContaining({
          name: mockConfig.database,
          useFactory: expect.any(Function),
        })
      );
      expect(result.exports).toEqual([TypeOrmModule]);
    });

    it('should configure TypeOrmModule with the provided config', () => {
      DatabaseModule.register(mockConfig);

      const forRootAsyncCall = (TypeOrmModule.forRootAsync as any).mock.calls[0][0];
      const factoryResult = forRootAsyncCall.useFactory();

      expect(factoryResult).toEqual(mockConfig);
    });
  });

  describe('forEntity', () => {
    it('should return a dynamic module with correct configuration', () => {
      const mockEntities = [class TestEntity { }];
      const result = DatabaseModule.forEntity(mockConfig, mockEntities);

      expect(result).toHaveProperty('module', DatabaseModule);
      expect(result.imports).toHaveLength(1);
      expect(TypeOrmModule.forFeature).toHaveBeenCalledWith(mockEntities, mockConfig.database);
      expect(result.exports).toEqual([TypeOrmModule]);
    });
  });
});