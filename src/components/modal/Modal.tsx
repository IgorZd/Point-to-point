import React, { FC, useEffect } from "react";
import { createPortal } from "react-dom";
// @ts-ignore
import styled from "styled-components";
import { media } from "../../styles/media";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  width: 100vw;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000000;
  background-color: rgb(0, 0, 0, 0.6);
  ${media.phone`
    align-items: flex-end;
  `}
`;

export interface ModalProps {
  children: any;
  isOpenModal: boolean;
  bodyElem?: any;
  width?: string;
  className?: string;
}
export const Modal: FC<ModalProps> = ({
  children,
  isOpenModal,
  bodyElem,
  width,
  ...props
}) => {
  const body = document.getElementsByTagName("body")[0];
  useEffect(() => {
    body.style.overflow = isOpenModal ? "hidden" : "overlay";
  }, [isOpenModal, body]);

  if (isOpenModal) {
    return createPortal(
      <Wrapper {...props}>{children}</Wrapper>,
      document.getElementById("modal") || document.body
    );
  }
  return null;
};
