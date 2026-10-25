# Discobot

A commandless Discord bot that streams an internet radio station (SHOUTcast, Icecast or any direct audio URL) into a voice channel around the clock. On start it joins the configured channel, plays the first entry of the list and posts "now playing" to a text channel. A bundled cron script restarts it on schedule, because the Discord voice API tends to go silent after 20 to 30 hours of uptime.

![Discobot](https://i.imgur.com/pI3KB9I.png)

## Requirements

[Node.js](https://nodejs.org/en/) with npm and [FFmpeg](https://www.ffmpeg.org/) on the PATH, or Docker.

## Installation

```bash
git clone https://github.com/leinstay/discobot.git
cd discobot
npm install
```

With Docker, `make build` builds the image with FFmpeg included and `make start` runs it with the repository mounted.

## Running

```bash
node index.js
```

For non-stop broadcasting use a process manager and the bundled `restart.js` cron job:

```bash
pm2 start index.js --name DiscoBot --log bot.log --time --restart-delay 5000
pm2 start restart.js --name Restart
```

## Configuration

The bot reads `config.json` in the repository root. To get a channel ID, enable developer mode in Discord and right-click the channel.

| Key | Meaning |
|---|---|
| `token` | Discord bot token |
| `voicechannel` | ID of the voice channel to stream into |
| `logchannel` | ID of the text channel for "now playing" messages |
| `activity` | Text shown as the bot's activity |
| `prefix` | Command prefix. Reserved, the bot has no commands |
| `list` | Array of `{ "name", "url" }` entries, stations or audio files |

```json
{
  "prefix": "!a",
  "token": "{BOT TOKEN}",
  "voicechannel": "{VOICE CHANNEL ID}",
  "logchannel": "{TEXT CHANNEL ID}",
  "activity": "Anime Radio",
  "list": [
    { "name": "Anime Radio", "url": "https://pool.anison.fm/AniSonFM(320)?nocache=0.05" }
  ]
}
```

Several entries make a playlist. Any direct link to an MP3 works, so the same config can play audiobooks or albums.

## License and credits

MIT License, see [LICENSE](LICENSE). Built on [discord.js](https://discord.js.org/) 12 (Apache-2.0) with [@discordjs/opus](https://github.com/discordjs/opus) (MIT), [fluent-ffmpeg](https://github.com/fluent-ffmpeg/node-fluent-ffmpeg) (MIT) and [icy](https://github.com/TooTallNate/node-icy) by Nathan Rajlich (MIT).
