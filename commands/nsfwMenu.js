const fs = require('fs-extra');

exports.run = async (bot, message, args) => {
	const nsfw_ = JSON.parse(fs.readFileSync('./lib/NSFW.json'));
	const isNSFW = nsfw_.includes(message.chat.id);
	console.log(nsfw_);
	if(isNSFW){
		bot.sendText(message.from,
  `┠❥=========================
   ┠❥=======   NSFW   ========
   ┠❥ *#rr* (random)
   ┠❥ *#rpussy* (random pussy)
   ┠❥ *#rboobs* (random boobs)
   ┠❥ *#rasshole* (random asshole)
   ┠❥ *#rblowjob* (random bj)
   ┠❥ *#rgonewild* (random gw)
   ┠❥ *#ramateurs* (random amateur)
   ┠❥ *#rthighs* (random thighs)
   ┠❥ *#rpanties* (random panties)
   ┠❥ *#4chan* (4chan downloader)
   ┠❥=========================
 `,message.id);
	} else bot.reply(message.from,'NSFW not enabled in this group',message.id);
}

exports.help = {
    name: "Menu for NSFW",
    description: "If NSFW is enabled in group, send NSFW menu",
    usage: "nsfwMenu",
    cooldown: 5
};
