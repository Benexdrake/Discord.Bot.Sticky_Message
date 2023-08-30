import { Message } from "discord.js";
import {client} from '..'

export class StickyMessage
{
    async AddMessage(channelId:string, messageId:string)
    {
      const insert = `insert or replace into sticky values ('${channelId}','${messageId}')`;
      client.db?.get( insert );
    }

    async CheckMessage(interaction: Message)
    {
      client.db?.get( "select messageid from sticky where channelid = " + `'${interaction.channelId}'`, [],
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
        const oldMessage = await interaction.channel.messages.fetch(id);
        // sende neue message
        const newMessage = await interaction.channel.send({content: (await oldMessage).content, components:(await oldMessage).components});
        if((oldMessage).deletable)
        {
          // AddMessage
          await this.AddMessage(newMessage.channelId, newMessage.id);
          // lösche alte message
          (oldMessage).delete();
        }
      } 
      catch 
      (error) 
      {
        console.error(error)
      }
    }
}