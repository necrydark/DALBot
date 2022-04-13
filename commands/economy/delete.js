//import the package
const DiscordEconomy = require("../../Economy.js");

// for balance commands
let balance = new DiscordEconomy.Balance();

module.exports = {
    name: 'delete',
    description: 'Add money to a user',
    guildOnly: true,
    permissions: 'ADMINISTRATOR',
    execute(message, args, client) {


        let amount = Number(args[1]);


        balance.delete(message.mentions.users.first().id, amount);
        message.channel.send(`Delete \`${amount}\` coins from <@!${message.mentions.users.first().id}>`);


    }

}