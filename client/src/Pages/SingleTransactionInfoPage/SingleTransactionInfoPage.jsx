import React, { Fragment, useEffect } from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';
import useAdmin from '../../Hooks/useAdmin';
import { getSingleOrderInfo } from '../../App/Features/Payment/paymentActions';
import {
   singleOrderSelector,
   singleOrderLoadingSelector,
   singleOrderErrorSelector,
   authSelector,
} from './SingleTransaction.Selector';
import SpinnerComponent from '../../Components/SpinnerComponent/SpinnerComponent';
import NavbarComponent from '../../Components/NavbarComponent/NavbarComponent';
import PageHeadingComponent from '../../Components/PageHeadingComponent/PageHeadingComponent';
import dayjs from 'dayjs';
import CustomButtonComponent from '../../Components/CustomButtonComponent/CustomButtonComponent';
import { message } from 'antd';

const BoxCm = function ({ heading, value, children }) {
   return (
      <div className="box_div space-x-3 flex items-center mb-3">
         <div className="w-52">
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
   const auth = useSelector(authSelector);

   const paymentHandler = function (obj) {
      if (!auth) {
         return message.error('You need to login first');
      }

      const userId = auth?.user?._id;
      const updateObject = { ...obj, actionUserId: userId };
      console.log(updateObject);
   };

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
                        <h5 className="heading_el">Info</h5>
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
                           heading={'Transaction type'}
                           value={singleOrder?.transactions?.transactionType}
                        />
                        <BoxCm
                           heading={'Created at'}
                           value={dayjs(
                              singleOrder?.transactions?.createdAt
                           ).format('DD MMMM YY h:m:s A')}
                        />
                        <h5 className="heading_el">Payment Method</h5>
                        {singleOrder?.transactions?.paymentMethod
                           ?.minPayment && (
                           <BoxCm
                              heading={'Min amount'}
                              value={
                                 singleOrder?.transactions?.paymentMethod
                                    ?.minPayment
                              }
                           />
                        )}
                        {singleOrder?.transactions?.paymentMethod
                           ?.maxPayment && (
                           <BoxCm
                              heading={'Max amount'}
                              value={
                                 singleOrder?.transactions?.paymentMethod
                                    ?.maxPayment
                              }
                           />
                        )}
                        <BoxCm
                           heading={'Currecy Name'}
                           value={
                              singleOrder?.transactions?.paymentMethod?.name
                           }
                        />
                        <BoxCm heading={'Payment method icon'}>
                           <div className="cr_icon_div">
                              <img
                                 src={
                                    singleOrder?.transactions?.paymentMethod
                                       ?.icon
                                 }
                                 alt=""
                              />
                           </div>
                        </BoxCm>
                        {!!singleOrder?.transactions?.withdrawInformation && (
                           <Fragment>
                              <h5 className="heading_el">
                                 Withdraw Information
                              </h5>
                              {(function () {
                                 const keys = Object.keys(
                                    singleOrder?.transactions
                                       ?.withdrawInformation
                                 );
                                 return keys.map((el) => (
                                    <BoxCm
                                       key={el}
                                       heading={el}
                                       value={
                                          singleOrder?.transactions
                                             ?.withdrawInformation[el]
                                       }
                                    />
                                 ));
                              })()}
                           </Fragment>
                        )}

                        <h5 className="heading_el">Currency</h5>
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
                        <h5 className="heading_el">User</h5>
                        <BoxCm
                           heading={'User name'}
                           value={singleOrder?.transactions?.user?.name}
                        />
                        <BoxCm
                           heading={'User id'}
                           value={singleOrder?.transactions?.user?.userId}
                        />
                        <BoxCm heading={'Avatar'}>
                           <div className="cr_icon_div mb-3">
                              <img
                                 src={singleOrder?.transactions?.user?.avatar}
                                 alt=""
                              />
                           </div>
                        </BoxCm>
                        {!!singleOrder?.transactions?.withdrawInformation &&
                           singleOrder?.transactions?.transactionType ===
                              'withdraw' && (
                              <div className="flex items-center space-x-4">
                                 <CustomButtonComponent
                                    text={'Payment Approved'}
                                    btnCl={'Publish'}
                                    onClick={() =>
                                       paymentHandler({
                                          transactionId:
                                             singleOrder?.transactions?._id,
                                          type: 'Approved',
                                       })
                                    }
                                 />
                                 <CustomButtonComponent
                                    text={'Payment Rejected'}
                                    btnCl={'Publish rejected'}
                                    onClick={() =>
                                       paymentHandler({
                                          transactionId:
                                             singleOrder?.transactions?._id,
                                          type: 'Rejected',
                                       })
                                    }
                                 />
                              </div>
                           )}
                     </div>
                  )}
            </div>
         </div>
      </div>
   );
}

export default SingleTransactionInfoPage;
