const { Telegraf } = require('telegraf');
const token = process.env.TOKEN;

// console.log(process.env.token);
const bot = new Telegraf(token);

bot.start((ctx) => ctx.reply('Welcome'));
bot.command('name', (ctx) => ctx.reply('Akmal Luthfi'));
bot.command('age', (ctx) => ctx.reply('i am 17 yo'));
bot.command('where', (ctx) => ctx.reply('i live in surabaya, indonesian'));
bot.command('email', (ctx) => ctx.reply('my email is akmalluthfi19@gmail.com'));

bot.command('test', async (ctx) => {
  console.log('get chat');
  console.log('==========');
  const a = await ctx.getChat();
  console.log(a.location);

  console.log('me');
  console.log('==========');
  console.log(ctx.message.author_signature);

  console.log('chat member');
  console.log('==========');
  console.log(ctx.id);

  ctx.reply('wait...');
});

bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
