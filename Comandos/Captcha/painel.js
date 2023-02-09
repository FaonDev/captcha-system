const Discord = require('discord.js');

module.exports = {
    name: "captcha",
    description: "Defina o sistema de verificações",
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: "canal",
            description: "Canal na qual localiza-se o painel.",
            type: Discord.ApplicationCommandOptionType.Channel,
            required: true,
        },
    ],

    run: async (client, interaction) => {
        if (!interaction.member.permissions.has(Discord.PermissionsBitField.Flags.Administrator)) return interaction.reply({ content: "Você não possui permissão de utilizar este comando.", ephemeral: true });
        let Canal = interaction.options.getChannel('canal');
        let Embed = new Discord.EmbedBuilder().setColor('Random').setImage('https://i.imgur.com/IZlqJFd.png');
        let Button = new Discord.ActionRowBuilder().addComponents(
            new Discord.ButtonBuilder()
                .setCustomId('Start')
                .setLabel('Iniciar captcha')
                .setStyle(Discord.ButtonStyle.Primary)
        );

        Canal.send({ embeds: [Embed], components: [Button] }).catch(() => {
            return interaction.reply({ content: "Ocorreu um erro ao executar este comando.", ephemeral: true });
        });

        await interaction.reply({ content: "Painel enviado com sucesso!", ephemeral: true });
    }
};