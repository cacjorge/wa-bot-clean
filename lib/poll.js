const request = require('request');
const fs = require('fs');
const dm = require('@open-wa/wa-decrypt');
const multer = require('multer');
const upload = multer();
module.exports = {
    addcandidate,
    voteadapter,
    getpoll,
    adminpollreset,
    readJsonFile,
    saveJsonFile
}

function voteadapter(client, message, pollfile, voterslistfile) {
    console.log('flag1')
        //voteadapter
    console.log(voterslistfile, 'Zelda')
    if (isvoted(message, voterslistfile)) {
        client.reply(message.chatId, 'You have already voted in this poll!', message.id, true);
        return;
    }
    //console.log('flag2')
    let data = readJsonFile(pollfile)
    if (data['candis'] === 'null') {
        client.reply(message.chatId, 'There are no candidates in this poll!', message.id, true);
        return;
    }
    let arr = data['candis']
        // console.log(arr)
    for (let i = 0; i < arr.length; i++) {
        if (message.body.includes((i + 1)
                .toString())) {
            //console.log(i)
            addvote(client, message, i, pollfile);
            return;
        }
    }
    console.log('here')
    client.reply(message.chatId, 'Salah!!!', message.id, true);
}
async function addcandidate(client, message, candi, pollfile, voterslistfile) {
    if (await isGroupAdmin(client, message, message, message.author)) {
        //  console.log('admin logging')
    } else {
        client.reply(message.chatId, `Contact the group admin to add ${candi}`, message.id, true);
        return;
    }
    let data = readJsonFile(pollfile)
    if (data['candis'] === 'null') {
        //  let arra=[];
        let cd = {
            name: candi,
            votes: 0
        };
        // cd.put('name',candi);
        // cd.put('votes',0);
        // arra.push(cd);
        delete data['candis'];
        // data.put('candis',arra);
        data['candis'] = [cd, ]
    } else {
        if (data['candis'].length >= 9) {
            client.reply(message.chatId, 'You cannot add more than 9 candidates!', message.id, true);
            return;
        }
        let cd = {
            name: candi,
            votes: 0
        };
        data['candis'].push(cd);
    }
    //l(base.toString());
    saveJsonFile(pollfile, data)
    client.reply(message.chatId, `Successfully added ${candi} as a candidate`, message.id, true);
}

function addvote(client, message, num, pollfile, voterslistfile) {
    console.log(num)
    let data = readJsonFile(pollfile)
    let vts = data['candis'][num]['votes'];
    vts = vts + 1;
    delete data['candis'][num]['votes'];
    data['candis'][num]['votes'] = vts
    console.log(data)
    saveJsonFile(pollfile, data)
    let op;
    op = '*You choose ' + data['candis'][num]['name'] + '*\n* 🎯️ Poll : ' + data['title'] + '*\n';
    let ls = '';
    let arr = data['candis'];
    for (let i = 0; i < arr.length; i++) {
        let cd = arr[i];
        ls = ls + ((i + 1)
            .toString()) + ')' + cd['name'] + ' : [' + cd['votes'] + ' Votes] \n';
    }
    op = op + ls;
    op = op + '\n To vote please type !vote <number> \n [Exemplo *!vote 2*]';
    client.reply(message.chatId, op, message.id, true);
    addvotedlog(message);
}

function isvoted(message, voterslistfile) {
    let data = readJsonFile(voterslistfile)
        // console.log(data['list'])
    return data['list'].includes(message.author);
}

function addvotedlog(message) {
    let data = readJsonFile(voterslistfile)
    data['list'].push(message.author)
    saveJsonFile(voterslistfile, data);
}

function getpoll(client, message, pollfile, voterslistfile) {
    let data = readJsonFile(pollfile)
        //console.log(data)
    let op = '';
    if (data['candis'] == 'null') {
        op = '🎯️ *Poll : ' + data['title'] + '*\n No candidates! \n Use !addv <kandidat> to add candidates';
    } else {
        op = '🎯️ *Poll : ' + data['title'] + '*\n';
        let ls = '';
        let arr = data['candis'];
        for (let i = 0; i < arr.length; i++) {
            let cd = arr[i];
            ls = ls + (i + 1)
                .toString() + ')' + cd['name'] + ' : [' + cd['votes'] + ' Votes] \n';
        }
        op = op + ls;
        op = op + '\nTo vote please type !vote <number> \n [Exemplo *!vote 2*]';
    }
    client.reply(message.chatId, op, message.id, true)
}
async function adminpollreset(client, message, polltitle, pollfile, voterslistfile) {
    if (await isGroupAdmin(client, message, message.author)) {
        var datetime = new Date();
        //  savefile(todaysdate+'.json',getFile(pollfile));
        try {
            saveJsonFile('poll_logs.json', readJsonFile(pollfile))
        } catch (e) {
            console.log('backup não pode ser feito. Nenhum arquivo encontrado.')
        }
        let base = {
                title: polltitle,
                polldate: datetime.toISOString()
                    .slice(0, 10),
                candis: 'null'
            }
            //l(base.toString());
        saveJsonFile(pollfile, base)
        client.reply(message.chatId, `*🎉️ Successfully created a poll*\n\n 🎯️ *Title : ${polltitle}*\n \n⭐️ Use !addv <kandidat> to add candidates`, message.id);
        //voterresetter
        let data = {
            list: ['testentry']
        }
        saveJsonFile(voterslistfile, data);
    } else {
        client.reply(message.chatId, '*We are sorry that this feature can only be used by group admins!*', message.id)
    }
}
var configFiles = './configFiles/'

function readJsonFile(filename) {
    filename = configFiles + filename;
    let rawdata = fs.readFileSync(filename);
    return JSON.parse(rawdata);
}

function saveJsonFile(filename, object) {
    filename = configFiles + filename;
    // console.log('pokelog '+filename)
    var jsonContent = JSON.stringify(object);
    fs.writeFile(filename, jsonContent, 'utf8', function(err) {
        if (err) {
            console.log('An error occured while writing JSON Object to File.' + filename);
            return console.log(err);
        }
    });
}
async function isGroupAdmin(client, message, author) {
    let value = await client.getGroupAdmins(message.chatId)
    return value.toString()
        .includes(message.author)
}