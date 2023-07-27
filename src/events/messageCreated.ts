import { Event } from "../client/Event";
import { StickyMessage } from "../logic/stickyMessage";

const config  = require('../../config.json');

export default new Event("messageCreate", async (message) => 
{
    if(!message.member?.user.bot)
    {   
        console.log('No Bot')
        await new StickyMessage().CheckMessage(message);
    }
});