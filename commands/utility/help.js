const Discord = require('discord.js');

module.exports = {
    name: 'help',
    description: 'List all of my commands or info about a specific command.',
    aliases: ['commands'],
    usage: '[command name]',
    cooldown: 0,
    async execute(message, args, client) {

        const prefix = "*";
        if (message.content == '*help') {
            const helpEmbed = await new Discord.MessageEmbed()
                .setColor('BLUE')
                .setAuthor('Kotori Commands', client.user.displayAvatarURL())
                .setDescription('Provides help with all of the commands, please use the corresponding options below to get help with these commands')
                .addFields({
                    name: '**Economy**',
                    value: '`*help economy`',
                    inline: true
                }, {
                    name: '**Levels**',
                    value: '`*help levels`',
                    inline: true
                })
                .setFooter(client.user.username, client.user.displayAvatarURL());
            message.channel.send(helpEmbed)
        }


        if (message.content == '*help levels') {
            const levelsEmbed = await new Discord.MessageEmbed()
                .setColor('BLUE')
                .setTitle('**Comamnd Help**')
                .setDescription('Provides help with all of the level commands')
                .addFields({
                    name: '`*level (optional member)`',
                    value: '**Shows the level of the user and if you @ an user you can show their level**',

                }, {
                    name: '`*leaderboard`',
                    value: '**Shows the top 10 people**',

                })

                .setFooter(client.user.username, client.user.displayAvatarURL());
            message.channel.send(levelsEmbed)
        }
        if (message.content == '*help economy') {
            const levelsEmbed = await new Discord.MessageEmbed()
                .setColor('BLUE')
                .setTitle('**Comamnd Help**')
                .setDescription('Provides help with all of the economy commands')
                .addFields({
                    name: '`*lb [balance]`',
                    value: '**Shows the top 10 richest people in the server**',

                }, {
                    name: '`*work`',
                    value: '**Gain money worth 100-200 coins**',

                }, {
                    name: '`*balance, *bal, *b`',
                    value: '**Shows your balance**',

                }, {
                    name: '`*slots [coin] [amount]`',
                    value: '**Plays slots**',

                }, {
                    name: '`*coinflip, *cf [coin] [amount] [choice]`',
                    value: '**Shows the top 10 people**',

                }, {
                    name: '`*transfer, *give [coin] [amount] [user]`',
                    value: '**Give money to people**',

                })
                .setFooter(client.user.username, client.user.displayAvatarURL());
            message.channel.send(levelsEmbed)
        }

    }
};