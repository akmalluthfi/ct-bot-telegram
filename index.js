const Telebot = require('telebot');
const token = process.env.BOT_TOKEN;
const bot = new Telebot(token);

require('./pdfController');

const { push, onProfile } = require('./TelebotController');

let state = [];

const mainKeyboard = bot.keyboard(
  [['My Profile', 'Social Media'], ['Download Resume']],
  {
    resize: true,
  }
);

bot.on('/start', ({ from }) => {
  const replyMarkup = mainKeyboard;

  const text = `Hello ${from.first_name} ${from.last_name}, I will help you to know more about me`;

  return bot.sendMessage(from.id, text, { replyMarkup });
});

bot.on(/(Download Resume)/, (msg) => {
  return bot.sendDocument(msg.from.id, './data/output.pdf');
});

bot.on(/(My Profile)/, (msg) => {
  const replyMarkup = bot.keyboard(
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

  const replyMarkup = mainKeyboard;
  return bot.sendMessage(
    msg.from.id,
    'Hi, my name is Akmal Luthfi, you can call me akmal',
    {
      replyMarkup,
    }
  );
});

bot.on('/birth', (msg) => {
  if (!onProfile(msg.from.id)) return;

  const replyMarkup = mainKeyboard;
  return bot.sendMessage(
    msg.from.id,
    'I was born in Surabaya, on December 19th, 2004.',
    {
      replyMarkup,
    }
  );
});

bot.on('/email', (msg) => {
  if (!onProfile(msg.from.id)) return;

  const replyMarkup = mainKeyboard;
  return bot.sendMessage(msg.from.id, 'my email is akmalluthfi19@gmail.com.', {
    replyMarkup,
  });
});

bot.on('/age', (msg) => {
  if (!onProfile(msg.from.id)) return;

  const replyMarkup = mainKeyboard;
  return bot.sendMessage(msg.from.id, 'I am 17 years old.', {
    replyMarkup,
  });
});

bot.on('/where', (msg) => {
  if (!onProfile(msg.from.id)) return;

  const replyMarkup = mainKeyboard;
  return bot.sendMessage(
    msg.from.id,
    'Currently, I live in Surabaya, East Java - Indonesia.',
    {
      replyMarkup,
    }
  );
});

// bot.on('text', (msg) =>
//   msg.reply.text(`this ${msg.text} command dosn't exists`)
// );

bot.start();
