const Discord = require('discord.js');
const botID = process.env.BOT_ID;

exports.run = async(client, message, args) => {

if (!message.member.hasPermission("BAN_MEMBERS")) return message.reply(`💢| desculpe mas você nao tem um cargo com a função BANIR MENBROS ativada!`);


  if (!message.guild.me.hasPermission("BAN_MEMBERS")) return message.reply('eu preciso de permissão para isso!');

        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!member) return message.inlineReply('você precisa mencionar um usuário!');
        if (member === message.member) return message.inlineReply('você não pode se banir!');
        if (member.id === botID) return message.inlineReply('você não pode me banir!');
    
    if (!message.member.roles.highest > member.roles.highest) return message.inlineReply(`você não pode punir esse membro, pois ele tem o cargo mais maior que o seu!`); // 
    
        if (!message.guild.me.roles.highest > member.roles.highest) return message.inlineReply(`eu não posso punir o membro, pois ele tem o cargo maior que o meu!`); 
    
        if (!member.bannable) return message.inlineReply(`você não pode punir o membro, pois esse membro não é **Banivel**`); 
        

        let motivo = args.slice(1).join(" ");
        if (!motivo) return message.inlineReply('você precisa dar um motivo!');

        message.channel.send(`😡| o usuário ${member} foi banido com sucesso por causa de: **${motivo}**`);
        member.ban({reason:motivo});
}
exports.help = {
  name:"ban",
  permisoes: "banir membros",
  aliases: ["banir","chutar","martelo-poderoso"],
  description: "de um belo de um BAN em usuários que quebram regras",
  usage: "ban <usuario> <motivo>"
}