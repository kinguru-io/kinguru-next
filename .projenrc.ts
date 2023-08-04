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
    "trpc-shield",
    "@heroicons/react",
    "@headlessui/react",
    "next-i18next",
    "react-i18next",
    "i18next",
    "@tailwindcss/aspect-ratio",
    "tailwind-fontawesome",
    "tailwindcss",
  ],
  devDeps: [
    "prisma",
    "prisma-zod-generator",
    "@faker-js/faker",
    "@types/node@20",
    "@next/eslint-plugin-next",
    "postcss",
    "autoprefixer",
    "prettier-plugin-tailwindcss",
    "postcss-import",
  ],
});

if (!project.prettier?.settings.plugins) {
  // @ts-ignore
  project.prettier?.settings.plugins = [];
}
project.prettier?.settings.plugins.push("prettier-plugin-tailwindcss");
project.package.addDevDeps("@types/node@20");
project.eslint?.addExtends("plugin:@next/next/recommended");
project.synth();
