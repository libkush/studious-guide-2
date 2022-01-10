import useScrollBlock from "./hooks/useScrollBlock";
import { useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import SearchModal from "./searchModal";

export default function Search() {
  const [modelOpen, setModelOpen] = useState(false);
  const [blockScroll, allowScroll] = useScrollBlock();

  const open = useCallback(() => {
    setModelOpen(true);
    blockScroll();
  }, [setModelOpen, blockScroll]);

  const close = useCallback(() => {
    setModelOpen(false);
    allowScroll();
  }, [setModelOpen, allowScroll]);

  const toggleModal = useCallback(() => {
    modelOpen ? close() : open();
  }, [open, close, modelOpen]);

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      e.preventDefault();
      close();
    } else if (e.ctrlKey && e.key === "k") {
      e.preventDefault();
      open();
    }
  });

  return (
    <div id="dummy" onClick={toggleModal}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-10 w-10 mx-4 float-left"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
          clipRule="evenodd"
        />
      </svg>
      <h2 className="font-semibold font-sans dark:text-white/50 text-3xl">
        Search (Ctrl + K)
      </h2>
      <AnimatePresence initial={false} exitBeforeEnter={true}>
        {modelOpen && <SearchModal handleClose={close} />}
      </AnimatePresence>
    </div>
  );
}
