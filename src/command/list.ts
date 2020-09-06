import { peco } from '../lib/peco';
async function command(): Promise<void> {
  const { text } = await peco('open');
  console.log(text);
}

export default command;
