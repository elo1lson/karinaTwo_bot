let comando = require("../../frameworks/commando/command.js");

let Discord = require("discord.js"); 
let canvacord = require("canvacord");

class Command extends comando {
    constructor(...args) {
        super(...args, {
            name: "triggered",
            description: "[ 📷photoshop ] deixe um usuário com raiva!",
            category: "photoshop",
            usage: "[usuário]",
            commandOptions: [
                {
                    type: 6,
                    name: "user",
                    description: "usuário (@user/id) a ficar com raiva",
                    required: false
                }
            ]
        })
    }
    async interactionRun(interaction){
        await interaction.deferReply({ ephemeral:  this.deferReply}).catch(() => {});
       // console.log(interaction)
        let url = (interaction.options.getUser('user') ?? interaction.user).displayAvatarURL({ dynamic: false, format: 'png', size: 1024 });
        let image = await canvacord.Canvas.trigger(url);
        let attachment = new Discord.MessageAttachment(image, `${this.name}.gif`);
        
        interaction.editReply({
            files: [ attachment ]
        });
    }
} 
module.exports = Command 