const ms = require('ms');

module.exports = {
    name: 'mute',
    description: 'This command mutes a member!',
    guildOnly: true,
    cooldown: 2,
    permissions: 'KICK_MEMBERS',
    execute(message, args, client) {
        const target = message.mentions.users.first();


        if (target) {
            let mainrole = message.guild.roles.cache.find(role => role.name === 'Humans');
            let mutedRole = message.guild.roles.cache.find(role => role.name === 'muted');


            let memberTarget = message.guild.members.cache.get(target.id);
            if (!args[1]) {
                memberTarget.roles.remove(mainrole.id);
                memberTarget.roles.add(mutedRole.id);
                message.channel.send(`<@${memberTarget.user.id}>, has been muted for ${ms(ms(args[1]))}`)
                return message.channel.send('Wrong Syntax [~] [@user] [time]');
            }
            memberTarget.roles.remove(mainrole.id);
            memberTarget.roles.add(mutedRole.id);
            message.channel.send(`<@${memberTarget.user.id}>, has been muted for ${ms(ms(args[1]))}`);
            setTimeout(function () {
                memberTarget.roles.remove(mutedRole.id);
                memberTarget.roles.add(mainrole.id);

            }, ms(args[1]));
        } else {
            message.channel.send('Wrong Syntax [~] [@user] [time]');
        }
    }
}