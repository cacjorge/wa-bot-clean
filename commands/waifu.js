const axios = require('axios');

exports.run = async (bot, message, args) => {
	const waifu = await axios.get('http://randomwaifu.altervista.org');
	console.log(waifu);

	//bot.sendFileFromUrl(message.from, waifu.data.image, 'Waifu.jpg', `❤️ Name : ${waifu.data.name}\n🎉️ Description : ${waifu.data.desc}\n\n❇️ Source : ${waifu.data.source}`, id)
};

exports.help = {
    name: "Waifu",
    description: "Random Waifu",
    usage: "waifu",
    cooldown: 5
};
