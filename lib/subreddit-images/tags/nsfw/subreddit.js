const requestHandler = require("./handler");

class RandomPic {
	asshole() { 
	let subreddits = [
      "asshole",
      "AssholeBehindThong",
      "assholegonewild",
      "spreadem"
    ];
	return requestHandler.makeRequest("reddit", subreddits[Math.floor(Math.random() *subreddits.length)]);
    }
	
	pussy() {
        let subreddits = ["pussy", "rearpussy", "innie", "simps", "pelfie", "LabiaGW", "godpussy", "rearpussy", "presenting", "cameltoe", "hairypussy",
        "pantiestotheside", "breakingtheseal"];
        return requestHandler.makeRequest("reddit", subreddits[Math.floor(Math.random() *subreddits.length)]);
    }
	amateurs() {    
	let subreddits = [
      "realgirls",
      "amateur",
      "FestivalSluts",
      "CollegeAmateurs",
      "amateurcumsluts",
      "nsfw_amateurs",
      "funwithfriends",
      "randomsexiness",
      "amateurporn",
      "irlgirls",
      "verifiedamateurs"
    ];
	return requestHandler.makeRequest("reddit", subreddits[Math.floor(Math.random() *subreddits.length)]);
	}
	gonewild() {
	let subreddits = [
      "GoneWild",
      "PetiteGoneWild",
      "gonewildstories",
      "GoneWildTube",
      "treesgonewild",
      "GWNerdy",
      "gonemild",
      "altgonewild",
      "gifsgonewild",
      "analgw",
      "gonewildsmiles",
      "onstageGW",
      "RepressedGoneWild",
      "bdsmgw",
      "UnderwearGW",
      "LabiaGW",
      "TributeMe",
      "WeddingsGoneWild",
      "gwpublic",
      "assholegonewild",
      "leggingsgonewild",
      "gonewildhairy",
      "gonewildtrans",
      "gonwild",
      "ratemynudebody"
    ];
	return requestHandler.makeRequest("reddit", subreddits[Math.floor(Math.random() *subreddits.length)]);
    }
	blowjob(){
	let subreddits = [
      "blowjobs",
      "lipsthatgrip",
      "deepthroat",
      "onherknees",
      "blowjobsandwich",
      "iwanttosuckcock"
    ];
		return requestHandler.makeRequest("reddit", subreddits[Math.floor(Math.random() *subreddits.length)]);
    }
	boobs(){
	let subreddits = [
      "boobies",
      "TittyDrop",
      "boltedontits",
      "boobbounce",
      "boobs",
      "downblouse",
      "homegrowntits",
      "cleavage",
      "breastenvy",
      "youtubetitties",
      "torpedotits",
      "thehangingboobs",
      "page3glamour",
      "fortyfivefiftyfive",
      "tits",
      "amazingtits"
    ];
	return requestHandler.makeRequest("reddit", subreddits[Math.floor(Math.random() *subreddits.length)]);
    }
}

module.exports = new RandomPic();