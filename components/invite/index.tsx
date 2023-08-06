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
          <div className="group relative">{t("invite.title")}</div>
        </div>
      </div>
    </div>
  );
};
