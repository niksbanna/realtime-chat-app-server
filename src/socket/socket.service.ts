import { WebSocketGateway, WebSocketServer, SubscribeMessage } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: { origin: 'http://localhost:3000', credentials: true } })
export class SocketService {
    @WebSocketServer() server: Server;

    onlineUsers = new Map<string, string>();

    @SubscribeMessage('add-user')
    handleAddUser(client: Socket, userId: string): void {
        this.onlineUsers.set(userId, client.id);
    }

    @SubscribeMessage('send-msg')
    handleSendMsg(client: Socket, data: { to: string, message: string }): void {
        const sendUserSocket = this.onlineUsers.get(data.to);
        if (sendUserSocket) {
            this.server.to(sendUserSocket).emit('msg-receive', data.message);
        }
    }
}
