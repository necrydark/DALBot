const Levels = require('discord-xp');
const Discord = require('discord.js');


module.exports = {
    name: 'leaderboard',
    description: 'Displays the servers top 10 leveled users',
    guildOnly: true,
    cooldown: 5,

    async execute(message, args, client) {
        const rawLeaderboard = await Levels.fetchLeaderboard(message.guild.id, 10);

        if (rawLeaderboard.length < 1) return reply("Nobody's in the leaderboard yet");

        const leaderboard = await Levels.computeLeaderboard(client, rawLeaderboard, true);

        const lb = leaderboard.map(e =>
            `${e.position}. ${e.username}#${e.discriminator}\nLevel: ${
                e.level}\nXP: ${e.xp.toLocaleString()}`);

        const leaderboardEmbed = await new Discord.MessageEmbed()
            .setColor('BLUE')
            .setAuthor('LEADERBOARD')
            .setDescription(`${lb.join("\n\n")}`)
            .setTimestamp()
            .setFooter(client.user.username, client.user.displayAvatarURL());
        // message.channel.send(`**Leaderboard**:\n\n${lb.join("\n\n")}`);
        message.channel.send(leaderboardEmbed);

    },
};