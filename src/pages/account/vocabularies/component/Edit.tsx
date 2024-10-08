import { useEffect, useState } from 'react';
import Button from '../../../../components/elements/Button';
import api, { AuthStore } from '@/scripts/api';
import { IAccess } from './Create';
import CloseBtn from './CloseBtn';
import BgLock from '../../../../components/elements/BgLock';
import { AccessID } from '@/models/Access';

export interface IEditData {
  name: string;
  description: string;
  accessID: AccessID;
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
      const respData = await api.get('/accesses', AuthStore.NO);
      if (respData.ok) {
        const accessesData: IAccess[] = [];
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
    <BgLock>
      <div className='relative bg-white w-96 shadow-md shadow-blue-300'>
        <div className='flex items-center justify-between p-2 border-b'>
          <h3 className='ml-2 text-lg font-semibold text-black'>
            Edit vocabulary
          </h3>
          <CloseBtn closeCallback={cancelCallback} />
        </div>
        <form className='p-4'>
          <div className='grid gap-4 mb-4 grid-cols-2'>
            <div className='col-span-2'>
              <label
                htmlFor='name'
                className='block mb-2 text-sm font-medium text-black'>
                Name
              </label>
              <input
                type='text'
                id='name'
                className='text-sm block w-full p-2.5 input-form'
                placeholder='Vocabulary name'
                required={true}
                value={edit.name}
                onChange={(e) => setEdit({ ...edit, name: e.target.value })}
              />
            </div>
            <div className='col-span-2'>
              <label
                htmlFor='name'
                className='block mb-2 text-sm font-medium text-black'>
                Description
              </label>
              <textarea
                id='name'
                className='text-sm block w-full p-2.5 input-form'
                placeholder='Vocabulary description'
                required={true}
                value={edit.description}
                onChange={(e) =>
                  setEdit({ ...edit, description: e.target.value })
                }
              />
            </div>
          </div>
          <hr className='my-3 h-px border-0 bg-gray-300' />
          <div className='mb-4'>
            <span className='flex text-center content-center mb-2 text-sm font-medium text-black'>
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
                  accessID: accesses.find((l) => l.name === e.target.value)!.id,
                });
              }}
              className='block w-full p-2 text-sm input-form'>
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
          </div>
        </form>
      </div>
    </BgLock>
  );
}
