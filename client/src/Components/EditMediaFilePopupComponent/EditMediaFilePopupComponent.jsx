import React from 'react';
import * as styled from './EditMediaFilePopupComponent.style';
import ReactDOM from 'react-dom';
import { VscClose } from '@react-icons/all-files/vsc/VscClose';
import { motion } from 'framer-motion';

function EditMediaFilePopupComponent({ close, selectedImage }) {
   return ReactDOM.createPortal(
      <styled.div>
         <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="mainDiv shadow"
         >
            <div className="closeBtn" onClick={close}>
               <VscClose className="text-gray-100 text-xl" />
            </div>
            <styled.imageBox>
               <img src={selectedImage} alt="selected image" />
            </styled.imageBox>
         </motion.div>
      </styled.div>,
      document.getElementById('popUp')
   );
}

export default EditMediaFilePopupComponent;
