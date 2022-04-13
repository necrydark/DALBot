module.exports = {
    name: 'rules',
    description: "Display's the rules inside of the rules chat",
    guildOnly: true,
    cooldown: 5,
    permissions: 'ADMINISTRATOR',
    execute(message, args, Discord, client) {
        const channel = '853590430750081034';

        if (message.channel.id == channel) {
            let embed = new Discord.MessageEmbed()
                .setColor('#e42643')
                .setTitle('Rules')
                .setDescription("1. Be respectful - Racism, Sexism and discrimination will not be tolerated, you must know people's boundaries when making jokes.\n" +
                    "2. Slurs are strictly prohibited - Anything from (racial, homophobic, albeist) are not allowed. Doesn't matter who you are you will be removed.\n" +
                    "3. No harassment - This will include harassment inside the server and DMs\n" +
                    "4. Keep the content in their channels\n" +
                    "5. NSFW content will need to be posted in the NSFW channels breaching this rule will result in you to have a warning. This will also apply to usernames, if you post any form of CP you will be removed and reported to the Discord Safety team.\n" +
                    "6. No Advertisement of other servers - Advertising of other servers in DMs and in the server is not allowed.\n" +
                    "7. No raiding other servers - this includes spam and spam pinging, flashing emotes, earrape, raiding voice chats.\n" +
                    "8. No doxxing - Don't release any personal information in DMs or within the server. You will be banned.\n" +
                    "9. Listen to the staff - Their decisions are final, don't go against our words.\n" +
                    "10. Keep sensitive topics such as politics and religion out of the server or in their respected channels.\n" +
                    "11. Have integrity - Don't bring alt accounts into the server to avoid bans or warnings, own up to your mistakes.\n" +
                    "12. No paedophilia tendencies and predatory behaviour. - This will results in an instant ban.\n" +
                    "13. Keep all chats mainly english.")
            message.channel.send(embed);
        }
    }

}