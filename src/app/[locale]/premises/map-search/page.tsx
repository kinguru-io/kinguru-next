"use client";

import { ClusteredMapSearch } from "./_widgets/clustered-map-search";
import { Modal } from "@/components/uikit";

export default function MapSearchPage() {
  return (
    <Modal>
      <ClusteredMapSearch />
    </Modal>
  );
}
