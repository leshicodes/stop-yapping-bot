import { Message } from 'discord.js';
import { EventData } from '../models/internal-models.js';
import { Trigger } from './trigger.js';
import { JestService } from '../services/jest-service.js';
import { Logger } from '../services/logger.js';

export class JestTrigger implements Trigger {
    public requireGuild: boolean = true;
    private jestService: JestService;

    constructor() {
        this.jestService = new JestService();
    }

    public triggered(msg: Message): boolean {
        // Ignore bot messages (including our own)
        if (msg.author.bot) {
            return false;
        }

        // Check if this user is a target and if we should respond based on chance
        return this.jestService.isTargetUser(msg.author.id) && this.jestService.shouldRespond();
    }
    public async execute(msg: Message, data: EventData): Promise<void> {
        try {
            const response = this.jestService.getRandomResponse();
            await msg.reply(response);
            Logger.info(`Sent jest response to ${msg.author.tag}: "${response}"`);
        } catch (error) {
            Logger.error('Error executing jest trigger:', error);
        }
    }
}