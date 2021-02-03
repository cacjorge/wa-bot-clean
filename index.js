const prefix = require("./config.json").prefix;
const options = require('./options');
const { create, Client } = require('@open-wa/wa-automate')
const fs = require("fs");
const color = require('./lib/color');
const moment = require('moment-timezone');
hound = require('hound');

watcher = hound.watch('./commands');

const availableCommands = new Set();	

fs.readdir("./commands", (e, files) => {
    if (e) return console.error(e);
    files.forEach((commandFile) => {
        availableCommands.add(commandFile.replace(".js", ""));
    });
});

const start = async (bot = new Client()) => {
    //console.log('[SERVER] Server Started!')
    // Force it to keep the current session
	bot.onStateChanged((state) => {
            console.log('[Client State]', state)
            if (state === 'CONFLICT' || state === 'UNLAUNCHED') bot.forceRefocus();
        })
	
	// listening on message
	bot.onMessage(async (message) => {
		const { type, id, from, t, sender, isGroupMsg, chat, caption, isMedia, mimetype, quotedMsg, quotedMsgObj, mentionedJidList } = message
        let { body } = message
        const { name, formattedTitle } = chat;
        let { pushname, verifiedName } = sender;
        pushname = pushname || verifiedName;
        const commands = caption ? caption : body;
		if (!commands.startsWith(prefix)) return;
		
		//console.log("COMMANDS: "+commands);
		const command = commands.slice(prefix.length).split(' ')[0] || '';
		//console.log("COMMAND: "+command);
		
		let args = '';
		if(!message.isMedia) args = message.body.slice(prefix.length).trim().split(/ +/g);
			else args = commands.slice(prefix.length).trim().split(/ +/g);
			
		//console.log("ARGS: "+args);
		
		const time = moment(t * 1000).format('DD/MM HH:mm:ss');
		
		if (!isGroupMsg && commands.startsWith(prefix)) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32mEXEC\x1b[1;37m]', time, color(prefix+command), 'from', color(pushname));
        if (isGroupMsg && commands.startsWith(prefix)) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32mEXEC\x1b[1;37m]', time, color(prefix+command), 'from', color(pushname), 'in', color(formattedTitle));
		
		
		 
        if (availableCommands.has(command)){
			require(`./commands/${command}`).run(bot, message, args);
		}  
    });
	
	
	bot.onAddedToGroup(((chat) => {
            let totalMem = chat.groupMetadata.participants.length
            if (totalMem < 50) { 
            	client.sendText(chat.id, `O número de membros é apenas ${totalMem}, se você quiser convidar o bot, o número mínimo de membros é 50`).then(() => client.leaveGroup(chat.id)).then(() => client.deleteChat(chat.id))
            } else {
                client.sendText(chat.groupMetadata.id, `Olá membros do grupo * ${chat.contact.name} * obrigado por convidar este bot, para ver o menu envie *#help *`);
            }
        }));
	
	
	bot.onIncomingCall(( async (call) => {
            await bot.sendText(call.peerJid, 'Não consigo receber chamadas. Seu número será bloqueado se continuar!')
            .then(() => bot.contactBlock(call.peerJid))
        }));
		
	// watch for new commands
	watcher.on('create', function(file, stats) {
		  availableCommands.add(file.slice(11).replace(".js", ""))
		  console.log(file.slice(11).replace(".js", "") + ' was created')
		})
};


create(options(true, start))
    .then(client => start(client))
    .catch((error) => console.log(error))



