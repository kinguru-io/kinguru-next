import { AuthClientConfig, fetchData } from "next-auth/client/_utils";
import {
  BuiltInProviderType,
  RedirectableProviderType,
} from "next-auth/providers";
import {
  ClientSafeProvider,
  LiteralUnion,
  SignInAuthorizationParams,
  SignInOptions,
  SignInResponse,
  getCsrfToken,
} from "next-auth/react";

export interface InternalUrl {
  /** @default "http://localhost:3000" */
  origin: string;
  /** @default "localhost:3000" */
  host: string;
  /** @default "/api/auth-organization" */
  path: string;
  /** @default "http://localhost:3000/api/auth-organization" */
  base: string;
  /** @default "http://localhost:3000/api/auth-organization" */
  toString: () => string;
}

export default function parseUrl(url?: string): InternalUrl {
  const defaultUrl = new URL("http://localhost:3000/api/auth-organization");

  if (url && !url.startsWith("http")) {
    url = `https://${url}`;
  }

  const _url = new URL(url ?? defaultUrl);
  const path = (_url.pathname === "/" ? defaultUrl.pathname : _url.pathname)
    // Remove trailing slash
    .replace(/\/$/, "");

  const base = `${_url.origin}${path}`;

  return {
    origin: _url.origin,
    host: _url.host,
    path,
    base,
    toString: () => base,
  };
}

export function apiBaseUrl(__NEXTAUTH: AuthClientConfig) {
  if (typeof window === "undefined") {
    // Return absolute path when called server side
    return `${__NEXTAUTH.baseUrlServer}${__NEXTAUTH.basePathServer}`;
  }
  // Return relative path when called client side
  return __NEXTAUTH.basePath;
}

const __NEXTAUTH: AuthClientConfig = {
  baseUrl: parseUrl(process.env.NEXTAUTH_URL ?? process.env.VERCEL_URL).origin,
  basePath: parseUrl(process.env.NEXTAUTH_URL).path,
  baseUrlServer: parseUrl(
    process.env.NEXTAUTH_URL_INTERNAL ??
      process.env.NEXTAUTH_URL ??
      process.env.VERCEL_URL,
  ).origin,
  basePathServer: parseUrl(
    process.env.NEXTAUTH_URL_INTERNAL ?? process.env.NEXTAUTH_URL,
  ).path,
  _lastSync: 0,
  _session: undefined,
  _getSession: () => {},
};

export declare type WarningCode =
  | "NEXTAUTH_URL"
  | "NO_SECRET"
  | "TWITTER_OAUTH_2_BETA"
  | "DEBUG_ENABLED";

interface LoggerInstance extends Record<string, Function> {
  warn: (code: WarningCode) => void;
  error: (
    code: string,
    /**
     * Either an instance of (JSON serializable) Error
     * or an object that contains some debug information.
     * (Error is still available through `metadata.error`)
     */
    metadata:
      | Error
      | {
          error: Error;
          [key: string]: unknown;
        },
  ) => void;
  debug: (code: string, metadata: unknown) => void;
}

function hasErrorProperty(
  x: unknown,
): x is { error: Error; [key: string]: unknown } {
  return !!(x as any)?.error;
}
class UnknownError extends Error {
  code: string;
  constructor(error: Error | string) {
    // Support passing error or string
    super((error as Error)?.message ?? error);
    this.name = "UnknownError";
    this.code = (error as any).code;
    if (error instanceof Error) {
      this.stack = error.stack;
    }
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      stack: this.stack,
    };
  }
}

function formatError(o: unknown): unknown {
  if (o instanceof Error && !(o instanceof UnknownError)) {
    return { message: o.message, stack: o.stack, name: o.name };
  }
  if (hasErrorProperty(o)) {
    o.error = formatError(o.error) as Error;
    o.message = o.message ?? o.error.message;
  }
  return o;
}

export function proxyLogger(
  logger: LoggerInstance = _logger,
  basePath?: string,
): LoggerInstance {
  try {
    if (typeof window === "undefined") {
      return logger;
    }

    const clientLogger: Record<string, unknown> = {};
    for (const level in logger) {
      clientLogger[level] = (code: string, metadata: Error) => {
        _logger[level](code, metadata); // Logs to console

        if (level === "error") {
          metadata = formatError(metadata) as Error;
        }
        (metadata as any).client = true;
        const url = `${basePath}/_log`;
        const body = new URLSearchParams({ level, code, ...(metadata as any) });
        if (navigator.sendBeacon) {
          return navigator.sendBeacon(url, body);
        }
        return fetch(url, { method: "POST", body, keepalive: true });
      };
    }
    return clientLogger as unknown as LoggerInstance;
  } catch {
    return _logger;
  }
}

const _logger: LoggerInstance = {
  error(code, metadata) {
    metadata = formatError(metadata) as Error;
    console.error(
      `[next-auth][error][${code}]`,
      `\nhttps://next-auth.js.org/errors#${code.toLowerCase()}`,
      metadata.message,
      metadata,
    );
  },
  warn(code) {
    console.warn(
      `[next-auth][warn][${code}]`,
      `\nhttps://next-auth.js.org/warnings#${code.toLowerCase()}`,
    );
  },
  debug(code, metadata) {
    console.log(`[next-auth][debug][${code}]`, metadata);
  },
};

const logger = proxyLogger(_logger, __NEXTAUTH.basePath);

export async function getProviders() {
  return fetchData<
    Record<LiteralUnion<BuiltInProviderType>, ClientSafeProvider>
  >("providers", __NEXTAUTH, logger);
}

export async function signIn<
  P extends RedirectableProviderType | undefined = undefined,
>(
  provider?: LiteralUnion<
    P extends RedirectableProviderType
      ? P | BuiltInProviderType
      : BuiltInProviderType
  >,
  options?: SignInOptions,
  authorizationParams?: SignInAuthorizationParams,
): Promise<
  P extends RedirectableProviderType ? SignInResponse | undefined : undefined
> {
  const { callbackUrl = window.location.href, redirect = true } = options ?? {};

  const baseUrl = apiBaseUrl(__NEXTAUTH);
  const providers = await getProviders();

  if (!providers) {
    window.location.href = `${baseUrl}/error`;
    return;
  }

  if (!provider || !(provider in providers)) {
    window.location.href = `${baseUrl}/signin?${new URLSearchParams({
      callbackUrl,
    })}`;
    return;
  }

  const isCredentials = providers[provider].type === "credentials";
  const isEmail = providers[provider].type === "email";
  const isSupportingReturn = isCredentials || isEmail;

  const signInUrl = `${baseUrl}/${
    isCredentials ? "callback" : "signin"
  }/${provider}`;

  const _signInUrl = `${signInUrl}${authorizationParams ? `?${new URLSearchParams(authorizationParams)}` : ""}`;

  const res = await fetch(_signInUrl, {
    method: "post",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    // @ts-expect-error
    body: new URLSearchParams({
      ...options,
      csrfToken: await getCsrfToken(),
      callbackUrl,
      json: true,
    }),
  });

  const data = await res.json();

  // TODO: Do not redirect for Credentials and Email providers by default in next major
  if (redirect || !isSupportingReturn) {
    const url = data.url ?? callbackUrl;
    window.location.href = url;
    // If url contains a hash, the browser does not reload the page. We reload manually
    if (url.includes("#")) window.location.reload();
    return;
  }

  const error = new URL(data.url).searchParams.get("error");

  if (res.ok) {
    await __NEXTAUTH._getSession({ event: "storage" });
  }

  return {
    error,
    status: res.status,
    ok: res.ok,
    url: error ? null : data.url,
  } as any;
}
