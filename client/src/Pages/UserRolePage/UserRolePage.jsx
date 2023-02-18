import React, { useState, useEffect } from 'react';
import * as styled from './UserRolePage.style';
import NavbarComponent from '../../Components/NavbarComponent/NavbarComponent';
import PageHeadingComponent from '../../Components/PageHeadingComponent/PageHeadingComponent';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { BsThreeDotsVertical } from '@react-icons/all-files/bs/BsThreeDotsVertical';
import { ROW } from './RoleTable';
import TableComponent from '../../Components/TableComponent/TableComponent';
import { useDispatch, useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';
import useAdmin from '../../Hooks/useAdmin';
import {
   getAllUserRoles,
   deleteUserRole,
} from '../../App/Features/Admin/adminActions';
import SpinnerComponent from '../../Components/SpinnerComponent/SpinnerComponent';
import { useNavigate } from 'react-router';
import { useSearchParams } from 'react-router-dom';

function UserRolePage() {
   const [anchorEl, setAnchorEl] = useState(null);
   const open = Boolean(anchorEl);
   const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
   };
   const [cookie] = useCookies();
   const [isAdmin] = useAdmin(cookie);
   const navigation = useNavigate();
   const dispatch = useDispatch();
   const [params] = useSearchParams();
   const page = params.get('page');

   const { roles, getRolesLoading, getRolesError } = useSelector(
      (state) => state.admin
   );

   const handleClose = () => {
      setAnchorEl(null);
   };

   const CreateUserRoleHandler = function () {
      setAnchorEl(null);
      navigation('/user-roles/create');
   };

   const EditRoleHandler = function (id) {
      setAnchorEl(null);
      navigation(`/user-roles/${id}`);
   };

   const DeleteRolesHandler = function (roleId) {
      if (isAdmin) {
         dispatch(deleteUserRole({ roleId }));
      }
   };

   const NextPageHandler = function () {
      navigation(`?page=${+page + 1}`);
   };

   const PrevPageHandler = function () {
      navigation(`?page=${+page - 1}`);
   };

   useEffect(() => {
      if (isAdmin && page) {
         dispatch(getAllUserRoles({ page: page }));
      }
   }, [isAdmin, page]);

   return (
      <styled.div>
         <NavbarComponent />
         <styled.container className="container_div">
            <PageHeadingComponent pageName={'User Roles'} />
            <styled.contentDiv className="mt-5">
               <div className="flex justify-between">
                  <div>
                     <h1 className="text-xl font-medium text-gray-700">
                        All Users Roles
                     </h1>
                     <p className="mt-3 text-gray-500">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Blanditiis, maiores perspiciatis. Est rerum, sit
                        voluptas molestias officia modi, provident earum ad
                        ipsam sed dolorem error odit quia, deserunt quasi!
                        Doloribus!
                     </p>
                  </div>
                  <div className="option_div">
                     <Button
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                     >
                        <BsThreeDotsVertical className="text-gray-500" />
                     </Button>
                     <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                           'aria-labelledby': 'basic-button',
                        }}
                     >
                        <MenuItem onClick={CreateUserRoleHandler}>
                           Create users roles
                        </MenuItem>
                     </Menu>
                  </div>
               </div>
               <div className="mt-5">
                  {!!getRolesLoading ? <SpinnerComponent /> : null}
                  {!!getRolesError ? (
                     <p className="text-sm error_cl">{getRolesError}</p>
                  ) : null}
                  {!!roles && roles?.success && roles?.roles ? (
                     <TableComponent
                        row={ROW}
                        data={roles?.roles}
                        deleteOption={true}
                        edit={true}
                        deleteAction={DeleteRolesHandler}
                        editAction={EditRoleHandler}
                        nextAndPrev={true}
                        nextHandler={NextPageHandler}
                        prevHandler={PrevPageHandler}
                        disablePrevbtn={+page === 0 ? true : false}
                        disableNextbtn={
                           +page >= roles?.totalPages ? true : false
                        }
                     />
                  ) : null}
               </div>
            </styled.contentDiv>
         </styled.container>
      </styled.div>
   );
}

export default UserRolePage;
