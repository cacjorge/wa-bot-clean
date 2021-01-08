const prefix = require("./config.json").prefix;
const whatsapp = require("@open-wa/wa-automate");
const fs = require("fs");
const color = require('./lib/color');
const moment = require('moment-timezone');


const availableCommands = new Set();

fs.readdir("./commands", (e, files) => {
    if (e) return console.error(e);
    files.forEach((commandFile) => {
        availableCommands.add(commandFile.replace(".js", ""));
    });
});

whatsapp.create().then((bot) => start(bot));

function start(bot) {
    bot.onMessage(async (message) => {
        if (!message.body.startsWith(prefix)) return;
        const args = message.body.slice(prefix.length).trim().split(/ +/g);
        const command = args.shift().toLowerCase();
		console.log(command);
		
		const time = moment(t * 1000).format('DD/MM HH:mm:ss');
		console.log(time);
		//if (!message.isGroupMsg && command.startsWith(prefix)) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32mEXEC\x1b[1;37m]', time, color(msgs(command)), 'from', color(pushname))
        //if (message.isGroupMsg && command.startsWith(prefix)) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32mEXEC\x1b[1;37m]', time, color(msgs(command)), 'from', color(pushname), 'in', color(formattedTitle))

        if (availableCommands.has(command))
            require(`./commands/${command}`).run(bot, message, args);
    });
};