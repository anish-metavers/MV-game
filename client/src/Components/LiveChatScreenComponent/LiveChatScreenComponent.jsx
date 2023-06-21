import React from 'react';
import * as styled from './LiveChatScreenComponent.style';
import ChatHomeScreenComponent from '../ChatHomeScreenComponent/ChatHomeScreenComponent';
import { useSearchParams } from 'react-router-dom';
import MessageComponent from '../MessageComponent/MessageComponent';
import SendMessageComponent from '../SendMessageComponent/SendMessageComponent';

function LiveChatScreenComponent() {
   let [searchParams, setSearchParams] = useSearchParams();
   const param = searchParams.get('chat');

   return (
      <styled.div>
         {!param && <ChatHomeScreenComponent />}
         {!!param && (
            <styled.contentDiv>
               <div className="screen_div">
                  <MessageComponent sender={true} />
                  <MessageComponent sender={false} />
                  <MessageComponent sender={false} />
               </div>
               <SendMessageComponent />
            </styled.contentDiv>
         )}
      </styled.div>
   );
}

export default LiveChatScreenComponent;
