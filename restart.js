const { exec } = require('child_process');
const CronJob = require('cron').CronJob;
const restartCommand = "pm2 restart DiscoBot";
const listCommand = "pm2 list";

console.log("Starting bot restart process.");

const restartApp = function () {
	exec(restartCommand, (err, stdout, stderr) => {
		if (!err && !stderr) {
			console.log(new Date(), `App restarted.`);
			listApps();
		} else if (err || stderr) {
			console.log(new Date(), `Error in executing ${restartCommand}`, err || stderr);
		}
	});
}

function listApps() {
	exec(listCommand, (err, stdout, stderr) => {
		console.log(`pm2 list`);
		console.log(`${stdout}`);
	});
}

new CronJob('0 0 */3 * * *', restartApp(), null, true, 'Europe/Moscow');