import { web } from "projen";
import { NodePackageManager } from "projen/lib/javascript";

const project = new web.NextJsTypeScriptProject({
  name: "kinguru-next",

  authorName: "Maksim Yersh",
  authorEmail: "yersh.maks@gmail.com",

  defaultReleaseBranch: "main",
  release: false,
  workflowNodeVersion: "18.x",
  workflowPackageCache: true,
  autoMerge: true,
  autoApproveOptions: {
    allowedUsernames: ["dependabot[bot]", "edelwud"],
  },
  autoApproveUpgrades: true,

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
        workload: "svc/postgres-cluster-repl",
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
  gitignore: [".env", "prisma/sqlite", "public/robots.txt", "public/sitemap*"],

  minNodeVersion: "18.16.0",
  packageManager: NodePackageManager.NPM,
  deps: [
    "@prisma/client",
    "@trpc/client",
    "@trpc/server",
    "@trpc/next",
    "@trpc/react-query",
    "trpc-shield",
    "next-auth",
    "@tanstack/react-query",
    "@tanstack/react-query-devtools",
    "zod",
    "superjson",
    "next-s3-upload",
    "next-i18next",
    "next-sitemap",
    "react-i18next",
    "i18next",
    "nodemailer",
    "@chakra-ui/react",
    "@chakra-ui/next-js",
    "@chakra-ui/icons",
    "@chakra-ui/theme-tools",
    "@emotion/react",
    "@emotion/styled",
    "react-map-gl",
    "mapbox-gl",
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
    "@egjs/flicking-plugins",
    "react-rating-stars-component",
    "react-intersection-observer",

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
    "prisma",
    "@faker-js/faker",
    "@types/node@20",
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

project.postCompileTask.exec("npx next-sitemap");
project.package.addDevDeps("@types/node@20");
project.eslint?.addExtends("plugin:@next/next/recommended");
project.synth();
