module.exports = {
    name: 'clear',
    description: 'Clears messages from 2-300 messages',
    guildOnly: true,
    cooldown: 5,
    permissions: 'ADMINISTRATOR',
    async execute(message, args, client) {
        if (!args[0]) return message.reply("Please enter the amount of messages that you want to clear!");
        if (isNaN(args[0])) return message.reply("Please enter a real number!");

        if (args[0] > 100) return message.reply("you cannot delete more than 100 messages!");
        if (args[0] < 2) return message.reply("You must delete atleast two messages!");

        await message.channel.messages.fetch({
            limit: args[0]
        }).then(messages => {
            message.channel.bulkDelete(messages);
        })
    }
}