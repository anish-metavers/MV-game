import React, { useEffect, useState } from 'react';
import * as styled from './MediaImagesComponent.style';
import SpinnerComponent from '../../Components/SpinnerComponent/SpinnerComponent';
import { VscClose } from '@react-icons/all-files/vsc/VscClose';
import { Popconfirm } from 'antd';
import {
   mediaImagesSelector,
   mediaImagesLoadingSelector,
   mediaImagesErrorSelector,
   uploadBulkImagesInfoSelector,
   uploadBulkImagesErrorSelector,
} from './Media.Selector';
import { useDispatch, useSelector } from 'react-redux';
import {
   deleteMediaFiles,
   getAllUploadImages,
} from '../../App/Features/Media/MediaActions';
import { removeImagesInfo } from '../../App/Features/Media/MediaSlice';
import useAdmin from '../../Hooks/useAdmin';
import { useCookies } from 'react-cookie';
import CustomButtonComponent from '../CustomButtonComponent/CustomButtonComponent';
import { BiEditAlt } from '@react-icons/all-files/bi/BiEditAlt';
import EditMediaFilePopupComponent from '../EditMediaFilePopupComponent/EditMediaFilePopupComponent';
import { AnimatePresence } from 'framer-motion';

function MediaImagesComponent() {
   const [Page, setPage] = useState(0);
   const [cookie] = useCookies();
   const [isAdmin] = useAdmin(cookie);
   const dispatch = useDispatch();
   const [IsEdit, setIsEdit] = useState(false);
   const [SelectedImage, setSelectedImage] = useState(false);

   const mediaImages = useSelector(mediaImagesSelector);
   const mediaImagesLoading = useSelector(mediaImagesLoadingSelector);
   const mediaImagesError = useSelector(mediaImagesErrorSelector);
   const uploadBulkImagesInfo = useSelector(uploadBulkImagesInfoSelector);
   const uploadBulkImagesError = useSelector(uploadBulkImagesErrorSelector);

   const confirmDelete = function (imageKey) {
      dispatch(deleteMediaFiles({ fileName: imageKey }));
   };

   const loadMoreHandler = function () {
      setPage((prevState) => prevState + 1);
   };

   const editImageHandler = function (key) {
      setSelectedImage(key);
      setIsEdit(true);
   };

   // useEffect(() => {
   //    if (isAdmin) {
   //       dispatch(getAllUploadImages({ page: Page }));
   //    }
   //    return () => {
   //       if (uploadBulkImagesInfo || uploadBulkImagesError)
   //          dispatch(removeImagesInfo());
   //    };
   // }, [isAdmin]);

   return (
      <styled.div>
         <AnimatePresence>
            {!!IsEdit && (
               <EditMediaFilePopupComponent
                  selectedImage={SelectedImage}
                  close={() => setIsEdit(false)}
               />
            )}
         </AnimatePresence>
         {!!mediaImagesError && (
            <p className="text-sm error_cl">{mediaImagesError}</p>
         )}
         {!!mediaImagesLoading && <SpinnerComponent />}
         <div className="grd_div">
            {!!mediaImages &&
               mediaImages?.success &&
               mediaImages?.images &&
               mediaImages?.images.length &&
               mediaImages?.images.map((el, ind) => (
                  <styled.imageBox key={ind}>
                     <Popconfirm
                        title="Delete the task"
                        description="Are you sure to delete this task?"
                        onConfirm={() => confirmDelete(el?.key)}
                        okText="Yes"
                        cancelText="No"
                     >
                        <div className="cl_div">
                           <VscClose className="text-gray-500" />
                        </div>
                     </Popconfirm>
                     <div className="imgBox bg-white rounded">
                        <img src={el?.key} />
                        <div
                           className="edit_btn"
                           onClick={() => editImageHandler(el?.key)}
                        >
                           <BiEditAlt />
                        </div>
                     </div>
                  </styled.imageBox>
               ))}
         </div>
         {mediaImages?.totalPages > Page && (
            <div className="flex items-center w-full justify-center">
               <CustomButtonComponent
                  text={'Load more.'}
                  btnCl={'load_mode text-sm'}
                  onClick={loadMoreHandler}
               />
            </div>
         )}
      </styled.div>
   );
}

export default MediaImagesComponent;
