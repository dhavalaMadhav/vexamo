import React from 'react';
import { motion } from 'framer-motion';
const TextReveal = ({ children, className = "", delay = 0 }) => {
  return (
    <div className={`overflow-hidden ${className}`}>
     <motion.div
  initial={{ opacity: 0, y: 16 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, ease: "easeOut" }}
  viewport={{ once: true, margin: "-80px" }}
>

        {children}
      </motion.div>
    </div>
  );
};

export default TextReveal;
