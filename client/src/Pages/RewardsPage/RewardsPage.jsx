import React, { useEffect } from "react";
import useRoles from "../../Hooks/useRoles";
import { AnimatePresence } from "framer-motion";
import dayjs from 'dayjs';
import { VscEdit } from '@react-icons/all-files/vsc/VscEdit';
import SpinnerComponent from "../../Components/SpinnerComponent/SpinnerComponent";
import PageHeadingComponent from "../../Components/PageHeadingComponent/PageHeadingComponent";
import NavbarComponent from "../../Components/NavbarComponent/NavbarComponent";
import TableComponent from "../../Components/TableComponent/TableComponent";
import { ROW } from "./RewardsTable";
import { useNavigate, useSearchParams } from 'react-router-dom';
import { rewardsErrorsSelector, rewardsLoadingSelector, rewardsSelector } from "./Rewards.Selector";
import { useDispatch, useSelector } from "react-redux";
import { getRewardList } from "../../App/Features/VipClub/vipClubActions";

const rewards = [
  {
    _id: "5tfrd",
    name:"Mehul Raheja",
    reward: "50",
    currency: "USD",
    amount: "1000",
    points: "233",
    level: "3",
    createdAt: "2023-07-05T07:16:35.578+00:00",
    updatedAt: "2023-07-05T07:16:35.578+00:00",
    edit: "Edit" 
  },
  {
    _id: "5tfrd",
    name:"Mehul Raheja",
    reward: "50",
    currency: "USD",
    amount: "1000",
    points: "233",
    level: "3",
    createdAt: "2023-07-05T07:16:35.578+00:00",
    updatedAt: "2023-07-05T07:16:35.578+00:00",
    edit: "Edit" 
  },
  {
    _id: "5tfrd",
    name:"Mehul Raheja",
    reward: "50",
    currency: "USD",
    amount: "1000",
    points: "233",
    level: "3",
    createdAt: "2023-07-05T07:16:35.578+00:00",
    updatedAt: "2023-07-05T07:16:35.578+00:00",
    edit: "Edit" 
  },
  {
    _id: "5tfrd",
    name:"Mehul Raheja",
    reward: "50",
    currency: "USD",
    amount: "1000",
    points: "233",
    level: "3",
    createdAt: "2023-07-05T07:16:35.578+00:00",
    updatedAt: "2023-07-05T07:16:35.578+00:00",
    edit: "Edit" 
  },
  {
    _id: "5tfrd",
    name:"Mehul Raheja",
    reward: "50",
    currency: "USD",
    amount: "1000",
    points: "233",
    level: "3",
    createdAt: "2023-07-05T07:16:35.578+00:00",
    updatedAt: "2023-07-05T07:16:35.578+00:00",
    edit: "Edit" 
  },
  {
    _id: "5tfrd",
    name:"Mehul Raheja",
    reward: "50",
    currency: "USD",
    amount: "1000",
    points: "233",
    level: "3",
    createdAt: "2023-07-05T07:16:35.578+00:00",
    updatedAt: "2023-07-05T07:16:35.578+00:00",
    edit: "Edit" 
  },
  {
    _id: "5tfrd",
    name:"Mehul Raheja",
    reward: "50",
    currency: "USD",
    amount: "1000",
    points: "233",
    level: "3",
    createdAt: "2023-07-05T07:16:35.578+00:00",
    updatedAt: "2023-07-05T07:16:35.578+00:00",
    edit: "Edit" 
  },
  {
    _id: "5tfrd",
    name:"Mehul Raheja",
    reward: "50",
    currency: "USD",
    amount: "1000",
    points: "233",
    level: "3",
    createdAt: "2023-07-05T07:16:35.578+00:00",
    updatedAt: "2023-07-05T07:16:35.578+00:00",
    edit: "Edit" 
  },
  {
    _id: "5tfrd",
    name:"Mehul Raheja",
    reward: "50",
    currency: "USD",
    amount: "1000",
    points: "233",
    level: "3",
    createdAt: "2023-07-05T07:16:35.578+00:00",
    updatedAt: "2023-07-05T07:16:35.578+00:00",
    edit: "Edit" 
  },
  {
    _id: "5tfrd",
    name:"Mehul Raheja",
    reward: "50",
    currency: "USD",
    amount: "1000",
    points: "233",
    level: "3",
    createdAt: "2023-07-05T07:16:35.578+00:00",
    updatedAt: "2023-07-05T07:16:35.578+00:00",
    edit: "Edit" 
  },
  {
    _id: "5tfrd",
    name:"Mehul Raheja",
    reward: "50",
    currency: "USD",
    amount: "1000",
    points: "233",
    level: "3",
    createdAt: "2023-07-05T07:16:35.578+00:00",
    updatedAt: "2023-07-05T07:16:35.578+00:00",
    edit: "Edit" 
  },
  {
    _id: "5tfrd",
    name:"Mehul Raheja",
    reward: "50",
    currency: "USD",
    amount: "1000",
    points: "233",
    level: "3",
    createdAt: "2023-07-05T07:16:35.578+00:00",
    updatedAt: "2023-07-05T07:16:35.578+00:00",
    edit: "Edit" 
  },
];

const totalPages = 0;

const RewardsPage = () => {
  const dispatch = useDispatch();

  const rewardsInfo = useSelector(rewardsSelector);
  const rewardsLoading = useSelector(rewardsLoadingSelector);
  const rewardsErrors = useSelector(rewardsErrorsSelector);

  const {
    userRoles: { isAdmin, isSupport, isSubAdmin, roles },
    isLoading, error
  } = useRoles();
  const [params] = useSearchParams();
  const page = params.get('page');
  const navigate = useNavigate();

  const editAccountHandler = (id) => {navigate('/rewards/edit-reward/'+id)};

  const NextPageHandler = () => {};

  const PrevPageHandler = () => {};

  useEffect(() => {
    dispatch(getRewardList(1));
  },[]);

  useEffect(() => {
    if(rewardsInfo){
      console.log(rewardsInfo);
    }
  },[rewardsInfo, rewardsLoading]);

  return (
    <div>
      {isLoading && <SpinnerComponent />}
      <NavbarComponent />
      <div className="container_div">
        <PageHeadingComponent
          pageName={'Rewards list for Levels'}
          heading={'Reward List'}
          para={
            'Please Note: Please first manually verify player accounts by reviewing and approving required documents or identification proofs. then create the player account'
          }
        />
        <TableComponent
          row={ROW}
          nextHandler={NextPageHandler}
          nextAndPrev={true}
          prevHandler={PrevPageHandler}
          disablePrevbtn={+page === 0 ? true : false}
          disableNextbtn={+page >= totalPages ? true : false}
          tableWidth={1400}
        >
          {rewardsInfo?.vipList?.length && rewardsInfo.vipList.map((el) => (
              <tr key={el?._id}>
                <td>{el?.name}</td>
                <td>{el?.reward?.$numberDecimal}</td>
                <td>{el?.currency?.currencyName}</td>
                <td>{el?.amount}</td>
                <td>{el?.points}</td>
                <td>{el?.level}</td>
                <td>{dayjs(el?.createdAt).format('DD MMMM YYYY hh:mm:ss A')}</td>
                <td>{dayjs(el?.updatedAt).format('DD MMMM YYYY hh:mm:ss A')}</td>
                <td>
                    <div>
                      <VscEdit className="cursor-pointer" 
                        onClick={() => editAccountHandler(el?._id)} 
                      />
                    </div>
                </td>
              </tr>
          ))}
        </TableComponent>
      </div>
    </div>
  );
};

export default RewardsPage;