import React from 'react';
import * as styled from './SpinDrawPage.style';
import NavbarComponent from '../../Components/NavbarComponent/NavbarComponent';
import PageHeadingComponent from '../../Components/PageHeadingComponent/PageHeadingComponent';
import { MenuItem } from '@mui/material';
import { useNavigate } from 'react-router';

function SpinDrawPage() {
   const navigation = useNavigate();

   const createSpinItemsHandler = function () {
      navigation('/create-spin-items');
   };

   return (
      <styled.div>
         <NavbarComponent />
         <div className="container_div">
            <PageHeadingComponent
               pageName={'All spin items'}
               showSubHeadingCM={true}
               para={`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.`}
               menu={true}
               innerProps={
                  <MenuItem onClick={createSpinItemsHandler}>
                     Create new spin item
                  </MenuItem>
               }
            />
         </div>
      </styled.div>
   );
}

export default SpinDrawPage;
