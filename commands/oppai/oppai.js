//Array for the gifs
const oppai = [
    "https://i.imgur.com/FgX9quK.gif",
    "https://i.imgur.com/bB6Irp2.gif",
    "https://i.imgur.com/JjfC68G.gif",
    "https://i.imgur.com/6o6MUdn.gif",
    "https://i.imgur.com/s2yi5mu.gif",
    "https://i.imgur.com/X6S49UG.gif",
    "https://i.imgur.com/HeHNvBT.gif",
    "https://i.imgur.com/BruQlgV.gif",
    "https://i.imgur.com/q4TcONo.gif",
    "https://i.imgur.com/JNOAmKY.gif",
    "https://i.imgur.com/7uio6aw.gif",
    "https://i.imgur.com/7pULoum.gif",
    "https://i.imgur.com/L8ie8Ih.gif",
    "https://i.imgur.com/wBudodJ.gif",
    "https://i.imgur.com/6egEh9J.gif",
    "https://i.imgur.com/h7saG8r.gif",
    "https://i.imgur.com/rBSicDZ.gif",
    "https://i.imgur.com/7R84ioC.gif",
    "https://i.imgur.com/45wWi3z.gif",
    "https://i.imgur.com/xp1y5jj.gif",
    "https://i.imgur.com/RhYBH40.gif",
    "https://i.imgur.com/727frxX.gif",
    "https://i.imgur.com/CEgq0ae.gif",
    "https://i.imgur.com/9N4xrx1.gif",
    "https://i.imgur.com/wcRfXsz.gif",
    "https://i.imgur.com/tHdO2iT.gif",
    "https://i.imgur.com/vHwJxbS.gif",
    "https://i.imgur.com/ySamDDY.gif",
    "https://i.imgur.com/lLKwDbj.gif",
    "https://i.imgur.com/69ZQt8y.gif",



]

module.exports = {
    name: 'Oppai',
    aliases: ['Boob', 'oppai'],
    description: 'Sends booba',
    execute(message, args, client) {
        if (message.channel.id === '864517355206737942') {
            const index = Math.floor() * oppai.length;
            message.channel.send(oppai[index]);
        }

    }
}