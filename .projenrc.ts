const fs = require("fs");
const { web } = require("projen");
const {
  NodePackageManager,
  TypeScriptModuleResolution,
} = require("projen/lib/javascript");

const project = new web.NextJsTypeScriptProject({
  name: "kinguru-next",

  authorName: "Maksim Yersh",
  authorEmail: "yersh.maks@gmail.com",

  defaultReleaseBranch: "main",
  release: false,
  workflowNodeVersion: "20.x",
  workflowPackageCache: true,
  autoMerge: true,
  autoApproveOptions: {
    allowedUsernames: ["dependabot[bot]", "edelwud"],
  },
  autoApproveUpgrades: true,
  depsUpgradeOptions: {
    target: "latest",
  },

  workflowBootstrapSteps: [
    {
      run: `echo "NEXT_PUBLIC_ELASTICSEARCH_API_KEY=testing" >> $GITHUB_ENV`,
    },
    {
      run: `echo "NEXT_PUBLIC_ELASTICSEARCH_ENDPOINT=testing" >> $GITHUB_ENV`,
    },
    {
      run: `echo "NEXT_PUBLIC_MAPBOX_TOKEN=testing" >> $GITHUB_ENV`,
    },
    {
      run: `echo "DATABASE_URL=\${{ secrets.DB_URL }}" >> $GITHUB_ENV`,
    },
    {
      run: `echo "NEXT_PUBLIC_GA_ID=\${{ secrets.GA_ID }}" >> $GITHUB_ENV`,
    },
    {
      run: `echo "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=\${{ secrets.STRIPE_PUBLISHABLE_KEY }}" >> $GITHUB_ENV`,
    },
    {
      uses: "vbem/kubeconfig4sa@v1",
      with: {
        server:
          "https://b6ca91f2-516c-4882-90fe-b232d3b2b33b.api.k8s.pl-waw.scw.cloud:6443",
        "ca-base64": "${{ secrets.K8S_CA_BASE64 }}",
        token: "${{ secrets.K8S_SA_TOKEN }}",
        namespace: "persistence",
      },
    },
    {
      uses: "vbem/k8s-port-forward@v1",
      with: {
        workload: "pod/postgres-cluster-1",
        mappings: "5432:5432",
      },
    },
    {
      uses: "actions/cache@v3",
      with: {
        path: "~/.npm\n${{ github.workspace }}/.next/cache",
        key: "${{ runner.os }}-nextjs-${{ hashFiles('**/package-lock.json') }}-${{ hashFiles('**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx') }}",
        "restore-keys":
          "${{ runner.os }}-nextjs-${{ hashFiles('**/package-lock.json') }}-",
      },
    },
  ],

  projenrcTs: true,
  tailwind: false,
  eslint: true,
  prettier: true,
  tsconfig: {
    compilerOptions: {
      allowImportingTsExtensions: true,
      target: "esnext",
      allowJs: true,
      baseUrl: ".",
      rootDir: ".",
      module: "esnext",
      moduleResolution: TypeScriptModuleResolution.NODE,
      forceConsistentCasingInFileNames: true,
      noEmit: true,
      esModuleInterop: true,
      resolveJsonModule: true,
      isolatedModules: true,
      strict: true,
      skipLibCheck: true,
      strictNullChecks: true,
      paths: {
        "@/*": ["./src/*"],
        "~/*": ["*"],
      },
    },
    include: [
      "process.d.ts",
      "next-env.d.ts",
      "next-auth.d.ts",
      "**/*.ts",
      "**/*.tsx",
      ".next/types/**/*.ts",
    ],
    exclude: ["server/generated"],
  },
  gitignore: [
    ".env",
    "prisma/sqlite",
    "public/robots.txt",
    "public/sitemap*",
    "styled-system",
  ],

  minNodeVersion: "20.9.0",
  packageManager: NodePackageManager.NPM,
  deps: [
    "@prisma/client",
    "@trpc/client",
    "@trpc/server",
    "@trpc/next",
    "@trpc/react-query",
    "trpc-shield",
    "next-auth",
    "@tanstack/react-table",
    "@tanstack/react-query@<5",
    "@tanstack/react-query-devtools@<5",
    "zod",
    "superjson",
    "next-s3-upload",
    "next-sitemap",
    "next-intl",
    "nodemailer",
    "@chakra-ui/react",
    "@chakra-ui/next-js",
    "@chakra-ui/icons",
    "@chakra-ui/theme-tools",
    "chakra-react-select",
    "@emotion/react",
    "@emotion/styled",
    "react-map-gl",
    "mapbox-gl",
    "@mapbox/search-js-react",
    "use-debounce",
    "framer-motion",
    "formik",
    "zod-formik-adapter",
    "react-icons",
    "react-infinite-scroll-component",
    "sharp",
    "moment",
    "@elastic/search-ui",
    "@elastic/search-ui-elasticsearch-connector",
    "@elastic/react-search-ui",
    "@elastic/react-search-ui-views",
    "rc-pagination",
    "@egjs/react-flicking",
    "react-simple-star-rating",
    "react-intersection-observer",
    "react-cookie-consent",

    "stripe",
    "@stripe/stripe-js",
    "@stripe/react-stripe-js",
    "micro",

    "@prisma/instrumentation",
    "@opentelemetry/sdk-node",
    "@opentelemetry/semantic-conventions",
    "@opentelemetry/exporter-trace-otlp-http",
    "@opentelemetry/instrumentation",
    "@opentelemetry/sdk-trace-base",
    "@opentelemetry/sdk-trace-node",
    "@opentelemetry/resources",
  ],
  devDeps: [
    "@pandacss/dev",

    "tsconfig-paths-webpack-plugin",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-links",
    "@storybook/addon-onboarding",
    "@storybook/blocks",
    "@storybook/nextjs",
    "@storybook/react",
    "@storybook/test",
    "eslint-plugin-storybook",
    "storybook",

    "prisma",
    "@faker-js/faker",
    "@types/gtag.js",
    "@next/eslint-plugin-next",
    "classnames",
    "@google/semantic-release-replace-plugin@1.2.0",
    "@semantic-release/changelog",
    "@semantic-release/commit-analyzer",
    "@semantic-release/git",
    "@semantic-release/release-notes-generator",
    "semantic-release-plus",
  ],
});

project.defaultTask?.reset(
  'node --import \'data:text/javascript,import { register } from "node:module"; import { pathToFileURL } from "node:url"; register("ts-node/esm", pathToFileURL("./"));\'  --experimental-specifier-resolution=node .projenrc.ts',
);
project.postCompileTask.exec(
  "npx next-sitemap --config next-sitemap.config.js",
);
project.eslint?.addExtends("plugin:@next/next/recommended");
project.addScripts({ prepare: "npx panda codegen" });
project.addScripts({ storybook: "storybook dev -p 6006" });
project.addScripts({ "build-storybook": "storybook build -o dist/storybook" });
project.synth();

fs.rmSync("./pages", { recursive: true, force: true });
