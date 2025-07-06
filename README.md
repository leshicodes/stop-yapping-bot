# 🤪 JestBot — A Discord Bot for Friendly Harassment

[![discord.js](https://img.shields.io/badge/discord.js-v14-blue.svg)](https://discord.js.org/)
[![License](https://img.shields.io/badge/license-MIT-blue)](https://opensource.org/licenses/MIT)

**JestBot** is a lightweight, customizable Discord bot that randomly sends predefined jestful phrases to specific users, providing amusement within your Discord community.

## 🎯 Introduction

Ever wanted to playfully tease your friends in your Discord server automatically? JestBot is designed to do just that! This bot monitors message activity and has a random chance to reply with humorous jests when targeted users send messages. Perfect for friend groups who enjoy some light-hearted banter.

## ✨ Features

- **Targeted Harassment**: Only teases specific users you've added to the list
- **Random Responses**: Picks from a customizable list of witty comebacks and jests
- **Probability Control**: Adjust how frequently the bot responds to keep things fun, not annoying
- **Cooldown System**: Prevents spam by limiting how often the bot can respond to the same user
- **Non-Intrusive**: Won't respond to non-targeted users, itself, or other bots
- **Easy to Configure**: Simple JSON files for users and responses

## 🛠️ Setup

1. **Copy the configuration files**
   - Navigate to the config folder of this project
   - Copy all files ending in `.example.json` and remove the `.example` from the copied file names

2. **Obtain a Discord bot token**
   - Create a new application in the [Discord Developer Portal](https://discord.com/developers/applications/)
   - Navigate to the Bot section and create a bot
   - Copy the token

3. **Configure your bot**
   - Create a .env file in the root directory with:
     ```
     DISCORD_BOT_TOKEN=your_token_here
     RESPONSE_CHANCE=0.3
     ```
   - Edit config.json to include your bot's user ID

4. **Install dependencies**
   ```
   npm install
   ```

5. **Register commands**
   ```
   npm run commands:register
   ```

6. **Configure target users and responses**
   - Edit users.json to include Discord user IDs of your targets
   - Edit responses.json to include your custom jests and comebacks

## 🎮 How It Works

JestBot monitors all messages in your Discord server. When it detects a message from one of the users in your users.json file, it rolls a virtual dice (using the `RESPONSE_CHANCE` value). If successful, it randomly selects a jest from responses.json and replies to the targeted user's message. The cooldown system ensures users won't get bombarded with responses in quick succession.

## ⚙️ Configuration

### users.json
```json
{
  "userIds": ["123456789012345678", "234567890123456789"]
}
```

### responses.json
```json
{
  "responses": [
    "Nice try, genius.",
    "That's a bold take… for someone always wrong.",
    "You woke up today and chose failure, huh?",
    "This message brought to you by: the council of poor decisions."
  ]
}
```

### config.json
```json
{
  "...": "other configuration settings",
  "rateLimiting": {
    "jestResponses": {
      "amount": 1,
      "interval": 300
    }
  }
}
```
- `amount`: Number of responses allowed within the time interval
- `interval`: Time period in seconds before the cooldown resets

### Environment Variables
- `DISCORD_BOT_TOKEN`: Your Discord bot's token
- `RESPONSE_CHANCE`: Number between 0-1 determining chance to respond (0.3 = 30% chance)

## 🚀 Running the Bot

You can run the bot in multiple modes:

1. **Normal Mode**
   ```
   npm start
   ```

2. **Manager Mode** (for large servers with sharding)
   ```
   npm run start:manager
   ```

3. **PM2 Mode** (for production deployment)
   ```
   npm run start:pm2
   ```

## 🔧 Advanced Customization

- **Response Categories**: Consider tagging responses with categories (light, harsh, joke)
- **User-Specific Responses**: Create custom response sets for specific users
- **Channel Restrictions**: Configure the bot to only operate in certain channels

## 📜 Legal

For information about data usage, privacy, and terms of service, please see LEGAL.md.

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Acknowledgements

- Based on the [Discord Bot TypeScript Template](https://github.com/KevinNovak/Discord-Bot-TypeScript-Template) by KevinNovak

---

*Remember: Keep the jokes friendly and in good fun. Always respect Discord's Community Guidelines and Terms of Service.*