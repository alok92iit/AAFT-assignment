// import  { useState } from 'react';
import { cn } from '@/lib/utils';
import { SET_MODAL } from '@/store/reducers/notify';
import { motion, AnimatePresence } from 'framer-motion';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const AnimatedModal = ({heading,body:mBody ,className="bg-white"}:any) => {
//   const [isOpen, setIsOpen] = useState(true);
    let body=mBody
    console.log("jlsdcnksdc sndcsndcjscsijdcbiu  nn x  isjk =",mBody)
  const dispatch=useDispatch()
  let {modalState:isOpen,modalBody}=useSelector((state:any)=>state?.notify)
  console.log("dcjhuiwseygdfchkbsjn xukyvdb jdf,sxhvvd",modalBody)
  if(!body){
    body=modalBody
    if (typeof body !== "string" && !React.isValidElement(body)) {
      console.warn("Invalid modal body detected, closing modal:", body);
      return null; // ⛔ Do not render modal
    }
  }
  // body={"dklwemjdicom":"cklejcol"}
  // console.log("x,sdnmhk bxk ouwegcv xncyu8 =",body)
  const modalVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      y: 50
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8,
      y: 50,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
   
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={modalVariants}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4"
          >
            <motion.div 
              className={cn(" my-8 w-full max-w-2xl rounded-xl shadow-2xl p-6 relative overflow-y-auto max-h-[45rem] ",className)}
              initial={{ rotate: -5 }}
              animate={{ rotate: 0 }}
            >
              <motion.button 
                // onClick={() => setIsOpen(false)}
                onClick={() => dispatch(SET_MODAL(false))}
                whileHover={{ rotate: 90, scale: 1.1 }}
                className="sticky top-4 left-4 text-gray-500 hover:text-red-500 float-right"
              >
                ✕
              </motion.button>

              <motion.h2 
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="text-2xl font-bold text-slate-800 mb-4"
              >
               {heading}
              </motion.h2>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="w-full"
              >
                {body }
              </motion.div>

             
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    
  );
};

export default AnimatedModal;