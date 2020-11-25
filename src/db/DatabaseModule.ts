import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      // 외부 설정을 주입 받는다
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('db.host', 'localhost'),
        port: configService.get('db.port', 3306),
        username: configService.get('db.username', 'foo'),
        password: configService.get('db.password', 'bar'),
        database: configService.get('db.database', 'database_development'),
        synchronize: configService.get('db.synchronize', false),
        timezone: configService.get('db.timezone', 'Z'),
        dropSchema: configService.get('db.dropSchema', false),
        autoLoadEntities: true,
        keepConnectionAlive: true,
      })
    })
  ]
})
export class DatabaseModule {}