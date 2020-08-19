const Telegraf = require('telegraf')
const Extra = require('telegraf/extra')
const Markup = require('telegraf/markup')
const Stage = require('telegraf/stage')
const Scene = require('telegraf/scenes/base')
const session = require('telegraf/session')
const { leave } = Stage

const keyboard = Markup.inlineKeyboard([
  Markup.urlButton('❤️', 'http://t.me/theSmokingCat'),
  Markup.callbackButton('Delete', 'delete')
])

const echoing = new Scene('echoing')
echoing.enter((ctx) => ctx.reply('Echo mode on, end /leave to ...well turn the mode off'))
echoing.leave((ctx) => ctx.reply('Had fun .-.'))
echoing.command('cancel', leave())
echoing.on('message', (ctx) => ctx.telegram.sendCopy(ctx.chat.id, ctx.message, Extra.markup(keyboard)))
echoing.action('delete', ({ deleteMessage }) => deleteMessage());

const renaming = new Scene('renaming')
renaming.enter((ctx) => ctx.reply('Send file'))
renaming.leave((ctx) => ctx.reply('Bye', Extra.markup(keyboard)))
renaming.on('message', (ctx) => ctx.replyWithDocument({
  existing file_id: ctx.message.document.file_id,
  filename: ctx.message.text
}))
renaming.command('leave', leave())

const echo = new Stage()
echo.command('cancel', leave())
echo.register(echoing)

const rename = new Stage()
rename.command('cancel', leave())
rename.register(renaming)

const bot = new Telegraf(process.env.BOT_TOKEN)
bot.use(session())
bot.use(echo.middleware())
bot.use(rename.middleware())

bot.catch(console.log)

bot.command([`start`, `help`], (ctx) => {
    ctx.reply(
        `Hi, I'm a test bot and I'm working`
    );
});
bot.command('echo', (ctx) => ctx.scene.enter('echoing'))
bot.command('rename', (ctx) => ctx.scene.enter('renaming'))

bot.launch()
console.log(`Bot started...`);
