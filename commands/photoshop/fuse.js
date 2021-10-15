const Discord = require("discord.js");
const canvacord = require("canvacord");

module.exports.run = async (client, message, args) => {
 
  let avatar = message.author.displayAvatarURL({ dynamic: false, format: 'png' });
  let user = message.mentions.users.first() || client.users.fetch(args[0]);
  
  if (!user)return message.reply({content:'lembre-se de mencionar um usuário válido para misturar os avatares!'});

  let userf = user.displayAvatarURL({ dynamic: false, format: 'png' });

  let image = await canvacord.Canvas.fuse(avatar, userf);
  let attachment = new Discord.MessageAttachment(image, "changemymind.png");
  return message.reply({files:[attachment]})
}
exports.config = {
    test: true
}
exports.help = {
  name:"fuse",
  permisoes: "nenhuma",
  aliases: ["fusao"],
  description: "funda-se com algum usuário!",
  usage: "fuse <usuário>"
}