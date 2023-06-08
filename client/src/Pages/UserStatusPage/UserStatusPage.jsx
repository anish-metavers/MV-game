import React, { useEffect } from 'react';
import * as styled from './UserStatusPage.style';
import NavbarComponent from '../../Components/NavbarComponent/NavbarComponent';
import { useParams } from 'react-router';
import { useCookies } from 'react-cookie';
import useAdmin from '../../Hooks/useAdmin';
import { useDispatch, useSelector } from 'react-redux';
import {
   getAllGlobalChatGroups,
   getPrivacyFieldStatus,
   getUserAllCryptoCurrency,
   getUserAllFiatCurrency,
   getUserFriendList,
   getUserSelectedCurrency,
   getUserSingleAccountInformation,
} from '../../App/Features/userManagement/userManagementActions';
import UserProfileCardComponent from '../../Components/UserProfileCardComponent/UserProfileCardComponent';
import UserCurrencyCardComponent from '../../Components/UserCurrencyCardComponent/UserCurrencyCardComponent';
import {
   walletFiatCurrencyDataSelector,
   walletFiatCurrencyDataLoadingSelector,
   walletFiatCurrencyDataErrorSelector,
   userAccountInformationSelector,
   userCryptoCurrencyListSelector,
   userCryptoCurrencyListLoadingSelector,
   userCryptoCurrencyListErrorSelector,
} from './UserStatus.Selector';
import SpinnerComponent from '../../Components/SpinnerComponent/SpinnerComponent';
import WalletTransactionComponent from '../../Components/WalletTransactionComponent/WalletTransactionComponent';
import UserSettingsCardComponent from '../../Components/UserSettingsCardComponent/UserSettingsCardComponent';
import GlobalChatComponent from '../../Components/GlobalChatComponent/GlobalChatComponent';
import { removeGroupMessage } from '../../App/Features/userManagement/userManagementSlice';
import FriendsListComponent from '../../Components/FriendsListComponent/FriendsListComponent';
import UserBlcCharComponent from '../../Components/UserBlcCharComponent/UserBlcCharComponent';

function UserStatusPage() {
   const dispatch = useDispatch();
   const params = useParams();
   const [cookie] = useCookies();
   const [isAdmin] = useAdmin(cookie);

   const walletFiatCurrencyData = useSelector(walletFiatCurrencyDataSelector);
   const walletFiatCurrencyDataLoading = useSelector(walletFiatCurrencyDataLoadingSelector);
   const walletFiatCurrencyDataError = useSelector(walletFiatCurrencyDataErrorSelector);
   const userAccountInformation = useSelector(userAccountInformationSelector);
   const userCryptoCurrencyList = useSelector(userCryptoCurrencyListSelector);
   const userCryptoCurrencyListLoading = useSelector(userCryptoCurrencyListLoadingSelector);
   const userCryptoCurrencyListError = useSelector(userCryptoCurrencyListErrorSelector);

   useEffect(() => {
      if (!!isAdmin && !!params && params?.id) {
         dispatch(getUserSingleAccountInformation({ userId: params?.id }));
         dispatch(getUserAllFiatCurrency({ userId: params?.id }));
         dispatch(getUserSelectedCurrency({ userId: params?.id }));
         dispatch(getPrivacyFieldStatus({ userId: params?.id }));
         dispatch(getAllGlobalChatGroups());
         dispatch(getUserFriendList({ userId: params?.id }));
      }
   }, [isAdmin, params]);

   useEffect(() => {
      if (
         !!params &&
         params?.id &&
         !!userAccountInformation &&
         userAccountInformation?.success &&
         userAccountInformation?.data &&
         userAccountInformation?.data?.item
      ) {
         dispatch(getUserAllCryptoCurrency({ userId: userAccountInformation?.data?.item?.userId }));
      }
   }, [userAccountInformation]);

   useEffect(() => {
      return () => {
         dispatch(removeGroupMessage());
      };
   }, []);

   return (
      <styled.div>
         <NavbarComponent />
         <div className="container_div">
            <UserProfileCardComponent />
            <div className="px-2 py-4">
               <p className="text-gray-300 font-medium text-xl mt-4 mb-3">User global settings</p>
               <UserSettingsCardComponent />
            </div>
            <div className="px-2 pb-4 pt-2">
               <p className="text-gray-300 font-medium text-xl mt-4">Fiat wallet currency data</p>
               {!!walletFiatCurrencyDataLoading && <SpinnerComponent />}
               {!!walletFiatCurrencyDataError && <p className="error_cl">{walletFiatCurrencyDataError}</p>}
               {!!walletFiatCurrencyData &&
                  walletFiatCurrencyData?.success &&
                  walletFiatCurrencyData?.walletCurrency &&
                  walletFiatCurrencyData?.walletCurrency?.[0] &&
                  walletFiatCurrencyData?.walletCurrency?.[0]?.wallet &&
                  walletFiatCurrencyData?.walletCurrency?.[0]?.wallet.length && (
                     <div className="mt-4 grid_div">
                        {walletFiatCurrencyData?.walletCurrency?.[0]?.wallet.map((el) => (
                           <UserCurrencyCardComponent data={el} key={el?._id} />
                        ))}
                     </div>
                  )}
            </div>
            <div className="px-2 pb-4 pt-2">
               <p className="text-gray-300 font-medium text-xl mt-4">Crypto wallet currency data</p>
               {!!userCryptoCurrencyListLoading && <SpinnerComponent />}
               {!!userCryptoCurrencyListError && <p className="error_cl">{userCryptoCurrencyListError}</p>}
               {!!userCryptoCurrencyList &&
                  userCryptoCurrencyList?.success &&
                  userCryptoCurrencyList?.data &&
                  userCryptoCurrencyList?.data.length && (
                     <div className="mt-4 grid_div">
                        {userCryptoCurrencyList?.data.map((el) => (
                           <UserCurrencyCardComponent data={el} key={el?.currencyId} />
                        ))}
                     </div>
                  )}
            </div>
            <div className="py-5 px-2 grd_div">
               <UserBlcCharComponent />
            </div>
            <div className="my-4 px-2">
               <p className="text-gray-300 font-medium text-xl mt-4 mb-4">Wallet transactions</p>
               <WalletTransactionComponent />
            </div>
            <div className="flex w-full">
               <div className="px-2 pb-4 pt-2 w-full">
                  <p className="text-gray-300 font-medium text-xl mt-4 mb-4">Global chats</p>
                  <div className="mt-4 mb-4">
                     <GlobalChatComponent />
                  </div>
               </div>
               <div className="w-full p-2">
                  <p className="text-gray-300 font-medium text-xl mt-4 mb-4">User friends list</p>
                  <FriendsListComponent />
               </div>
            </div>
         </div>
      </styled.div>
   );
}

export default UserStatusPage;
