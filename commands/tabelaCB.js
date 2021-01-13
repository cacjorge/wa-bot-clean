const puppeteer = require('puppeteer');

/* const isLocation = (loc) => {
	return loc.match(new RegExp(/(([A-Za-z]*[\s]*)\w+(,))+(([A-Za-z]\w)|(([A-Za-z])\w+(,)+([A-Za-z])\w))/,'gius'))
}
const sleep = async (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
} */

exports.run = async (bot, message, args) => {
	let widgetElement = '';
	let browser = '';
	let page = '';
	let tabelaHTML='';
	
	let tabelaHTMLSerieA = `https://www.google.com/search?sxsrf=ALeKk00ClZ09Xshv6rv76qTkboByqQB4hQ%3A1610411541585&ei=Fe78X62LI_3C5OUPzailyAo&q=tabela+do+campeonato+brasileiro&oq=tabela+do+campeonato+brasileiro&gs_lcp=CgZwc3ktYWIQAzIECCMQJzIFCAAQywEyBQgAEMsBMgUIABDLATIFCAAQywEyBQgAEMsBMgUIABDLATIFCAAQywEyBQgAEMsBMgUIABDLAToECAAQRzoHCAAQChDLAToGCAAQBxAeULTuGFjq7xhgmvQYaABwAngAgAGRAYgBjgKSAQMwLjKYAQCgAQGqAQdnd3Mtd2l6yAEIwAEB&sclient=psy-ab&ved=0ahUKEwjt6YK_kpXuAhV9IbkGHU1UCakQ4dUDCA0&uact=5#sie=lg;/g/11fmzksb3y;2;/m/0fnk7q;st;fp;1;;`;
	let tabelaHTMLSerieB = `https://www.google.com/search?sxsrf=ALeKk033Bwh--jPYHHaoYELrEgUUCFATRQ%3A1610412515632&ei=4_H8X9-IJs6j5OUP7Y-y-AM&q=tabela+do+campeonato+brasileiro+serie+b&oq=tabela+do+campeonato+brasileiro+serie+b&gs_lcp=CgZwc3ktYWIQA1AAWABgogFoAHAAeACAAQCIAQCSAQCYAQCqAQdnd3Mtd2l6&sclient=psy-ab&ved=0ahUKEwifhr6PlpXuAhXOEbkGHe2HDD8Q4dUDCA0&uact=5#sie=lg;/g/11fn8ps7gm;2;/m/0fnkb5;st;fp;1;;`;
			
	if(args.length === 1) tabelaHTML = tabelaHTMLSerieA;
		else if (args.length === 2){
			if(args[1].toLowerCase()=='a') tabelaHTML=tabelaHTMLSerieA;
				else if(args[1].toLowerCase()=='b') tabelaHTML=tabelaHTMLSerieB;
		} else return bot.reply(message.from,'Não encontrado',message.id);
		
	bot.reply(message.from, '[Wait] In Progress ⏳ Please Wait!', message.id);
	(async() => {    
		browser = await puppeteer.launch();
		page = await browser.newPage();
		try{
			await page.goto(tabelaHTML, {"waitUntil" : "networkidle0"});
			widgetElement =  await page.$('.EAFAEc');
			await page.waitForSelector('div.EAFAEc');
			if (widgetElement) {
					try{
						let tabelacb = await widgetElement.screenshot({
											path: `./media/tabelacb.png`,
											omitBackground: true,
											encoding: 'base64'
										});
						bot.sendImage(message.from, `data:image/png;base64,${tabelacb.toString('base64')}`,message.id)
						
					}catch(e) {
						console.log( `Couldn't take a screenshot of the element with the index of: ${ widgetElement }. Reason: `, e );
					}
			}
		}catch(e){
			console.log(e);
		}
		await browser.close();
	})();
			
		//} else bot.sendText(message.from,'Formato de pesquisa inválido! Formato deve ser \'Cidade,Estado/Provincia(sigla)(se existir),Pais(sigla)\'');
	//} else bot.sendText(message.from,'Comando inválido! Comando deve ser /clima \'Cidade,Estado/Provincia(sigla)(se existir),Pais(sigla)\'');
};

exports.help = {
    name: "Tabela do Campeonato Brasileiro Série A ou B",
    description: "Pega Tabela do Campeonato Brasileiro Série A e manda como imagem",
    usage: "\ntabelaCB \ntabelaCB <serie>",
    cooldown: 5
};

