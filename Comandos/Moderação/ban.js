const Discord = require("discord.js")

module.exports = {
  name: "ban", 
  description: "[Moderação] Use esse comando para banir um usuario!", 
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    {
        name: "user",
        description: "Mencione um usuário para ser banido.",
        type: Discord.ApplicationCommandOptionType.User,
        required: true,
    },
    {
        name: "motivo",
        description: "Insira um motivo.",
        type: Discord.ApplicationCommandOptionType.String,
        required: false,
    }
],

  run: async (client, interaction) => {

    if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.BanMembers)) {
        interaction.reply(`<a:errado:1053788035969454110>・Você não possui poermissão para utilizar este comando.`);
    } else {
        let userr = interaction.options.getUser("user");
        let user = interaction.guild.members.cache.get(userr.id)
        let motivo = interaction.options.getString("motivo");
        if (!motivo) motivo = "Não definido.";

        let embed = new Discord.EmbedBuilder()
        .setColor("Green")
        .setDescription(`<:c_meninachifre:1053790972963725533>・O usuário ${user} (\`${user.id}\`) foi banido com sucesso! "\n" Comando executo por: \`${interaction.user.username}\ `);

        let erro = new Discord.EmbedBuilder()
        .setColor("Red")
        .setDescription(`<a:errado:1053788035969454110>・Não foi possível banir o usuário ${user} (\`${user.id}\`) do servidor!`);

        user.ban({ reason: [motivo] }).then( () => {
            interaction.reply({ embeds: [embed] })
        }).catch(e => {
            interaction.reply({ embeds: [erro] })
        })
    }

  }
}