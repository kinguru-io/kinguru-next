import { EventMainInfoLayout } from "@/layout/block/EventMainInfoLayout";
import prisma from "@/server/prisma";
import { Box } from "~/styled-system/jsx";

export default async function EventPage({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const event = await prisma.event.findFirst({
    where: { slug },
  });

  return (
    <EventMainInfoLayout bgImageSrc={event?.poster || ""}>
      <Box w="900px" h="100vh">
        asfasd
      </Box>
    </EventMainInfoLayout>
  );
}
