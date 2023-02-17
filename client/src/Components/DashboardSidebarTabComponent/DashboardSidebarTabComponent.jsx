import React, { useState } from 'react';
import * as styled from './DashboardSidebarTabComponent.style';
import { MdKeyboardArrowDown } from '@react-icons/all-files/md/MdKeyboardArrowDown';
import { AnimatePresence, motion } from 'framer-motion';

function DashboardSidebarTabComponent({ heading, children }) {
   const [ShowInnerTabs, setShowInnerTabs] = useState(false);

   const ShowAndHideTabs = function () {
      setShowInnerTabs(!ShowInnerTabs);
   };

   return (
      <styled.div>
         <div className="content_div" onClick={ShowAndHideTabs}>
            <p className=" text-md font-medium">{heading}</p>
            <div className="arrow_icon">
               <MdKeyboardArrowDown />
            </div>
         </div>
         <AnimatePresence>
            {ShowInnerTabs ? (
               <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
               >
                  <styled.innerItems>{children}</styled.innerItems>
               </motion.div>
            ) : null}
         </AnimatePresence>
      </styled.div>
   );
}

export default DashboardSidebarTabComponent;
