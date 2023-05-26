import React, { useState, useEffect } from 'react';
import * as styled from './SingleLotteryPollTabComponent.style';
import CustomButtonComponent from '../CustomButtonComponent/CustomButtonComponent';
import LotteryPollUsersListComponent from '../LotteryPollUsersListComponent/LotteryPollUsersListComponent';
import { useDispatch } from 'react-redux';
import { getSingleLotteryDrawUsersList } from '../../App/Features/LuckyDraw/LuckyDrawActions';
import { useCookies } from 'react-cookie';
import useAdmin from '../../Hooks/useAdmin';
import { useParams } from 'react-router';

const tabsAr = [
   { name: 'Participate List', value: 'participate' },
   { name: 'Winners List', value: 'winners' },
];

function SingleLotteryPollTabComponent() {
   const [ActiveTab, setActiveTab] = useState('participate');
   const [Page, setPage] = useState(0);

   const [Cookie] = useCookies();
   const [isAdmin] = useAdmin(Cookie);
   const params = useParams();
   const id = params?.id;

   const dispatch = useDispatch();

   const tabHandler = function (value) {
      if (ActiveTab === value) return;
      setActiveTab(value);
   };

   useEffect(() => {
      if (ActiveTab && !!isAdmin && id) {
         dispatch(
            getSingleLotteryDrawUsersList({
               gameId: id,
               filter: ActiveTab,
               page: Page,
            })
         );
      }
   }, [isAdmin, Page]);

   return (
      <styled.div>
         <div className="tab_div flex items-center space-x-3">
            {tabsAr.map((el) => (
               <CustomButtonComponent
                  key={el?.name}
                  text={el?.name}
                  btnCl={
                     ActiveTab === el?.value
                        ? 'tab_button_active tab_button'
                        : 'tab_button'
                  }
                  onClick={() => tabHandler(el?.value)}
               />
            ))}
         </div>
         <div className="result_div mt-4">
            <LotteryPollUsersListComponent />
         </div>
      </styled.div>
   );
}

export default SingleLotteryPollTabComponent;
