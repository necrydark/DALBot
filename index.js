const fs = require('fs');

//import the package
const DiscordEconomy = require("./Economy");

// for balance commands
let balance = new DiscordEconomy.Balance();


const Discord = require('discord.js');
const client = new Discord.Client({
    partials: ["MESSAGE", "CHANNEL", "REACTION"]
});
const levels = require('discord-xp');
const mongoose = require('./database/mongoose');
const config = require('./config.json');

const ms = require('ms');

levels.setURL(`mongodb+srv://dark:${process.env.PASS}@discordbot.yeaiy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`);
const userPresence = ({
    activity: {
        name: 'Prefix: * | *help',
        type: 'PLAYING'
    },
    status: 'idle'
});

const prefix = "*"
client.cooldowns = new Discord.Collection();
client.commands = new Discord.Collection();

//Reading the event files
const eventFiles = fs.readdirSync('./events/').filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args, client));
    } else {
        client.on(event.name, (...args) => event.execute(...args, client));
    }
}

//Reading the command files
const commandFolders = fs.readdirSync('./commands');

for (const folder of commandFolders) {
    const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const command = require(`./commands/${folder}/${file}`);
        client.commands.set(command.name, command);
    }
}


client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setPresence(userPresence);
});


client.on('guildMemberAdd', guildMember => {

    let welcomeRole = guildMember.guild.roles.cache.find(r => r.name === 'Humans');
    const targetChannelID = '853590430750081034';
    let embed = new Discord.MessageEmbed()
        .setTitle(`Welcome to ${guildMember.guild.name}`)
        .setDescription(`Hello <@${guildMember.user.id}>, Welcome to the **${guildMember.guild.name}**. Thanks for joining our server!
        Please read the rules in ${guildMember.guild.channels.cache.get(targetChannelID).toString()}, and have a good time!`)
        .addFields({
            name: 'Prefix',
            value: 'To use our bot the prefix is ` * ` '
        }, {
            name: 'Work',
            value: 'Before giving coins to people in work you need to type *work first then you can transfer coins!'
        })

        .setColor('#e42643')
        .setAuthor('Date A Live Community Server')
        .setThumbnail("https://i.imgur.com/IqlijFX.jpg")
        .setFooter(`Welcome ${guildMember.user.username}#${guildMember.user.discriminator}`, guildMember.user.displayAvatarURL({
            dynamic: true,
            size: 512
        }));



    guildMember.roles.add(welcomeRole);
    guildMember.guild.channels.cache.get('853584989610311680').send(`Welcome <@${guildMember.user.id}>`, {
        embed
    });
});

client.on('guildMemberRemove', guildMember => {
    guildMember.guild.channels.cache.get('853584989610311680').send(`Goodbye **${guildMember.user.tag}**, <:WhiteQueenAngry:855510133412855868>`);
})



client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) return;

    if (command.guildOnly && message.channel === 'dm') {
        return message.reply('I can\'t execute that command inside DMs!');
    }

    if (command.permissions) {
        const authorPerms = message.channel.permissionsFor(message.author);
        if (!authorPerms || !authorPerms.has(command.permissions)) {
            return message.reply('You do not have the right permissions for this.');
        }

    }



    const {
        cooldowns
    } = client;

    if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Discord.Collection());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 3) * 1000;

    if (timestamps.has(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

        if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
        }
    }

    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);


    try {
        command.execute(message, args, client);
    } catch (error) {
        console.error(error);
        message.reply('there was an error trying to execute that command!');
    }




});




