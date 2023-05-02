const readline = require("readline");
const fs = require("fs");

const supple = "[Enter a blank line to continue.]";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let lineCount = 0;
let prompt = `{"prompt": "`;
function createPrompt() {
  const label = lineCount % 2 === 0 ? "human" : "ohmurasan";
  console.log(`Enter prompt ${label} ${supple}: `);
  rl.question("", (line) => {
    if (line === "" && lineCount % 2 === 0) {
      prompt += `\\n\\n###\\n\\n",`;
      console.log(prompt + "\n");
      createCompletion();
      return;
    }

    prompt += `${label}: ${line} `;

    lineCount++;
    createPrompt();
  });
}

let completion = `"completion": "`;
function createCompletion() {
  console.log(`Enter completion: ${supple}`);
  rl.question("", (line) => {
    completion += line;
    console.log(completion);
    completion += `."}`;
    addFileData(prompt + completion + "\n");
    console.log(prompt + completion);
    rl.close();
    return;
  });
}

function addFileData(result) {
  fs.appendFile("test.txt", result, (err) => {
    if (err) throw err;
  });
}

createPrompt();
