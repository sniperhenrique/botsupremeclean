const Discord = require("discord.js")

module.exports = {
  name: "unban", 
  description: "[Moderação] Desbanir um usuário.", 
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    {
        name: "user",
        description: "Mencione um usuário para ser desbanido.",
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
        interaction.reply(`<a:errado:1053788035969454110>・Você não possui permissão para utilizar este comando.`);
    } else {
        let user = interaction.options.getUser("user");
        let motivo = interaction.options.getString("motivo");
        if (!motivo) motivo = "Não definido.";

        let embed = new Discord.EmbedBuilder()
        .setColor("FF0000")
        .setDescription(`<:verificado8:1057068804393406508> ・O usuário ${user} (\`${user.id}\`) foi desbanido com sucesso!`);

        let erro = new Discord.EmbedBuilder()
        .setColor("FF0000")
        .setDescription(`<a:errado:1053788035969454110>・Não foi possível desbanir o usuário ${user} (\`${user.id}\`) do servidor!`);

        interaction.guild.members.unban(user.id, motivo).then( () => {
            interaction.reply({ embeds: [embed] })
        }).catch(e => {
            interaction.reply({ embeds: [erro] })
        })
    }

  }
}
