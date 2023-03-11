import React from 'react';
import * as styled from './UserProfileComponent.style';

function UserProfileComponent({ user }) {
   return (
      <styled.div>
         <div className="flex items-center space-x-5">
            <styled.profileDiv className="shadow">
               <img src={user?.logo} alt="" />
            </styled.profileDiv>
            <styled.contentDiv>
               <h5 className="text-2xl text-gray-300 font-medium">
                  {user?.providerName}
               </h5>
               <p className="text-gray-500 mt-1">{user?.email}</p>
            </styled.contentDiv>
         </div>
         {user?.description ? (
            <div className="mt-4 px-2">
               <h5 className="text-gray-400 font-medium text-xl">
                  About Us {user?.providerName}
               </h5>
               <p className="mt-2 text-gray-500 text-sm">{user?.description}</p>
            </div>
         ) : null}
      </styled.div>
   );
}

export default UserProfileComponent;
