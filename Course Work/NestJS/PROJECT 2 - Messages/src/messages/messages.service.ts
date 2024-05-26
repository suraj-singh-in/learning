import { MessagesRepository } from './messages.repository';

export class MessagesService {
  private messagesRepo: MessagesRepository;

  constructor() {
    // Services is creating its own dependencies
    // DONT DO THIS ON REAL APPLICATIONS
    this.messagesRepo = new MessagesRepository();
  }

  findOne(id: string) {
    return this.messagesRepo.findOne(id);
  }

  findAll() {
    return this.messagesRepo.findAll();
  }

  create(content: string) {
    return this.messagesRepo.create(content);
  }
}
