import fs from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const featureRoot = path.join(__dirname, "src", "features");
const featureNames = fs.existsSync(featureRoot)
  ? fs
      .readdirSync(featureRoot, { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name)
  : [];

const buildRestrictedPatterns = (names) =>
  names.flatMap((name) => [
    {
      group: [`@/features/${name}/components/*`],
      message: `Use '@/features/${name}' public exports instead of component internals.`,
    },
    {
      group: [`@/features/${name}/hooks/*`],
      message: `Use '@/features/${name}' public exports instead of hook internals.`,
    },
    {
      group: [`@/features/${name}/services/*`],
      message: `Use '@/features/${name}' public exports instead of service internals.`,
    },
  ]);

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    files: ["src/**/*.{js,jsx,ts,tsx}"],
    ignores: ["src/features/**/*"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: buildRestrictedPatterns(featureNames),
        },
      ],
    },
  },
  ...featureNames.map((featureName) => ({
    files: [`src/features/${featureName}/**/*.{js,jsx,ts,tsx}`],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: buildRestrictedPatterns(
            featureNames.filter((name) => name !== featureName)
          ),
        },
      ],
    },
  })),
];

export default eslintConfig;
