import React, { useRef, useState, useEffect } from 'react';
import * as styled from './CreateGameCurrencyPage.style';
import NavbarComponent from '../../Components/NavbarComponent/NavbarComponent';
import PageHeadingComponent from '../../Components/PageHeadingComponent/PageHeadingComponent';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import ImageUploadComponent from '../../Components/ImageUploadComponent/ImageUploadComponent';
import { AiFillFileImage } from '@react-icons/all-files/ai/AiFillFileImage';
import CustomButtonComponent from '../../Components/CustomButtonComponent/CustomButtonComponent';
import JoditEditor from 'jodit-react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import {
   inertNewGameCurrency,
   updateSingleGameCurrency,
   getSingleGameCurrency,
} from '../../App/Features/Games/GameActions';
import useAdmin from '../../Hooks/useAdmin';
import { useCookies } from 'react-cookie';
import { removeCurrencyInfo } from '../../App/Features/Admin/adminSlice';
import {
   uploadCurrencyInfoSelector,
   uploadCurrencyLoadingSelector,
   uploadCurrencyErrorSelector,
   singleGameCurrencySelector,
   singleGameCurrencyErrorSelector,
   updateGameCurrencySelector,
   updateGameCurrencyLoadingSelector,
   updateGameCurrencyErrorSelector,
} from './CreateGame.Selector';

const currencies = [
   { value: true, label: 'yes' },
   { value: false, label: 'no' },
];

const Schema = yup.object({
   currencyName: yup.string().required('Currency name is required'),
});

function CreateGameCurrencyPage() {
   const [PrevImage, setPrevImage] = useState(null);
   const editor = useRef(null);
   const [Icon, setIcons] = useState(null);
   const [content, setContent] = useState(null);
   const {
      register,
      handleSubmit,
      setValue,
      formState: { errors },
   } = useForm({
      resolver: yupResolver(Schema),
   });
   const [cookie] = useCookies();
   const [currencyLocked, setCurrencyLocked] = useState('');

   const [isAdmin] = useAdmin(cookie);
   const params = useParams();
   const dispatch = useDispatch();

   const uploadCurrencyInfo = useSelector(uploadCurrencyInfoSelector);
   const uploadCurrencyLoading = useSelector(uploadCurrencyLoadingSelector);
   const uploadCurrencyError = useSelector(uploadCurrencyErrorSelector);
   const singleGameCurrency = useSelector(singleGameCurrencySelector);
   const singleGameCurrencyError = useSelector(singleGameCurrencyErrorSelector);
   const updateGameCurrency = useSelector(updateGameCurrencySelector);
   const updateGameCurrencyLoading = useSelector(
      updateGameCurrencyLoadingSelector
   );
   const updateGameCurrencyError = useSelector(updateGameCurrencyErrorSelector);

   const ImageHandler = function (event) {
      const imageFiles = event.target.files;
      const imageFilesLength = imageFiles.length;
      const file = imageFiles[0];
      setIcons(file);
      if (imageFilesLength > 0) {
         const imageSrc = URL.createObjectURL(imageFiles[0]);
         setPrevImage(imageSrc);
      }
   };

   const CreateFormData = function (data) {
      const formData = new FormData();
      formData.append('currencyName', data?.currencyName);
      formData.append('locked', currencyLocked);
      formData.append('description', data?.description);
      formData.append('metaDescription', content);
      formData.append('file', Icon);
      return formData;
   };

   const onSubmit = function (data) {
      const formData = CreateFormData(data);

      if (isAdmin && !params?.id) {
         dispatch(inertNewGameCurrency({ formData }));
      } else if (isAdmin && params?.id) {
         dispatch(updateSingleGameCurrency({ id: params?.id, formData }));
      }
   };

   const ChangeHandler = function (event) {
      const { value } = event.target;
      setCurrencyLocked(value);
   };

   useEffect(() => {
      if (isAdmin && params?.id) {
         dispatch(getSingleGameCurrency({ id: params?.id }));
      }
   }, [params?.id, isAdmin]);

   useEffect(() => {
      if (
         !!singleGameCurrency &&
         singleGameCurrency?.success &&
         !!singleGameCurrency?.currency
      ) {
         setValue('description', singleGameCurrency?.currency?.description);
         setValue('currencyName', singleGameCurrency?.currency?.currencyName);
         setCurrencyLocked(singleGameCurrency?.currency?.locked);
         setContent(singleGameCurrency?.currencies?.metaDescription);
         setPrevImage(singleGameCurrency?.currency?.icon);
      }
   }, [singleGameCurrency]);

   useEffect(() => {
      return () => {
         dispatch(removeCurrencyInfo());
      };
   }, []);

   return (
      <styled.div>
         <NavbarComponent />
         <div className="container_div">
            <PageHeadingComponent
               showSubHeadingCM={true}
               subHeading={'Create New Game Currency'}
               pageName={'Game Currency'}
               para={`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s.`}
            />
            <div className="mt-5">
               <form onSubmit={handleSubmit(onSubmit)}>
                  <Box
                     sx={{
                        '& > :not(style)': { my: 1, width: '100%' },
                     }}
                     noValidate
                     autoComplete="off"
                  >
                     <div className="block lg:flex items-center w-full lg:space-x-3">
                        <div className="w-full mb-5 lg:mb-0">
                           <TextField
                              required
                              className="w-full"
                              label="currency Name"
                              {...register('currencyName')}
                              variant="standard"
                              InputLabelProps={{
                                 shrink: true,
                              }}
                           />
                           {errors?.currencyName?.message ? (
                              <p className="text-sm error_cl">
                                 {errors?.currencyName?.message}
                              </p>
                           ) : null}
                        </div>
                        <div className="w-full">
                           <TextField
                              className="w-full"
                              select
                              required
                              label="Currency Locked"
                              name="locked"
                              variant="standard"
                              InputLabelProps={{
                                 shrink: true,
                              }}
                              value={currencyLocked}
                              onChange={ChangeHandler}
                           >
                              {currencies.map((option) => (
                                 <MenuItem
                                    key={option.value}
                                    value={option.value}
                                 >
                                    {option.label}
                                 </MenuItem>
                              ))}
                           </TextField>
                           {errors?.locked?.message ? (
                              <p className="text-sm error_cl">
                                 {errors?.locked?.message}
                              </p>
                           ) : null}
                        </div>
                     </div>
                     <div className="w-full space_div">
                        <TextField
                           className="w-full"
                           label="Description"
                           multiline
                           rows={4}
                           {...register('description')}
                           InputLabelProps={{
                              shrink: true,
                           }}
                        />
                        <div className="space_div">
                           <label className="text-gray-400 font-medium">
                              Meta Description
                           </label>
                           <p className="mt-2 text-gray-400">
                              A meta description tag generally informs and
                              interests users with a short, relevant summary of
                              what a particular page is about.
                           </p>
                           <div>
                              <JoditEditor
                                 className="mt-3"
                                 ref={editor}
                                 value={content}
                                 tabIndex={1}
                                 onChange={(newContent) =>
                                    setContent(newContent)
                                 }
                                 config={{ theme: 'dark' }}
                              />
                           </div>
                        </div>
                     </div>
                     <ImageUploadComponent
                        accept={'image/*'}
                        width={200}
                        height={200}
                        preview={PrevImage}
                        onChange={ImageHandler}
                        label={'Currency Icon'}
                        icon={<AiFillFileImage className="text-gray-500" />}
                     />
                     <div className="flex">
                        <CustomButtonComponent
                           type={'submit'}
                           btnCl={'Publish mt-5'}
                           isLoading={
                              params?.id
                                 ? updateGameCurrencyLoading
                                 : uploadCurrencyLoading
                           }
                        >
                           <img src="/images/done.svg" />
                           {params?.id ? <p>Update</p> : <p>Publish</p>}
                        </CustomButtonComponent>
                     </div>
                  </Box>
                  <div className="mt-4">
                     {!!updateGameCurrency ? (
                        <p className="text-gray-300">
                           {updateGameCurrency?.message}
                        </p>
                     ) : null}
                     {!!uploadCurrencyError ? (
                        <p className="text-sm error_cl">
                           {uploadCurrencyError}
                        </p>
                     ) : null}
                     {!!uploadCurrencyInfo ? (
                        <p className="text-gray-300">
                           {uploadCurrencyInfo?.message}
                        </p>
                     ) : null}
                     {!!singleGameCurrencyError ? (
                        <p className="text-sm error_cl">
                           {singleGameCurrencyError}
                        </p>
                     ) : null}
                     {!!updateGameCurrencyError ? (
                        <p className="text-sm error_cl">
                           {updateGameCurrencyError}
                        </p>
                     ) : null}
                  </div>
               </form>
            </div>
         </div>
      </styled.div>
   );
}

export default CreateGameCurrencyPage;
