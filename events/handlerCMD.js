let util = require('../utils/main.js');
let Discord = require('discord.js');
let ms = require('ms');
let clientConfig = require('../database/client/config.json');
let cooldowns = new Discord.Collection();
let db = require('megadb');

let KariWebhooks = new util.webhooks();

let bans = new util.bans()

let blacklist = require('../database/client/blacklisted.json');
require("../extenders/replymessage.js")

exports.type = "message";
exports.start = async(client,clusterID,ipc,message) => {
	
if (message.author.bot) return;
	if (message.channel.type === 'dm') return;

	let PrefixDB = new db.crearDB('Prefix');

	if (!PrefixDB.tiene(`${message.guild.id}`))
		PrefixDB.establecer(`${message.guild.id}`, {
			prefix: 'f/'
		});

	let prefixoAtualp_ = await PrefixDB.obtener(`${message.guild.id}.prefix`);

	const prefixoAtual = message.content.includes(prefixoAtualp_)
		? prefixoAtualp_
		: 'f/';

	const banimentos = bans.find(message.author)

	let prefix = prefixoAtual;

	if (!message.content.toLowerCase().startsWith(prefix.toLowerCase())) return;

	if (
		message.content.startsWith(`<@!${client.user.id}>`) ||
		message.content.startsWith(`<@${client.user.id}>`)
	)
		return;

	if (banimentos) return message.reply({
			content: '',
			embed: {
				description: ':no_entry_sign: você foi banido de usar meus comandos!',
				color: 389301,
				fields: [
					{
						name: 'com o motivo',
						value: '**' + banimentos.motive + '**'
					}
				]
			}
		});

	const args = message.content
		.trim()
		.slice(prefix.length)
		.split(/ +/g);

	const comando = args.shift().toLowerCase();
	let command = comando;

	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Discord.Collection());
	}

	var now = Date.now();
	var timestamps = cooldowns.get(command.name);
	var cooldownAmount = 5 * 1000;

	if (timestamps.has(message.author.id)) {
		var expTime = timestamps.get(message.author.id) + cooldownAmount;
	}
	if (now < expTime) {
		var timeLeft = (expTime - now) / 1000;
		return message.inlineReply(
			`Espere mais **${timeLeft.toFixed(
				1
			)}** segundos para executar este comando novamente.`
		);
	}
	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

	try {
		const atsn = require(`../KariModules/anti-fuck.js`);

		//let commandFile = require(`./commands/${comando}.js`);

		var cmd =
			client.commands.get(comando.slice(prefix.lenght)) ||
			client.commands.get(client.aliases.get(comando.slice(prefix.lenght)));

		const test = atsn.findOne(
			(ops = {
				listPalvroes: blacklist.words,
				ignoreUsers: clientConfig.functions.ignoredUsers
			}),
			message
		);

		if (test) {
			message.inlineReply('🙍‍♂️| EI!,\nmodere sua linguagem!');
		} else {
			//console.log(cmd.run)
			cmd.run(client, message, args);
		//	console.log(await message.moreUserJson(message.author))
		}

		KariWebhooks.commands(
			new Discord.MessageEmbed()
				.setDescription(
					`✅| o **${message.author.username}** ussou **${prefix}${comando} **${
						args[0]
							? `com **${message.content.split(`${comando}`)[1]}**`
							: `sem argumentos`
					}, no canal **${message.channel.name}** \`cluster[ **${client.cluster.id}** ]\``
				)
				.setColor('#EE82EE')
		);
	} catch (err) {
		console.error(err);

		message.channel.send({
			embed: {
				color: '#FF0000',
				description:
					'🚫 o comando `' +
					comando +
					'` não **existe**.\n\nuse `' +
					prefix +
					'help` para ver meus comandos **listados** e **categorizados**! :3'
			}
		});

		KariWebhooks.commands(
			new Discord.MessageEmbed()
				.setDescription(
					`❌| o **${message.author.username}** ussou **${prefix}${comando} **${
						args[0]
							? `com **${message.content.split(`${comando}`)[1]}**`
							: `sem argumentos`
					}, no canal **${message.channel.name}** \`cluster[ **${client.cluster.id}** ]\``
				)
				.setColor('#FF0000')
				.addField('mas deu erro devido a:', '```js ' + err + '```')
		);
	}
}