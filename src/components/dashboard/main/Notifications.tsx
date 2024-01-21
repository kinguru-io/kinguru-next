import {
  Container,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Tr,
} from "@chakra-ui/react";
import { ModerationNotification, PurchaseNotification } from "@prisma/client";
import { flexRender, useReactTable } from "@tanstack/react-table";
// eslint-disable-next-line import/no-extraneous-dependencies
import { createColumnHelper, getCoreRowModel } from "@tanstack/table-core";
import { useTranslations } from "next-intl";
import { FC } from "react";
import { trpc } from "@/utils/trpc.ts";

const columnHelper = createColumnHelper<
  ModerationNotification | PurchaseNotification
>();

const columns = [
  columnHelper.accessor("status", {
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("viewed", {
    cell: (info) => (info.getValue() ? "viewed" : "new"),
  }),
  columnHelper.accessor("createdAt", {
    cell: (info) => info.getValue().toLocaleDateString(),
  }),
];

export const Notifications: FC = () => {
  const t = useTranslations();
  const { data } = trpc.notification.all.useQuery();
  const table = useReactTable({
    data: data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Container py={5}>
      <Heading fontSize={"lg"}>{t("dashboard.main_notifications")}</Heading>
      <TableContainer maxH={"200px"} overflowY={"auto"}>
        <Table>
          <Tbody>
            {table.getRowModel().rows.map((row) => (
              <Tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <Td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Container>
  );
};
