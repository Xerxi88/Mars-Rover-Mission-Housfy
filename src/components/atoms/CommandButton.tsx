import "../../App.css";

interface CommandButtonProps {
  icon: React.ReactNode;
  command: string;
  onClick: (command: string) => void;
}

const CommandButton = ({ icon, command, onClick }: CommandButtonProps) => {
  return (
    <button className="command-button" onClick={() => onClick(command)}>
      {icon}
    </button>
  );
};

export default CommandButton;
