import { InputMessageInterface, MessageInterface, MessageWithSenderInterface } from "../interface";
import { MessageRepository } from "../repositories";
import { UserRepository } from "../repositories";
import Model from "../models";
import { Op } from 'sequelize';


export class MessageService {
  private messageRepository: MessageRepository;
  private userRepository: UserRepository;
  
  constructor() {
    this.messageRepository = new MessageRepository();
    this.userRepository = new UserRepository();
  }

  async createMessageWithSender(input: InputMessageInterface): Promise<MessageWithSenderInterface> {
    try {
      // Check if message already exists with this content and timestamp
      const existingMessage = await this.messageRepository.findOne({
        where: {
          conversation_id: input.conversation_id,
          sender_id: input.sender_id,
          content: input.content,
          created_at: {
            [Op.gte]: new Date(Date.now() - 5000)
          }
        }
      });
  
      if (existingMessage) {
        console.log('Duplicate message detected, returning existing message');
        const sender = await this.userRepository.findByPk(existingMessage.sender_id);
        return {
          ...existingMessage,
          sender: sender ? {
            id: sender.id,
            username: sender.username
          } : undefined
        };
      }
  
      // Create new message if no duplicate found
      const message = await this.messageRepository.create({
        ...input,
        created_at: new Date(),
        updated_at: new Date()
      });
  
      const sender = await this.userRepository.findByPk(input.sender_id);
      
      return {
        ...message,
        sender: sender ? {
          id: sender.id,
          username: sender.username
        } : undefined
      };
    } catch (error) {
      console.error('Error in createMessageWithSender:', error);
      throw error;
    }
  }

  async findMessageWithSender(messageId: number): Promise<MessageWithSenderInterface> {
    const message = await this.messageRepository.findOne({
      where: { id: messageId },
      include: [{
        model: Model.User,
        as: 'sender',
        attributes: ['id', 'username']
      }]
    });

    return message;
  }
}