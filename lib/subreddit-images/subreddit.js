const requestHandler = require("./handler");

class RandomPic {
	 random() {
        let subreddits = ["girlsinyogapants", "Thighs", "thighhighs", "ThickThighs", "UnderwearGW", "datgap", "leggingsgonewild", "pawg", "hipcleavage", "legs", "pantyhose", "ass", 
        "paag", "asstastic", "buttplug", "whooties", "AssholeBehindThong", "Frogbutt", "rearpussy", "CuteLittleButts", "HungryButts", "reversecowgirl", "facedownassup", 
        "butt", "butts", "pawg", "bigasses", "cosplaybutts", "BubbleButts", "assinthong", "smalltitsbigass", "CelebrityButts", "booty", "panties", "FullBackPanties", "PantiesToTheSide",
        "thongs", "xsmallgirls", "PublicSexPorn", "cameltoe", "smallboobs", "LegalTeens", "TooCuteForPorn", "adorableporn", "AsiansGoneWild", "trashyboners", "StraightGirlsPlaying", 
        "LipsThatGrip", "spreadeagle", "dirtysmall", "nsfw", "pussy", "gonewild", "SexyTummies", "SpreadEm", "Ahegao_IRL", "nsfwcosplay", "RealGirls", "lesbians", "Fingering", "AnalGW",
        "anal", "freeuse", "BorednIgnored", "grool", "jilling", "porn", "Amateur", "TinyTits", "PetiteGoneWild", "cumsluts", "AsianHotties", "simps", "slimgirls", "ginger", "palegirls", 
        "BustyPetite", "Innie"];
        return requestHandler.makeRequest("reddit", subreddits[Math.floor(Math.random() *subreddits.length)]);
    }
    thighs() {
        let subreddits = ["girlsinyogapants", "Thighs", "thighhighs", "ThickThighs", "UnderwearGW", "datgap", "leggingsgonewild", "pawg", "hipcleavage", "legs", "pantyhose"];
        return requestHandler.makeRequest("reddit", subreddits[Math.floor(Math.random() *subreddits.length)]);
    }
	panties() {
        let subreddits = ["panties", "FullBackPanties", "AssholeBehindThong", "assinthong", "PantiesToTheSide", "thongs", "UnderwearGW"];
        return requestHandler.makeRequest("reddit", subreddits[Math.floor(Math.random() *subreddits.length)]);
    }

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
        "pantiestotheside"];
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
	
	blowjob() {
	let subreddits = [
      "blowjobs",
      "lipsthatgrip",
      "deepthroat"
      //"onherknees",
     // "blowjobsandwich",
      //"iwanttosuckcock"
    ];
		return requestHandler.makeRequest("reddit", subreddits[Math.floor(Math.random() *subreddits.length)]);
    }
	
	boobs() {
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