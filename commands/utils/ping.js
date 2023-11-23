const { SlashCommandBuilder } = require("discord.js")

module.exports = {

  data: new SlashCommandBuilder()
  .setName("ping")
  .setDescription("Affiche la latence du bot")
  .setDMPermission(false)
  .setDefaultMemberPermissions(null),

  async run(interaction) {

    await interaction.reply(`Ping : \`${interaction.client.ws.ping} ms\`.`);
  }
};