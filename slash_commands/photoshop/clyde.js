let comando = require("../../frameworks/commando/command.js");

let Discord = require("discord.js"); 
let canvacord = require("canvacord");

class Command extends comando {
    constructor(...args) {
        super(...args, {
            name: "clyde",
            description: "[ 📷photoshop ] o clyde (o bot do discord) quer falar algo para você!",
            category: "photoshop",
            usage: "<texto>",
            commandOptions: [
                {
                    type: 3,
                    name: "text",
                    description: "um texto ai",
                    required: true
                }
            ]
        })
    }
    async interactionRun(interaction){
        let text = interaction.options.getString('text')
        let image = await canvacord.Canvas.clyde(text);
        let attachment = new Discord.MessageAttachment(image, `${this.name}.png`);
        
        interaction.reply({
            files: [attachment]
        });
    }
} 
module.exports = Command 