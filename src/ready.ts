import { Client } from "discord.js";
import util from 'util';
import { Helper } from "./utils/helper";

export async function readyHandler(client: Client) {
  console.log(`Logged in as ${client?.user?.tag}!`);

  try {
    const exec = util.promisify(require('child_process').exec);
    const { stdout, stderr } = await exec(`mkdir -p ${Helper.PLAYLIST_FOLDER}`);
  } catch (e) {
    console.error(e.message);
  }

  await client.user.setPresence({
    status: "online",
    activity: { name: `?h` },
  });
}
