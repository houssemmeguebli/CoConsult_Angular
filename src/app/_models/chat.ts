import { Message } from "./message";

export class Chat {
    chatId: Number = 0; // Ou une autre valeur par défaut
    firstUserName: string = '';
    secondUserName: string = '';
    messageList: Message[] = [];

    constructor() {}
}
