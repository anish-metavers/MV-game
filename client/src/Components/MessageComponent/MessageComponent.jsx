import React from 'react';
import * as styled from './MessageComponent.style';

function MessageComponent({ sender }) {
   return (
      <styled.chatDiv className={sender ? 'my_message chat_div' : 'chat_div'}>
         <div className="mg_div">
            <p className=" text-gray-300 date_time">200123-120p20</p>
            <div className="message_div">
               <p className="text-gray-100 text-sm">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Neque eaque repellendus obcaecati reiciendis
                  aliquid distinctio ea. Aliquid delectus temporibus laborum?
               </p>
            </div>
         </div>
      </styled.chatDiv>
   );
}

export default MessageComponent;
