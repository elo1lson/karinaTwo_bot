const Discord = require("discord.js");
let {configs} = require("../mongoDB/ini.js").guild 

exports.run = async (client, message, args) => {
  
  const f = "🚫";
  let on = `✔️ ativado`;
  let off = `⚠️ desativado`;

if(!message.member.permissions.has("ADMINISTRATOR"))return message.channel.send("Somente adms")

  let stats = await configs.getConfig(message.guild,true)

  if(stats.error) await configs.newGuild(message.guild)
  
  if(!stats.antiraid)on = off
  
  const embed = new Discord.MessageEmbed()
    .setDescription("**Configurações Atualizadas**")
    .addField("Status:", on).setColor("#e0000f")
    
  const embed1 = new Discord.MessageEmbed()
    .setDescription("**Configurações Atuais**")
    .addField("Status:", on).setColor("#e0000f")

  const command = args[0]

  if(command === 'info') return message.channel.send(embed1);

  if(!command) return message.channel.send(`${f} | Você não forneceu o subcomando do módulo.`)
  
if(command === "ativar") {
  
  if(stats.antiraid) return message.channel.send(`${f} | O módulo já está ligado.`)
 
    configs.setConfig({antiraid:true},message.guild).then(
      message.channel.send("✔️| o modulo foi ativado!\no seu servidor esta seguro contra raids")
    );
  
}
  
if(command === "desativar") {
  
  if(!stats.antiraid) return message.channel.send(`${f} | O módulo já está desligado.`)
  
  
    configs.setConfig({antiraid:false},message.guild).then(
      message.channel.send("⚠️|o módulo foi desativado\no seu servidor esta desprotegido contra raids!!")
      );
    
  }

  if (command === 'help') {
    const embedHelp = new Discord.MessageEmbed()
    .setDescription("**anti-raid Ajuda**")
    .addField("Comandos:",
              "• **info** -> Mostra as configurações do anti-raid\n" +
              "• **ativar/desativar** -> Ativa/Desativa o módulo de proteção contra raids/floods"
             )

      message.channel.send(embedHelp)
  }
};
exports.help = {
  name:"antiraid",
  permisoes: "administrador",
  aliases: ["antispan","contra"],
  description: "ativar e desativar o modulo anti-raid",
  usage: "antiraid <ativar,desativar>"
}