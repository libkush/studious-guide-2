import { motion } from "framer-motion";

const Backdrop = (props: { children: any; onClick: any }) => {
  return (
    <motion.div
      className="backdrop"
      onClick={props.onClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {props.children}
    </motion.div>
  );
};

export default Backdrop;
