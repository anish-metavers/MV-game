import React from 'react';
import * as styled from './TableComponent.style';
import dayjs from 'dayjs';
import { Popconfirm } from 'antd';

function TableComponent({
   row,
   cl,
   data,
   deleteOption,
   edit,
   deleteAction,
   editAction,
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
                           {dayjs(el?.createdAt).format('DD MMMM YYYY m:h:s A')}
                        </td>
                        <td>
                           {el?.updatedAt
                              ? dayjs(el?.updatedAt).format(
                                   'DD MMMM YYYY m:h:s A'
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
      </styled.div>
   );
}

export default TableComponent;
