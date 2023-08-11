import { Section } from "@/components/common/section";
import { Stripes } from "@/components/common/stripes";
import { useLocale } from "@/utils/use-locale";

export const CompanyStatisticsSection = () => {
  const { t } = useLocale();
  return (
    <Section className="bg-primary pt-10">
      <div className="text-center lg:grid lg:grid-cols-3">
        <div className="group relative pb-10">
          <h2 className="text-7xl font-light">50+</h2>
          <Stripes color="#fff" mt="30px" mb="30px" />
          <p className="text-3xl">{t("company_statistics.events_held")}</p>
        </div>
        <div className="group relative pb-10">
          <h2 className="text-7xl font-light">100+</h2>
          <Stripes color="#fff" mt="30px" mb="30px" />
          <p className="text-3xl">{t("company_statistics.speakers")}</p>
        </div>
        <div className="group relative pb-10">
          <h2 className="text-7xl font-light">150+</h2>
          <Stripes color="#fff" mt="30px" mb="30px" />
          <p className="text-3xl">
            {t("company_statistics.connected_establishments")}
          </p>
        </div>
      </div>
    </Section>
  );
};
