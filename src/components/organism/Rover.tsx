import { useEffect, useRef, useState } from "react";
import { type Rover } from "../../types/types";
import { obstacles } from "../../mocks/obstacles";
import RoverCommandPanel from "../molecules/RoverCommandPanel";
import RoverStatusPanel from "../molecules/RoverStatusPanel";
import ModalMessage from "../atoms/ModalMessage";
import RoverGrid from "../molecules/RoverGrid";
import { moveForward, rotateLeft, rotateRight } from "../../utils/roverLogic";

const Rover = () => {
  // Estat inicial del rover: posició (0,0) i direcció nord
  const [rover, setRover] = useState<Rover>({
    position: { x: 0, y: 0 },
    direction: "N",
  });

  // Comandes acumulades, i missatges d'error o èxit
  const [commands, setCommands] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Referència al modal per gestionar les animacions
  const modalRef = useRef<HTMLDivElement>(null);
  const size = 20; // Mida de la quadrícula (20x20)

  // Eliminació del missatge d'error un cop acaba l'animació del modal
  useEffect(() => {
    const modal = modalRef.current;
    if (!modal) return;

    const handleAnimationEnd = () => setErrorMessage(null);
    modal.addEventListener("animationend", handleAnimationEnd);

    return () => {
      modal.removeEventListener("animationend", handleAnimationEnd);
    };
  }, [errorMessage]);

  // Execució de totes les comandes en cadena
  const handleCommands = () => {
    const newRover = { ...rover };
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      for (const command of commands) {
        switch (command) {
          case "f":
            moveForward(newRover, size, obstacles);
            break;
          case "l":
            rotateLeft(newRover);
            break;
          case "r":
            rotateRight(newRover);
            break;
        }
      }
      setSuccessMessage("Tots els comandos executats correctament");
      setTimeout(() => setSuccessMessage(null), 2000);
    } catch (err) {
      if (err instanceof Error) {
        setErrorMessage(err.message);
      }
    }

    setRover(newRover);
    setCommands("");
  };

  return (
    <>
      <header>
        <RoverCommandPanel
          commands={commands}
          onCommand={(cmd) => setCommands((prev) => prev + cmd)}
          onBackspace={() => setCommands((prev) => prev.slice(0, -1))}
          onClear={() => setCommands("")}
          onExecute={handleCommands}
        />
        <RoverStatusPanel
          position={rover.position}
          direction={rover.direction}
        />
      </header>
      <main>
        {errorMessage && (
          <ModalMessage
            type="error"
            message={errorMessage}
            modalRef={modalRef}
          />
        )}
        {successMessage && (
          <ModalMessage type="success" message={successMessage} />
        )}
        <RoverGrid
          roverPosition={rover.position}
          roverDirection={rover.direction}
          obstacles={obstacles}
          size={size}
        />
      </main>
    </>
  );
};

export default Rover;
