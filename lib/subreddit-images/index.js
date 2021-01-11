const real = require("./subreddit");
class SRClientNSFW {
    constructor() {
        this.real = real;
    }
}
class SRClient {
    constructor() {
        this.nsfw = new SRClientNSFW();
    }
}
module.exports = {Client: SRClientNSFW};