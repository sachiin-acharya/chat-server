import { Server, Socket } from "socket.io";
import * as dotenv from "dotenv";
import { MessageService } from "../service/messageService";
import { UserRepository } from "../repositories";
import { InputMessageInterface, MessageWithSenderInterface } from "../interface";


dotenv.config();

export class ChatSocket {
  private io: Server;
  private messageService: MessageService;
  private userRepository: UserRepository;

  constructor(io: Server) {
    this.io = io;
    this.messageService = new MessageService();
    this.userRepository = new UserRepository();
    this.setupSocketHandlers();
  }

  private setupSocketHandlers() {
    this.io.on("connection", (socket: Socket) => {
      console.log('Client connected:', socket.id);
      
      // Get userId from handshake query
      const userId = socket.handshake.query.userId as string;
      socket.data.currentUserId = parseInt(userId, 10);
      
      console.log('User ID from socket:', socket.data.currentUserId);

      socket.on("sendMessage", async (data, callback) => {
        console.log('Received message data:', data);
        try {
          const currentUserId = socket.data.currentUserId;
          if (!currentUserId) {
            throw new Error('User ID not found in socket');
          }

          // Create message with sender information
          const messageData = {
            conversation_id: data.conversation_id,
            sender_id: currentUserId,
            content: data.content,
            type: data.type || 'text'
          };

          // Create and get complete message with sender info
          const completeMessage = await this.messageService.createMessageWithSender(messageData);
          console.log('Complete message:', completeMessage);

          // Format message to match Django's MessageSerializer output
          const formattedMessage = {
            id: completeMessage.dataValues.id,
            content: completeMessage.dataValues.content,
            type: completeMessage.dataValues.type,
            created_at: completeMessage.dataValues.created_at?.toISOString(),
            sender: completeMessage.sender
                ? { id: completeMessage.sender.id, username: completeMessage.sender.username }
                : { id: 'unknown', username: 'unknown' },
            conversation: completeMessage.dataValues.conversation_id,
        };
        

          console.log('Broadcasting message:', formattedMessage);
          
          // Broadcast to all clients
          this.io.emit("receiveMessage", formattedMessage);

          // Send acknowledgment back to sender
          if (callback) {
            callback({ success: true, message: formattedMessage });
          }
        } catch (error) {
          console.error('Error handling message:', error);
          if (callback) {
            callback({ error: 'Failed to process message' });
          }
        }
      });

      socket.on("disconnect", () => {
        console.log('Client disconnected:', socket.id);
      });
    });
  }
}