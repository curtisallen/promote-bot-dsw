require('dotenv').config();

const { App } = require('@slack/bolt');

const port = process.env.PORT || 8080;

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET
});

(async () => {
  await app.start(port);
  console.log(`⚡️ listening on :${port}`);
})();

//---------------------------------------
// app.message(({ say }) => {
//   say('Hello World');
// });
//---------------------------------------

//---------------------------------------
// app.message('can i kick it?', async ({ message, context }) => {
//   try {
//     const params = {
//       // The token you used to initialize your app is stored in the `context` object
//       token: context.botToken,
//       channel: message.channel,
//       name: 'goal_net',
//       timestamp: message.ts
//     };
//     await app.client.reactions.add(params);
//   } catch (error) {
//     console.error(error);
//   }
// });
//---------------------------------------
