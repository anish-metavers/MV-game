import React from 'react';
import * as styled from './TableComponent.style';
import dayjs from 'dayjs';
import { Popconfirm } from 'antd';
import CustomButtonComponent from '../CustomButtonComponent/CustomButtonComponent';
import { IoIosArrowRoundForward } from '@react-icons/all-files/io/IoIosArrowRoundForward';
import { IoIosArrowRoundBack } from '@react-icons/all-files/io/IoIosArrowRoundBack';

function TableComponent({
   row,
   cl,
   data,
   deleteOption,
   edit,
   deleteAction,
   editAction,
   nextAndPrev,
   nextHandler,
   prevHandler,
   disablePrevbtn,
   disableNextbtn,
}) {
   return (
      <styled.div className={cl}>
         <div className="table_cm shadow-lg">
            <table>
               <thead>
                  <tr>
                     {row.map((el) => (
                        <th key={el.id}>{el.heading}</th>
                     ))}
                  </tr>
               </thead>
               <tbody>
                  {data.map((el) => (
                     <tr key={el?._id}>
                        <td>{el?._id}</td>
                        <td>{el?.roleName}</td>
                        <td>
                           {dayjs(el?.createdAt).format(
                              'DD MMMM YYYY m:h:ss A'
                           )}
                        </td>
                        <td>
                           {el?.updatedAt
                              ? dayjs(el?.updatedAt).format(
                                   'DD MMMM YYYY m:h:ss A'
                                )
                              : '--- ---'}
                        </td>
                        <td className="flex items-center space-x-2">
                           {deleteOption ? (
                              <Popconfirm
                                 title="Delete the task"
                                 description="Are you sure to delete this task?"
                                 okText="Yes"
                                 cancelText="No"
                                 onConfirm={() => deleteAction(el._id)}
                              >
                                 <p className="text-red-500 font-medium">
                                    Delete
                                 </p>
                              </Popconfirm>
                           ) : null}
                           {edit ? (
                              <p onClick={() => editAction(el._id)}>Edit</p>
                           ) : null}
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
         {!!nextAndPrev ? (
            <div className="_next_prev_buttons_div mt-5 flex justify-end space-x-2">
               <CustomButtonComponent
                  btnCl={`next_btn prevbtn shadow ${
                     disablePrevbtn ? 'disable_btn' : ''
                  }`}
                  onClick={disablePrevbtn ? null : () => prevHandler()}
               >
                  <IoIosArrowRoundBack className="text-gray-500" />
                  <p>Prev</p>
               </CustomButtonComponent>
               <CustomButtonComponent
                  btnCl={`next_btn shadow ${
                     disableNextbtn ? 'disable_btn' : ''
                  }`}
                  onClick={disableNextbtn ? null : () => nextHandler()}
               >
                  <p>Next</p>
                  <IoIosArrowRoundForward className="text-gray-500" />
               </CustomButtonComponent>
            </div>
         ) : null}
      </styled.div>
   );
}

export default TableComponent;
