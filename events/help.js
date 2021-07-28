const Discord = require("discord.js")

exports.type = "message";
exports.start = async(client,clusterID,ipc,message) => {
	if (!message.guild) return;
	mention(client, message)
}

async function mention (client, message) {

  const servers = [
    `<@!${client.user.id}>`,
    `<@${client.user.id}>`,
    `karinaTwo prefix`,
    `karinaTwo prefix?`,
    `KarinaTwo#5954`
  ];
  if (servers.includes(message.content)) {

    let db = require('megadb')

    let PrefixDB = new db.crearDB("Prefix");

    if (!PrefixDB.tiene(`${message.guild.id}`))
    PrefixDB.establecer(`${message.guild.id}`, {
      name: message.guild.name,
      prefix: "f/"
    });

    let prefixoAtual = await PrefixDB.obtener(`${message.guild.id}.prefix`);

    const embed = await new Discord.MessageEmbed()
        .addField(`Meu Prefixo Neste Servidor:`, "`" + prefixoAtual + "`")
        .setColor("#ff47ec")

    message.channel.send(embed) 
  }
}