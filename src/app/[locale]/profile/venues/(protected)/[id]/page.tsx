export default async function ProfileVenuePage({
  params: { id },
}: {
  params: { id: string };
}) {
  return (
    <div>
      <h1>ProfileVenuePage {id}</h1>
    </div>
  );
}
