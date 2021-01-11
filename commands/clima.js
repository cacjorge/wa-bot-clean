const puppeteer = require('puppeteer');
const fs = require('fs-extra');

const isLocation = (loc) => {
	return loc.match(new RegExp(/(([A-Za-z]*[\s]*)\w+(,))+(([A-Za-z]\w)|(([A-Za-z])\w+(,)+([A-Za-z])\w))/,'gius'))
}
const sleep = async (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

exports.run = async (bot, message, args) => {
	let widgetElement = '';
	let browser = '';
	let page = '';
	if (args.length === 2){
		bot.reply(message.from, '[Wait] In Progress ⏳ Please Wait!', message.id);
		const local = message.body.slice(7);
		if(isLocation(local)){
			(async() => {    
				browser = await puppeteer.launch();
				page = await browser.newPage();
				try{
					let forecastHTML = `file://${__dirname}/../lib/forecast/forecast.html?location=${local}`;
					await page.goto(forecastHTML, {"waitUntil" : "networkidle0"});
					widgetElement =  await page.$('.verticalweatherForecast');
					await page.waitForSelector('div.verticalweatherForecast');
					if (widgetElement) {
							try{
								let forecast = await widgetElement.screenshot({
													path: `./media/forecast.png`,
													omitBackground: true,
													encoding: 'base64'
												});
								bot.sendImage(message.from, `data:image/png;base64,${forecast.toString('base64')}`,message.id)
								
							}catch(e) {
								console.log( `Couldn't take a screenshot of the element with the index of: ${ widgetElement }. Reason: `, e );
							}
					} 
					
				}catch(e){
					console.log(e);
				}
				await browser.close();
			})();
			
		} else bot.sendText(message.from,'Formato de pesquisa inválido! Formato deve ser \'Cidade,Estado/Provincia(sigla)(se existir),Pais(sigla)\'');
	} else bot.sendText(message.from,'Comando inválido! Comando deve ser /clima \'Cidade,Estado/Provincia(sigla)(se existir),Pais(sigla)\'');
};

exports.help = {
    name: "Clima",
    description: "Retrieves Forecast for a city.",
    usage: "clima city,state,country",
    cooldown: 5
};

