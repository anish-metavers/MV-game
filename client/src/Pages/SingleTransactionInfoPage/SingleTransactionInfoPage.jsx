import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';
import useAdmin from '../../Hooks/useAdmin';
import { getSingleOrderInfo } from '../../App/Features/Payment/paymentActions';
import {
   singleOrderSelector,
   singleOrderLoadingSelector,
   singleOrderErrorSelector,
} from './SingleTransaction.Selector';
import SpinnerComponent from '../../Components/SpinnerComponent/SpinnerComponent';
import NavbarComponent from '../../Components/NavbarComponent/NavbarComponent';
import PageHeadingComponent from '../../Components/PageHeadingComponent/PageHeadingComponent';
import dayjs from 'dayjs';

const BoxCm = function ({ heading, value, children }) {
   return (
      <div className="box_div space-x-3 flex items-center mb-3">
         <div className="w-40">
            <p className="text-gray-400 font-medium">{heading}</p>
         </div>
         {children ? (
            <div>{children}</div>
         ) : (
            <p className="text-gray-300 font-medium">{value}</p>
         )}
      </div>
   );
};

function SingleTransactionInfoPage() {
   const params = useParams();
   const dispatch = useDispatch();
   const { orderId } = params;
   const [cookie] = useCookies();
   const [isAdmin] = useAdmin(cookie);

   const singleOrder = useSelector(singleOrderSelector);
   const singleOrderLoading = useSelector(singleOrderLoadingSelector);
   const singleOrderError = useSelector(singleOrderErrorSelector);

   useEffect(() => {
      if (isAdmin && orderId) {
         dispatch(getSingleOrderInfo({ orderId }));
      }
   }, [isAdmin]);

   return (
      <div>
         <NavbarComponent />
         <div className="container_div">
            <PageHeadingComponent
               heading={'Order'}
               pageName={'Single order'}
               subHeading={'Payment order'}
               showSubHeadingCM={true}
               para={`Lorem ipsum dolor sit amet consectetur adipisicing elit.
               Blanditiis, maiores perspiciatis. Est rerum, sit
               voluptas molestias officia modi, provident earum ad
               ipsam sed dolorem error odit quia, deserunt quasi!
               Doloribus!`}
            />
            <div className="mt-5">
               {singleOrderError ? (
                  <p className="text-sm error_cl">{singleOrderError}</p>
               ) : null}
               {singleOrderLoading && <SpinnerComponent />}
               {singleOrder &&
                  singleOrder?.success &&
                  singleOrder?.transactions && (
                     <div className="result_cr_div">
                        <h5 className="text-gray-400 font-medium text-xl mb-5">
                           Info
                        </h5>
                        <BoxCm
                           heading={'Status'}
                           value={singleOrder?.transactions?.status}
                        />
                        <BoxCm
                           heading={'Way name'}
                           value={singleOrder?.transactions?.wayName}
                        />
                        <BoxCm
                           heading={'Order id'}
                           value={singleOrder?.transactions?.orderId}
                        />
                        <BoxCm
                           heading={'Amount'}
                           value={singleOrder?.transactions?.amount}
                        />
                        <BoxCm
                           heading={'Created at'}
                           value={dayjs(
                              singleOrder?.transactions?.createdAt
                           ).format('DD MMMM YY h:m:s A')}
                        />
                        <h5 className="text-gray-400 font-medium text-xl mt-5 pt-4 mb-5">
                           Currency
                        </h5>
                        <BoxCm
                           heading={'Currency name'}
                           value={
                              singleOrder?.transactions?.currency?.currencyName
                           }
                        />
                        <BoxCm
                           heading={'Currency type'}
                           value={
                              singleOrder?.transactions?.currency?.currencyType
                           }
                        />
                        <BoxCm heading={'Currency icon'}>
                           <div className="cr_icon_div">
                              <img
                                 src={singleOrder?.transactions?.currency?.icon}
                                 alt=""
                              />
                           </div>
                        </BoxCm>
                        <h5 className="text-gray-400 font-medium text-xl mt-5 pt-4 mb-5">
                           User
                        </h5>
                        <BoxCm
                           heading={'User name'}
                           value={singleOrder?.transactions?.user?.name}
                        />
                        <BoxCm
                           heading={'User id'}
                           value={singleOrder?.transactions?.user?.userId}
                        />
                        <BoxCm heading={'Avatar'}>
                           <div className="cr_icon_div">
                              <img
                                 src={singleOrder?.transactions?.user?.avatar}
                                 alt=""
                              />
                           </div>
                        </BoxCm>
                     </div>
                  )}
            </div>
         </div>
      </div>
   );
}

export default SingleTransactionInfoPage;