//discord.js MESSAGE event
client.on("message", (message) => {
    if (!message.content.toLowerCase().startsWith(prefix) || message.author.bot)
        return;

    const args = message.content.slice(prefix.length).split(" ");
    const command = args.shift().toLowerCase();

    switch (command) {





        case "balance": // sample balance command
        case "bal": //  alias "bal"
        case "b": //  alias "b"
            const balanceEmbed = new Discord.MessageEmbed()
                .setColor('BLUE')
                .setDescription("You have " + balance.fetch(message.author.id) + " coins.");
            message.channel.send(balanceEmbed);
            // message.reply("you have " + balance.fetch(message.author.id) + " coins."); // fetching from database

            break;




        case "lb": //  alias "lb"
            /* 
              NOTE - You can use a function as a argument, and it will automatically map it
                     OR you can use the map function on your own and make the leaderboard as per your choice
              */

            if (!args[0] || (args[0] !== "balance"))
                return message.reply(
                    "incorrect syntax. Correct Syntax is `" +
                    prefix +
                    command +
                    " [balance]`"
                );

            if (args[0].toLowerCase() === "balance") {
                const leaderboard = balance
                    .leaderboard(
                        (id, amount, position) =>
                            `No. **${position}**: <@!${id}> (${amount} coins)`
                    )
                    .join("\n");
                const embed = new Discord.MessageEmbed()
                    .setDescription(leaderboard)
                    .setTitle("Leaderboard (Balance)");

                message.channel.send(embed);
            }

            break;
        case "slots": // sample slots command
            {
                if (!args[0] || (args[0] !== "coin"))
                    return message.reply(
                        "incorrect syntax. Correct Syntax is `" +
                        prefix +
                        command +
                        " [coin] [amount]`"
                    );
                if (Number.isNaN(Number(args[1]))) {
                    return message.reply("amount can only be a number.");
                }

                let amount = Number(args[1]);

                if (args[0].toLowerCase() === "coin") {
                    if (amount > balance.fetch(message.author.id)) {
                        return message.reply("you don't have enough coins!");
                    }
                    const slots = balance.slots(
                        message.author.id, // ⇦ Id
                        amount, // ⇦ Amount to bet
                        [
                            "🍎",
                            "🍌",
                            "🍿", // ⇦ Items array
                            "🍨",
                            "🍇",
                        ],
                        3 // ⇦ Number of items to take into consideration, put "undefined" for default 3
                    );
                    message.channel.send(
                        slots.board.join("  ") +
                        "\n" +
                        `**${message.author.username}** ${slots.win ? "won" : "lost"}`
                    );
                }
            }
            break;

        case "coinflip": // sample slots command
        case "cf": //  alias "cf"
            {
                if (
                    !args[0] ||
                    (args[0] !== "coin") ||
                    !args[1] ||
                    !args[2]
                )
                    return message.reply(
                        "incorrect syntax. Correct Syntax is `" +
                        prefix +
                        command +
                        " [coin] [amount] [choice]`"
                    );
                if (Number.isNaN(Number(args[1]))) {
                    return message.reply("amount can only be a number.");
                }
                let choice = args[2];
                let amount = Number(args[1]);

                if (!["h", "head", "heads", "t", "tail", "tails"].includes(choice)) {
                    return message.reply(
                        "choice can only be one of the following:\n" + ["h", "head", "heads", "t", "tail", "tails"]
                            .map((c) => "`" + c + "`")
                            .join(" or ")
                    );
                }

                if (args[0].toLowerCase() === "coin") {
                    if (amount > balance.fetch(message.author.id)) {
                        return message.reply("you don't have enough coins!");
                    }

                    const cf = balance.coinflip(message.author.id, amount, choice);
                    message.channel.send(
                        "Your Choice: " +
                        choice +
                        "\nWanted coin: " +
                        cf.coin +
                        `\n**${message.author.username}** ${cf.win ? "won" : "lost"}`
                    );
                }
            }
            break;

        case "transfer": // sample transfer command
        case "give": // alias "give"
            {
                if (
                    !args[0] ||
                    !args[1] ||
                    !args[2] ||
                    (args[0].toLowerCase() !== "coin" && args[0].toLowerCase() !== "gem")
                )
                    return message.reply(
                        `wrong syntax!\nCorrect Syntax is - \`${prefix}${command} [coin] [amount] [user]\``
                    );

                let amount = Number(args[1]);
                let user = args[2];
                if (
                    Number.isNaN(amount) ||
                    amount <= 0 ||
                    !user.startsWith("<@!") ||
                    !user.endsWith(">")
                )
                    return message.reply(
                        `wrong syntax!\nCorrect Syntax is - \`${prefix}${command} [coin] [amount] [user]\``
                    );

                user = user.slice(3, -1);
                const target = message.mentions.users.first();

                if (args[0].toLowerCase() === "coin") {
                    if (balance.fetch(message.author.id) < amount)
                        return message.reply("you don't have enough coins!");
                    if (balance.fetch(user) <= 0) {
                        return message.reply("User doesn't have enough coins!");
                    }
                    balance.transfer({
                        from: message.author.id,
                        to: user,
                        amount: amount,
                    });
                    message.reply(`transfered \`${amount}\` coins to <@!${user}>`);
                }
            }
            break;
        default:

            break;
    }
});


mongoose.init();
client.login(config.token);