let comando = require("../../frameworks/commando/command.js");
let { economydb } = require("../../mongoDB/ini.js").user 

let Discord = require("discord.js"); 

class Command extends comando {
    constructor(...args) {
        super(...args, {
            name: "panther_coins",
            description: "[ 💸economia ] veja quantos Panther-coins você tem em meu sistema de economia!",
            category: "economy",
            usage: "[usuário]",
            subCommands: [],
            commandOptions: [
                {
                    name: "user",
                    description: "mensão de usuário",
                    type: 6,
                    required: false
                }
            ]
        })
    }
    async interactionRun(interaction){
        let user = interaction.options.getUser('user') || interaction.user;

        let value = await economydb.fech(user);

        if(user.id == interaction.user.id){
            return interaction.reply({
                content: `você tem **${value.coins}** panther-coins!`
            })
        } else {
            return interaction.reply({
                content: `o usuário ***${user.tag}*** tem **${value.coins}** panther-coins!`
            })
        }
    }
} 
module.exports = Command 
