import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TestService } from './test.service';
import { UserModule } from './modules/user/user.module';
import { RoleModule } from './modules/role/role.module';
import { AuthModule } from './modules/auth/auth.module';
import { BookModule } from './modules/book/book.module';
import { ContentsModule } from './modules/contents/contents.module';
import { MenuModule } from './modules/menu/menu.module';
import { getMysqlUsernameAndPassword } from './utils';

const { username, password } = getMysqlUsernameAndPassword();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '47.99.166.157',
      port: 3306,
      username,
      password,
      database: 'vben-book-dev',
      autoLoadEntities: true,
      // synchronize: true,
      logging: true,
    }),
    UserModule,
    RoleModule,
    AuthModule,
    BookModule,
    MenuModule,
    ContentsModule,
  ],
  controllers: [AppController],
  providers: [AppService, TestService],
})
export class AppModule {}
