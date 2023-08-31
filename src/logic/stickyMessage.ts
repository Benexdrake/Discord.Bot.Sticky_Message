import { Message, TextChannel } from "discord.js";
import {client} from '..'
import config from '../../config.json';

export class StickyMessage
{
    async AddMessage(channelId:string, messageId:string)
    {
      const insert = `insert or replace into sticky values ('${channelId}','${messageId}','${config.stickyMessagesChannel}')`;
      client.db?.get( insert );
    }

    async CheckMessage(interaction: Message)
    {
      client.db?.get( `select messageid from sticky where Tochannelid = ${interaction.channelId}` , [],
      async (err: any,result: any) => 
      {
        if(result) 
          await this.Message(result.messageid,interaction); 
      });
    }
    
    private async Message(id:string, interaction:Message)
    {
      try 
      {
        let channel = await interaction.guild?.channels.fetch(config.stickyMessagesChannel) as TextChannel;
        
        let stickyMessage = await channel?.messages?.fetch(id);

        await interaction.channel.messages.fetch({limit:100}).then(async x => {
          for(const m of x)
          {
            if(m[1].author.id === config.botID)
            {
              if(m[1].deletable)
              {
                const message = await interaction.channel.messages.fetch(m[1].id);
                await message.delete();
              }
            }
          }
        });
        

        let content = ' '
        if(stickyMessage.content !== '')
          content = stickyMessage.content;
        await interaction.channel.send({content: content, components: stickyMessage.components, embeds:stickyMessage.embeds});
        
      } 
      catch 
      (error) 
      {
        console.error(error)
      }
    }
}