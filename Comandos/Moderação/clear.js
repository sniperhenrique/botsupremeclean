const Discord = require("discord.js")

module.exports = {
    name: "clear", 
    description: "[Moderação] Use para apagar um certo numero de mensagens!", 
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: 'quantidade',
            description: 'Digite qual a quantidade de mensagens para eu apagar!',
            type: Discord.ApplicationCommandOptionType.Number,
            required: true,
        }
    ],

    run: async (client, interaction) => {

        let numero = interaction.options.getNumber('quantidade')

        if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageMessages)) {
            interaction.reply({ content: `<a:errado:1053788035969454110>・Você não possui permissão para utilizar este comando.`, ephemeral: true })
        } else {

            if (parseInt(numero) > 99 || parseInt(numero) <= 0) {

                let embed = new Discord.EmbedBuilder()
                    .setColor("Random")
                    .setDescription(`\`/clear [1 - 99]\``);

                interaction.reply({ embeds: [embed] })

            } else {

                interaction.channel.bulkDelete(parseInt(numero))

                let embed = new Discord.EmbedBuilder()
                    .setColor("Green")
                    .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
                    .setDescription(`<:verificado3:1057031476367069274>・Sucesso, \`${interaction.user.username}\. canal de texto ${interaction.channel} teve \`${numero}\` mensagens deletadas por \`${interaction.user.username}\`!`);

                interaction.reply({ embeds: [embed] })

                let apagar_mensagem = "nao" 

                if (apagar_mensagem === "sim") {
                    setTimeout(() => {
                        interaction.deleteReply()
                    }, 5000)
                } else if (apagar_mensagem === "nao") {
                    return;
                }

            }

        }

    }
}
