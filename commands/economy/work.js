//import the package
const DiscordEconomy = require("../../Economy.js");

const Discord = require('discord.js');


// for balance commands
let balance = new DiscordEconomy.Balance();

module.exports = {
    name: 'work',
    description: 'Work to make money',
    guildOnly: true,
    cooldown: 3600,
    execute(message, args, client) {
        var r = Math.floor(Math.random() * (200 - 100) + 1) + 100;
        balance.add(message.author.id, r); // adding to database
        const workEmbed = new Discord.MessageEmbed()
            .setColor('BLUE')
            .setDescription(`You got ${r} coins ${message.author.username}`);
        message.channel.send(workEmbed)
        // message.reply(`you got ${r} coins.`);
    }

}