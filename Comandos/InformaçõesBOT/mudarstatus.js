const Discord = require("discord.js");
const DONO = "471406814374658048"; 

module.exports = {
    name: "setstatus",
    description: "[Comandos BOT] Configuração dos meus status.",
    options: [
        {
            type: Discord.ApplicationCommandOptionType.String,
            name: "status",
            description: "Defina um status (online, dnd, idle, invisible)?",
            required: true,
        },
        {
            type: Discord.ApplicationCommandOptionType.String,
            name: "descrição",
            description: "Qual será a descrição do meu status?",
            required: true,
        }
    ],

    run: async (client, interaction) => {

        if (interaction.user.id !== DONO) return interaction.reply({ content: `Apenas o meu dono pode utilizar este comando!`, ephemeral: true })

        try {

            let status = interaction.options.getString("status");
            let desc = interaction.options.getString("descrição");

            client.user.setStatus(`${status}`);

            client.user.setPresence({
                activities: [{
                    name: desc
                }],
            });

            let embed = new Discord.EmbedBuilder()
            .setColor("Green")
            .setTitle("Status atualizado!")
            .addFields(
                {
                    name: `<:rob_vermelho:1060214241778487406> Mudei meu status para:`,
                    value: `\`${status}\`.`,
                    inline: false
                },
                {
                    name: `<a:a_saturn_reh:1060214801348956171> Mudei minha descrição para:`,
                    value: `\`${desc}\`.`,
                    inline: false
                }
            )

            await interaction.reply({ embeds: [embed] });

        } catch (error) {
            return console.log(`Ops ${interaction.user}, algo deu errado ao executar este comando.`)
        }
    }
}
