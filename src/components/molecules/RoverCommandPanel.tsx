import CommandButton from "../atoms/CommandButton";
import {
  ArrowForward,
  ArrowLeft,
  ArrowRight,
  BackspaceIcon,
  ClearIcon,
  SecuencyForward,
  SecuencyLeft,
  SecuencyRight,
} from "../../icons/Icons";

interface Props {
  commands: string;
  onCommand: (cmd: string) => void;
  onBackspace: () => void;
  onClear: () => void;
  onExecute: () => void;
}

// Associació entre comandes i icones visuals
const commandIcons: Record<string, React.ReactNode> = {
  f: <SecuencyForward />,
  l: <SecuencyLeft />,
  r: <SecuencyRight />,
};

const RoverCommandPanel = ({
  commands,
  onCommand,
  onBackspace,
  onClear,
  onExecute,
}: Props) => {
  return (
    <section className="rover-panel-input">
      <div className="rover-commands">
        <p className="rover-secuency">
          Seqüència:
          {commands.split("").map((cmd, index) => (
            <span key={index}>{commandIcons[cmd]}</span>
          ))}
        </p>
        <div className="command-buttons">
          {/* Botons per afegir comandes */}
          <CommandButton command="l" icon={<ArrowLeft />} onClick={onCommand} />
          <CommandButton
            command="f"
            icon={<ArrowForward />}
            onClick={onCommand}
          />
          <CommandButton
            command="r"
            icon={<ArrowRight />}
            onClick={onCommand}
          />
          {/* Botó per esborrar l'última comanda */}
          <CommandButton
            command=""
            icon={<BackspaceIcon />}
            onClick={onBackspace}
          />
          {/* Botó per esborrar tota la seqüència */}
          <CommandButton command="" icon={<ClearIcon />} onClick={onClear} />
        </div>
        {/* Botó d'execució de comandes */}
        <button onClick={onExecute} disabled={!commands}>
          {commands ? "Executar comandos" : "Falten comandos"}
        </button>
      </div>
    </section>
  );
};

export default RoverCommandPanel;
