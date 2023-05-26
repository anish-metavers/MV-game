import React, { Fragment, useEffect } from 'react';
import * as styled from './EditLotteryPollPage.style';
import NavbarComponent from '../../Components/NavbarComponent/NavbarComponent';
import PageHeadingComponent from '../../Components/PageHeadingComponent/PageHeadingComponent';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import useAdmin from '../../Hooks/useAdmin';
import { useCookies } from 'react-cookie';
import {
   authSelector,
   singleLotteryPollSelector,
   singleLotteryPollLoadingSelector,
   singleLotteryPollErrorSelector,
} from './EditLottery.Selector';
import { getSingleLuckyDrawPoll } from '../../App/Features/LuckyDraw/LuckyDrawActions';
import SpinnerComponent from '../../Components/SpinnerComponent/SpinnerComponent';
import dayjs from 'dayjs';
import LotteryPollBallsComponent from '../../Components/LotteryPollBallsComponent/LotteryPollBallsComponent';

function EditLotteryPollPage() {
   const [cookie] = useCookies();
   const [isAdmin] = useAdmin(cookie);
   const params = useParams();
   const dispatch = useDispatch();

   const auth = useSelector(authSelector);
   const singleLotteryPoll = useSelector(singleLotteryPollSelector);
   const singleLotteryPollLoading = useSelector(
      singleLotteryPollLoadingSelector
   );
   const singleLotteryPollError = useSelector(singleLotteryPollErrorSelector);

   useEffect(() => {
      if (!!auth && auth?.user && auth?.user?._id && isAdmin) {
         dispatch(getSingleLuckyDrawPoll({ gameId: params?.id }));
      }
   }, [auth, isAdmin]);

   return (
      <styled.div>
         <NavbarComponent />
         <div className="container_div">
            <PageHeadingComponent
               showSubHeadingCM={true}
               pageName={'Edit lottery draw'}
               heading={`Edit lottery draw`}
               para={`Lorem ipsum dolor sit amet consectetur adipisicing elit.
               Blanditiis, maiores perspiciatis. Est rerum, sit
               voluptas molestias officia modi, provident earum ad
               ipsam sed dolorem error odit quia, deserunt quasi!
               Doloribus!`}
            />
            <div className="mt-4">
               {!!singleLotteryPollLoading && <SpinnerComponent />}
               {!!singleLotteryPollError && (
                  <p className="text-sm error_cl">{singleLotteryPollError}</p>
               )}
               {!!singleLotteryPoll &&
               singleLotteryPoll?.success &&
               singleLotteryPoll?.item ? (
                  <Fragment>
                     <div className="gal_div">
                        <div className="box_div space-x-2">
                           <div className="hd">
                              <h5 className="text-gray-100 font-medium">
                                 Game Id
                              </h5>
                           </div>
                           <p className="text-gray-300 font-semibold">
                              {singleLotteryPoll?.item?.gameId}
                           </p>
                        </div>
                        <div className="box_div space-x-2">
                           <div className="hd">
                              <h5 className="text-gray-100 font-medium">
                                 Lottery poll result time
                              </h5>
                           </div>
                           <p className="text-gray-300 font-semibold">
                              {dayjs(
                                 singleLotteryPoll?.item?.lotteryPollResultTime
                              ).format('MMM DD hh:mm:ss A')}
                           </p>
                        </div>
                        <div className="box_div space-x-2">
                           <div className="hd">
                              <h5 className="text-gray-100 font-medium">
                                 Lottery poll result show
                              </h5>
                           </div>
                           <p className="text-gray-300 font-semibold">
                              {singleLotteryPoll?.item?.lotteryPollResultShow
                                 ? 'Yes'
                                 : 'No'}
                           </p>
                        </div>
                        <div className="box_div space-x-2">
                           <div className="hd">
                              <h5 className="text-gray-100 font-medium">
                                 Lottery poll created time
                              </h5>
                           </div>
                           <p className="text-gray-300 font-semibold">
                              {dayjs(singleLotteryPoll?.item?.createdAt).format(
                                 'MMM DD hh:mm:ss A'
                              )}
                           </p>
                        </div>
                     </div>
                     <div className="mt-5">
                        <p className="mb-2 text-gray-500 font-medium">
                           Lucky draw result numbers
                        </p>
                        <LotteryPollBallsComponent
                           jackpotBallNumber={
                              singleLotteryPoll?.item?.lotteryPollResult
                                 ?.jackpotBallNumber
                           }
                           luckyNumbers={
                              singleLotteryPoll?.item?.lotteryPollResult
                                 ?.luckyNumbers
                           }
                        />
                     </div>
                     {/* {singleLotteryPoll?.item?.winners &&
                     singleLotteryPoll?.item?.winners?.length ? (
                        <div className="wn_div gal_div"></div>
                     ) : null}
                     {singleLotteryPoll?.item?.lotteryParticipateUsers &&
                     singleLotteryPoll?.item?.lotteryParticipateUsers
                        ?.length ? (
                        <div className="wn_div gal_div"></div>
                     ) : null} */}
                  </Fragment>
               ) : !singleLotteryPollLoading ? (
                  <p className="text-sm text-gray-300">
                     Lottery poll is not found!
                  </p>
               ) : null}
            </div>
         </div>
      </styled.div>
   );
}

export default EditLotteryPollPage;
