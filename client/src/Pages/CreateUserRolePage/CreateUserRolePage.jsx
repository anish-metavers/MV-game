import React, { useState, useRef, useEffect } from 'react';
import NavbarComponent from '../../Components/NavbarComponent/NavbarComponent';
import PageHeadingComponent from '../../Components/PageHeadingComponent/PageHeadingComponent';
import * as styled from './CreateUserRolePage.style';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import JoditEditor from 'jodit-react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import CustomButtonComponent from '../../Components/CustomButtonComponent/CustomButtonComponent';
import { useDispatch, useSelector } from 'react-redux';
import {
   createUserRole,
   getSingleUserRole,
   updateSingleRole,
} from '../../App/Features/Admin/adminActions';
import useAdmin from '../../Hooks/useAdmin';
import { useCookies } from 'react-cookie';
import { useParams } from 'react-router';
import { removeSingleRoleInfo } from '../../App/Features/Admin/adminSlice';

const Schema = yup.object({
   roleName: yup.string().required('Role name is required'),
});

function CreateUserRolePage() {
   const editor = useRef(null);
   const [content, setContent] = useState('');
   const {
      register,
      handleSubmit,
      formState: { errors },
      setValue,
   } = useForm({
      defaultValues: {
         roleName: '',
      },
      resolver: yupResolver(Schema),
   });

   const params = useParams();
   const [cookie] = useCookies();
   const [isAdmin] = useAdmin(cookie);
   const dispatch = useDispatch();

   const {
      newRoleInsertInfo,
      newRoleInsertLoading,
      newRoleInsertError,
      newRoleInsertInvalidErrors,
      singleRole,
      singleRoleError,
      updateSingleRoleInfo,
      updateSinglRoleLoading,
      updateSingleRoleError,
   } = useSelector((state) => state.admin);

   const onSubmit = function (data) {
      if (isAdmin && !params?.id) {
         dispatch(
            createUserRole({ roleName: data?.roleName, description: content })
         );
      } else if (isAdmin && params?.id) {
         dispatch(
            updateSingleRole({
               roleId: params?.id,
               roleName: data?.roleName,
               description: content,
            })
         );
      } else {
         throw new Error('invalid user');
      }
   };

   useEffect(() => {
      if (isAdmin && params?.id) {
         dispatch(getSingleUserRole({ roleId: params?.id }));
      }
   }, [isAdmin]);

   useEffect(() => {
      if (!!singleRole && singleRole?.success && singleRole?.role) {
         setValue('roleName', singleRole?.role?.roleName);
         setContent(singleRole?.role?.description);
      }
   }, [singleRole]);

   useEffect(() => {
      return () => {
         dispatch(removeSingleRoleInfo());
      };
   }, []);

   return (
      <styled.div>
         <NavbarComponent />
         <styled.container className="container_div">
            <PageHeadingComponent
               pageName={params?.id ? 'Edit user role' : 'Create user roles'}
            />
            <div className="heading_div mt-5 flex items-center justify-between">
               <div>
                  <h1 className="text-xl font-medium text-gray-700">
                     {params?.id ? 'Edit role' : 'New Role'}
                  </h1>
                  <p className="mt-3 text-gray-500 mb-4">
                     Lorem ipsum dolor sit amet consectetur adipisicing elit.
                     Dolore repellat ex laudantium quibusdam sapiente temporibus
                     odio nam ut similique a eveniet, velit consectetur ad
                     aliquid, nulla corporis voluptates exercitationem ab.
                  </p>
               </div>
            </div>
            <div className="form_container mt-5">
               <form onSubmit={handleSubmit(onSubmit)}>
                  <Box
                     sx={{
                        '& > :not(style)': { my: 1, width: '100%' },
                     }}
                     noValidate
                     autoComplete="off"
                  >
                     <TextField
                        {...register('roleName')}
                        label="Role Name"
                        required
                        variant="standard"
                        InputLabelProps={{
                           shrink: true,
                        }}
                     />
                     {errors?.roleName?.message ? (
                        <p className="text-sm error_cl">
                           {errors?.roleName?.message}
                        </p>
                     ) : null}
                     <p className="mt-4 text-gray-700 font-medium">
                        Description
                     </p>
                     <JoditEditor
                        ref={editor}
                        value={content}
                        tabIndex={1}
                        onChange={(newContent) => setContent(newContent)}
                     />
                  </Box>
                  <div className="mb-3">
                     <CustomButtonComponent
                        type={'submit'}
                        btnCl={'Publish mt-5'}
                        isLoading={
                           params?.id
                              ? updateSinglRoleLoading
                              : newRoleInsertLoading
                        }
                     >
                        <img src="/images/done.svg" />
                        {params?.id ? <p>Update</p> : <p>Publish</p>}
                     </CustomButtonComponent>
                  </div>
                  {!!newRoleInsertError ? (
                     <p className="text-sm error_cl">{newRoleInsertError}</p>
                  ) : null}
                  {!!updateSingleRoleInfo && updateSingleRoleInfo?.success ? (
                     <p>{updateSingleRoleInfo?.message}</p>
                  ) : null}
                  {!!newRoleInsertInvalidErrors &&
                  newRoleInsertInvalidErrors?.error ? (
                     <div>
                        {newRoleInsertInvalidErrors.error.map((el) => (
                           <p className="text-sm error_cl">{el?.msg}</p>
                        ))}
                     </div>
                  ) : null}
                  {!!newRoleInsertInfo && newRoleInsertInfo?.success ? (
                     <p className="text-green-800">
                        {newRoleInsertInfo?.message}
                     </p>
                  ) : null}
                  {!!singleRoleError ? (
                     <p className="text-sm error_cl">{singleRoleError}</p>
                  ) : null}
                  {!!updateSingleRoleError ? (
                     <p className="text-sm error_cl">{updateSingleRoleError}</p>
                  ) : null}
               </form>
            </div>
         </styled.container>
      </styled.div>
   );
}

export default CreateUserRolePage;
