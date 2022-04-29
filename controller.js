const Telebot = require('telebot');
const token = '5363464224:AAE7yDsh6lF-60Q2fwlFhtW32fwkL2-2t8U';
const bot = new Telebot(token);

let state = [];

const saved = (id) => {
  const newState = state.filter((u) => u.id !== id);
  state = newState;
};

const firstKey = (id, message) => {
  const replyMarkup = bot.keyboard([['My Profile', 'Social Media']], {
    resize: true,
  });
  return bot.sendMessage(id, message, { replyMarkup });
};

const onProfile = (id) => {
  const exists = state.find((u) => u.id == id);
  if (!exists) return false;
  if (exists.status !== 'onProfile') return false;

  saved(id);
  return true;
};

const push = (id, status) => {
  state.push({ id, status });
};

module.exports = { onProfile, firstKey, push };
