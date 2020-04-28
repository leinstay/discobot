const Discord = require('discord.js');
const icy = require('icy');
const fs = require('fs');
const client = new Discord.Client();
const {
	prefix,
	token,
	voicechannel,
	logchannel,
	activity,
	list
} = require('./config.json');

var serverQueue = [...list];

client.once('ready', () => {
	clientLogMessage("Status: Connected to discord");
	playStream();
});

client.once('reconnecting', () => {
	clientLogMessage("Status: Reconnected to discord");
	playStream();
});

client.once('disconnect', () => {
	clientLogMessage("Status: Disconnected from discord");
});

client.on('message', async message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;
	const args = message.content.slice(prefix.length).split(' ');
	const command = args.shift().toLowerCase();
});

client.login(token);

function playStream() {
	client.channels.fetch(voicechannel).then(chanel => {
		chanel.join().then(connection => {
			clientLogMessage("Status: Successfully connected to voice channel");
			if (activity) changeActivity(activity);
			
			connection.on("debug", e => {
				if (e.includes('[WS] >>') || e.includes('[WS] <<')) return;
				clientLogMessage("Status: Connection warning - " + e);
				//if(e.includes('[WS] closed')) abortWithError();
			});
			connection.on("disconnect", () => {
				clientLogMessage("Status: Connection disconnect");
			});
			connection.on("error", e => {
				clientLogMessage("Status: Connection error");
				console.log(e);
			});
			connection.on("failed", e => {
				clientLogMessage("Status: Connection failed");
				console.log(e);
			});
			
			initDispatcher(connection);
		}).catch(e => {
			clientLogMessage("Status: Chanel connection error");
			console.log(e);
		});
	}).catch(e => {
		clientLogMessage("Status: Chanel not found");
		console.log(e);
	});
}

function initDispatcher(connection) {
	clientLogMessage("Status: Broadcast started");
	
	if (serverQueue === undefined || serverQueue.length == 0) {
		clientLogMessage("Status: Repeating entire playlist");
		serverQueue = [...list];
	}
	const currentTrack = serverQueue.shift();
	if (currentTrack.name) changeActivity(currentTrack.name);
	
	const streamDispatcher = connection.play(currentTrack.url, {
			volume: false,
			highWaterMark: 512,
			bitrate: 128,
			fec: true
		})
		.on("finish", () => {
			clientLogMessage("Status: Broadcast was finished");
			streamDispatcher.destroy();
			initDispatcher(connection);
		});
		
	streamDispatcher.setBitrate(128);
	streamDispatcher.setFEC(true);
	
	streamDispatcher.on("debug", e => {
		clientLogMessage("Status: Dispatcher warning - " + e);
	});
	streamDispatcher.on("error", e => {
		clientLogMessage("Status: Broadcast connection error");
		console.log(e);
		abortWithError();
	});
	
	getICY(currentTrack.url);
}

function getICY(url) {
	const icyReader = icy.get(url, function (i) {
		i.on('metadata', function (metadata) {
			let icyData = icy.parse(metadata);
			if (icyData.StreamTitle) changeActivity(icyData.StreamTitle);
		});
		i.resume();
	});
}

function abortWithError() {
	clientLogMessage("Status: The connection to the radio station is interrupted or it does not respond, interrupting the process");
	streamDispatcher.destroy();
	process.exit(1);
}

function clientLogMessage(message) {
	client.channels.fetch(logchannel).then(chanel => {
		chanel.send(message)
	}).catch(e => console.log(e));
	
	console.log(message);
}

function changeActivity(message) {
	clientLogMessage("Now playing: " + message);
	client.user.setActivity(message, {
		type: 'LISTENING'
	});;
}