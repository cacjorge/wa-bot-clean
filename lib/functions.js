const { default: got } = require('got/dist/source');
const fetch = require('node-fetch');
const { fetchBase64 } = require("./fetcher");
const request = require('request');
const fs = require('fs-extra');
const axios = require('axios');

const lirics = async (string) => {
    const response = await fetch(`https://scrap.terhambar.com/lirik?word=${string}`)
    if (!response.ok) throw new Error(`unexpected response ${response.statusText}`);
    const json = await response.json()
    if (json.status === true) return `Lirics for: ${string}\n\n${json.result.lirik}`
    return `[ Error ] No lyrics for ${string} were found!`
}

const sleep = async(ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const isYtLink = (url) => {
	return url.match(new RegExp(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/));
}

const isUrl = (url) => {
    return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/gi))
}

const isLocation = (loc) => {
	return loc.match(new RegExp(/(([A-Za-z]*[\s]*)\w+(,))+(([A-Za-z]\w)|(([A-Za-z])\w+(,)+([A-Za-z])\w))/,'gius'))
}

exports.lirics = lirics;
exports.sleep = sleep;
exports.isYtLink = isYtLink;
exports.isUrl = isUrl;
exports.isLocation = isLocation;
