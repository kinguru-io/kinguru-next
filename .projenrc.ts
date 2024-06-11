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
    target: "latest",
  },

  artifactsDirectory: ".next",

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
      "global.d.ts",
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
    "@aws-sdk/client-s3",
    "@aws-sdk/s3-request-presigner",

    "@prisma/client",
    "@trpc/client",
    "@trpc/server",
    "@trpc/next",
    "@trpc/react-query",
    "trpc-shield",
    "next-auth",
    "@tanstack/react-table",
    "@tanstack/react-query@^4.18.0",
    "@tanstack/react-query-devtools@^4.18.0",
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
    "@mapbox/search-js-core",
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
    "dotenv",
    "kafkajs",
    "@elastic/elasticsearch@8.13.1",
    "@elastic/transport@8.4.1",
  ],
  devDeps: [
    "@pandacss/dev",

    "tsconfig-paths-webpack-plugin",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-links",
    "@storybook/blocks",
    "@storybook/nextjs",
    "@storybook/react",
    "@storybook/test",
    "@storybook/jest",
    "storybook-addon-module-mock",
    "eslint-plugin-storybook",
    "storybook",
    "msw",
    "msw-storybook-addon@canary",
    "storybook-addon-module-mock",
    "storybook-addon-turbo-build",

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

project.package.addField("type", "module");
project.eslint?.addExtends("plugin:@next/next/recommended");

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

project.buildWorkflow?.addPostBuildJob("staging-deploy", {
  name: "staging-deploy",
  runsOn: ["ubuntu-latest"],
  environment: {
    name: "staging",
    url: "https://staging.eventify.today",
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
        WERF_SET_1: "image.pullSecret=github-cr-secret",
        WERF_SET_2: "ingress.hostname=staging.eventify.today",
        WERF_SET_3: "replicas.default=1",
        WERF_SET_4: "replicas.min=1",
        WERF_SET_5: "replicas.max=2",
        SITE_URL: "https://staging.eventify.today",
        DATABASE_URL: "${{ secrets.DB_URL }}",
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
        body: "Staging deployed successfully: https://staging.eventify.today",
      },
    },
  ],
});

project.synth();

fs.rmSync("./pages", { recursive: true, force: true });
