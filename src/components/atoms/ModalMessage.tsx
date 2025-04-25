import { RefObject } from "react";

interface Props {
  message: string;
  type: "error" | "success";
  modalRef?: RefObject<HTMLDivElement | null>;
}

const ModalMessage = ({ message, type, modalRef }: Props) => {
  return (
    <div className="modal-overlay">
      <div
        className={`modal-content ${
          type === "error" ? "fade-in-out" : "success"
        }`}
        ref={modalRef}
      >
        <p>
          {message.split("\n").map((line, index) => (
            <span key={index}>
              {line}
              <br />
            </span>
          ))}
        </p>
      </div>
    </div>
  );
};

export default ModalMessage;
