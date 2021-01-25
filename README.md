# zikobot

![badge](https://action-badges.now.sh/JasonEtco/example-repo)

Discord bot which can play music from youtube  
Commands prefix is `?`

## Supported commands are:

```
- ?h: display help
- ?p text text text ... text: search music and play from given text
- ?show: show content of current playlist
- ?bye: bot quit voice channel
- ?pause: paused music
- ?resume: play paused music
```

## Installation

### packages

Using [npm](https://www.npmjs.com/) to get necessary dependencies:

```
$ npm install
```

---

### token

- create file named `.env` at root of repository folder
- add the following line:

```
BOT_TOKEN=YOUR_BOT_TOKEN
```

- replace `YOUR_BOT_TOKEN` by real token

### run

- execute following command to run bot

```
$ npm start
```

- execute following command to run bot with live reload

```
$ npm run dev
```
