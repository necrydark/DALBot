const Discord = require('discord.js');

const hug = [
    'https://i.imgur.com/0yvD1Re.gif'
]

module.exports = {
    name: 'Hug',
    aliases: ['hug'],
    description: 'Gives you a hug!',
    execute(message, args, client) {
        const index = Math.floor((Math.random() * hug.length));
        const target = message.mentions.users.first() || message.author;
        const newEmbed = new Discord.MessageEmbed()
            .setColor('#f5a2af')
            .setDescription(`${message.author}` + ' gives a hug to ' + `<@${target.id}>`)
            .setImage(hug[index])
            .setFooter(`Requested By: ${message.author.username}#${message.author.discriminator}`, client.user.displayAvatarURL({
                format: 'png',
                dynamic: true,
            }));
        message.channel.send(newEmbed);

    }
}