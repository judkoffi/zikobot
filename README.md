# zikobot

![Build Status](https://travis-ci.org/judkoffi/zikobot.svg?branch=master)

Discord bot which can play music from youtube   
Commands prefix is ```?```  

## Supported commands are:
```
- ?help: display help
- ?queue {url}: add new video in playlist
- ?play {url}: play music from given url
- ?playlist: start playlist listening
- ?show: show content of current playlist
- ?stop: stop music and leave voice channel
- ?next: play next song in playlist
- ?pause: pause current playing music
- ?resume: play paused music
```

## Installation

### packages

Using [yarn](https://yarnpkg.com/) to get necessary dependencies:

    $ yarn install 

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
$ yarn start 
```

- execute following command to run bot with live reload
```
$ yarn run dev
```