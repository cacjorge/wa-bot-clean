const { decryptMedia } = require("@open-wa/wa-decrypt");
const uaOverride = "WhatsApp/2.2029.4 Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36";

exports.run = async (bot, message) => {
    if (message.quotedMsgObj == null || message.quotedMsgObj.type != "video") return bot.sendText(message.from, "❎ Please caption/quote some gif/video!");
    const waiting = await bot.sendText(message.from, "_⌛ Please wait..._");
    const media = await decryptMedia(message.quotedMsgObj, uaOverride);
    bot.sendMp4AsSticker(from, media, {fps: 10, startTime: `00:00:00.0`, endTime : `00:00:10.0`,loop: 0}).then((_) => {
        bot.deleteMessage(message.from, waiting);
    });
};

exports.help = {
    name: "StickerGif",
    description: "Stickerify a gif or video",
    usage: "stickergif",
    cooldown: 5
};