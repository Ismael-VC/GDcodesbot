const Discord = require("discord.js");
const config = require("./package.json");
const client = new Discord.Client();
const prefix = config.prefix;
var avroles = ["python", "php", "javascript", "webdesign", "Java", "C++", "Julia"];

client.on('ready', () => {
    console.log(`Logged in as ${client.user.username}!`);
    //client.user.setGame('with code');
});

client.on('reconnecting', () => {
    console.log(`Reconnecting`);
});

client.on('disconnect', e => {
    console.log(`Disconnected: ${e}`);
});

/*client.on('debug', e => {
  console.log(`Debug: ${e}`);
});*/

client.on('error', e => {
    console.log(`Error: ${e}`);
});

client.on('warn', e => {
    console.log(`Warn: ${e}`);
});

client.on('guildMemberAdd', member => {
    let guild = member.guild;
    guild.defaultChannel.send(`Welcome ${member.user} to GlitchyDevs.Codes!`);
});

client.on('message', message => {
    if (!message.content.startsWith(prefix)) return;
    if (!message.guild) return;
    if (!message.guild.available) return;
    if (message.author.bot) return;

    console.log(message.author.username + ': ' + message);

    let command = message.content.split(" ")[0].slice(prefix.length);
    let args = message.content.split(" ").slice(1);

    if(command === 'help'){
        return message.channel.send("```css\n>addrole [name of role] : Used to give yourself a role\n>roles : view all the roles you can give yourself\n>ping : measure the time it takes for the bot to read your message and reply back to you\n```");
    } else

    if(command === 'addrole') {
        if (!message.guild.member(client.user).hasPermission('MANAGE_ROLES_OR_PERMISSIONS')) return message.channel.send(":negative_squared_cross_mark: I do not have permissions to manage roles :(").catch(console.error);
        if (args.length == 0) return message.channel.send(":negative_squared_cross_mark: Please add the name(s) of the role/roles that you would like to receive");
        let role = message.guild.roles.find("name", args[0]);
        if (role == null) return message.channel.send(":negative_squared_cross_mark: Role was not found! (case sensitive)");
        let member = message.guild.member(message.author);
        if (avroles.indexOf(role.name) != -1) {
            if (member.roles.has(role.id)) return message.channel.send(":negative_squared_cross_mark: You already have this role!");
            member.addRole(role).catch(console.error);
            return message.channel.send(":white_check_mark: Successfully added the role!");       
        }
        return message.channel.send(":negative_squared_cross_mark: You are not allowed to add that role! Use '>roles' to see which roles you can receive!");
    } else

    if(command === 'roles') {
       let list = avroles.map((n, i) => (i+1) + `. ${n}\r\n`);
       return message.channel.send("```md\nYou can receive the following roles using the '>addrole' command (case sensitive):\n" + list.join("") + "```");
    } else

    if (command === 'ping') {
        return message.channel.send(`Pong! \`${Date.now() - message.createdTimestamp} ms!\``);
    }
});

client.login(config.token);