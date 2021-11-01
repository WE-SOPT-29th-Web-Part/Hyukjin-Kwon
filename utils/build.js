const path = require("path");
const fs = require("fs");
const { exec } = require("child_process");
const { ncp } = require("ncp");
const rimraf = require("rimraf");

const BUILD_TARGETS = [
  {
    name: "1_todolist",
    type: "static",
  },
  {
    name: "2_velog_clone",
    type: "static",
  },
  {
    name: "3_dday_calc",
    type: "react",
  },
  {
    name: "4_github_profile_finder",
    type: "react",
  },
  {
    name: "5_velog_clone_react",
    type: "react",
  },
];

const rootPath = process.cwd();
const distPath = path.join(rootPath, "dist");

async function main() {
  if (fs.existsSync(distPath)) {
    await rmrf(distPath);
  }
  fs.mkdirSync(distPath, { recursive: true });

  for (const target of BUILD_TARGETS) {
    console.log(`\n\n### Building ${target.name}... ###\n\n`);

    const workingDirectory = path.join(rootPath, target.name);

    if (!fs.existsSync(workingDirectory)) {
      throw new Error(`Project name "${target.name}" was not found.`);
    }

    if (target.type === "static") {
      await copy(
        path.join(rootPath, target.name),
        path.join(distPath, target.name)
      );
    } else if (target.type === "react") {
      if (!fs.existsSync(path.join(workingDirectory, "package.json"))) {
        console.log(
          `# INFO # package.json does not exists in ${workingDirectory}.`
        );
        continue;
      }

      console.log("# Installing Dependencies...");
      await runCommand("yarn install", workingDirectory);

      console.log("# Building React Project...");
      await runCommand("yarn build", workingDirectory);

      console.log("# Copying Build Output...");
      const outputPath = path.join(workingDirectory, "build");
      await copy(outputPath, path.join(distPath, target.name));
    }
  }
}

function runCommand(command, path = process.cwd()) {
  return new Promise((resolved, reject) => {
    exec(command, { cwd: path }, (err, stdout, stderr) => {
      if (err) {
        reject(
          new Error(`Command "${command}" throws with error:\n${stderr}"`)
        );
      }
      console.log(stderr);
      console.log(stdout);
      resolved();
    });
  });
}

function copy(from, to) {
  return new Promise((resolved, reject) => {
    ncp(from, to, (err) => {
      if (err) {
        reject(
          new Error(`Copying directory from "${from}" to "${to}" failed.`)
        );
      }
      resolved();
    });
  });
}

function rmrf(path) {
  return new Promise((resolve, reject) => {
    rimraf(path, (err) => {
      if (err) {
        reject(new Error(`Cannot delete "${path}".`));
      }
      resolve();
    });
  });
}

main().catch((e) => {
  console.error(`\n\n### Critical Error Raised ###\ne.message`);
  process.exit(-1);
});
