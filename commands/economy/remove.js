//import the package
const DiscordEconomy = require("../../Economy.js");

// for balance commands
let balance = new DiscordEconomy.Balance();

module.exports = {
    name: 'remove',
    description: 'removes money to a user',
    guildOnly: true,
    permissions: 'ADMINISTRATOR',
    execute(message, args, client) {


        let amount = Number(args[1]);


        balance.subtract(message.mentions.users.first().id, amount);
        message.channel.send(`Removed \`${amount}\` coins from ${message.mentions.users.first().id}`);


    }

}