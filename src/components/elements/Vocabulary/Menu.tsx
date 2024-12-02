import { useState } from 'react';

import {
  DocumentDuplicateIcon,
  PencilIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import DropdownMenu from '../Dropdown/DropdownMenu';
import DropdownItem from '../Dropdown/Item';
import Edit, { IEditData } from '@/pages/account/vocabularies/component/Edit';
import { getUserID } from '@/scripts/AuthToken';
import api, { AuthStore } from '@/scripts/api';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { getVocab, removeVocab } from '@/redux/vocabularies/slice';

export default function Menu({ vocabID }: { vocabID: string }) {
  const [isShowEditPopup, setIsShowEditPopup] = useState(false);
  const vocab = useAppSelector((state) => getVocab(state, vocabID));
  const dispatch = useAppDispatch();

  function editVocabulary(editData: IEditData) {
    async function asyncEditVocabulary() {
      const response = await api.put('/vocabulary', AuthStore.USE, {
        body: JSON.stringify({
          id: vocabID,
          name: editData.name,
          description: editData.description,
          access_id: editData.accessID,
        }),
      });
      if (response.ok) {
        vocab.name = editData.name;
        vocab.description = editData.description;
        vocab.accessID = editData.accessID;
      } else {
        console.error(response);
      }
    }

    asyncEditVocabulary();
  }

  function deleteVocabulary() {
    async function asyncDeleteVocabulary() {
      const response = await api.delete(`/vocabulary`, AuthStore.USE, {
        query: [['name', vocab.name]],
      });
      if (response.ok) {
        dispatch(removeVocab(vocabID));
      } else {
        console.error(response);
      }
    }

    asyncDeleteVocabulary();
  }

  return (
    <>
      <DropdownMenu baseSize='w-7 h-7'>
        {getUserID() == vocab.userID ? (
          <>
            <DropdownItem onClick={() => setIsShowEditPopup(true)}>
              Edit
              <PencilIcon className='size-5' />
            </DropdownItem>
            <DropdownItem onClick={deleteVocabulary}>
              Delete
              <TrashIcon className='size-5' />
            </DropdownItem>
          </>
        ) : (
          <DropdownItem onClick={() => {}}>
            Copy
            <DocumentDuplicateIcon className='size-5' />
          </DropdownItem>
        )}
      </DropdownMenu>
      {isShowEditPopup && (
        <Edit
          editData={{
            name: vocab.name,
            description: vocab.description,
            accessID: vocab.accessID,
          }}
          saveCallback={(editData) => {
            editVocabulary(editData);
            setIsShowEditPopup(false);
          }}
          cancelCallback={() => setIsShowEditPopup(false)}
        />
      )}
    </>
  );
}
