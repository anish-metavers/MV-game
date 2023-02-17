import React from 'react';
import * as styled from './PageHeadingComponent.style';

function PageHeadingComponent({ pageName }) {
   return (
      <styled.div>
         <div className="flex items-center">
            <p className="text-blue-500 font-medium">Dashboard</p>
            <span className="mx-3 text-gray-500">/</span>
            <span className=" text-gray-500 font-medium">{pageName}</span>
         </div>
         <h1 className="mt-2 text-3xl text-gray-700 font-semibold">
            Welcome to Dashboard
         </h1>
      </styled.div>
   );
}

export default React.memo(PageHeadingComponent);
