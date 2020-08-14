const Telegraf = require('telegraf')
const Extra = require('telegraf/extra')
const Markup = require('telegraf/markup')

const keyboard = Markup.inlineKeyboard([
  Markup.urlButton('❤️', 'http://telegraf.js.org'),
  Markup.callbackButton('Delete', 'delete')
])

const bot = new Telegraf(process.env.BOT_TOKEN)

bot.catch(console.log)

bot.command([`start`, `help`], (ctx) => {
    ctx.reply(
        `Hi, I'm a test bot and I'm working`
    );
});

bot.on('message', (ctx) => ctx.telegram.sendCopy(ctx.chat.id, ctx.message, Extra.markup(keyboard)))
bot.action('delete', ({ deleteMessage }) => deleteMessage())

bot.launch()
console.log(`Bot started...`);
