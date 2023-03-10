import React, { Fragment } from 'react';
import * as styled from './ImageUploadComponent.style';

function ImageUploadComponent({
   icon,
   label,
   onChange,
   accept,
   preview,
   height,
   width,
}) {
   return (
      <Fragment>
         <label className="text-gray-300 font-medium">{label}</label>
         <styled.div
            className={`flex items-center justify-center ${
               label ? 'mt-2' : ''
            }`}
            style={{
               width: `${width}px`,
               height: `${height}px`,
            }}
         >
            <div className="icon_div">
               {icon}
               <input onChange={onChange} accept={accept} type={'file'} />
            </div>
            {!!preview ? (
               <div className="prevImage">
                  <img src={preview} alt="" />
               </div>
            ) : null}
         </styled.div>
      </Fragment>
   );
}

export default ImageUploadComponent;
