import { Client } from "@elastic/elasticsearch";

const esApiKey = process.env.ES_CLIENT_API_KEY;

export const esClient = new Client({
  node: process.env.ES_CLIENT_NODE,
  ...(esApiKey && { auth: { apiKey: esApiKey } }),
});
