module.exports = {
    name: 'kick',
    description: 'This command kicks a member!',
    guildOnly: true,
    cooldown: 5,
    permissions: 'KICK_MEMBERS',
    execute(message, args, client) {

        const member = message.mentions.users.first();



        if (member) {
            const memberTarget = message.guild.members.cache.get(member.id);
            memberTarget.kick();
            message.channel.send(`${memberTarget.user.tag}, has been kicked`)
        } else {
            message.channel.send("You couldn't kick that member");
        }

    }
}