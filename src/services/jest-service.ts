import fs from 'fs';
import path from 'path';
import { createRequire } from 'node:module';
import { Logger } from './logger.js';

export interface JestUsersData {
    userIds: string[];
}

export interface JestResponsesData {
    responses: string[];
}


export class JestService {
    private userIds: string[] = [];
    private responses: string[] = [];
    private responseChance: number;

    constructor() {

        // this.responseChance = parseFloat(process.env.RESPONSE_CHANCE || '0.1');
        this.responseChance = parseFloat(process.env.RESPONSE_CHANCE || '0.1'); // Default to 100% chance if not set
        Logger.info(`Response chance set to: ${this.responseChance * 100}%`);
        this.loadData();
    }

    private loadData(): void {
        try {
            // Load users.json
            const usersPath = path.resolve(process.cwd(), 'users.json');
            Logger.info(`Looking for users.json at: ${usersPath}`);

            if (!fs.existsSync(usersPath)) {
                Logger.warn('users.json not found in the root directory');
                return;
            }
            const usersData = JSON.parse(fs.readFileSync(usersPath, 'utf-8')) as JestUsersData;
            this.userIds = usersData.userIds;

            // Load responses.json
            const responsesPath = path.resolve(process.cwd(), 'responses.json');
            Logger.info(`Looking for responses.json at: ${responsesPath}`);

            if (!fs.existsSync(responsesPath)) {
                Logger.warn('responses.json not found in the root directory');
                return;
            }
            const responsesData = JSON.parse(fs.readFileSync(responsesPath, 'utf-8')) as JestResponsesData;
            this.responses = responsesData.responses;

            Logger.info(
                `JestService loaded ${this.userIds.length} users and ${this.responses.length} responses`
            );
        } catch (error) {
            Logger.error('Error loading jest data:', error);
        }
    }

    public isTargetUser(userId: string): boolean {
        return this.userIds.includes(userId);
    }

    public shouldRespond(): boolean {
        return Math.random() < this.responseChance;
    }

    public getRandomResponse(): string {
        if (this.responses.length === 0) {
            return "I'd say something clever, but I seem to have forgotten my lines.";
        }
        const index = Math.floor(Math.random() * this.responses.length);
        return this.responses[index];
    }

    public reloadData(): void {
        this.loadData();
    }
}