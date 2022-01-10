import { useCallback } from "react";
import { motion } from "framer-motion";
import Backdrop from "../Backdrop/index";
import { toggleGreen, toggleOrange, toggleBlue, togglePink } from "../../utils";

const dropIn = {
  hidden: {
    y: "-100vh",
    opacity: 0,
  },
  visible: {
    y: "0",
    opacity: 1,
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    y: "100vh",
    opacity: 0,
  },
};

const Modal = (props: { handleClose: any }) => {
  const toggleDark = useCallback(() => {
    document.documentElement.setAttribute("class", "dark");
    localStorage.setItem("theme", "dark");
  }, []);

  const toggleLight = useCallback(() => {
    document.documentElement.setAttribute("class", "light");
    localStorage.setItem("theme", "light");
  }, []);

  const blue = useCallback(() => {
    toggleBlue();
  }, []);

  const orange = useCallback(() => {
    toggleOrange();
  }, []);

  const pink = useCallback(() => {
    togglePink();
  }, []);

  const green = useCallback(() => {
    toggleGreen();
  }, []);

  return (
    <Backdrop onClick={props.handleClose}>
      {
        <motion.div
          onClick={(e) => e.stopPropagation()} // Prevent click from closing modal
          className="modal"
          variants={dropIn}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div className="settings-theme">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              className="bg-white ring-2 dark:scale-150 h-16 p-1 w-16 hover:text-white [color:var(--color-primary)] hover:[background-color:var(--color-primary)] [--tw-ring-color:var(--color-secondary)] rounded-full flex my-5"
              fill="currentColor"
              onClick={toggleLight}
            >
              <path
                fillRule="evenodd"
                d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                clipRule="evenodd"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="bg-black ring-2 dark:scale-100 scale-150 h-16 p-1 w-16  hover:text-white [color:var(--color-primary)] hover:[background-color:var(--color-primary)] [--tw-ring-color:var(--color-secondary)] rounded-full flex my-5"
              viewBox="0 0 20 20"
              fill="currentColor"
              onClick={toggleDark}
            >
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
          </div>
          <div className="settings-color">
            <div className="settings-orange" onClick={orange}></div>
            <div className="settings-blue" onClick={blue}></div>
            <div className="settings-pink" onClick={pink}></div>
            <div className="settings-green" onClick={green}></div>
          </div>
          <ModalButton onClick={props.handleClose} label="Close" />
        </motion.div>
      }
    </Backdrop>
  );
};

const ModalButton = (props: { onClick: any; label: string }) => (
  <motion.button
    className=".button bottom-2"
    type="button"
    onClick={props.onClick}
  >
    {props.label}
  </motion.button>
);

export default Modal;
