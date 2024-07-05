import { useEffect, useState } from 'react';
import Button from '../elements/Button';
import { fetchData } from '@/scripts/fetch/fetchData';
import { IAccess } from './Create';

export interface IEditData {
  name: string;
  accessID: number;
}

const tempAccesses: IAccess[] = [];

export default function Edit({
  editData,
  saveCallback,
  cancelCallback,
}: {
  editData: IEditData;
  saveCallback: (newName: IEditData) => void;
  cancelCallback: () => void;
}) {
  const [loading, setLoading] = useState(true);
  const [edit, setEdit] = useState(editData);
  const [accesses, setAccesses] = useState(tempAccesses);

  useEffect(() => {
    async function asyncFetchAccesses() {
      const respData = await fetchData('/accesses', {
        method: 'get',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      if (respData.ok) {
        let accessesData: IAccess[] = [];
        respData.data.forEach((item: any) => {
          accessesData.push({
            id: item['id'],
            type: item['type'],
            name: item['name'],
          });
        });
        const sorted = accessesData.sort((a, b) => (a.id < b.id ? 1 : -1));
        setAccesses(sorted);
      } else {
        console.error(respData);
      }
      setLoading(false);
    }
    asyncFetchAccesses();
  }, []);
  if (loading) {
    return <div id='loading'></div>;
  }

  return (
    <div className='fixed justify-center items-center bg-gray-500 bg-opacity-60 z-50 w-full inset-0 h-full'>
      <div className='flex justify-center items-center w-full h-full'>
        <div className='flex justify-center items-center p-4 w-full max-w-md max-h-full'>
          <div className='relative bg-white shadow-md shadow-blue-300'>
            <div className='flex items-center justify-between p-2 border-b rounded-t'>
              <h3 className='text-lg font-semibold text-gray-900'>
                Edit vocabulary
              </h3>
            </div>
            <form className='p-4'>
              <div className='grid gap-4 mb-4 grid-cols-2'>
                <div className='col-span-2'>
                  <label
                    htmlFor='name'
                    className='block mb-2 text-sm font-medium text-gray-900'>
                    Name
                  </label>
                  <input
                    type='text'
                    id='name'
                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5'
                    placeholder='Vocabulary name'
                    required={true}
                    value={edit.name}
                    onChange={(e) => setEdit({ ...edit, name: e.target.value })}
                  />
                </div>
              </div>
              <hr className='my-3 h-px border-0 bg-gray-300' />
              <div className='mb-4'>
                <span className='flex text-center content-center mb-2 text-sm font-medium text-gray-900'>
                  Access
                </span>
                <select
                  id='access'
                  defaultValue={
                    accesses.find((l) => l.id === editData.accessID)!.name
                  }
                  onChange={(e) => {
                    setEdit({
                      ...edit,
                      accessID: accesses.find((l) => l.name === e.target.value)!
                        .id,
                    });
                  }}
                  className='block w-full p-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500'>
                  {accesses.map((access) => (
                    <option key={access.id}>{access.name}</option>
                  ))}
                </select>
              </div>
              <div className='flex gap-x-4'>
                <Button
                  bgColor='bg-indigo-600'
                  hoverBgColor='hover:bg-indigo-500'
                  focusOutlineColor='focus-visible:outline-indigo-600'
                  callback={() => saveCallback(edit)}>
                  Save
                </Button>
                <Button
                  bgColor='bg-gray-600'
                  hoverBgColor='hover:bg-indigo-500'
                  focusOutlineColor='focus-visible:outline-indigo-600'
                  callback={cancelCallback}>
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
