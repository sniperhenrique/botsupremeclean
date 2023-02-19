const Discord = require('discord.js');
const axios = require('axios');
const moment = require('moment');


module.exports = {
    name: 'cnpj',
    description: '[⚙️ Utilitários] Consulte dados alguma empresa pelo CNPJ.',
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: 'cnpj',
            description: 'Digite o CNPJ da empresa sem caracteres especiais.',
            type: Discord.ApplicationCommandOptionType.String,
            required: true
        }
    ],
    async run(client, interaction) {
        const cnpj = interaction.options.getString('cnpj');
        if (!cnpj || cnpj.length !== 14) {
            interaction.reply({
                embeds: [
                    new Discord.EmbedBuilder()
                        .setTitle(`⚠️ - **ATENÇÃO**`)
                        .setDescription('O número do CNPJ está digitado incorretamente, por favor verifique e tente novamente.')
                        .setColor("Red")
                        .setFooter({ text: `Requisitado por: ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
                        .setTimestamp()
                ]
            });
            return;
        }
        try {
            const response = await axios.get(`https://publica.cnpj.ws/cnpj/${cnpj}`);
            if (response.data.status === 404) {
                interaction.reply({
                    embeds: [
                        new Discord.EmbedBuilder()
                            .setTitle(`⚠️ - **ATENÇÃO**`)
                            .setDescription('Não encontramos esse CNPJ em nosso banco de dados!')
                            .setColor("Red")
                            .setFooter({ text: `Requisitado por: ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
                            .setTimestamp()
                    ]
                });
                return;
            }
            const empresa = response.data;
            const capitalFormat = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(empresa.capital_social);
            interaction.reply({
                embeds: [
                    new Discord.EmbedBuilder()
                        .setTitle(`🗃️ - **Dados consultados:**`)
                        .addFields(
                            { name: 'Nome', value: empresa.razao_social, inline: false },
                            { name: 'Nome Fantasia', value: empresa.estabelecimento.nome_fantasia, inline: false },
                            { name: 'CNPJ raiz', value: empresa.cnpj_raiz, inline: false },
                            { name: 'Proprietário', value: empresa.socios[0].nome, inline: false },
                            { name: 'Faixa etária', value: empresa.socios[0].faixa_etaria, inline: false },
                            { name: 'Capital social', value: capitalFormat, inline: false },
                            { name: 'Última atualização', value: moment(empresa.atualizado_em).format("DD/MM/YYYY"), inline: false },
                            { name: 'Natureza júridica', value: empresa.natureza_juridica.descricao, inline: false },
                            { name: 'Atividade principal', value: empresa.estabelecimento.atividade_principal.descricao, inline: false },
                            { name: 'Logradouro', value: empresa.estabelecimento.logradouro, inline: false },
                            { name: 'CEP', value: empresa.estabelecimento.cep, inline: false },
                            { name: 'Bairro', value: empresa.estabelecimento.bairro, inline: false },
                            { name: 'Email', value: empresa.estabelecimento.email, inline: false },
                            { name: 'Situação Cadastral', value: empresa.situacao_cadastral.descricao, inline: false }
                        )
                        .setColor("Green")
                        .setFooter({ text: `Requisitado por: ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
                        .setTimestamp()
                ]
            });
        } catch (error) {
            interaction.reply({
                embeds: [
                    new Discord.EmbedBuilder()
                        .setTitle(`⚠️ - **Atenção**`)
                        .setDescription('Excedido o limite máximo de consultas por minuto, tente novamente mais tarde.')
                        .setColor("Red")
                        .setFooter({ text: `Requisitado por: ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
                        .setTimestamp()
                ]
            });
        }
    }
};