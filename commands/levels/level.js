const Levels = require('discord-xp');
const Discord = require('discord.js');

const canvacord = require('canvacord');





module.exports = {
    name: 'level',
    permissions: 'SEND_MESSAGES',
    description: 'Returns a level of someone',
    guildOnly: true,
    cooldown: 5,
    async execute(message, args, client) {

        const target = message.mentions.users.first() || message.author;
        const user = await Levels.fetch(target.id, message.guild.id, true);
        const neededXp = Levels.xpFor(parseInt(user.level) + 1);
        if (!user) return message.channel.send("This user has not earned any XP");
        if (user.level.xp == 0) return message.channel.send("You have earned no XP");
        const rank = new canvacord.Rank()

            .setAvatar(target.displayAvatarURL({
                format: 'png',
                dynamic: true
            }))


            .setCurrentXP(user.xp)
            .setRequiredXP(neededXp)
            .setStatus(target.presence.status, true, true)
            .setRank(user.position)
            .setLevel(user.level)
            .setProgressBar('#b41a1e', "COLOR", true)
            .setProgressBarTrack('#583635')
            .setUsername(target.username)
            .setDiscriminator(target.discriminator);

        rank.build()
            .then(data => {
                const attachment = new Discord.MessageAttachment(data, "RankCard.png");
                if (message.channel.id == '856222136058249227') {
                    message.channel.send(attachment);

                }
            });
    }
}