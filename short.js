const Telegraf = require('telegraf')

const bot = new Telegraf(process.env.BOT_TOKEN)

bot.catch(console.log)

bot.command([`start`, `help`], (ctx) => {
    ctx.reply(
        `Hi, I'm a test bot and I'm working`
    );
});
bot.launch()
console.log(`Bot started...`);
