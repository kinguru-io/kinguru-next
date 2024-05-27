import { Container } from "~/styled-system/jsx";

export default async function Uikit({ searchParams }: { searchParams: any }) {
  return (
    <Container>
      <pre>{JSON.stringify(searchParams, null, 2)}</pre>
    </Container>
  );
}
