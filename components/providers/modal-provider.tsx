"use client";

import dynamic from "next/dynamic";

const CardModal = dynamic(
  () => import("../modals/card-modal").then((mod) => mod.CardModal),
  { ssr: false }
);

export const ModalProvider = () => {
  return (
    <>
      <CardModal />
    </>
  );
};
