import React from 'react';
import * as styled from './LiveChatPage.style';
import LiveChatHeadComponent from '../../Components/LiveChatHeadComponent/LiveChatHeadComponent';
import UserListComponent from '../../Components/UserListComponent/UserListComponent';
import LiveChatScreenComponent from '../../Components/LiveChatScreenComponent/LiveChatScreenComponent';

function LiveChatPage() {
   return (
      <styled.div>
         {/* <LiveChatHeadComponent /> */}
         <div className="content_div">
            <div className="list_div">
               <UserListComponent />
            </div>
            <LiveChatScreenComponent />
         </div>
      </styled.div>
   );
}

export default LiveChatPage;
