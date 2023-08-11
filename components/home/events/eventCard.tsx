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
    place: {
      id: string;
      location: string;
    };
  };
}) => {
  return (
    <div className="group relative pb-8 shadow-xl">
      <div className="relative h-60 w-full overflow-hidden bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-2 group-hover:opacity-75 sm:h-64">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={event.poster ?? "/img/girl.png"}
          alt={event.topic}
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div className="mb-2 mt-3 flex items-center gap-x-4 px-5 text-xs">
        <div className="flex items-center gap-x-1">
          <svg
            className="h-5 w-5 flex-shrink-0 text-gray-500"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.25A2.75 2.75 0 0118 6.75v8.5A2.75 2.75 0 0115.25 18H4.75A2.75 2.75 0 012 15.25v-8.5A2.75 2.75 0 014.75 4H5V2.75A.75.75 0 015.75 2zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75z"
              clipRule="evenodd"
            />
          </svg>
          <time dateTime="2020-03-16" className="text-gray-500">
            {event.starts.toDateString()}
          </time>
        </div>
        <div className="flex items-center gap-x-1">
          <svg
            className="h-5 w-5 flex-shrink-0 text-gray-400"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 103 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 002.273 1.765 11.842 11.842 0 00.976.544l.062.029.018.008.006.003zM10 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z"
              clipRule="evenodd"
            />
          </svg>
          <p className="text-gray-500">
            <Link href={`/places/${event.place.id}`}>
              {event.place.location}
            </Link>
          </p>
        </div>
      </div>
      <p className="px-5 text-base font-semibold text-gray-900">
        <Link href={`/events/${event.id}`}>{event.topic}</Link>
      </p>
      <p className="mt-2 line-clamp-3 break-words px-5 text-sm text-gray-500">
        <Link href={`/events/${event.id}`}>{event.description}</Link>
      </p>
    </div>
  );
};
