import React from "react";
import SpinnerComponent from "../../Components/SpinnerComponent/SpinnerComponent";
import NavbarComponent from "../../Components/NavbarComponent/NavbarComponent";
import useRoles from "../../Hooks/useRoles";
import PageHeadingComponent from "../../Components/PageHeadingComponent/PageHeadingComponent";
import { Autocomplete, Box, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import CustomButtonComponent from "../../Components/CustomButtonComponent/CustomButtonComponent";

const schema = yup.object({
  title: yup.string().required('Title is reuqired'),
  reward: yup.number().required('Reward amount is required'),
  currency: yup.string().required('Currency is required'),
  amount: yup.number().required('Amount is required'),
  points: yup.number().required('Points is required'),
  level: yup.number().required('Level is required'),
});

const currencyList = [
  { label: "INR", _id: 1 },
  { label: "USD", _id: 2 },
  { label: "EUR", _id: 3 },
  { label: "GBP", _id: 4 }
];

const CreateRewardPage = () => {
  const {
    userRoles: { isAdmin, isSupport, isSubAdmin, roles },
    isLoading, error
  } = useRoles();

  const {
    control,
    handleSubmit,
    register,
    setValue,
    formState: { errors, },
    reset,
    getValues,
  } = useForm({
    defaultValues: {
      title: '',
      reward: '',
      amount: '',
      currency: '',
      points: '',
      level: '',
      // userRole: 'Admin',
    },
    resolver: yupResolver(schema),
  });

  const createHandler = (data) => {
    const body = { ...data, userRole: isAdmin ? 'Admin' : '' };
    console.log(body);
  }

  console.log(errors)

  return (
    <div>
      <NavbarComponent />
      <div className="container_div">
        {isLoading && <SpinnerComponent />}
        <PageHeadingComponent
          pageName={'Create Reward'}
          heading={'Create Reward'}
          para={
            'Please Note: Please first manually verify player accounts by reviewing and approving required documents or identification proofs. then create the player account'
          }
        />
        <div className="py-3">
          <form onSubmit={handleSubmit(createHandler)}>
            <Box
              sx={{
                '& > :not(style)': { my: 1, width: '100%' },
              }}
              noValidate
              autoComplete="off"
            >
              <div className="flex items-center space-x-2">
                <div className="w-full">
                  <Controller
                    name="title"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <TextField
                        onChange={onChange}
                        value={value}
                        className="w-full"
                        label="Title"
                        variant="outlined"
                      />
                    )}
                  />
                  {!!errors?.title?.message && <p className="text-sm error_cl">{errors?.title?.message}</p>}
                </div>
                <div className="w-full">
                  <Controller
                    name="reward"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <TextField
                        onChange={onChange}
                        value={value}
                        className="w-full"
                        label="Reward"
                        variant="outlined"
                      />
                    )}
                  />
                  {!!errors?.reward?.message && <p className="text-sm error_cl">{errors?.reward?.message}</p>}
                </div>
                <div className="w-full">
                  {/* {!!userRolesListLoading && <SpinnerComponent />} */}
                  {currencyList && (
                    <Controller
                      name="currency"
                      control={control}
                      render={({ field: { onChange, value }, }) => (
                        <Autocomplete
                          disablePortal
                          id="combo-box-demo"
                          options={currencyList}
                          sx={{ width: '100%' }}
                          onSelect={onChange}
                          renderInput={(params) => <TextField {...params} label="Currency" />}
                        />
                      )}
                    />
                  )}
                  {errors?.currency?.message && <p className="text-sm error_cl">{errors?.currency?.message}</p>}
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <div className="w-full">
                  <Controller
                    name="amount"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <TextField
                        onChange={onChange}
                        value={value}
                        className="w-full"
                        label="Amount"
                        variant="outlined"
                      />
                    )}
                  />
                  {!!errors?.amount?.message && <p className="text-sm error_cl">{errors?.amount?.message}</p>}
                </div>
                <div className="w-full">
                  <Controller
                    name="points"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <TextField
                        {...register("points")}
                        // onChange={onChange}
                        // value={value}
                        className="w-full"
                        label="Points"
                        variant="outlined"
                      />
                    )}
                  />
                  {!!errors?.points?.message && <p className="text-sm error_cl">{errors?.points?.message}</p>}
                </div>
                <div className="w-full">
                  <Controller
                    name="level"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <TextField
                        onChange={onChange}
                        value={value}
                        className="w-full"
                        label="Level"
                        variant="outlined"
                      />
                    )}
                  />
                  {!!errors?.level?.message && <p className="text-sm error_cl">{errors?.level?.message}</p>}
                </div>
              </div>

              <div className="flex items-center space-x-2">
              </div>
              <div className="pt-2 flex items-center space-x-2">
                <div>
                  <div className="flex items-center space-x-3">
                    <CustomButtonComponent
                      //  isLoading={createPlayerAccountLoading}
                      type={'submit'}
                      text={'Create'}
                      btnCl={'Publish'}
                    />
                    <CustomButtonComponent onClick={() => reset()} text={'Clear'} btnCl={'Publish'} />
                  </div>
                </div>
              </div>
            </Box>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateRewardPage;