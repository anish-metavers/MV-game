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
   getSingleGameInfo,
   updateSingleGame,
   getAllGamesCategroy,
} from '../../App/Features/Games/GameActions';
import useAdmin from '../../Hooks/useAdmin';
import { useCookies } from 'react-cookie';
import SpinnerComponent from '../../Components/SpinnerComponent/SpinnerComponent';
import { removeGameInfo } from '../../App/Features/Games/GameSlice';
import {
   gameProvidersListSelector,
   gameProvidersLoadingSelector,
   gameProvidersErrorSelector,
   insertGameInfoSelector,
   insertGameLoadingSelector,
   insertGameErrorSelector,
   updateGameinfoSelector,
   updateGameLoadingSelector,
   updateGameErrorSelector,
   allGamesCategorysSelector,
   allGamesCategorysLoadingSelector,
   allGamesCategorysErrorSelector,
} from './UploadGame.Selector';
import { message } from 'antd';

const Schema = yup.object({
   name: yup.string().required('Game name is required'),
   by: yup.string().required('Author name is required'),
   url: yup.string().required('Game url is reuqired'),
});

const Status = [
   { values: 'Publish', id: 1 },
   { values: 'Comming soon', id: 2 },
   { values: 'Draft', id: 3 },
];

function UploadGamesPage() {
   const {
      register,
      handleSubmit,
      formState: { errors },
      setValue,
   } = useForm({
      resolver: yupResolver(Schema),
   });

   const [cookie] = useCookies();
   const editor = useRef(null);
   const [Content, setContent] = useState(null);
   const [GameImage, setGameImage] = useState(null);
   const [GameImagePreview, setGameImagePreview] = useState(null);
   const [Provider, setProvider] = useState('');
   const [GameStatus, setGameStatus] = useState('Draft');
   const [GameCategory, setGameCategory] = useState(null);
   const params = useParams();
   const [isAdmin] = useAdmin(cookie);
   const dispatch = useDispatch();

   const gameProvidersList = useSelector(gameProvidersListSelector);
   const gameProvidersLoading = useSelector(gameProvidersLoadingSelector);
   const gameProvidersError = useSelector(gameProvidersErrorSelector);
   const insertGameInfo = useSelector(insertGameInfoSelector);
   const insertGameLoading = useSelector(insertGameLoadingSelector);
   const insertGameError = useSelector(insertGameErrorSelector);
   const updateGameinfo = useSelector(updateGameinfoSelector);
   const updateGameLoading = useSelector(updateGameLoadingSelector);
   const updateGameError = useSelector(updateGameErrorSelector);
   const allGamesCategorys = useSelector(allGamesCategorysSelector);
   const allGamesCategorysLoading = useSelector(
      allGamesCategorysLoadingSelector
   );
   const allGamesCategorysError = useSelector(allGamesCategorysErrorSelector);

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
      formData.append('gameStatus', GameStatus);
      formData.append('gameCategory', GameCategory);
      return formData;
   };

   const onSubmit = function (data) {
      if (isAdmin && !params?.id) {
         if (!GameImage) {
            return message.error('Game image is required');
         }

         if (!Provider) {
            return message.error('Game provider is required');
         }
         const formData = CreateFormData(data);
         dispatch(insertNewGame({ formData }));
      } else {
         const formData = CreateFormData(data);
         dispatch(updateSingleGame({ gameId: params?.id, formData }));
      }
   };

   useEffect(() => {
      if (isAdmin) {
         dispatch(getGameProvidersList());
         dispatch(getAllGamesCategroy());
      }
   }, [isAdmin]);

   const GetSingleGameInfo = async function () {
      const gameResponse = await dispatch(
         getSingleGameInfo({ gameId: params?.id })
      );

      if (gameResponse?.payload?.data && gameResponse?.payload?.data?.success) {
         const data = gameResponse?.payload?.data;
         setValue('name', data?.game?.name);
         setValue('by', data?.game?.by);
         setValue('url', data?.game?.url);
         setValue('description', data?.game?.description);
         setContent(data?.game?.aboutGame);
         setGameImagePreview(data?.game?.gameImage);
         setGameStatus(data?.game?.gameStatus);
         setProvider(data?.game?.gameProvider);
         setGameCategory(data?.game?.gameCategory);
      } else {
         console.log(gameResponse);
      }
   };

   useEffect(() => {
      if (isAdmin && params?.id) {
         GetSingleGameInfo();
      }
   }, [isAdmin, params?.id]);

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
                              InputLabelProps={{
                                 shrink: true,
                              }}
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
                              InputLabelProps={{
                                 shrink: true,
                              }}
                           />
                           {!!errors?.by?.message ? (
                              <p className="text-sm error_cl">
                                 {errors?.by?.message}
                              </p>
                           ) : null}
                        </div>
                        <div className="w-full">
                           {!!allGamesCategorysError ? (
                              <p className="text-sm error_cl">
                                 {allGamesCategorysError}
                              </p>
                           ) : null}
                           {!!allGamesCategorysLoading ? (
                              <SpinnerComponent />
                           ) : null}
                           {!!allGamesCategorys &&
                           !!allGamesCategorys?.categorys &&
                           allGamesCategorys?.categorys.length ? (
                              <TextField
                                 select
                                 label="Game Category"
                                 className="w-full"
                                 value={GameCategory}
                                 onChange={(e) =>
                                    setGameCategory(e.target.value)
                                 }
                                 required
                                 InputLabelProps={{
                                    shrink: true,
                                 }}
                              >
                                 {allGamesCategorys?.categorys.map((option) => (
                                    <MenuItem
                                       key={option._id}
                                       value={option._id}
                                    >
                                       {option.name}
                                    </MenuItem>
                                 ))}
                              </TextField>
                           ) : null}
                        </div>
                        <div className="w-full">
                           <TextField
                              select
                              label="Game Status"
                              className="w-full"
                              value={GameStatus}
                              onChange={(e) => setGameStatus(e.target.value)}
                              required
                              InputLabelProps={{
                                 shrink: true,
                              }}
                           >
                              {Status.map((option) => (
                                 <MenuItem
                                    key={option.values}
                                    value={option.values}
                                 >
                                    {option.values}
                                 </MenuItem>
                              ))}
                           </TextField>
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
                        InputLabelProps={{
                           shrink: true,
                        }}
                     />
                     <TextField
                        className="w-full"
                        label="Game embed url"
                        required
                        variant="outlined"
                        {...register('url')}
                        InputLabelProps={{
                           shrink: true,
                        }}
                     />
                     {!!errors?.url?.message ? (
                        <p className="text-sm error_cl">
                           {errors?.url?.message}
                        </p>
                     ) : null}
                     <div>
                        <label className="text-gray-400">About this game</label>
                        <div className="mt-2">
                           <JoditEditor
                              ref={editor}
                              value={Content}
                              tabIndex={1}
                              onChange={(newContent) => setContent(newContent)}
                              config={{ theme: 'dark' }}
                           />
                        </div>
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
                           isLoading={
                              params?.id ? updateGameLoading : insertGameLoading
                           }
                        >
                           <img src="/images/done.svg" />
                           {params?.id ? <p>Update</p> : <p>Publish</p>}
                        </CustomButtonComponent>
                     </div>
                  </Box>
               </form>
            </div>
            {!!updateGameinfo && updateGameinfo?.success ? (
               <p className="text-gray-400">{updateGameinfo?.message}</p>
            ) : null}
            {!!updateGameinfo && !updateGameinfo?.success ? (
               <p className="text-sm error_cl">{updateGameinfo?.message}</p>
            ) : null}
            {!!insertGameInfo ? (
               <p className="text-gray-400">{insertGameInfo?.message}</p>
            ) : null}
            {!!gameProvidersError ? (
               <p className="text-sm error_cl">{gameProvidersError}</p>
            ) : null}
            {!!insertGameError ? (
               <p className="text-sm error_cl">{insertGameError}</p>
            ) : null}
            {!!updateGameError ? (
               <p className="text-sm error_cl">{updateGameError}</p>
            ) : null}
         </div>
      </styled.div>
   );
}

export default UploadGamesPage;
