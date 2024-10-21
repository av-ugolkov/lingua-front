import Button from '@/components/elements/Button';
import { useAppDispatch } from '@/hooks/redux';
import {
  notificationError,
  notificationInfo,
} from '@/redux/notifications/slice';
import api, { AuthStore } from '@/scripts/api';
import { useState } from 'react';

interface SupportData {
  email: string;
  name: string;
  type: string;
  message: string;
}

const emptySupportData: SupportData = {
  email: '',
  name: '',
  type: '',
  message: '',
};

export default function Contact() {
  const dispatch = useAppDispatch();
  const [supportData, setSupportData] = useState<SupportData>(emptySupportData);
  const [enabledSendBtn, setEnabledSendBtn] = useState(true);

  const sendRequest = async () => {
    setEnabledSendBtn(false);
    const response = await api.post('/support/request', AuthStore.NO, {
      body: JSON.stringify(supportData),
    });
    if (response.ok) {
      setSupportData(emptySupportData);
      dispatch(notificationInfo(response.data['msg']));
    } else {
      dispatch(notificationError(response.data));
    }
    setEnabledSendBtn(true);
  };

  return (
    <div>
      <h1 className='my-10 text-3xl text-center'>Contact us</h1>
      <label className='text-center block mb-5'>
        You have an issue? Expectations? Or maybe you just want to say <i>Hi</i>
        ?
      </label>
      <div className='flex justify-center items-center'>
        <form
          className='bg-gray-100 w-4/6 p-5 shadow-md shadow-blue-300'
          action='#'
          method='post'>
          <label
            htmlFor='email'
            className='block w-full'>
            <label className='text-red-500'>*</label>Email:
          </label>
          <input
            type='email'
            id='email'
            name='email'
            className='w-full mb-3'
            value={supportData.email}
            maxLength={100}
            onChange={(e) =>
              setSupportData({ ...supportData, email: e.target.value })
            }
            required
          />
          <label
            htmlFor='Name'
            className='block'>
            Name:
          </label>
          <input
            type='text'
            id='name'
            name='name'
            className='w-full mb-3'
            maxLength={25}
            value={supportData.name}
            onChange={(e) =>
              setSupportData({ ...supportData, name: e.target.value })
            }
          />
          <label
            htmlFor='type'
            className='block'>
            <label className='text-red-500'>*</label>Type:
          </label>
          <select
            id='type'
            name='type'
            className='w-full mb-3 p-1'
            onChange={(e) =>
              setSupportData({ ...supportData, type: e.target.value })
            }
            required>
            <option value=''>Choose the type of message</option>
            <option value='question'>Question</option>
            <option value='feedback'>Feedback</option>
            <option value='support'>Support</option>
            <option value='other'>Other</option>
          </select>
          <label
            htmlFor='message'
            className='block'>
            <label className='text-red-500'>*</label>Message:
          </label>
          <textarea
            id='message'
            name='message'
            rows={5}
            maxLength={500}
            className='w-full mb-3'
            value={supportData.message}
            onChange={(e) =>
              setSupportData({ ...supportData, message: e.target.value })
            }
            required></textarea>
          <Button
            bgColor={enabledSendBtn ? 'bg-indigo-600' : 'bg-gray-600'}
            hoverBgColor={
              enabledSendBtn ? 'hover:bg-indigo-500' : 'hover:bg-gray-500'
            }
            focusOutlineColor={
              enabledSendBtn
                ? 'focus-visible:outline-indigo-600'
                : 'focus-visible:outline-gray-600'
            }
            disabled={!enabledSendBtn}
            callback={() => {
              if (!supportData.email) {
                dispatch(notificationError('Email is required'));
                return;
              } else if (!supportData.email.includes('@')) {
                dispatch(notificationError('Email format is invalid'));
                return;
              } else if (!supportData.type) {
                dispatch(
                  notificationError('You need to choose the type of message')
                );
                return;
              } else if (!supportData.message) {
                dispatch(notificationError('Message is required'));
                return;
              }
              sendRequest();
            }}>
            Send
          </Button>
        </form>
      </div>
    </div>
  );
}
