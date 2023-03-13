import { IoLogoGameControllerB } from '@react-icons/all-files/io/IoLogoGameControllerB';
import React, { Fragment } from 'react';
import ResultCardComponent from '../ResultCardComponent/ResultCardComponent';
import { FiUsers } from '@react-icons/all-files/fi/FiUsers';
import {
   gameStatusSelector,
   gameStatusLoadingSelector,
   gameStatusErrorSelector,
} from './ResultCard.Selector';
import { useSelector } from 'react-redux';
import SpinnerComponent from '../SpinnerComponent/SpinnerComponent';

function ResultCartsContainerComponent() {
   const gameStatus = useSelector(gameStatusSelector);
   const gameStatusLoading = useSelector(gameStatusLoadingSelector);
   const gameStatusError = useSelector(gameStatusErrorSelector);

   return (
      <Fragment>
         <div>
            {!!gameStatusLoading ? <SpinnerComponent /> : null}
            {!!gameStatusError ? (
               <p className="text-sm error_cl">{gameStatusError}</p>
            ) : null}
            {!!gameStatus && gameStatus?.success ? (
               <ResultCardComponent
                  heading={gameStatus?.totalsGames}
                  subHeading={'Total Games'}
                  icon={<IoLogoGameControllerB className="text-gray-300" />}
                  bg={'light'}
               />
            ) : null}
         </div>
         {/* <ResultCardComponent
            heading={'200,00'}
            subHeading={'Total Users'}
            icon={<FiUsers className="text-gray-300" />}
            bg={'dark'}
         /> */}
      </Fragment>
   );
}

export default ResultCartsContainerComponent;
