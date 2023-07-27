import { Event } from "../client/Event";
import { StickyMessage } from "../logic/stickyMessage";
import { client } from "..";

export default new Event("messageCreate", async (message) => 
{
    if(!message.member?.user.bot && client.user?.id)
    {   
        await new StickyMessage().CheckMessage(message);
    }
});