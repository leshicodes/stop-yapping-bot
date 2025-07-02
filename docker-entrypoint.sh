#!/bin/bash
set -e

# Replace token placeholder in config.json with actual token from environment
sed -i "s|{{ DISCORD_BOT_TOKEN }}|$DISCORD_BOT_TOKEN|g" /app/config/config.json

# Start the application
exec "$@"