import { web } from "projen";
import { NodePackageManager } from "projen/lib/javascript";

const project = new web.NextJsTypeScriptProject({
  name: "kinguru-next",

  authorName: "Maksim Yersh",
  authorEmail: "yersh.maks@gmail.com",

  defaultReleaseBranch: "main",
  release: true,

  projenrcTs: true,
  tailwind: true,
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
    exclude: ["node_modules"],
  },
  gitignore: [".env", "prisma/sqlite"],

  minNodeVersion: "20.4.0",
  packageManager: NodePackageManager.NPM,
  deps: [
    "@auth/prisma-adapter",
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
  ],
  devDeps: [
    "prisma",
    "prisma-trpc-generator",
    "@faker-js/faker",
    "@types/node@18",
    "@types/cookie",
    "@next/eslint-plugin-next",
  ],
});

project.package.addDevDeps("@types/node@20");
project.eslint?.addExtends("plugin:@next/next/recommended");
project.synth();
