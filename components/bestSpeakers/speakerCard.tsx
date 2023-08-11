import Link from "next/link";

export const SpeakerCard = ({
  speaker,
  className,
}: {
  speaker: {
    id: string;
    user: {
      image: string | null;
      name: string | null;
      position: string | null;
      company: string | null;
    };
  };
  className: string;
}) => {
  return (
    <div className={`group relative pb-8 shadow-xl ${className} text-center`}>
      <div className="p-5">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={speaker.user.image ?? "/img/girl.png"}
          alt={speaker.user.name ?? "Speaker"}
          className="h-full w-full rounded-full object-cover object-center"
        />
      </div>
      <p className="text-base font-semibold text-gray-900">
        <Link href={`/speakers/${speaker.id}`}>{speaker.user.name}</Link>
      </p>
      <p className="mt-2 line-clamp-3 break-words px-5 text-sm text-gray-500">
        {speaker.user.position}
      </p>
      <p className="line-clamp-3 break-words px-5 text-sm text-gray-500">
        {speaker.user.company}
      </p>
    </div>
  );
};
