import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './events/event.entity';
import { EventsModule } from './events/events.module';
import { AppJapanService } from './app.japan.service';
import { AppDummy } from './app.dummy';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: 'example',
      database: 'nest-events',
      entities: [Event],
      synchronize: true,
    }),
    EventsModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: AppService,
      useClass: AppJapanService,
    },
    {
      provide: 'APP_NAME',
      useValue: 'Nest events backend',
    },
    {
      provide: 'MESSAGE',
      inject: [AppDummy],
      useFactory: (app) => `${app.dummy()} !Factory`,
    },
    AppDummy,
  ],
})
export class AppModule {}
