import { Stripes } from "@/components/common/stripes";
import { useLocale } from "@/utils/use-locale";

export const InviteSection = () => {
  const { t } = useLocale();
  return (
    <div
      className="bg-secondary py-14"
      style={{
        background:
          "#2a2a2a url(/img/parallax-mobile.png) no-repeat center 200px",
        backgroundAttachment: "fixed",
        backgroundSize: "contain",
      }}
    >
      <div className="mx-auto max-w-2xl px-4 py-8 text-white sm:px-6 sm:py-8 lg:max-w-7xl lg:px-8">
        <div className="mt-6 content-center space-y-12 lg:grid lg:grid-cols-2 lg:gap-x-6 lg:space-y-0">
          <div className="group relative m-auto w-5/6 text-center">
            <h3 className=" text-4xl font-extrabold">{t("invite.title")}</h3>
            <Stripes />
            <p>{t("invite.description")}</p>
          </div>
          <div className="group relative">
            <div className="sm:col-span-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-100"
              >
                {t("invite.telephone")}
              </label>
              <div className="mt-2">
                <input
                  id="tel"
                  name="tel"
                  type="tel"
                  autoComplete="tel"
                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-100 placeholder:text-gray-100 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="mt-3 sm:col-span-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-100"
              >
                {t("invite.email")}
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-100 placeholder:text-gray-100 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                />
              </div>
              <button className="m-auto mt-7 block rounded-full bg-primary px-12 py-4 text-xl font-semibold uppercase text-gray-700 shadow-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                {t("invite.subscribe")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
