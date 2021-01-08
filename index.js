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
        //console.log(message);
		const { type, id, from, t, sender, isGroupMsg, chat, caption, isMedia, mimetype, quotedMsg, quotedMsgObj, mentionedJidList } = message
        let { body } = message
        const { name, formattedTitle } = chat
        let { pushname, verifiedName } = sender
        pushname = pushname || verifiedName
        const commands = caption ? caption : body
        console.log('#######')
		console.log('Commands: '+commands);
		//if (!message.body.startsWith(prefix)) return;
        const args = message.body.slice(prefix.length).trim().split(/ +/g);
        console.log('#######')
		console.log('Args: '+args);
		const command = commands.slice(prefix.length).split(' ')[0];
		console.log('#######');
		console.log('Command: '+command);
		console.log('#######')
		const time = moment(t * 1000).format('DD/MM HH:mm:ss')
		//console.log(time);
		
		if (!isGroupMsg && commands.startsWith(prefix)) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32mEXEC\x1b[1;37m]', time, color(prefix+command), 'from', color(pushname))
        if (isGroupMsg && commands.startsWith(prefix)) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32mEXEC\x1b[1;37m]', time, color(prefix+command), 'from', color(pushname), 'in', color(formattedTitle))
		
	
		if (!message.body.startsWith(prefix)) return;
		
		
        if (availableCommands.has(command)){
			require(`./commands/${command}`).run(bot, message, args);
		} 
    });
};