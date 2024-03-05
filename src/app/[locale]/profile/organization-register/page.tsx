import { useTranslations } from "next-intl";
import { OrganizationRegisterForm } from "./form";
import { orgRegister } from "@/lib/actions";

export default function OrganizationRegisterPage() {
  const t = useTranslations("organization.basic_info_page");

  return (
    <>
      <h1 className="heading">{t("heading")}</h1>
      <section>
        <OrganizationRegisterForm orgRegister={orgRegister} />
      </section>
    </>
  );
}
