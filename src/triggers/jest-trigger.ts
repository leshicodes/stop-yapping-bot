import { Message } from 'discord.js';
import { RateLimiter } from 'discord.js-rate-limiter';
import { createRequire } from 'node:module';
import { EventData } from '../models/internal-models.js';
import { Trigger } from './trigger.js';
import { JestService } from '../services/jest-service.js';
import { Logger } from '../services/logger.js';
import { log } from 'node:console';

const require = createRequire(import.meta.url);
let Config = require('../../config/config.json');

export class JestTrigger implements Trigger {
    public requireGuild: boolean = true;
    private jestService: JestService;
    private rateLimiter: RateLimiter;

    constructor() {
        this.jestService = new JestService();

        // Create rate limiter with configuration
        // First parameter is how many responses allowed in the time period
        // Second parameter is the cooldown period in milliseconds
        this.rateLimiter = new RateLimiter(
            Config.rateLimiting.jestResponses?.amount || 1,
            (Config.rateLimiting.jestResponses?.interval || 300) * 1000
        );
        Logger.info(`JestTrigger initialized with rate limit: ${Config.rateLimiting.jestResponses?.amount} responses every ${Config.rateLimiting.jestResponses?.interval} seconds`);
    }

    public triggered(msg: Message): boolean {
        // Ignore bot messages (including our own)
        if (msg.author.bot) {
            return false;
        }

        // Check if user is on cooldown
        const limited = this.rateLimiter.take(msg.author.id);
        if (limited) {
            Logger.info(`User ${msg.author.tag} is on cooldown for jest responses.`);
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