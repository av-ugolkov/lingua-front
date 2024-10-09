import { useState } from 'react';

import {
  DocumentDuplicateIcon,
  PencilIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import DropdownMenu from '../Dropdown/DropdownMenu';
import DropdownItem from '../Dropdown/Item';
import Edit, { IEditData } from '@/components/user_vocabularies/Edit';
import { getUserID } from '@/scripts/AuthToken';
import { useVocabulariesStore } from '@/hooks/stores/useVocabulariesStore';
import api, { AuthStore } from '@/scripts/api';

export default function Menu({ vocabID }: { vocabID: string }) {
  const [isShowEditPopup, setIsShowEditPopup] = useState(false);
  const { getVocabulary, removeVocabulary } = useVocabulariesStore();

  const { fetchFunc: fetchEditVocabulary } = api.put(
    `/vocabulary`,
    AuthStore.USE
  );
  const { fetchFunc: fetchDeleteVocabulary } = api.delete(
    `/vocabulary`,
    AuthStore.USE
  );

  function editVocabulary(editData: IEditData) {
    async function asyncEditVocabulary() {
      const response = await fetchEditVocabulary({
        body: JSON.stringify({
          id: vocabID,
          name: editData.name,
          description: editData.description,
          access_id: editData.accessID,
        }),
      });
      if (response.ok) {
        getVocabulary(vocabID).name = editData.name;
        getVocabulary(vocabID).description = editData.description;
        getVocabulary(vocabID).accessID = editData.accessID;
      } else {
        console.error(response);
      }
    }

    asyncEditVocabulary();
  }

  function deleteVocabulary() {
    async function asyncDeleteVocabulary() {
      const response = await fetchDeleteVocabulary({
        query: new Map([['name', getVocabulary(vocabID).name]]),
      });
      if (response.ok) {
        removeVocabulary(vocabID);
      } else {
        console.error(response);
      }
    }

    asyncDeleteVocabulary();
  }

  return (
    <>
      <DropdownMenu baseSize='w-7 h-7'>
        {getUserID() == getVocabulary(vocabID).userID ? (
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
            name: getVocabulary(vocabID).name,
            description: getVocabulary(vocabID).description,
            accessID: getVocabulary(vocabID).accessID,
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
