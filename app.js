#! /usr/bin/env node
import { spawnSync } from "child_process";
import path, { resolve } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

const cmd = "node --no-warnings " + resolve(__dirname, "main.js");
spawnSync(cmd, { stdio: "inherit", shell: true });
