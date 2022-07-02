import { App, LogLevel } from '@slack/bolt';
import { isWeekend, getRandomEmoji, fetchMorningGif } from './utils';
import botDMs from './utils/botDMs';
import { isDayOff } from './utils/dayOff';
import { config } from 'dotenv';

config();
const { SLACK_BOT_TOKEN, SLACK_USER_TOKEN, SLACK_SIGNING_SECRET, SLACK_APP_TOKEN, NODE_ENV } = process.env;

const app = new App({
  token: SLACK_BOT_TOKEN,
  signingSecret: SLACK_SIGNING_SECRET,
  socketMode: true,
  appToken: SLACK_APP_TOKEN,
  logLevel: NODE_ENV === 'production' ? LogLevel.INFO : LogLevel.DEBUG
});

(async () => {
  await app.start();
  await botDMs(app);

  console.info(`🔥 Slack Bolt app is running! 🔥`);
})();

/*********************
 Scheduled Good Morning
 **********************/

const sendMessage = async ({ channel = 'general', as_user = true } = {}) => {
  const gif = await fetchMorningGif();

  await app.client.chat.postMessage({
    token: as_user ? SLACK_USER_TOKEN : SLACK_BOT_TOKEN,
    channel,
    text: `Good morning! ${getRandomEmoji()}\n ${gif}`,
    as_user
  });
};

let isDayOffToday = false;
let isSentToday = false;
let prevDay = new Date().getUTCDay();

(function loop() {
  setTimeout(() => {
    const day = new Date().getUTCDay();
    const hour = new Date().getUTCHours();
    const isMorning = hour === 5; //* 5am UTC => 8am local

    if (prevDay !== day) {
      //* Reset all flags on new day
      isSentToday = false;
      prevDay = day;
      isDayOffToday = false;
    }

    //* Optionally: add !isDayOffToday check in the if statement to not even enter the if
    if (!isSentToday && !isWeekend() && isMorning) {
      isDayOffToday = isDayOffToday || isDayOff(); //* A cool way to check only once a day

      if (!isDayOffToday) {
        sendMessage();
        isSentToday = true;
        console.info('!!! Sent a good morning message !!!');
      }
    }

    console.info({ isSentToday, prevDay, day });
    loop();
  }, 1000 * 60 * 30 * Math.random());
})();
