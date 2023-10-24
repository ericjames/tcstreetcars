import { FC } from "react";
import bus from "../../../images/bus.svg";
import horsecar from "../../../images/horsecar.svg";
import steampower from "../../../images/steampower.svg";
import streetcar from "../../../images/streetcar.svg";
import train from "../../../images/train.svg";

interface IProps {
  name: string | undefined;
  className?: string | undefined;
}

const ICONS: any = {
  bus: bus,
  horsecar: horsecar,
  steampower,
  streetcar: streetcar,
  train,
};

const Icon: FC<IProps> = ({ name, className = "" }) => {
  if (!name || ![ICONS[name]]) return null;

  return (
    <div className={`Icon ${className}`}>
      <img src={ICONS[name]} />
    </div>
  );
};

export default Icon;
