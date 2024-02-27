import { useTranslations } from "next-intl";
import { BasicInfoForm } from "./form";

export default function ProfileBasicInfoPage() {
  const t = useTranslations("organization.basic_info_page");

  return (
    <>
      <h1 className="heading">{t("heading")}</h1>
      <section>
        <BasicInfoForm />
      </section>
    </>
  );
}
