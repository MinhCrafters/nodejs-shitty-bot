const prefix1 = require('discord-prefix');

let defaultPrefix = require('../config/bot.js').discord.prefix;

module.exports = (client, message) => {
    if (message.author.bot || message.channel.type === 'dm') return;

    let prefix = prefix1.getPrefix(message.guild.id);
    if (!prefix) prefix = defaultPrefix;

    if (message.content.indexOf(prefix) !== 0) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    const cmd = client.commands.get(command) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command));

    if (cmd) cmd.execute(client, message, args);
};