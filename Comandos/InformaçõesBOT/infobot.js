const Discord = require("discord.js")

module.exports = {
  name: "botinfo", // Coloque o nome do comando
  description: "[Comandos BOT] Fornece informações sobre o bot.", // Coloque a descrição do comando
  type: Discord.ApplicationCommandType.ChatInput,

  run: async (client, interaction) => {

    let dono = "471406814374658048"; // Coloque seu ID
    let membros = client.users.cache.size;
    let servidores = client.guilds.cache.size;
    let canais = client.channels.cache.size;
    let bot = client.user.tag;
    let avatar_bot = client.user.displayAvatarURL({ dynamic: true });
    let linguagem = "JavaScript";
    let livraria = "Discord.Js";
    let ping = client.ws.ping;

    let embed = new Discord.EmbedBuilder()
    .setColor("FF0000")
    .setAuthor({ name: bot, iconURL: avatar_bot })
    .setFooter({ text: bot, iconURL: avatar_bot })
    .setTimestamp(new Date())
    .setThumbnail(avatar_bot)
    .setDescription(`<:c_meninachifre:1053790972963725533>・Olá ${interaction.user}, me chamo BOT Supremo, sou um bot em desenvolvimento. Infelizmente ainda não tenho um site para chamar de meu, porem assim que meu dono terminar minhas programações irei estar nele tambem com muitos recursos.\n\n> <:rob_vermelho:1060214241778487406>・ Nome: \`${bot}\`.\n> <:rob_vermelho:1060214241778487406>・ Dono: ${client.users.cache.get(dono)}.
\n> <a:a_saturn_reh:1060214801348956171>・ Membros: \`${membros}\`.\n> <a:a_saturn_reh:1060214801348956171>・ Servidores: \`${servidores}\`.\n> <a:a_saturn_reh:1060214801348956171>・ Canais: \`${canais}\`.\n> <a:a_saturn_reh:1060214801348956171>・ Ping: \`${ping}\`.
\n> <:nodejs:1060215410609369128>・Linguagem de programação: \`${linguagem}\`.\n> <:nodejs:1060215410609369128>・Livraria: \`${livraria}\`.`);

    interaction.reply({ embeds: [embed] })


  }
}