# NestJS Database Module

A database module for NestJS applications, built on top of TypeORM.

## Installation

```bash
npm install @nestjs-db-module/core


## Configuration

The `register` method accepts a `DatabaseConfig` object with the following properties:

- `type`: Database type (e.g., 'postgres', 'mysql', 'sqlite')
- `host`: Database host
- `port`: Database port
- `username`: Database username
- `password`: Database password
- `database`: Database name
- `entities`: Array of entity classes
- `synchronize`: Boolean to enable/disable schema synchronization (use with caution in production)

### Entity Registration

Use the `forEntity` method to register entities for a specific database:

```typescript
const entities = [User, Product];
const module = DatabaseModule.forEntity(config, entities);
```


## API Reference

### `DatabaseModule.register(config: DatabaseConfig): DynamicModule`

Registers the database connection with the given configuration.

### `DatabaseModule.forEntity(config: DatabaseConfig, entities: EntityClassOrSchema[]): DynamicModule`

Registers the specified entities for the given database configuration.
 

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
