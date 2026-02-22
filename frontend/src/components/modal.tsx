import type { ReactNode } from "react";

type Props = { children: ReactNode };
const Modal = ({ children }: Props) => {
  return (
    <>
      <div className="z-50 absolute w-full h-full flex flex-col justify-center bg-black/50 items-center">
        {children}
      </div>
    </>
  );
};
export default Modal;
