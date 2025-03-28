import fs from "fs";
import { web } from "projen";
import { JobPermission } from "projen/lib/github/workflows-model";
import {
  NodePackageManager,
  TypeScriptModuleResolution,
} from "projen/lib/javascript";

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
    include: [
      "next",
      "stripe",
      "@next/eslint-plugin-next",
      "@stripe/react-stripe-js",
      "@stripe/stripe-js",
    ],
    target: "minor",
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
      run: `echo "ES_CLIENT_NODE=http://172.17.0.1:9200/" >> $GITHUB_ENV`,
    },
    {
      run: `echo "ES_CLIENT_API_KEY=\${{ secrets.ELASTICSEARCH_API_KEY }}" >> $GITHUB_ENV`,
    },
    {
      run: `echo "ES_INDEX_PREMISE_FULFILLED=kinguru-stage.public.premise.fulfilled" >> $GITHUB_ENV`,
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
        workload: "pod/postgres-cluster-0",
        mappings: "5432:5432",
      },
    },
    {
      uses: "vbem/k8s-port-forward@v1",
      with: {
        workload: "svc/elastic-es-default",
        mappings: "9200:9200",
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
      "global.d.ts",
      "process.d.ts",
      "next-env.d.ts",
      "next-auth.d.ts",
      "**/*.ts",
      "**/*.tsx",
      "dist/types/**/*.ts",
    ],
    exclude: ["server/generated"],
  },
  gitignore: [
    ".env",
    "dist",
    "prisma/sqlite",
    "public/robots.txt",
    "public/sitemap*",
    "styled-system",
  ],

  minNodeVersion: "20.9.0",
  packageManager: NodePackageManager.NPM,
  deps: [
    "@aws-sdk/client-s3",
    "@aws-sdk/s3-request-presigner",

    "@prisma/client",
    "next-auth",
    "zod",
    "next-sitemap",
    "next-intl",
    "nodemailer",
    "react-map-gl",
    "mapbox-gl@3.4.0",
    "@mapbox/search-js-core",
    "use-debounce",
    "react-icons",
    "sharp",

    "stripe",
    "@stripe/stripe-js",
    "@stripe/react-stripe-js",

    "@prisma/instrumentation",
    "@opentelemetry/sdk-node",
    "@opentelemetry/semantic-conventions",
    "@opentelemetry/exporter-trace-otlp-http",
    "@opentelemetry/instrumentation",
    "@opentelemetry/sdk-trace-base",
    "@opentelemetry/sdk-trace-node",
    "@opentelemetry/resources",

    "react-hook-form",
    "@hookform/resolvers",
    "zod-form-data",
    "oslo",
    "uuid",

    "react-snap-carousel",
    "@sindresorhus/slugify",
    "date-fns",
    "date-fns-tz",
    "react-day-picker",
    "react-hot-toast",

    "bullmq",
    "pino",
    "dotenv",
    "kafkajs",
    "@elastic/elasticsearch@8.13.1",
    "@elastic/transport@8.4.1",
    "@dnd-kit/core",
    "@dnd-kit/sortable",
  ],
  devDeps: [
    "@pandacss/dev",
    "@neodx/svg",

    "tsconfig-paths-webpack-plugin",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-links",
    "@storybook/blocks",
    "@storybook/nextjs",
    "@storybook/react",
    "@storybook/test",
    "eslint-plugin-storybook",
    "storybook",
    "msw",
    "msw-storybook-addon",
    "storybook-addon-module-mock",

    "prisma",
    "@faker-js/faker",
    "@types/gtag.js",
    "@next/eslint-plugin-next",
    "@google/semantic-release-replace-plugin@1.2.0",
    "@semantic-release/changelog",
    "@semantic-release/commit-analyzer",
    "@semantic-release/git",
    "@semantic-release/release-notes-generator",
    "semantic-release-plus",

    "vitest",
    "@vitejs/plugin-react",
    "jsdom",
    "@testing-library/react",

    "@types/nodemailer",
    "@react-email/components",
    "react-email",
  ],
});

project.package.addField("type", "module");
project.eslint?.addExtends("plugin:@next/next/recommended");
project.eslint?.addRules({
  "import/no-extraneous-dependencies": [
    "error",
    {
      devDependencies: [
        "**/test/**",
        "**/build-tools/**",
        ".projenrc.ts",
        "projenrc/**/*.ts",
        "**/*.{test,spec}.ts",
        "src/**/*.stories.tsx",
      ],
      optionalDependencies: false,
      peerDependencies: true,
    },
  ],
});

