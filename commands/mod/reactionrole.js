const Discord = require('discord.js');
module.exports = {
    name: 'reactionrole',
    description: "Sets up a reaction role message",
    guildOnly: true,
    cooldown: 5,
    permissions: 'ADMINISTRATOR',
    async execute(message, args, client) {
        const channel = '853590430750081034';
        const animeRole = message.guild.roles.cache.find(role => role.id === '853592716276269056');
        const lightNovelRole = message.guild.roles.cache.find(role => role.id === '853593057592737832');

        const animeRoleEmoji = '🔲';
        const lightNovelEmoji = '🎫';

        let embed = new Discord.MessageEmbed()
            .setColor('#e42643')
            .setTitle('Choose whether you are a Anime or Light Novel user!')
            .setDescription('Choosing either one will allow you access to certain chats to avoid spoilers!\n\n' +
                `${animeRoleEmoji} for Anime Only` +
                ` ${lightNovelEmoji} for Light Novel Only`);
        let messageEmbed = await message.channel.send(embed);
        messageEmbed.react(animeRoleEmoji);
        messageEmbed.react(lightNovelEmoji);

        client.on('messageReactionAdd', async (reaction, user) => {
            if (reaction.message.partial) await reaction.message.fetch();
            if (reaction.partial) await reaction.fetch();
            if (user.bot) return;
            if (!reaction.message.guild) return;

            if (reaction.message.channel.id == channel) {
                if (reaction.emoji.name === animeRoleEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(animeRole);

                }
                if (reaction.emoji.name === lightNovelEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(lightNovelRole);
                }
            } else {
                return;
            }
        });

        client.on('messageReactionRemove', async (reaction, user) => {
            if (reaction.message.partial) await reaction.message.fetch();
            if (reaction.partial) await reaction.fetch();
            if (user.bot) return;
            if (!reaction.message.guild) return;

            if (reaction.message.channel.id == channel) {
                if (reaction.emoji.name === animeRoleEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(animeRole);

                }
                if (reaction.emoji.name === lightNovelEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(lightNovelRole);
                }
            } else {
                return;
            }
        });
    }

}