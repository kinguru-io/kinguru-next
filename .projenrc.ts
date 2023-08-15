import { web } from "projen";
import { NodePackageManager } from "projen/lib/javascript";

const project = new web.NextJsTypeScriptProject({
  name: "kinguru-next",

  authorName: "Maksim Yersh",
  authorEmail: "yersh.maks@gmail.com",

  defaultReleaseBranch: "main",
  release: true,

  projenrcTs: true,
  tailwind: false,
  eslint: true,
  prettier: true,
  tsconfig: {
    compilerOptions: {
      target: "es5",
      allowJs: true,
      baseUrl: ".",
      rootDir: ".",
      forceConsistentCasingInFileNames: true,
      noEmit: true,
      esModuleInterop: true,
      resolveJsonModule: true,
      isolatedModules: true,
      strict: true,
      skipLibCheck: true,
      strictNullChecks: true,
      paths: {
        "@/*": ["*"],
      },
    },
    include: [
      "process.d.ts",
      "next-env.d.ts",
      "next-auth.d.ts",
      "**/*.ts",
      "**/*.tsx",
    ],
    exclude: ["server/generated"],
  },
  gitignore: [".env", "prisma/sqlite"],

  minNodeVersion: "18.16.0",
  packageManager: NodePackageManager.NPM,
  deps: [
    "@prisma/client",
    "@trpc/client",
    "@trpc/server",
    "@trpc/next",
    "@trpc/react-query",
    "next-auth",
    "@tanstack/react-query",
    "@tanstack/react-query-devtools",
    "zod",
    "superjson",
    "trpc-shield",
    "next-i18next",
    "react-i18next",
    "i18next",
    "nodemailer",
    "@chakra-ui/react",
    "@chakra-ui/next-js",
    "@chakra-ui/icons",
    "@emotion/react",
    "@emotion/styled",
    "framer-motion",
    "formik",
    "zod-formik-adapter",
    "react-icons",
  ],
  devDeps: [
    "prisma",
    "prisma-zod-generator",
    "@faker-js/faker",
    "@types/node@20",
    "@next/eslint-plugin-next",
    "classnames",
  ],
});

project.package.addDevDeps("@types/node@20");
project.eslint?.addExtends("plugin:@next/next/recommended");
project.synth();
