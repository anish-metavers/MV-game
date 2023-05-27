import React, { useEffect } from 'react';
import * as styled from './UserTicketListComponent.style';
import LotteryTicketBallsComponent from '../LotteryTicketBallsComponent copy/LotteryTicketBallsComponent';
import { useForm, Controller } from 'react-hook-form';
import dayjs from 'dayjs';

function UserTicketListComponent({
   user,
   lotteryPollNumbers,
   isUsed,
   numberOfTickets,
   price,
   refundTicket,
   createdAt,
   _id,
}) {
   const { setValue, control } = useForm({
      defaultValues: {
         lotteryNumbers: {},
      },
   });

   useEffect(() => {
      const { luckyNumbers, jackpotBallNumber } = lotteryPollNumbers;

      const luckyNumbersObject = {};

      for (let i = 0; i < luckyNumbers.length; i++) {
         luckyNumbersObject[i + 1] = luckyNumbers[i];
      }

      if (!!jackpotBallNumber) {
         luckyNumbersObject['6'] = jackpotBallNumber;
      }

      setValue('lotteryNumbers', luckyNumbersObject);
   }, []);

   return (
      <styled.tr>
         <td>
            <div className="user_div shadow">
               <img src={user?.avatar} alt="" />
            </div>
         </td>
         <td>
            <p className="font-semibold">{user?.name}</p>
         </td>
         <td>
            <Controller
               name="lotteryNumbers"
               control={control}
               render={({ field: { value } }) => (
                  <div className="flex items-center text-gray-900">
                     <LotteryTicketBallsComponent
                        show={[1, 2, 3, 4, 5, 6]}
                        numbers={value}
                        uniqueKey={_id}
                     />
                  </div>
               )}
            />
         </td>
         <td>
            <p className="ont-semibold">x{numberOfTickets}</p>
         </td>
         <td>
            <p>{price}</p>
         </td>
         <td>
            <p>{isUsed ? 'Yes' : 'No'}</p>
         </td>
         <td>
            <p>{refundTicket ? 'Yes' : 'No'}</p>
         </td>
         <td>{dayjs(createdAt).format('MMMM DD YYYY h:m:s A')}</td>
      </styled.tr>
   );
}

export default UserTicketListComponent;
