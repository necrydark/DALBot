module.exports = {
    name: 'unmute',
    description: 'This command unmutes a member!',
    guildOnly: true,
    cooldown: 2,
    permissions: 'KICK_MEMBERS',
    execute(message, args, client) {

        const target = message.mentions.users.first();

        if (target) {
            let mainrole = message.guild.roles.cache.find(role => role.name === 'Humans');
            let mutedRole = message.guild.roles.cache.find(role => role.name === 'muted');

            let memberTarget = message.guild.members.cache.get(target.id);

            memberTarget.roles.remove(mutedRole.id);
            memberTarget.roles.add(mainrole.id);
            message.channel.send(`<@${memberTarget.user.id}>, has been unmuted`);

        } else {
            message.channel.send("Can't find that user");
        }
    }
}