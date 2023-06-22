import React from 'react';
import * as styled from './MessageComponent.style';
import dayjs from 'dayjs';

function MessageComponent({ sender, message, createdAt }) {
   return (
      <styled.chatDiv sender={sender} className={sender ? 'my_message chat_div' : 'chat_div'}>
         <div className="mg_div">
            <p className=" text-gray-300 date_time">{dayjs(createdAt).format('DD MMM YY hh:mm:ss A')}</p>
            <div className="message_div">
               <p className="text-gray-100 text-sm">{message}</p>
            </div>
         </div>
      </styled.chatDiv>
   );
}

export default MessageComponent;
