/* eslint-disable no-console */
import fs from 'node:fs';
import { exec } from 'node:child_process';

async function main(): Promise<void> {
  console.log(`🕺 Beginning codegen...`);

  const res = await fetch(`http://127.0.0.1:8080/admin-ts-codegen`);
  const json = await res.json();
  const data = json.pairs as Record<string, string>;

  const clientImports = [];
  const clientFunctions = [];

  for (const [title, pair] of Object.entries(data)) {
    fs.writeFileSync(
      `../lib/types/pairs/${title}.ts`,
      pairTemplate.replace(`{{PAIR}}`, pair),
    );
    console.log(`📝 Generated ${title}.ts`);

    clientImports.push(clientImportTemplate.replaceAll(`{{TYPE}}`, title));
    clientFunctions.push(
      clientFunctionTemplate
        .replaceAll(`{{PASCAL_CASE}}`, title)
        .replaceAll(`{{CAMEL_CASE}}`, pascalToCamelCase(title))
        .replaceAll(`{{KEBAB_CASE}}`, pascalToKebabCase(title)),
    );
  }

  fs.writeFileSync(
    `../lib/client.ts`,
    clientTemplate
      .replace(`{{CLIENT_IMPORTS}}`, clientImports.join(`\n`))
      .replace(`{{CLIENT_FUNCTIONS}}`, clientFunctions.join(`\n\n`)),
  );

  exec(`cd ../lib && prettier --write .`, (err) => {
    if (err) {
      console.error(`🚨 Error formatting files: ${err}`);
      return;
    }
    console.log(`💅 Formatted pairs successfully`);
  });
}

main();

const pairTemplate = `// auto-generated, do not edit\n\n{{PAIR}}`;

const clientTemplate = `
// auto-generated, do not edit

import dotenv from 'dotenv';
{{CLIENT_IMPORTS}}
import { fetcher } from './fetcher';

dotenv.config();

const endpoint = process.env.API_ENDPOINT;

export const liveClient = {
{{CLIENT_FUNCTIONS}}
};
`.trim();

const clientImportTemplate = `import type { {{TYPE}} } from './types/pairs/{{TYPE}}';`;

const clientFunctionTemplate = `
{{CAMEL_CASE}}(): Promise<Result<{{PASCAL_CASE}}.Output, string>> {
return fetcher.request<{{PASCAL_CASE}}.Output>(
    endpoint + \`/pairql/super-admin/{{PASCAL_CASE}}\`,
  );
},
`.trim();

function pascalToCamelCase(str: string): string {
  return str.charAt(0).toLowerCase() + str.slice(1);
}

function pascalToKebabCase(str: string): string {
  return str.replace(/([a-z])([A-Z])/g, `$1-$2`).toLowerCase();
}
