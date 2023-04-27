import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './users/user.module';
import { MessagesModule } from './messages/messages.module';
import { SocketService } from './socket/socket.service';

@Module({
  imports: [UserModule, MessagesModule, MongooseModule.forRoot('mongodb+srv://dbUser:1ZdBAqgb3fTSElNo@cluster0.lsqkhwx.mongodb.net/chatapp?retryWrites=true&w=majority')],
  controllers: [AppController],
  providers: [AppService, SocketService],
})
export class AppModule { }
