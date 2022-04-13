//import the package
const DiscordEconomy = require("../../Economy.js");

// for balance commands
let balance = new DiscordEconomy.Balance();

module.exports = {
    name: 'add',
    description: 'Add money to a user',
    guildOnly: true,
    permissions: 'ADMINISTRATOR',
    execute(message, args, client) {


        let amount = Number(args[1]);


        balance.add(message.mentions.users.first().id, amount);
        message.channel.send(`Give \`${amount}\` coins to <@!${message.mentions.users.first().id}>`);


    }

}