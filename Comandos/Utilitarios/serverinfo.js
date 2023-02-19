const Discord = require("discord.js");

module.exports = {
    name: "serverinfo",
    description: "[Utilitarios] Veja algumas informações do servidor.",
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: "id",
            description: "Cole o ID do servidor",
            type: Discord.ApplicationCommandOptionType.String,
            require: true,
        }
    ],
    run: async (client, interaction) => {

        let membros = interaction.guild.memberCount;
        let cargos = interaction.guild.roles.cache.size;
        let canais = interaction.guild.channels.cache.size;
        let entrou = interaction.guild.joinedTimestamp;
        let servidor = interaction.guild;
        let donoid = interaction.guild.ownerId;
        let emojis = interaction.guild.emojis.cache.size;
        let serverid = interaction.options.getString("id")
        let impulsos = interaction.guild.premiumSubscriptionCount;
        let data = interaction.guild.createdAt.toLocaleDateString("pt-br");


        let ryan = new Discord.EmbedBuilder()
            .setColor("Blue")
            .setThumbnail(interaction.guild.iconURL({ dinamyc: true, format: "png", size: 4096 }))
            .setTitle(`<:rob_vermelho:1060214241778487406> Informações do servidor: ${interaction.guild}`)
            .addFields(
                {
                    name: `:identification_card: Identidade`,
                    value: `\`\`\`${servidor.id}\`\`\``,
                    inline: true,
                },
                {
                    name: `<:moderador_amarelo:1060227443526480032> Canais em geral:`,
                    value: `<:canaldetexto:1060228692720230441> Canais: ${canais}\n<:canaldetexto:1060228692720230441> Cargos: ${cargos}`,
                    inline: true,
                },
                {
                    name: `<:user_vermelho:1060227320834695265> Usuarios`,
                    value: `\`\`\`${membros} membros\`\`\``,
                    inline: true,
                },
                {
                    name: `<a:a_saturn_reh:1060214801348956171> Servidor criado`,
                    value: `<t:${parseInt(interaction.guild.createdTimestamp / 1000)}>`,
                    inline: true,
                },
                {
                    name: `<:square_frequentlyused:1060229027543134228> ${interaction.user.username} entrou em `,
                    value: `<t:${parseInt(servidor.joinedTimestamp / 1000)}:F>`,
                    inline: true,
                },
                {
                    name: `<:coroaamarela:1060227088575123606> Dono`,
                    value: `<@!${donoid}> \n\`\`${donoid}\`\``,
                    inline: true,
                }
        )
        
        
        
        
        interaction.reply({ embeds: [ryan] })
    }
}