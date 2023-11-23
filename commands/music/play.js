const { SlashCommandBuilder } = require("discord.js")

module.exports = {

  data: new SlashCommandBuilder()
  .setName("play")
  .setDescription("Démarre la musique")
  .setDMPermission(false)
  .setDefaultMemberPermissions(null)
  .addStringOption(opt => opt.setName("song").setDescription("The song play").setRequired(true)),

  async run(interaction) {

    await interaction.deferReply({ephemeral: true});
    const song = interaction.options.getString("song");

    const voiceChannelMember = interaction.member.voice.channel;
    const voiceChannelBot = (await interaction.guild.members.fetchMe()).voice.channel;
    if(!voiceChannelMember) return await interaction.followUp("Vous n'êtes pas dans un canal vocal");
    if(voiceChannelBot && voiceChannelBot.id !== voiceChannelMember.id) return await interaction.followUp("You are not in the same voice channel than the bot.")

    try {

    const { track } = await interaction.client.player.play(voiceChannelMember, song, {
      requestedBy: interaction.user,
      nodeOpions: {
        metadata: interaction,
        volume: 200,
        leaveOnStop: true,
        leavaOnEmpty: true,
        leaveOnEnd: false,
        selfDeaf: true
      }
    });
    
    await interaction.followUp(`\`${track.title}\`during \`${track.duration}\` est a ajouté a la queue`);

  } catch (err) {

      return await interaction.followUp(`La musique \`${song}\` n'existe pas.`)
  };
  }
};