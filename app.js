const { Telegraf } = require('telegraf');
const token = process.env.TOKEN;

const bot = new Telegraf(token);

// Global Commands
bot.start((ctx) =>
  ctx.reply(
    'Welcome to my bot, This bot will help you to recognize who is akmal'
  )
);
bot.help((ctx) =>
  ctx.reply('just write "/" to find out what commands are available')
);

bot.command('name', (ctx) =>
  ctx.reply('Hi, my name is Akmal Luthfi, you can call me akmal')
);
bot.command('birth', (ctx) =>
  ctx.reply(' I was born in Surabaya, on December 19th, 2004.')
);
bot.command('age', (ctx) => ctx.reply('I am 17 years old.'));
bot.command('where', (ctx) =>
  ctx.reply('Currently, I live in Surabaya, East Java - Indonesia.')
);
bot.command('email', (ctx) =>
  ctx.reply('my email is akmalluthfi19@gmail.com.')
);
bot.command('secret', (ctx) => {
  console.log(ctx);
});

bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
