import { Event } from "../client/Event";
import { StickyMessage } from "../logic/stickyMessage";

export default new Event("messageCreate", async (message) => 
{
    if(!message.member?.user.bot)
    {   
        await new StickyMessage().CheckMessage(message);
    }
});