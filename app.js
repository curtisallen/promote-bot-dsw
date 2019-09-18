require('dotenv').config();

const { App, subtype } = require('@slack/bolt');
const tmpl = require('reverse-string-template');

const port = process.env.PORT || 8080;
const circleCIBotId = 'BNGFZ7JTS';

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET
});

function getBuildCommit(circleCIMessage) {
  const match = new RegExp('https://github.com/curtisallen/promote-bot-dsw.*>');
  const commit = match.exec(circleCIMessage)[0].slice(0, -1);
  const gitCommit = commit.split('|');
  return gitCommit[1];
}

app.message(subtype('bot_message'), ({ message, say }) => {
  if (message.bot_id !== circleCIBotId) {
    console.log("message isn't from circle ci ignoring");
    return;
  }
  if (message.attachments && message.attachments[0].text.startsWith('Success')) {
    const buildCommit = getBuildCommit(message.attachments[0].text);
    // successful build lets ask to promote it
    say({
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `:pear: The tests have passed for build \`${buildCommit}\` Shall we deploy it?`
          },
          accessory: {
            type: 'button',
            text: {
              type: 'plain_text',
              text: 'launch to prod',
              emoji: true
            },
            value: 'launch_to_prod'
          }
        }
      ]
    });
  }
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
