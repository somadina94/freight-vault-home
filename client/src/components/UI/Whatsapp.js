import { FaSquareWhatsapp } from "react-icons/fa6";

import classses from "./Whatsapp.module.css";

const Whatsapp = () => {
  return (
    <div className={classses.whatsapp}>
      <a
        href="https://api.whatsapp.com/send/?phone=64211216682&text&type=phone_number&app_absent=0"
        target="_blank"
        rel="noreferrer"
      >
        <FaSquareWhatsapp className={classses.icon} />
      </a>
    </div>
  );
};

export default Whatsapp;
