const { readdir } = require("fs");

exports.run = (bot, message, args) => {
    let tmpFile = {};
    readdir("./commands/", (e, files) => {
        if (e) console.error(e);
		//console.log(files);
        files.forEach( (jsFile) => {
            const cmdFile = require(`./${jsFile}`);
            tmpFile[jsFile.replace(".js", "")] = {};
            tmpFile[jsFile.replace(".js", "")].name = cmdFile.help.name;
            tmpFile[jsFile.replace(".js", "")].description = cmdFile.help.description;
            tmpFile[jsFile.replace(".js", "")].usage = cmdFile.help.usage;
        });

        if (!args[1]) {
            // prettier-ignore
			
            bot.sendText(message.from, 
`*IUHA BOT*\n
*Available commands:*\n
${Object.keys(tmpFile).join("\n")}\n\n
_You can run *help <command name>* to show advanced help._`
);
        } else {
            const commandName = args[1];
            const { name, description, usage } = require(`./${commandName}.js`).help;
            bot.sendText(message.from, `*${name}*\n\nDescription: ${description}\nUsage: \`\`\`${usage}\`\`\``);
        };
    });
};

exports.help = {
    name: "Help",
    description: "Show the bot's commands list",
    usage: "help",
    cooldown: 5,
};