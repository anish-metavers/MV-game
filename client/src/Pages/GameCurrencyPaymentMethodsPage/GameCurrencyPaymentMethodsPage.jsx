import { MenuItem } from '@mui/material';
import React, { useEffect } from 'react';
import NavbarComponent from '../../Components/NavbarComponent/NavbarComponent';
import * as styled from './GameCurrencyPaymentMethodsPage.style';
import PageHeadingComponent from '../../Components/PageHeadingComponent/PageHeadingComponent';
import { useNavigate } from 'react-router';
import { useCookies } from 'react-cookie';
import useAdmin from '../../Hooks/useAdmin';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrencyPaymentOptions } from '../../App/Features/Payment/paymentActions';
import { currencyMethodsSelector } from './GameCurrency.Selector';

function GameCurrencyPaymentMethodsPage() {
   const navigation = useNavigate();
   const [cookie] = useCookies();
   const [isAdmin] = useAdmin(cookie);
   const dispatch = useDispatch();

   const currencyMethods = useSelector(currencyMethodsSelector);

   const CreateGameCurrencyPaymentHandler = function () {
      navigation('/game-currency-payment/create');
   };

   useEffect(() => {
      if (isAdmin && !currencyMethods) {
         dispatch(getCurrencyPaymentOptions({ page: 0 }));
      }
   }, [isAdmin]);

   return (
      <styled.div>
         <NavbarComponent />
         <div className="container_div">
            <PageHeadingComponent
               showSubHeadingCM={true}
               subHeading={'All Payment Options'}
               pageName={'Currency Payment'}
               para={`Lorem ipsum dolor sit amet consectetur adipisicing elit.
               Blanditiis, maiores perspiciatis. Est rerum, sit
               voluptas molestias officia modi, provident earum ad
               ipsam sed dolorem error odit quia, deserunt quasi!
               Doloribus!`}
               menu={true}
               innerProps={
                  <MenuItem onClick={CreateGameCurrencyPaymentHandler}>
                     Add new currency
                  </MenuItem>
               }
            />
         </div>
      </styled.div>
   );
}

export default GameCurrencyPaymentMethodsPage;
