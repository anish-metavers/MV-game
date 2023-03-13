import React, { useEffect } from 'react';
import * as styled from './UserPage.style';
import NavbarComponent from '../../Components/NavbarComponent/NavbarComponent';
import PageHeadingComponent from '../../Components/PageHeadingComponent/PageHeadingComponent';
import { useDispatch, useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';
import useAdmin from '../../Hooks/useAdmin';
import { getAllUsers } from '../../App/Features/Admin/adminActions';
import { useSearchParams } from 'react-router-dom';
import SpinnerComponent from '../../Components/SpinnerComponent/SpinnerComponent';
import TableComponent from '../../Components/TableComponent/TableComponent';
import dayjs from 'dayjs';
import {
   usersSelector,
   userLoadingSelector,
   userErrorsSelector,
} from './User.Selector';
import { ROW } from './UserTable';
import { useNavigate } from 'react-router-dom';

function UserPage() {
   const dispatch = useDispatch();
   const [cookie] = useCookies();
   const [isAdmin] = useAdmin(cookie);
   const [params] = useSearchParams();
   const page = params.get('page');
   const navigation = useNavigate();

   const users = useSelector(usersSelector);
   const userLoading = useSelector(userLoadingSelector);
   const userErrors = useSelector(userErrorsSelector);

   const NextPageHandler = function () {
      navigation(`?page=${+page + 1}`);
   };

   const PrevPageHandler = function () {
      navigation(`?page=${+page - 1}`);
   };

   useEffect(() => {
      if (page && isAdmin) {
         dispatch(getAllUsers({ page: page }));
      }
   }, [page, isAdmin]);

   return (
      <styled.div>
         <NavbarComponent />
         <div className="container_div">
            <PageHeadingComponent
               pageName={'User'}
               showSubHeadingCM={true}
               subHeading={'All Users'}
               para={`Lorem ipsum dolor sit amet consectetur adipisicing elit.
               Blanditiis, maiores perspiciatis. Est rerum, sit
               voluptas molestias officia modi, provident earum ad
               ipsam sed dolorem error odit quia, deserunt quasi!
               Doloribus!`}
            />
            <div className="mt-5">
               {!!userErrors ? (
                  <p className="text-sm error_cl">{userErrors}</p>
               ) : null}
               {userLoading ? <SpinnerComponent /> : null}
               {!!users && users?.success && users?.users ? (
                  <TableComponent
                     row={ROW}
                     nextHandler={NextPageHandler}
                     nextAndPrev={true}
                     prevHandler={PrevPageHandler}
                     disablePrevbtn={+page === 0 ? true : false}
                     disableNextbtn={+page >= users?.totalPages ? true : false}
                     tableWidth={2500}
                  >
                     {users?.users.map((el) => (
                        <tr key={el?._id}>
                           <td>{el?.name}</td>
                           <td>{el?.email}</td>
                           <td>
                              <div className="user_profile_div">
                                 <img src={el?.avatar} alt="" />
                              </div>
                           </td>
                           <td>{el?.userId}</td>
                           <td>{el?.statisticsHidden.toString()}</td>
                           <td>{el?.privateChat.toString()}</td>
                           <td>{el?.online.toString()}</td>
                           <td>{el?.newFriendRequest.toString()}</td>
                           <td>{el?.hideUser.toString()}</td>
                           <td>{el?.active.toString()}</td>
                           <td>{el?.level}</td>
                           <td>{el?.todaySpin.toString()}</td>
                           <td>
                              {dayjs(el?.createdAt).format(
                                 'DD MMMM YYYY hh:mm:ss A'
                              )}
                           </td>
                           <td>
                              {dayjs(el?.spinTimePeriod).format(
                                 'DD MMMM YYYY hh:mm:ss A'
                              )}
                           </td>
                           <td>
                              {dayjs(el?.updatedAt).format(
                                 'DD MMMM YYYY hh:mm:ss A'
                              )}
                           </td>
                        </tr>
                     ))}
                  </TableComponent>
               ) : null}
            </div>
         </div>
      </styled.div>
   );
}

export default UserPage;