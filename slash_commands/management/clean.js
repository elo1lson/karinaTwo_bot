let comando = require("../../frameworks/commando/command.js");
let Discord = require("discord.js"); 

class Command extends comando {
    constructor(...args) {
        super(...args, {
            name: "clean",
            description: "[ 👩‍⚖️administração ] limpar um canal de texto!",
            category: "management",
            permissions: {
                user: ["MANAGE_MESSAGES"],
                bot: ["MANAGE_MESSAGES"]
            },
            usage: "<quantia> [canal]",
            commandOptions: [
                {
                    type: 10,
                    name: "size",
                    description: "quantidade de mensagens a ser deletada",
                    minValue: 1,
                    maxValue: 100,
                    required: true
                },
                {
                    type: 7,
                    name: "channel",
                    description: "canal de texto onde eu irei limpar",
                    required: false
                }
            ]
        })
    }
    async interactionRun(interaction){
        let number = interaction.options.getNumber("size");
        let channel = interaction.options.getChannel('channel') || interaction.channel;

        if(!channel.isText()){
            return interaction.editReply({
                content: `:x:**|** *${channel.name}* não e um canal de texto!`
            })
        }
        channel.bulkDelete(number, true).then((x) => {
            let cout_result = (number - x.size);
            let STRING = `\u200B`
            if(cout_result > 0) STRING = `porém, **${cout_result}** massagens não foram deletadas por terem mais de 2 semanas`;

            interaction.editReply({
                content: `**${x.size} mensagens** limpas em *${channel.name}*!\n${STRING}`
            })
        })
    }
} 
module.exports = Command 
