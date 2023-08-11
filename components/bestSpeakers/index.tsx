import { SpeakerCard } from "@/components/bestSpeakers/speakerCard";
import { Section } from "@/components/common/section";
import { Stripes } from "@/components/common/stripes";
import { trpc } from "@/utils/trpc";
import { useLocale } from "@/utils/use-locale";

export const BestSpeakersSection = () => {
  const { t } = useLocale();
  const { data: speakers } = trpc.speaker.bestSpeakers.useQuery();
  return (
    <Section className="bg-third bg-[url('/img/parallax-speakers.png')] bg-contain bg-fixed bg-center bg-no-repeat py-20">
      <h2 className="text-center text-4xl font-bold tracking-tight text-gray-900">
        {t("best_speakers.title")}
      </h2>
      <Stripes />
      <div className="mx-auto lg:grid lg:w-4/5 lg:grid-cols-3">
        {speakers?.map((speaker) => (
          <SpeakerCard
            key={speaker.id}
            speaker={speaker}
            className="mx-auto w-4/5"
          />
        ))}
      </div>
    </Section>
  );
};
