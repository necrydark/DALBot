module.exports = {
    name: 'ban',
    description: 'This command bans a member!',
    guildOnly: true,
    cooldown: 5,
    permissions: 'BAN_MEMBERS',
    execute(message, args, client) {
        const adminRole = message.guild.roles.cache.find(r => r.id === '853539191514595330')
        const member = message.mentions.users.first();
        if (message.member.roles.cache.has(adminRole.id)) {
            if (member) {
                const memberTarget = message.guild.members.cache.get(member.id);
                memberTarget.ban();
                message.channel.send(`${memberTarget.user.tag}, has been ban`)
            } else {
                message.channel.send("You couldn't ban that member");
            }
        }
    }
}