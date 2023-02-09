const Discord = require('discord.js');
const Canvas = require('canvas');
const String = require('randomstring');
const Client = require('../index');

Client.on("interactionCreate", async interaction => {
    if (interaction.isButton) {
        if (interaction.customId === 'Start') {
            const Captcha_Value = String.generate(5);
            let Vez = 6;

            async function Captcha() {
                const Imagem = Canvas.createCanvas(480, 240);
                const Contexto = Imagem.getContext('2d');

                Contexto.beginPath();
                Contexto.fillStyle = '#52566A';
                Contexto.fillRect(0, 0, Imagem.width, Imagem.height);
                Contexto.closePath();

                Contexto.fillStyle = '#EEEEEE';
                Contexto.font = "50px sans-serif";
                Contexto.textAlign = 'center';
                Contexto.fillText(Captcha_Value, 240, 130);
                return Imagem;
            };

            let Imagem = await Captcha();

            let Menu = new Discord.ActionRowBuilder().addComponents(
                new Discord.StringSelectMenuBuilder().setCustomId('Captcha').setPlaceholder('Clique para selecionar uma opção.').setDisabled(false)
            );

            while (Vez > 0) {
                Menu.components[0].addOptions(
                    {
                        label: `${String.generate(5)}`,
                        value: `${String.generate(5)}`
                    }
                );
                Vez--
            };

            const Correto = Math.floor(Math.random() * 6);
            Menu.components[0].options[Correto].data.label = Captcha_Value, Menu.components[0].options[Correto].data.value = "Correto";

            return interaction.reply({ files: [Imagem.toBuffer()], components: [Menu], ephemeral: true });
        };
    };

    if (interaction.isStringSelectMenu()) {
        let Selecionado = interaction.values[0];
        if (interaction.customId === 'Captcha') {
            interaction.message.components[0].components[0].data.disabled = true;
            interaction.update({ components: [interaction.message.components[0]], ephemeral: true });
            setTimeout(() => { interaction.deleteReply(); }, 5000);

            if (Selecionado === 'Correto') {
                return interaction.user.send({ content: "Você concluiu a Captcha.", ephemeral: true });
            } else return interaction.user.send({ content: "Você selecionou a opção incorreta, tente novamente.", ephemeral: true });
        };
    };
});