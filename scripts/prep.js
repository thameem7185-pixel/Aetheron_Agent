
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const nodeModules = path.join(root, "node_modules");
const output = path.join(root, "www", "mediapipe");

const packages = [
  "@mediapipe/hands",
  "@mediapipe/drawing_utils"
];

const extensions = new Set([
  ".js",
  ".wasm",
  ".data",
  ".tflite",
  ".binarypb"
]);

function findPackage(name) {
  const packageDir = path.join(nodeModules, name);

  if (!fs.existsSync(packageDir)) {
    throw new Error(
      `Missing package: ${name}. Run npm install first.`
    );
  }

  return packageDir;
}

function copyFiles(source, destination) {
  fs.mkdirSync(destination, { recursive: true });

  for (const entry of fs.readdirSync(source, {
    withFileTypes: true
  })) {
    const src = path.join(source, entry.name);
    const dest = path.join(destination, entry.name);

    if (entry.isDirectory()) {
      copyFiles(src, dest);
    } else if (
      entry.isFile() &&
      extensions.has(path.extname(entry.name).toLowerCase())
    ) {
      fs.copyFileSync(src, dest);
    }
  }
}

function main() {
  console.log("Preparing MediaPipe assets...");

  fs.mkdirSync(output, { recursive: true });

  for (const name of packages) {
    console.log(`Checking ${name}...`);

    const source = findPackage(name);
    copyFiles(source, output);
  }

  const required = [
    "hands.js",
    "drawing_utils.js"
  ];

  for (const file of required) {
    const filePath = path.join(output, file);

    if (!fs.existsSync(filePath)) {
      throw new Error(
        `Required MediaPipe file not found: ${file}`
      );
    }
  }

  console.log("MediaPipe preparation successful!");
  console.log("Files:", fs.readdirSync(output));
}

try {
  main();
} catch (error) {
  console.error("MediaPipe preparation failed:");
  console.error(error.message);
  process.exit(1);
}
