import React from 'react';
import * as styled from './FaqCategorySinglePage.style';
import NavbarComponent from '../../Components/NavbarComponent/NavbarComponent';
import PageHeadingComponent from '../../Components/PageHeadingComponent/PageHeadingComponent';
import CustomButtonComponent from '../../Components/CustomButtonComponent/CustomButtonComponent';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Switch } from 'antd';
import QuillComponent from '../../Components/QuillComponent/QuillComponent';
import { useDispatch, useSelector } from 'react-redux';
import { createNewFaqCategory } from '../../App/Features/Faq/faqActions';
import { newFaqCategoryLoadingSelector, newFaqCategoryErrorSelector } from './FaqCategory.Selector';

const schema = yup.object({
   heading: yup.string().required('Heading is reuqired'),
});

function FaqCategorySinglePage() {
   const {
      control,
      formState: { errors },
      handleSubmit,
   } = useForm({
      resolver: yupResolver(schema),
      defaultValues: {
         heading: '',
         isShow: false,
         metadata: '',
      },
   });

   const dispatch = useDispatch();
   const newFaqCategoryLoading = useSelector(newFaqCategoryLoadingSelector);
   const newFaqCategoryError = useSelector(newFaqCategoryErrorSelector);

   const onSubmit = function (data) {
      dispatch(createNewFaqCategory(data));
   };

   return (
      <styled.div>
         <NavbarComponent />
         <div className="container_div">
            <PageHeadingComponent
               pageName={'Create new faq Category'}
               subHeading={'Faq Category'}
               para={`Lorem ipsum dolor sit amet consectetur adipisicing elit.
               Blanditiis, maiores perspiciatis. Est rerum, sit
               voluptas molestias officia modi, provident earum ad
               ipsam sed dolorem error odit quia, deserunt quasi!
               Doloribus!`}
            />
            <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
               <Box
                  sx={{
                     '& > :not(style)': { my: 1, width: '100%' },
                  }}
               >
                  <div className="w-full">
                     <Controller
                        name="heading"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                           <TextField className="w-full" value={value} onChange={onChange} label="Heading" variant="outlined" />
                        )}
                     />
                     {!!errors?.heading?.message && <p className="text-sm error_cl">{errors?.heading.message}</p>}
                  </div>
                  <div className="flex space-x-2 pb-3">
                     <Controller
                        name="isShow"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                           <Switch checked={value} onChange={onChange} checkedChildren={'Yes'} unCheckedChildren={'No'} />
                        )}
                     />
                     <p className="text-gray-200">Is show</p>
                  </div>
                  <Controller
                     name="metadata"
                     control={control}
                     render={({ field: { onChange, value } }) => <QuillComponent onChange={onChange} value={value} />}
                  />
                  <div className="pt-2">
                     <div className="flex">
                        <CustomButtonComponent
                           isLoading={newFaqCategoryLoading}
                           type={'submit'}
                           text={'Publish'}
                           btnCl={'Publish'}
                        />
                     </div>
                     {!!newFaqCategoryError && <p className="error_cl text-sm">{newFaqCategoryError}</p>}
                  </div>
               </Box>
            </form>
         </div>
      </styled.div>
   );
}

export default FaqCategorySinglePage;
