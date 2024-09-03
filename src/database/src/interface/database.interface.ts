import type { EntityClassOrSchema } from "@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type.js";

export interface DatabaseConfig {

  type: string;
  host: string;
  port: number;
  database: string;
  username: string;
  password: string;
  entities: EntityClassOrSchema[];
  synchronize?: boolean;
}