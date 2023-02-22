import React, { useRef, useState, useEffect } from 'react';
import * as styled from './UploadGamesPage.style';
import NavbarComponent from '../../Components/NavbarComponent/NavbarComponent';
import PageHeadingComponent from '../../Components/PageHeadingComponent/PageHeadingComponent';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import JoditEditor from 'jodit-react';
import CustomButtonComponent from '../../Components/CustomButtonComponent/CustomButtonComponent';
import { useParams } from 'react-router-dom';
import ImageUploadComponent from '../../Components/ImageUploadComponent/ImageUploadComponent';
import { GiGamepad } from '@react-icons/all-files/gi/GiGamepad';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { MenuItem } from '@mui/material';
import {
   getGameProvidersList,
   insertNewGame,
} from '../../App/Features/Admin/adminActions';
import useAdmin from '../../Hooks/useAdmin';
import { useCookies } from 'react-cookie';
import SpinnerComponent from '../../Components/SpinnerComponent/SpinnerComponent';
import { removeGameInfo } from '../../App/Features/Admin/adminSlice';

const Schema = yup.object({
   name: yup.string().required('Game name is required'),
   by: yup.string().required('Author name is required'),
   url: yup.string().required('Game url is reuqired'),
});

function UploadGamesPage() {
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm({
      resolver: yupResolver(Schema),
   });

   const [cookie] = useCookies();
   const editor = useRef(null);
   const [Content, setContent] = useState(null);
   const [GameImage, setGameImage] = useState(null);
   const [GameImagePreview, setGameImagePreview] = useState(null);
   const [Provider, setProvider] = useState('');
   const [Error, setError] = useState(null);
   const params = useParams();
   const [isAdmin] = useAdmin(cookie);

   const dispatch = useDispatch();
   const {
      gameProvidersList,
      gameProvidersLoading,
      gameProvidersError,
      insertGameInfo,
      insertGameLoading,
      insertGameError,
   } = useSelector((state) => state.admin);

   const ImageHandler = function (event) {
      const imageFile = event.target.files[0];
      setGameImage(imageFile);
      if (imageFile) {
         const imageSrc = URL.createObjectURL(imageFile);
         setGameImagePreview(imageSrc);
      }
   };

   const CreateFormData = function (data) {
      const formData = new FormData();
      formData.append('name', data?.name);
      formData.append('by', data?.by);
      formData.append('description', data?.description);
      formData.append('aboutGame', Content);
      formData.append('gameMainImage', GameImage);
      formData.append('gameProvider', Provider);
      formData.append('url', data?.url);
      return formData;
   };

   const onSubmit = function (data) {
      if (!GameImage) {
         return setError('Game image is required');
      }

      if (!Provider) {
         return setError('Game provider is required');
      }

      setError(null);
      const formData = CreateFormData(data);
      dispatch(insertNewGame({ formData }));
   };

   useEffect(() => {
      if (isAdmin) {
         dispatch(getGameProvidersList());
      }
   }, [isAdmin]);

   useEffect(() => {
      return () => {
         dispatch(removeGameInfo());
      };
   }, []);

   return (
      <styled.div>
         <NavbarComponent />
         <div className="container_div">
            <PageHeadingComponent
               pageName={'Games Upload'}
               showSubHeadingCM={true}
               para={`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.`}
            />
            <div className="mt-5 w-full">
               <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
                  <Box
                     sx={{
                        '& > :not(style)': { my: 1, width: '100%' },
                     }}
                     noValidate
                     autoComplete="off"
                  >
                     <div className="flex items-center space-x-3">
                        <div className="w-full">
                           <TextField
                              className="w-full"
                              label="Game Name"
                              required
                              variant="outlined"
                              {...register('name')}
                           />
                           {!!errors?.name?.message ? (
                              <p className="text-sm error_cl">
                                 {errors?.name?.message}
                              </p>
                           ) : null}
                        </div>
                        <div className="w-full">
                           <TextField
                              className="w-full"
                              label="Game By"
                              required
                              variant="outlined"
                              {...register('by')}
                           />
                           {!!errors?.by?.message ? (
                              <p className="text-sm error_cl">
                                 {errors?.by?.message}
                              </p>
                           ) : null}
                        </div>
                        {!!gameProvidersLoading ? (
                           <div className="w-full">
                              <SpinnerComponent />
                           </div>
                        ) : null}
                        {!!gameProvidersList &&
                        gameProvidersList?.success &&
                        gameProvidersList?.response ? (
                           <div className="w-full">
                              <TextField
                                 className="w-full"
                                 id="outlined-select-currency"
                                 select
                                 required
                                 label="Game provider"
                                 value={Provider}
                                 onChange={(event) =>
                                    setProvider(event.target.value)
                                 }
                              >
                                 {gameProvidersList?.response.map((option) => (
                                    <MenuItem
                                       key={option._id}
                                       value={option._id}
                                    >
                                       {option.providerName}
                                    </MenuItem>
                                 ))}
                              </TextField>
                           </div>
                        ) : null}
                     </div>
                     <TextField
                        {...register('description')}
                        label="Game Description"
                        multiline
                        rows={7}
                     />
                     <TextField
                        className="w-full"
                        label="Game embed url"
                        required
                        variant="outlined"
                        {...register('url')}
                     />
                     {!!errors?.url?.message ? (
                        <p className="text-sm error_cl">
                           {errors?.url?.message}
                        </p>
                     ) : null}
                     <div>
                        <label className="text-gray-600">About this game</label>
                        <JoditEditor
                           className="mt-3"
                           ref={editor}
                           value={Content}
                           tabIndex={1}
                           onChange={(newContent) => setContent(newContent)}
                        />
                     </div>
                     <div className="flex space_div">
                        <div>
                           <ImageUploadComponent
                              icon={<GiGamepad />}
                              width={400}
                              label={'Game Image'}
                              height={400}
                              onChange={ImageHandler}
                              preview={GameImagePreview}
                              accept={'image/*'}
                           />
                        </div>
                     </div>
                     <div className="flex">
                        <CustomButtonComponent
                           type={'submit'}
                           btnCl={'Publish mt-5'}
                           isLoading={insertGameLoading}
                        >
                           <img src="/images/done.svg" />
                           {params?.id ? <p>Update</p> : <p>Publish</p>}
                        </CustomButtonComponent>
                     </div>
                     {!!Error ? (
                        <p className="text-sm error_cl">{Error}</p>
                     ) : null}
                  </Box>
               </form>
            </div>
            {!!insertGameInfo ? <p>{insertGameInfo?.message}</p> : null}
            {!!gameProvidersError ? (
               <p className="text-sm error_cl">{gameProvidersError}</p>
            ) : null}
            {!!insertGameError ? (
               <p className="text-sm error_cl">{insertGameError}</p>
            ) : null}
         </div>
      </styled.div>
   );
}

export default UploadGamesPage;
