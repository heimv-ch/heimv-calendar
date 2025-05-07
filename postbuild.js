import { copyFileSync } from "node:fs";

copyFileSync("./LICENSE", "./dist/LICENSE");
copyFileSync("./package.json", "./dist/package.json");
copyFileSync("./README.md", "./dist/README.md");
