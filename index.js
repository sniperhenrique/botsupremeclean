const Discord = require("discord.js")
const config = require("./config.json")
const client = new Discord.Client({ 
 
 
  intents: [ 
Discord.GatewayIntentBits.Guilds
       ]
    });
    

module.exports = client

client.on('interactionCreate', (interaction) => {

  if(interaction.type === Discord.InteractionType.ApplicationCommand){

      const cmd = client.slashCommands.get(interaction.commandName);

      if (!cmd) return interaction.reply(`Error`);

      interaction["member"] = interaction.guild.members.cache.get(interaction.user.id);

      cmd.run(client, interaction)

   }
})

client.on('ready', () => {
  console.log(`💫 Sucesso, estou conectado no bot ${client.user.username}!`)
})


client.slashCommands = new Discord.Collection()

require('./handler')(client)


client.login(config.token)


//Comando de antilink
const { QuickDB } = require("quick.db")
const db = new QuickDB(); // instalar (npm i quick.db better-sqlite3)

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;
  let confirm = await db.get(`antilink_${message.guild.id}`);
  if (confirm === false || confirm === null) {
    return;
  } else if (confirm === true) {
    if (message.member.permissions.has(Discord.PermissionFlagsBits.Administrator)) return; // Caso o usuário tenha permissão de ADM, o bot vai permitir que o mesmo envie links
    if (message.content.toLocaleLowerCase().includes("http")) {
      message.delete()
      message.channel.send(`${message.author} Não envie links no servidor!`)
    }

  }
})

//Comando de Conectar Canal de Voz
const { joinVoiceChannel } = require('@discordjs/voice');

client.on("ready", () => {
  let canal = client.channels.cache.get("1062859675038646412") // coloque o ID do canal de voz
  if (!canal) return console.log("❌ Não foi possível entrar no canal de voz.")
  if (canal.type !== Discord.ChannelType.GuildVoice) return console.log(`❌ Não foi possível entrar no canal [ ${canal.name} ].`)

  try {

    joinVoiceChannel({
      channelId: canal.id, // ID do canal de voz
      guildId: canal.guild.id, // ID do servidor
      adapterCreator: canal.guild.voiceAdapterCreator,
    })
    console.log(`✅ Entrei no canal de voz [ ${canal.name} ] com sucesso!`)

  } catch(e) {
    console.log(`❌ Não foi possível entrar no canal [ ${canal.name} ].`)
  }

})

//Comando de Tickets
client.on("interactionCreate", async (interaction) => {
    if (interaction.isButton()) {
      if (interaction.customId === "tickets_basico") {
        let nome_canal = `🔖-${interaction.user.id}`;
        let canal = interaction.guild.channels.cache.find(c => c.name === nome_canal);
  
        if (canal) {
          interaction.reply({ content: `Olá **${interaction.user.username}**, você já possui um ticket em ${canal}.`, ephemeral: true})
        } else {
  
          let categoria = interaction.channel.parent;
          if (!categoria) categoria = null;
  
          interaction.guild.channels.create({
  
            name: nome_canal,
            parent: categoria,
            type: Discord.ChannelType.GuildText,
            permissionOverwrites: [
              {
                id: interaction.guild.id,
                deny: [ Discord.PermissionFlagsBits.ViewChannel ]
              },
              {
                id: interaction.user.id,
                allow: [
                  Discord.PermissionFlagsBits.ViewChannel,
                  Discord.PermissionFlagsBits.AddReactions,
                  Discord.PermissionFlagsBits.SendMessages,
                  Discord.PermissionFlagsBits.AttachFiles,
                  Discord.PermissionFlagsBits.EmbedLinks
                ]
              },
            ]
  
          }).then( (chat) => {
  
            interaction.reply({ content: `Olá **${interaction.user.username}**, seu ticket foi aberto em ${chat}.`, ephemeral: true })
  
            let embed = new Discord.EmbedBuilder()
            .setColor("Random")
            .setDescription(`Olá ${interaction.user}, você abriu o seu ticket.\nAguarde um momento para ser atendido.`);
  
            let botao_close = new Discord.ActionRowBuilder().addComponents(
              new Discord.ButtonBuilder()
              .setCustomId("close_ticket")
              .setEmoji("🔒")
              .setStyle(Discord.ButtonStyle.Danger)
            );
  
            chat.send({ embeds: [embed], components: [botao_close] }).then(m => {
              m.pin()
            })
  
          })
        }
      } else if (interaction.customId === "close_ticket") {
        interaction.reply(`Olá ${interaction.user}, este ticket será excluído em 5 segundos.`)
        try {
          setTimeout( () => {
            interaction.channel.delete().catch( e => { return; } )
          }, 5000)
        } catch (e) {
          return;
        }
        
      }
    }
  })

//Informações do BOT, canal de voz.


client.on("ready", () => {
  let canalPing = client.channels.cache.get(`1058445611201999002`); 
  if (!canalPing) return console.log(`Canal de ping do bot não encontrado`);
  canalPing.setName(`📡 Ping: ${client.ws.ping}ms`);
})

client.on("ready", () => {
  let users = client.guilds.cache.map(g => g.memberCount).reduce((a, b) => a + b)
  const compact = users.toLocaleString("pt-BR", { notation: 'compact' });
  let membro = client.channels.cache.get(`1058445730781614180`); 
  if (!membro) return console.log(`Canal de membros do bot não encontrado`);
  membro.setName(`📡 Membros: ${compact}`);
})

client.on("ready", () => {
  let guilds = client.guilds.cache.size
  let sv = client.channels.cache.get(`1058445832757727382`);
  if (!sv) return console.log(`Canal de servidores do bot não encontrado`); 
  sv.setName(`📡 Servidores: ${guilds}`);
})