import Link from "next/link";

export const EventCard = ({
  event,
}: {
  event: {
    id: string;
    topic: string;
    description: string;
    poster: string | null;
    starts: Date;
  };
}) => {
  return (
    <div className="group relative pb-8 shadow-xl">
      <div className="relative h-60 w-full overflow-hidden bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-2 group-hover:opacity-75 sm:h-64">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={event.poster ?? "/img/girl.png"}
          alt={event.description}
          className="h-full w-full object-cover object-center"
        />
      </div>
      <h3 className="mt-6 px-5 text-sm text-gray-500">
        <Link href={`/events/${event.id}`}>
          <span className="absolute inset-0"></span>
          {event.starts.toDateString()}
        </Link>
      </h3>
      <p className="px-5 text-base font-semibold text-gray-900">
        {event.topic}
      </p>
      <p className="mt-2 line-clamp-3 break-words px-5 text-sm text-gray-500">
        <Link href={`/events/${event.id}`}>
          <span className="absolute inset-0"></span>
          {event.description}
        </Link>
      </p>
    </div>
  );
};
