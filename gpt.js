import OpenAI  from "openai";
import readline from 'readline';
import 'dotenv/config' ;

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const openai = new OpenAI({
    apiKey: process.env.CHAT_GPT_KEY, 
});

async function main() {
  rl.question('\x1b[32mGpt: How can I help you?\n\x1b[0m', async (input) => {
    const stream = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: input }],
      stream: true,
    });

    process.stdout.write("\x1b[32mGpt: \x1b[0m");
    for await (const chunk of stream) {
        process.stdout.write("\x1b[32m" + (chunk.choices[0]?.delta?.content || "") + "\x1b[0m");
    }
    console.log();
    rl.close();

  });
}


main();

