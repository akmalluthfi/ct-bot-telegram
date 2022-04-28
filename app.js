const { Telegraf, Markup } = require('telegraf');
const cool = require('cool-ascii-faces');
const token =
  process.env.TOKEN || '5363464224:AAE7yDsh6lF-60Q2fwlFhtW32fwkL2-2t8U';
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

// Keyboard Markup
// bot.on('message', (ctx) => {
//   ctx.reply('enter', Markup.keyboard(['on', 'message']));
// });

// Custom Commands
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
bot.command('expression', (ctx) => ctx.reply(cool()));

bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
