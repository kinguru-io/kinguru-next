import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest } from "next/server";
import { APIRoute } from "next-s3-upload";

type AppOrPagesRequest = NextApiRequest | NextRequest;
type S3Config = {
  accessKeyId?: string;
  secretAccessKey?: string;
  bucket?: string;
  region?: string;
  endpoint?: string;
  forcePathStyle?: boolean;
};

type NextRouteHandler = (
  req: NextApiRequest,
  res: NextApiResponse,
) => Promise<void>;

type Options<R extends AppOrPagesRequest> = S3Config & {
  key?: (req: R, filename: string) => string | Promise<string>;
};
type Configure = (options: Options<NextApiRequest>) => Handler;
type Handler = NextRouteHandler & { configure: Configure };

const s3Upload: Handler = APIRoute.configure({
  endpoint: "https://s3.pl-waw.scw.cloud/",
});

export default s3Upload;
