const Discord = require('discord.js');
const furryGay  = require("../database/imagens/furryPorn/furrygay.json");
//const db = require("megadb");

//et VipDB = new db.crearDB("Vip");

module.exports.run = async (client, message, args) => {
  /*
if(!VipDB.tiene(`${message.author.id}`))
      VipDB.establecer(`${message.author.id}`, {
        vip: 'No'
      })

  const vip = await VipDB.obtener(`${message.author.id}.vip`);

if(vip == 'No') return message.channel.send(`:x: |apenas para usuários **vips** :v`);
*/
const aff = message.guild.channels.cache.filter((channel) => channel.nsfw).map(x => "<#"+x.id+">" ).join(",")

 let teste;

if(aff){teste = `tente usar novamente em ${aff}`}else{teste = "este servidor não tem nenhum canal de texto com a função NSFW ativada :("}
  
if (!message.channel.nsfw) return message.channel.send(":x:|o canal não tem a função NSFW ativada, "+teste+"");

var randGay = Math.floor(Math.random() * furryGay.length)
  
let arr = furryGay
const embed = new Discord.MessageEmbed().setImage(furryGay[randGay])
.setColor("#7B68EE").setFooter(`${randGay} / ${arr.length-1}`)

const embedError2 = new Discord.MessageEmbed().setDescription("👍| cancelado!").setColor("#e0000f")

   
 let yeste = randGay
 let author = message.author;
  let msg;
  
  if(await message.channel.permissionsFor(message.member).has("ADD_REACTIONS")){
  msg = message.channel.send(embed);
  }else{
    message.channel.send(":(")
    msg = message.author.send(embed);
  }
  
  msg.then(async (msg) => {
      msg.react('⬅');
      msg.react("➡")
      msg.react("🔁")
      msg.react("❌")
  })

  msg = await msg
  const filter = (reaction, user) => ['⬅','➡','🔁','❌'].includes(reaction.emoji.name) && user.id === author.id;
  const collector = await msg.createReactionCollector(filter, { time: 1000*60*60 });
  collector.on('collect',async r => {
    let user = r.users.cache.last()
    user.id!=client.user.id&&r.users.remove(user);
      if(r.emoji.name === '➡'){
        yeste = yeste +1
        if(yeste > arr.length- 1){yeste = arr.length-1}
        
        let result = arr[yeste]
        const embed = new Discord.MessageEmbed().setImage(result).setColor("#7B68EE").setFooter(`${yeste} / ${arr.length-1}`)
      
        
        msg.edit(embed)
        
      }
      if(r.emoji.name === '⬅'){
        yeste = yeste - 1
        if(yeste < 0){yeste = 0}
       
        let result = arr[yeste]
        const embed = new Discord.MessageEmbed().setImage(result).setColor("#7B68EE").setFooter(`${yeste} / ${arr.length-1}`)
      
        msg.edit(embed)
    
      }
      if(r.emoji.name=== "🔁"){
randGay = Math.floor(Math.random() * furryGay.length)
  
arr = furryGay
yeste = randGay
const embed = new Discord.MessageEmbed().setImage(furryGay[randGay]).setColor("#7B68EE").setFooter(`${randGay} / ${arr.length-1}`)
msg.edit(embed)
      }
      if(r.emoji.name === "❌"){
        msg.edit(embedError2)
      
        msg.reactions.removeAll()
      }
  });

  collector.on('end', ()=>{if(msg){
    msg.reactions.removeAll()
  }});


};
exports.help = {
  name:"furry-gay",
  permisoes: "nenhuma",
  aliases: ["fg","gay-furry","furrygay"],
  description: "veja inagens furrys ||gays||",
  usage: "furry-gay"
}