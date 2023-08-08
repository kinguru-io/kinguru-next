import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { Stripes } from "@/components/common/stripes";
import { useLocale } from "@/utils/use-locale";

export const HeroContent = () => {
  const { t } = useLocale();
  const { status } = useSession();
  if (status === "loading") {
    return <>Loading...</>;
  }
  return (
    <div
      className="h-screen"
      style={{
        background:
          "url(/img/parallax-1.png) no-repeat center center, url(/img/main.jpg) no-repeat center center",
        backgroundAttachment: "fixed, scroll",
        backgroundSize: "contain,cover",
      }}
    >
      <section className="relative isolate overflow-hidden px-6 py-24 sm:py-32 lg:px-8">
        <div className="align-center mx-auto max-w-2xl lg:max-w-4xl">
          <figure className="mt-8 lg:mt-28">
            <h1 className="text-center text-5xl font-bold text-gray-200 lg:text-7xl lg:leading-snug">
              <p>{t("hero.slug")}</p>
            </h1>
            <Stripes />
            <figcaption className="mt-10">
              <p className="m-auto block text-center text-3xl font-extralight leading-snug text-gray-200 lg:text-4xl">
                {t("hero.description")}
              </p>
            </figcaption>
            <figcaption className="mt-20 flex">
              {status === "authenticated" ? (
                <Link
                  href="/events"
                  className="m-auto block rounded-full bg-primary px-12 py-4 text-xl font-semibold uppercase text-gray-700 shadow-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  {t("hero.view_events")}
                </Link>
              ) : (
                <button
                  onClick={() => signIn()}
                  className="m-auto block rounded-full bg-primary px-12 py-4 text-xl font-semibold uppercase text-gray-700 shadow-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  {t("hero.sign_up")}
                </button>
              )}
            </figcaption>
          </figure>
        </div>
      </section>
    </div>
  );
};
