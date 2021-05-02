import readProxyList from "#src/util/read-proxy-list";
import writeFile from "#src/util/write-file";
import {verifyProxy} from "#src/util/verify-proxy";
import chalk from "chalk";

interface State {
  proxy: Array<string>,
  verified: Array<string>,
  timeout: number,
  target: string
}

(async () => {
  const argv = require(`minimist`)(process.argv.slice(2));

  if (argv[`help`]) {
    console.log(`./main.js -u "https://google.com" -i input_proxies.txt -o output_proxies.txt -t 2000`);
    process.exit(0);
  }

  const inputFile = argv[`i`] || `input_proxies.txt`;
  const outputFile = argv[`o`] || `output_proxies.txt`;

  const state: State = {
    proxy: await readProxyList(inputFile),
    verified: [],
    timeout: parseInt(argv[`t`]),
    target: argv[`u`] || `https://google.com`
  };

  await writeFile(outputFile, ``);

  for (const item of state.proxy) {
    if (item.length < 9) {
      continue;
    }

    const response = await verifyProxy(`${item}`, state.target, state.timeout);

    if (response.valid) {
      console.log(chalk.green(`-V [${response.comment}] ${item}`));
      state.verified.push(item);
      await writeFile(outputFile, state.verified.join(`\n`));
    } else
      console.log(chalk.red(`-X [${response.comment}] ${item}`));
  }
})();