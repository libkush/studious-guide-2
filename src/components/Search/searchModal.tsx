import Backdrop from "../Backdrop/index";
import React, { useState, useEffect, useCallback } from "react";
import useKeyPress from "./hooks/useKeyPress";
import { motion } from "framer-motion";
import Data from "./searchData.json";
import ListItem from "./listItem";

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

interface result {
  id: number;
  statement: string;
  link: string;
}

const SearchModal = (props: { handleClose: any }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<result[]>(Data);
  const [selected, setSelected] = useState<any>(undefined);
  const downPress = useKeyPress("ArrowDown");
  const upPress = useKeyPress("ArrowUp");
  const enterPress = useKeyPress("Enter");
  const [cursor, setCursor] = useState(0);
  const [hovered, setHovered] = useState<result | undefined>(results[0]);

  useEffect(() => {
    if (results.length && downPress) {
      setCursor((prevState) =>
        prevState < results.length - 1 ? prevState + 1 : prevState
      );
    }
  }, [downPress, results.length]);
  useEffect(() => {
    if (results.length && upPress) {
      setCursor((prevState) => (prevState > 0 ? prevState - 1 : prevState));
    }
  }, [upPress, results.length]);
  useEffect(() => {
    if (results.length && enterPress) {
      setSelected(results[cursor]);
    }
  }, [cursor, enterPress, results]);
  useEffect(() => {
    if (results.length && hovered) {
      setCursor(results.indexOf(hovered));
    }
  }, [hovered, results]);

  useEffect(() => {
    if (!selected) return;
    document.getElementById(selected?.link)?.scrollIntoView();
    props.handleClose();
  }, [selected, props]);

  const handleSearch = useCallback(
    (e) => {
      if (!e.target.value || e.target.value === "") setQuery("");
      setQuery(e.target.value);
      const searchResults = Data.filter((result) =>
        result.statement.toLowerCase().includes(query.toLowerCase())
      );
      setResults(searchResults);
    },
    [query, setResults, setQuery]
  );
  return (
    <Backdrop onClick={props.handleClose}>
      {
        <motion.div
          onClick={(e) => e.stopPropagation()} // Prevent click from closing modal
          className="search"
          variants={dropIn}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div className="searchbar">
            <input
              id="searchbox"
              autoFocus
              placeholder="Search for a question"
              onChange={handleSearch}
            />
          </div>
          <div id="results">
            {results?.map((result, i) => (
              <ListItem
                key={result.id}
                active={i === cursor}
                item={result}
                setSelected={setSelected}
                setHovered={setHovered}
              />
            ))}
          </div>
        </motion.div>
      }
    </Backdrop>
  );
};
export default SearchModal;
