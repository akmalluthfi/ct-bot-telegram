const Telebot = require('telebot');
const token =
  process.env.BOT_TOKEN || '5363464224:AAE7yDsh6lF-60Q2fwlFhtW32fwkL2-2t8U';
const bot = new Telebot(token);

const { push, firstKey, onProfile } = require('./controller');

let state = [];

bot.on('/start', ({ from }) => {
  const replyMarkup = bot.keyboard([['My Profile', 'Social Media']], {
    resize: true,
  });

  const text = `Hello ${from.first_name} ${from.last_name}, I will help you to know more about me`;

  return bot.sendMessage(from.id, text, { replyMarkup });
});

bot.on(/(My Profile)/, (msg) => {
  let replyMarkup = bot.keyboard(
    [['/name', '/where'], ['/age', '/birth'], ['/email']],
    { resize: true }
  );

  push(msg.from.id, 'onProfile');

  return bot.sendMessage(
    msg.from.id,
    'choose what do you want to know about me',
    {
      replyMarkup,
    }
  );
});

bot.on(/(Social Media)/, (msg) => {
  let replyMarkup = bot.inlineKeyboard(
    [
      [
        bot.inlineButton('Whatsapp', {
          url: 'https://api.whatsapp.com/send?phone=6288226053201',
        }),
      ],
      [
        bot.inlineButton('Instagram', {
          url: 'https://www.instagram.com/akmalluthfi',
        }),
      ],
      [
        bot.inlineButton('GitHub', {
          url: 'https://github.com/akmalluthfi',
        }),
      ],
    ],
    {
      resize: true,
    }
  );

  state.push({
    id: msg.from.id,
    status: 'onSocial',
  });

  return bot.sendMessage(msg.from.id, 'Please visit my social media', {
    replyMarkup,
  });
});

bot.on('/name', (msg) => {
  if (!onProfile(msg.from.id)) return;

  return firstKey(
    msg.from.id,
    'Hi, my name is Akmal Luthfi, you can call me akmal'
  );
});

bot.on('/birth', (msg) => {
  if (!onProfile(msg.from.id)) return;

  return firstKey(
    msg.from.id,
    'I was born in Surabaya, on December 19th, 2004.'
  );
});

bot.on('/email', (msg) => {
  if (!onProfile(msg.from.id)) return;
  return firstKey(msg.from.id, 'my email is akmalluthfi19@gmail.com.');
});

bot.on('/age', (msg) => {
  if (!onProfile(msg.from.id)) return;
  return firstKey(msg.from.id, 'I am 17 years old.');
});

bot.on('/where', (msg) => {
  if (!onProfile(msg.from.id)) return;
  return firstKey(
    msg.from.id,
    'Currently, I live in Surabaya, East Java - Indonesia.'
  );
});

// bot.on('text', (msg) =>
//   msg.reply.text(`this ${msg.text} command dosn't exists`)
// );

bot.start();
