import dynamic from "next/dynamic";
import { _ModalWindow } from "./ModalWindow";

export const ModalWindow = dynamic(() => Promise.resolve(_ModalWindow), {
  ssr: false,
});
export * from "./Modal";
