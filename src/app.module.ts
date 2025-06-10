import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from "./user/user.module";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'p',
      database: 'whisper_world',
      synchronize: true, // TODO: use only in dev not prod
      autoLoadEntities: true,
    }),
    UserModule,
  ],
})
export class AppModule {}
