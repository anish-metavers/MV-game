import React from 'react';
import * as styled from './SendMessageComponent.style';
import InputEmoji from 'react-input-emoji';
import { useForm, Controller } from 'react-hook-form';
import { BiSend } from '@react-icons/all-files/bi/BiSend';
import CustomButtonComponent from '../CustomButtonComponent/CustomButtonComponent';

function SendMessageComponent() {
   const { getValues, control, setValue } = useForm({
      defaultValues: {
         message: '',
      },
   });

   const sendHandler = function () {
      const message = getValues('message');
      console.log(message);
      setValue('message', '');
   };

   return (
      <styled.div>
         <div className="flex items-center space-x-2">
            <Controller
               name="message"
               control={control}
               render={({ field: { onChange, value } }) => (
                  <InputEmoji
                     theme="light"
                     value={value}
                     onChange={onChange}
                     cleanOnEnter
                     onEnter={sendHandler}
                     placeholder="Type a message"
                  />
               )}
            />
            <CustomButtonComponent btnCl={'send_button'} onClick={sendHandler}>
               <BiSend />
            </CustomButtonComponent>
         </div>
      </styled.div>
   );
}

export default SendMessageComponent;
