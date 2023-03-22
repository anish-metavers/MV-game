import React, { useState, useEffect } from 'react';
import NavbarComponent from '../../Components/NavbarComponent/NavbarComponent';
import PageHeadingComponent from '../../Components/PageHeadingComponent/PageHeadingComponent';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import CustomButtonComponent from '../../Components/CustomButtonComponent/CustomButtonComponent';
import { MenuItem } from '@mui/material';
import { Switch } from 'antd';
import ImageUploadComponent from '../../Components/ImageUploadComponent/ImageUploadComponent';
import { message } from 'antd';
import { GiPayMoney } from '@react-icons/all-files/gi/GiPayMoney';
import { useDispatch, useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';
import useAdmin from '../../Hooks/useAdmin';
import { getAllCurrencyList } from '../../App/Features/Games/GameActions';
import {
   currencyListSelector,
   currencyListLoadingSelector,
   currencyListErrorSelector,
   insertPaymentMethodInfoSelector,
   insertPaymentMethodInfoLoadingSelector,
   insertPaymentMethodErrorSelector,
} from './PostGameCurrency.Selector';
import SpinnerComponent from '../../Components/SpinnerComponent/SpinnerComponent';
import { insertNewCurrencyPaymentOption } from '../../App/Features/Payment/paymentActions';

const Schema = yup.object({
   name: yup.string().required('Game name is required'),
   min: yup
      .number('min must be number')
      .required('min number is reuqired')
      .positive()
      .integer()
      .min(50, 'Minimum payment threshold is 50'),
   max: yup
      .number('Max must be number')
      .required('Max numebr is required')
      .positive()
      .integer()
      .moreThan(yup.ref('min'), 'Max should be more then min'),
});

const currencies = [
   { value: 'FAIT', label: 'FAIT' },
   { value: 'CRYPTO', label: 'CRYPTO' },
];

function PostGameCurrencyPaymentOptionsPage() {
   const [cookie] = useCookies();
   const [isAdmin] = useAdmin(cookie);
   const dispatch = useDispatch();
   const [ImagePreview, setImagePreview] = useState(null);
   const [Image, setImage] = useState(null);
   const [SelectedCurrency, setSelectedCurrency] = useState('FAIT');
   const [Vip, setVip] = useState(false);
   const [SelectedCr, setSelectedCr] = useState('');

   const {
      register,
      handleSubmit,
      formState: { errors },
      setValue,
   } = useForm({
      resolver: yupResolver(Schema),
   });

   const currencyList = useSelector(currencyListSelector);
   const currencyListLoading = useSelector(currencyListLoadingSelector);
   const currencyListError = useSelector(currencyListErrorSelector);
   const insertPaymentMethodError = useSelector(
      insertPaymentMethodErrorSelector
   );
   const insertPaymentMethodInfo = useSelector(insertPaymentMethodInfoSelector);
   const insertPaymentMethodInfoLoading = useSelector(
      insertPaymentMethodInfoLoadingSelector
   );

   const onChange = (checked) => {
      setVip(checked);
   };

   const imageHandler = function (event) {
      const imageFile = event.target.files[0];
      setImage(imageFile);
      if (imageFile) {
         const imageSrc = URL.createObjectURL(imageFile);
         setImagePreview(imageSrc);
      }
   };

   const createFormData = function (data) {
      const formData = new FormData();
      formData.append('name', data?.name);
      formData.append('wayName', SelectedCurrency);
      formData.append('description', data?.description);
      formData.append('min', data?.min);
      formData.append('max', data?.max);
      formData.append('vipOnly', Vip);
      formData.append('image', Image);
      formData.append('selectedCr', SelectedCr);

      return formData;
   };

   const onSubmit = function (data) {
      if (!ImagePreview) {
         return message.error('Payment options image is required');
      }

      const formData = createFormData(data);
      dispatch(insertNewCurrencyPaymentOption({ formData }));
   };

   useEffect(() => {
      if (isAdmin && !currencyList) {
         dispatch(getAllCurrencyList());
      }
   }, [isAdmin]);

   return (
      <div>
         <NavbarComponent />
         <div className="container_div">
            <PageHeadingComponent
               showSubHeadingCM={true}
               subHeading={'Create new payment options'}
               pageName={'Currency Payment'}
               para={`Lorem ipsum dolor sit amet consectetur adipisicing elit.
               Blanditiis, maiores perspiciatis. Est rerum, sit
               voluptas molestias.`}
            />
            <div className="mt-4">
               <form onSubmit={handleSubmit(onSubmit)}>
                  <Box
                     sx={{
                        '& > :not(style)': { my: 1, width: '100%' },
                     }}
                  >
                     <div className="w-full flex items-center space-x-2">
                        <TextField
                           label="Name"
                           className="w-full"
                           required
                           variant="outlined"
                           {...register('name')}
                           type={'text'}
                        />
                        <TextField
                           select
                           required
                           className="w-full"
                           label="Select"
                           value={SelectedCurrency}
                           onChange={(e) => setSelectedCurrency(e.target.value)}
                        >
                           {currencies.map((option) => (
                              <MenuItem key={option.value} value={option.value}>
                                 {option.label}
                              </MenuItem>
                           ))}
                        </TextField>
                        <div className="w-full">
                           {!!currencyListLoading ? <SpinnerComponent /> : null}
                           {!!currencyListError ? (
                              <p className="text-sm error_cl">
                                 {currencyListError}
                              </p>
                           ) : null}
                           {!!currencyList &&
                           currencyList?.success &&
                           currencyList?.currency ? (
                              <TextField
                                 select
                                 required
                                 className="w-full"
                                 label="Select"
                                 value={SelectedCr}
                                 onChange={(e) => setSelectedCr(e.target.value)}
                              >
                                 {currencyList?.currency.map((option) => (
                                    <MenuItem
                                       key={option._id}
                                       value={option._id}
                                    >
                                       <div className="flex items-center space-x-4">
                                          <div className="cr_icon_div">
                                             <img src={option?.icon} alt="" />
                                          </div>
                                          <p>{option?.currencyName}</p>
                                       </div>
                                    </MenuItem>
                                 ))}
                              </TextField>
                           ) : null}
                        </div>
                     </div>
                     <TextField
                        label="Description"
                        type={'text'}
                        multiline
                        rows={5}
                        {...register('description')}
                     />
                     <div className="w-full flex items-center space-x-2">
                        <div className="w-full">
                           <TextField
                              label="Min deposit amount"
                              className="w-full"
                              required
                              variant="outlined"
                              {...register('min')}
                              type={'number'}
                           />
                           {!!errors?.min?.message ? (
                              <p className="text-sm error_cl">
                                 {errors?.min?.message}
                              </p>
                           ) : null}
                        </div>
                        <div className="w-full">
                           <TextField
                              label="Max deposit amount"
                              className="w-full"
                              required
                              variant="outlined"
                              {...register('max')}
                              type={'number'}
                           />
                           {!!errors?.max?.message ? (
                              <p className="text-sm error_cl">
                                 {errors?.max?.message}
                              </p>
                           ) : null}
                        </div>
                     </div>
                     <div className="flex items-center space-x-4">
                        <p className="text-gray-200 text-sm font-medium mt-3">
                           Vip only
                        </p>
                        <Switch
                           className="mt-3"
                           checkedChildren="Yes"
                           unCheckedChildren="No"
                           defaultChecked
                           onChange={onChange}
                           checked={Vip}
                        />
                     </div>
                  </Box>
                  <div className="flex space_div">
                     <div>
                        <ImageUploadComponent
                           icon={<GiPayMoney />}
                           width={200}
                           label={'Game Image'}
                           height={200}
                           onChange={imageHandler}
                           preview={ImagePreview}
                           accept={'image/*'}
                        />
                     </div>
                  </div>
                  <div className="flex">
                     <CustomButtonComponent
                        type={'submit'}
                        text={'Save'}
                        btnCl={'Publish mt-3'}
                        isLoading={insertPaymentMethodInfoLoading}
                     />
                  </div>
                  {!!insertPaymentMethodError ? (
                     <p className="text-sm error_cl mt-2">
                        {insertPaymentMethodError}
                     </p>
                  ) : null}
                  {!!insertPaymentMethodInfo &&
                  insertPaymentMethodInfo?.success ? (
                     <p className="text-sm text-gray-300 mt-2">
                        {insertPaymentMethodInfo?.message}
                     </p>
                  ) : null}
               </form>
            </div>
         </div>
      </div>
   );
}

export default PostGameCurrencyPaymentOptionsPage;
