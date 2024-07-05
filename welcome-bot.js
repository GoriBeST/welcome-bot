const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
require('dotenv').config();

const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds, 
        GatewayIntentBits.GuildMembers, 
        GatewayIntentBits.GuildMessages, 
        GatewayIntentBits.MessageContent
    ] 
});

const token = process.env.DISCORD_BOT_TOKEN;
const welcomeChannelId = process.env.WELCOME_CHANNEL_ID;

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('guildMemberAdd', member => {
    const channel = member.guild.channels.cache.get(welcomeChannelId);
    if (!channel) return;

    const displayName = member.displayName; // サーバーでのニックネームを取得
    const userName = member.user.tag; // ユーザー名を取得

    const welcomeEmbed = new EmbedBuilder()
        .setColor('#f0f8ff') // 
        .setTitle('🎉 ようこそ 🎉')
        .setDescription(`${displayName}(${userName})さん！サーバーへ来てくれてありがとう！仲良くしよう🐾`)
        .setThumbnail(member.user.displayAvatarURL())
        .addFields(
            { name: '📅 参加日', value: new Date().toLocaleDateString(), inline: true },
            { name: '🌟 サーバーメンバー数', value: `${member.guild.memberCount}`, inline: true }
            
        )
        .setTimestamp();

    channel.send({ embeds: [welcomeEmbed] })
 
});

client.login(token);
