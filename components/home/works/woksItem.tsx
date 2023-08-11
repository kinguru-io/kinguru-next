import Image from "next/image";

export const WorksItem = ({
  title,
  image,
}: {
  title: string;
  image: string;
}) => {
  return (
    <div className="mt-10 grid grid-cols-1 content-center">
      <Image
        src={image}
        width={100}
        height={100}
        className="mx-auto"
        alt={title}
      />
      <p className="mt-5 font-bold uppercase">{title}</p>
    </div>
  );
};
