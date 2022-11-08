# Discord-bot

A simple commandless discord bot for 24/7 streaming of internet radio stations (e.g. SHOUTcast).

![Discobot](https://i.imgur.com/pI3KB9I.png)

## Requirements

- [Node] (https://nodejs.org/en/)
- [NPM] (https://www.npmjs.com/)
- [FFMPEG] (https://www.ffmpeg.org/)

## Getting started

First make sure you have all the required tools installed on your machine then continue with these steps.


### Installation using Docker

```shell

# Clone the repository
git clone https://github.com/leinstay/discobot.git

# Build the image
make build

# Start the image 
make start

```


### Installation using npm

```bash
# Clone the repository
git clone https://github.com/leinstay/discobot.git

# Enter into the directory
cd dmbot/

# Install the dependencies
npm install
```

### Configuration

After cloning the project and installing all dependencies provide proper Discord API token, default voice channel ID, default text channel ID (for now playing notifications), and url for one or more music stream in config.json file.
To acquire channel ID, enable developer mode in Discord and right-click any channel. 

Example configuration for radio station:
```json
{
    "prefix": "!a",
	"token":"{BOT TOKEN}",
	"voicechannel":"{VOICE CHANNEL ID}",
	"logchannel":"{TEXT CHANNEL ID}",
	"activity":"Anime Radio",
	"list":[
	{
		"name":"Anime Radio",
		"url":"https://pool.anison.fm/AniSonFM(320)?nocache=0.05"
	}
	]
}
```

Example configuration for custom playlist:
```json
{
	"prefix":"!d",
	"token":"{BOT TOKEN}",
	"voicechannel":"{VOICE CHANNEL ID}",
	"logchannel":"{TEXT CHANNEL ID}",
	"activity":"Ranobe Radio",
	"list":[
	{
		"name":"Shinkai Makoto - Five centimeters per second.",
		"url":"https://m17.akniga.club/b/54644/bIoDhyKuJ5rGPM_IFqIC3A,,/01.%20%D0%A1%D0%B8%D0%BD%D0%BA%D0%B0%D0%B9%20%D0%9C%D0%B0%D0%BA%D0%BE%D1%82%D0%BE%20-%20%D0%9F%D1%8F%D1%82%D1%8C%20%D1%81%D0%B0%D0%BD%D1%82%D0%B8%D0%BC%D0%B5%D1%82%D1%80%D0%BE%D0%B2%20%D0%B2%20%D1%81%D0%B5%D0%BA%D1%83%D0%BD%D0%B4%D1%83.mp3"
	},
	{
		"name":"Aya Hazuki - And again, I say hello.",
		"url":"https://m17.akniga.club/b/55024/bIoDhyKuJ5rGPM_IFqIC3A,,/01.%20%D0%90%D1%8F%20%D0%A5%D0%B0%D0%B7%D1%83%D0%BA%D0%B8%20-%20%D0%98%20%D1%81%D0%BD%D0%BE%D0%B2%D0%B0%20%D0%B3%D0%BE%D0%B2%D0%BE%D1%80%D1%8E%20%D0%9F%D1%80%D0%B8%D0%B2%D0%B5%D1%82.mp3"
	},
	{
		"name":"Natsume Akatsky - The Goddess blesses this beautiful world.",
		"url":"https://m17.akniga.club/b/54240/bIoDhyKuJ5rGPM_IFqIC3A,,/01.%20%D0%9D%D0%B0%D1%86%D1%83%D0%BC%D1%8D%20%D0%90%D0%BA%D0%B0%D1%86%D0%BA%D0%B8%20-%20%D0%90%D1%85,%20%D0%BC%D0%BE%D1%8F%20%D0%B1%D0%B5%D1%81%D0%BF%D0%BE%D0%BB%D0%B5%D0%B7%D0%BD%D0%B0%D1%8F%20%D0%B1%D0%BE%D0%B3%D0%B8%D0%BD%D1%8F.mp3"
	},
	{
		"name":"Nagatsuki Tappei - Re:Zero. Living in an alternative world from scratch.",
		"url":"https://m17.akniga.club/b/55324/Od3Ak6Dt6YnLfHZMTZNTsg,,/01.%20%D0%9D%D0%B0%D0%B3%D0%B0%D1%86%D1%83%D0%BA%D0%B8%20%D0%A2%D0%B0%D0%BF%D0%BF%D1%8D%D0%B9%20-%20%D0%96%D0%B8%D0%B7%D0%BD%D1%8C%20%D0%B2%20%D0%B0%D0%BB%D1%8C%D1%82%D0%B5%D1%80%D0%BD%D0%B0%D1%82%D0%B8%D0%B2%D0%BD%D0%BE%D0%BC%20%D0%BC%D0%B8%D1%80%D0%B5%20%D1%81%20%D0%BD%D1%83%D0%BB%D1%8F.mp3"
	},
	{
		"name":"Jumpei Inuzuka - Café from another world",
		"url":"https://m17.akniga.club/b/55175/Od3Ak6Dt6YnLfHZMTZNTsg,,/01.%20Inuzuka%20Junpei%20-%20%D0%9A%D0%B0%D1%84%D0%B5%20%D0%B8%D0%B7%20%D0%B4%D1%80%D1%83%D0%B3%D0%BE%D0%B3%D0%BE%20%D0%BC%D0%B8%D1%80%D0%B0.mp3"
	}
	]
}
```

### Starting the application

Since the bot works even when there is no one in the channel, I strongly recommend to use forever or pm2 with cron autorestart for non-stop broadcasting (because of Discord API features the bot has a tendency to transmit silence after 20-30 hours of uptime).

```bash
pm2 start index.js --name DiscoBot --log bot.log --time --restart-delay 5000 & pm2 start restart.js --name Restart
```

Оr you can do it without process managers.

```bash
node index.js
```

## Author

Vladimir "Leinstay" Belyaev

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE) file for details