project.defaultTask?.reset(
  'node --import \'data:text/javascript,import { register } from "node:module"; import { pathToFileURL } from "node:url"; register("ts-node/esm", pathToFileURL("./"));\'  --experimental-specifier-resolution=node .projenrc.ts',
);
project.preCompileTask.exec("npx prisma generate");
project.postCompileTask.exec(
  "npx next-sitemap --config next-sitemap.config.cjs",
);
project.addScripts({
  "stripe:listen": "stripe listen --forward-to localhost:3000/api/webhook",
});
project.addScripts({ prepare: "npx panda codegen" });
project.addScripts({ storybook: "storybook dev -p 6006" });
project.addScripts({ "build-storybook": "storybook build -o dist/storybook" });
project.addScripts({
  seed: 'node --import \'data:text/javascript,import { register } from "node:module"; import { pathToFileURL } from "node:url"; register("ts-node/esm", pathToFileURL("./"));\'  --experimental-specifier-resolution=node prisma/seed.ts',
});
project.addScripts({
  "scheduler:run":
    'node --import \'data:text/javascript,import { register } from "node:module"; import { pathToFileURL } from "node:url"; register("ts-node/esm", pathToFileURL("./"));\'  --experimental-specifier-resolution=node scheduler/main.ts',
});
project.addScripts({
  "consumer:run":
    'node --import \'data:text/javascript,import { register } from "node:module"; import { pathToFileURL } from "node:url"; register("ts-node/esm", pathToFileURL("./"));\'  --experimental-specifier-resolution=node consumer/main.ts',
});
project.addScripts({ vitest: "vitest" });

project.testTask.exec("vitest run");

project.buildWorkflow?.addPostBuildJob("staging-deploy", {
  name: "staging-deploy",
  runsOn: ["ubuntu-latest"],
  environment: {
    name: "staging",
    url: "https://stage.eventify.today",
  },
  permissions: {
    contents: JobPermission.WRITE,
    packages: JobPermission.WRITE,
    idToken: JobPermission.WRITE,
    issues: JobPermission.WRITE,
    pullRequests: JobPermission.WRITE,
  },
  env: {
    CI: "true",
  },
  steps: [
    {
      name: "Checkout",
      uses: "actions/checkout@v4",
      with: {
        "fetch-depth": 0,
      },
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
        workload: "pod/postgres-cluster-0",
        mappings: "5432:5432",
        options: "--address=0.0.0.0",
      },
    },
    {
      uses: "vbem/k8s-port-forward@v1",
      with: {
        workload: "svc/elastic-es-default",
        mappings: "9200:9200",
        options: "--address=0.0.0.0",
      },
    },
    {
      uses: "werf/actions/install@v1.2",
    },
    {
      name: "Run stage deployment",
      run: `. $(werf ci-env github --as-file)
werf cr login -u \${{ github.actor }} -p \${{ secrets.GITHUB_TOKEN }} ghcr.io
werf converge --atomic`,
      env: {
        WERF_ENV: "staging",
        WERF_SET_1: "ingress.hostname=stage.eventify.today",
        WERF_SET_2: "replicas.default=1",
        WERF_SET_3: "replicas.min=1",
        WERF_SET_4: "replicas.max=2",
        SITE_URL: "https://stage.eventify.today",
        DATABASE_URL: "${{ secrets.DB_URL }}",
        MAPBOX_TOKEN: "${{ secrets.MAPBOX_TOKEN }}",
        ES_CLIENT_NODE: "http://172.17.0.1:9200/",
        ES_CLIENT_API_KEY: "${{ secrets.ELASTICSEARCH_API_KEY }}",
        ES_INDEX_PREMISE_FULFILLED: "kinguru-stage.public.premise.fulfilled",
        NEXT_PUBLIC_GA_ID: "${{ secrets.GA_ID }}",
        NEXT_PUBLIC_MAPBOX_TOKEN: "${{ secrets.MAPBOX_TOKEN }}",
        NEXT_PUBLIC_ELASTICSEARCH_API_KEY:
          "${{ secrets.ELASTICSEARCH_API_KEY }}",
        NEXT_PUBLIC_ELASTICSEARCH_ENDPOINT:
          "${{ secrets.ELASTICSEARCH_ENDPOINT }}",
        NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY:
          "${{ secrets.STRIPE_PUBLISHABLE_KEY }}",
      },
    },
    {
      name: "Create linked comment on PR",
      uses: "peter-evans/create-or-update-comment@v4",
      with: {
        "issue-number": "${{ github.event.number }}",
        body: "Staging deployed successfully: https://stage.eventify.today",
      },
    },
  ],
});

project.synth();

fs.rmSync("./pages", { recursive: true, force: true });
