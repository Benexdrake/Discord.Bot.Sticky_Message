import { Event } from "../client/Event";

export default new Event("ready", (bot) => {
    console.log(bot.user.username + " Bot is online");
});
