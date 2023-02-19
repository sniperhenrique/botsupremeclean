const Discord = require("discord.js")

module.exports = {

    name: "renomear",
    description: "[Administração] Altere um nick de um usuário.",
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: "nick",
            description: "Insira um novo nick.",
            type: Discord.ApplicationCommandOptionType.String,
            required: true,
        },
        {
            name: "usuario",
            description: "Qual usuário deseja alterar o nick?",
            type: Discord.ApplicationCommandOptionType.User,
            required: true,
        }
    ],
        run: async (client, interaction) => {
        let sem_perm = new Discord.EmbedBuilder()
            .setDescription(`<a:errado:1053788035969454110> | Você não tem permissão para utilizar este comando!`)
            .setColor("FF0000");

        if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.Administrator)) {
            interaction.reply({ embeds: [sem_perm], ephemeral: true })
        } else {
            let user = interaction.options.getUser("usuario") || interaction.user;
            let usuario = interaction.guild.members.cache.get(user.id);
            let nick = interaction.options.getString("nick");

            let embed = new Discord.EmbedBuilder()
                .setColor("FF0000")
                .setDescription(`<:verificado8:1057068804393406508>  | Sucesso ${interaction.user}, você alterou o nick de ${usuario}; Novo nick: **${nick}**.`);

            let erro = new Discord.EmbedBuilder()
                .setColor("FF0000")
                .setDescription(`<a:errado:1053788035969454110> | Não consegui renomear o ${usuario}, por favor verifique as minhas permissões.`);

            usuario.setNickname(nick).then(() => {
                interaction.reply({ embeds: [embed] })
            }).catch(e => {
                console.log(e)
                interaction.reply({ embeds: [erro], ephemeral: true })
            })
        }
    }
}