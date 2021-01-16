const { readdir } = require("fs");
//const { fs } = require('fs-extra');
const prefix = require("../config.json").prefix;


exports.run = (bot, message, args) => {
	console.log(args);
    let tmpFile = {};
	let files = null;
    readdir("./commands/", (e, files) => {
        if (e) console.error(e);
        files.forEach((jsFile) => {
			const cmdFile = require(`./${jsFile}`);
			tmpFile[jsFile.replace(".js", "")] = {};
			tmpFile[jsFile.replace(".js", "")].name = cmdFile.help.name;
			tmpFile[jsFile.replace(".js", "")].description = cmdFile.help.description;
			tmpFile[jsFile.replace(".js", "")].usage = cmdFile.help.usage;
        });
		if (!args[1]) {
            // prettier-ignore
			let ajuda = `*┠❥========================*\n*┠❥=====   IUHA BOT   =====*\n`;
			Object.keys(tmpFile).forEach(function (key) {
				ajuda += `*┠❥* ${prefix}`+key+'\n';
			});
			ajuda += `*┠❥=========================*\n_Digite *${prefix}help <comando>* para maiores informações._`;
			//console.log(ajuda);
			bot.sendText(message.from,ajuda);


        } else {
            let commandName = '';
			if(args[1].startsWith(prefix)) commandName = args[1].split('#')[1];
				else commandName = args[1];
			if(files.includes(commandName+'.js')){
				const { name, description, usage } = require(`./${commandName}.js`).help;
				bot.sendText(message.from, `*${name}*\n\nDescription: ${description}\nUsage: \`\`\`${usage}\`\`\``);
			}else bot.sendText(message.from,'Comando inexistente');
        };
    });
};

exports.help = {
    name: "Help",
    description: "Mostra a lista de comandos do bot",
    usage: "\thelp\n\thelp <comando>",
    cooldown: 5,
};