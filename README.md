# Good Morning Bot

A slack app that sends a 'Good Morning' with a random emoji and gif, every workday in the morning.

### [Dev.to Article](https://dev.to/danielbellmas/good-morning-slack-bot-2kn2)
### [Medium Article](https://medium.com/@dbalmas7/good-morning-slack-bot-df3a2bc89b2a)

<img width="657" alt="Good Morning" src="https://user-images.githubusercontent.com/76179660/176921998-b35b24c0-0c5f-40c4-a8ca-5d65a1e2d87e.png">


## Installation

Clone the repo:

```bash
git clone https://github.com/danielbellmas/good-morning-bot.git
```

Install dependencies with npm:
```bash
cd good-morning-bot
npm install 
```

> :bulb: Before you can run the project you'll need some environment variables 👇


## Environment Variables

In order to run this project, you will need to add the following environment variables to your .env file.

Follow [these instructions](https://youtu.be/wEJQQA_oYeI?t=743) to get Slack's environment variables.

By [signing in to Giphy](https://developers.giphy.com/), you can obtain the `GIPHY API KEY`.

Here are the env variables you'll be needing: [(you can also view them here)](.env.example)
```bash
#Slack
SLACK_BOT_TOKEN=xoxb-...
SLACK_USER_TOKEN=xoxp-...
SLACK_SIGNING_SECRET=00...
SLACK_APP_TOKEN=xapp-...

#Giphy API
GIPHY_API_KEY=X...
```

## Run project:

```bash
npm start
```


## Resources

- [How to create a new app](https://api.slack.com/authentication/basics)
- [Build custom Slack apps for any team](https://youtu.be/wEJQQA_oYeI)
- [Web API](https://api.slack.com/methods?query=chat)
- [VS code examples](https://github.dev/slackapi/bolt-js/blob/main/examples/getting-started-typescript/src/app.ts)
