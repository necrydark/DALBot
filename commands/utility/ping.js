module.exports = {
    name: 'ping',
    description: 'Edits a users level or XP',
    execute(message, args, client) {
        message.channel.send('Pong.');
    }
}