const Pokedex = require('pokedex-promise-v2');
const P = new Pokedex();

exports.run = async (bot, message, args) => {
	let q7 = Math.floor(Math.random() * 898) + 1;
	P.getPokemonByName(q7, function(response, error) { // with callback
      if(!error) {
        bot.sendFileFromUrl(message.from, response.sprites.other['official-artwork'].front_default,'Pokemon.png',response.name, message.id);
      } else {
        console.log(error)
      }
    });
	
};

exports.help = {
    name: "Pokemon",
    description: "Random Pokemon",
    usage: "pokemon",
    cooldown: 5
};
