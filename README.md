# zikobot

![Build Status](https://travis-ci.org/judkoffi/zikobot.svg?branch=master)

Discord bot which can play music from youtube   
Commands prefix is ```?```  

## Supported commands are:
```
- ?help: display help
- ?search title someText anotherText: search video by title
- ?queue url: add new video in playlist
- ?queuefrom url1, url2, url3, ..., urln`, value: 'Build queue from all urls'
- ?play url: play music from given url
- ?start: start playlist listening
- ?show: show content of current playlist
- ?stop: stop music and leave voice channel
- ?next: play next song in playlist
- ?pause: pause current playing music
- ?resume: play paused music
- ?pop: Remove first music from current playing
```

## Installation

### packages

Using [npm](https://www.npmjs.com/) to get necessary dependencies:
    $ npm install 
---

### token
- create file named ```.env``` at root of repository folder  
- add the following line:
```
BOT_TOKEN=YOUR_BOT_TOKEN
```
- replace ```YOUR_BOT_TOKEN``` by real token

### run
- execute following command to run bot
```
$ npm start 
```

- execute following command to run bot with live reload
```
$ npm run dev
```