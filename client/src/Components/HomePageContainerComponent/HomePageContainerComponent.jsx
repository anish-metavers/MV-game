import React from 'react';
import * as styled from './HomePageContainerComponent.style';
import NavbarComponent from '../NavbarComponent/NavbarComponent';
import GameUploadResultChartComponent from '../GameUploadResultChartComponent/GameUploadResultChartComponent';
// import UserStatusChartComponent from '../UserStatusChartComponent/UserStatusChartComponent';
import ResultCartsContainerComponent from '../ResultCartsContainerComponent/ResultCartsContainerComponent';

function HomePageContainerComponent() {
   return (
      <styled.div>
         <NavbarComponent />
         <div className="container_div">
            <div className="banner_grid_div">
               <ResultCartsContainerComponent />
            </div>
            <div className="my-5">
               <GameUploadResultChartComponent />
               {/* <div className="grid_div mt-5">
                  <UserStatusChartComponent />
               </div> */}
            </div>
         </div>
      </styled.div>
   );
}

export default HomePageContainerComponent;
