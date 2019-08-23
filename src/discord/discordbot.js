//https://discordapp.com/oauth2/authorize?&client_id=CLIENTID&scope=bot&permissions=8
const Discord =  require("discord.js");
const data = require("../credentials.json");
const client = new Discord.Client();
const {database} = require('../firebase/database');

class discordBot{
    constructor(){
        client.once("ready",()=>{
            console.log('Hotz Bot is on');
        });
        this.setUpRequest();
        this.setUpDataManagement();
    }

    setUpDataManagement(){
        this.database = new database();
    }

    setUpRequest(){
        client.on('message',(message) => {
            if(message.content.startsWith("!get_room")){
                var subject_message = message.content;
                var desired_ID = subject_message.substring(subject_message.indexOf('@')+1,subject_message.length-1);
                //console.log("Author's ID: " + message.author.id);
                //console.log("Directed subject: " + subject_message.substring(subject_message.indexOf('@')+1,subject_message.length-1))
                this.database.getRoom(desired_ID).then((data)=>{
                    try{
                        console.log(data.val());
                        message.channel.send(data.val().username+ "'s room is " + data.val().room);
                    }
                    catch(e){
                        message.channel.send("Could not find username. Please try a different username.");
                    }
                });
            }
            if(message.content.startsWith("!help")){
                message.channel.send("Hotz Bot Commands: ");
                message.channel.send("- To set your room number: Use !set_room [room #]");
                message.channel.send("- To find a user's room number: Use !get_room @[username]");
                message.channel.send("- More features being worked on.");
            }

            if(message.content.startsWith("!set_room")){
                //console.log(message.content.split(' ')[1]);
                try{
                    const room_number = message.content.split(' ')[1];
                    if(Number(room_number) === undefined){
                        message.channel.send("Invalid number")
                    }
                    else{
                        this.database.addRoom(message.author.id,message.author.username,room_number);
                        message.channel.send(message.author.username+"'s room has been set to "+room_number);
                    } 
                }
                catch(e){
                    console.log(e);
                    message.channel.send("Error setting room #. Please contact VinceDaAsian.")
                }
            }
        });
        client.login(data.discordKey);
    }

}

module.exports.discordBot = discordBot;

