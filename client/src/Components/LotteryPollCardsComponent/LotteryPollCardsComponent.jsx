import React from 'react';
import LotteryCardComponent from '../../Components/LotteryCardComponent/LotteryCardComponent';
import * as styled from './LotteryPoll.style';
import {
   allLotteryPollSelector,
   allLotteryPollLoadingSelector,
   allLotteryPollErrorSelector,
} from './LotteryPoll.Selector';
import { useSelector } from 'react-redux';
import SpinnerComponent from '../SpinnerComponent/SpinnerComponent';

function LotteryPollCardsComponent() {
   const allLotteryPoll = useSelector(allLotteryPollSelector);
   const allLotteryPollLoading = useSelector(allLotteryPollLoadingSelector);
   const allLotteryPollError = useSelector(allLotteryPollErrorSelector);

   return (
      <styled.div>
         {!!allLotteryPollLoading && <SpinnerComponent />}
         {!!allLotteryPollError && (
            <p className="text-sm error_cl">{allLotteryPollError}</p>
         )}
         {!!allLotteryPoll &&
         allLotteryPoll?.success &&
         allLotteryPoll?.items ? (
            <div className="lottery_Card_div mt-5">
               {allLotteryPoll?.items.map((el) => (
                  <LotteryCardComponent data={el} key={el?._id} />
               ))}
            </div>
         ) : (
            <div className="text-center mt-4">
               <p className="text-sm text-gray-300">No lottery poll is live.</p>
            </div>
         )}
      </styled.div>
   );
}

export default LotteryPollCardsComponent;
