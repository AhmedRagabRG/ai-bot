export default () => ({
    port: parseInt(process.env.PORT, 10) || 3000,
    database_url: process.env.DATABASE_URL,
    discord_bot_token: process.env.DISCORD_TOKEN,
    gemini_api_key: process.env.GEMINI_API_KEY,
});