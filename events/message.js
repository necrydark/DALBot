const Levels = require('discord-xp');

module.exports = {
    name: 'message',
    async execute(message, client) {
        if (!message.guild) return;
        if (message.author.bot) return;
        if (message.channel.type == 'dm') return;


        const randomXP = Math.floor(Math.random() * 29) + 1;
        const hasLeveledUp = await Levels.appendXp(message.author.id, message.guild.id, randomXP);
        if (hasLeveledUp) {
            // const user = await Levels.fetch(message.author.id, message.guild.id);
            client.channels.cache.get(`856221208982585385`).send(`${message.author}, You have leveled up! <:kotoriwow:853551782453837864>`);
            // message.channel.send(`${message.member}, You have leveled up! +${user.level}, Level(s)`)
        }


        if (!message.content.startsWith(client.prefix)) return;

        const args = message.content.slice(client.prefix.length).split(/ +/);
        const commandName = args.shift().toLowerCase();

        if (!client.commands.has(commandName)) return;

        const command = client.commands.get(commandName);

        try {
            command.execute(message, args, client);
        } catch (err) {
            console.log(err);
        }
    },
};