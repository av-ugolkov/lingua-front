import {
  DocumentDuplicateIcon,
  PencilIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import DropdownMenu from '../Dropdown/DropdownMenu';
import DropdownItem from '../Dropdown/Item';
import { Vocab } from './Card';
import { useAuthStore } from '@/hooks/stores/useAuthStore';
import { AuthStore, RequestMethod, useFetch } from '@/hooks/fetch/useFetch';
import { useState } from 'react';
import Edit, { IEditData } from '@/components/user_vocabularies/Edit';

export default function Menu({
  vocab,
  changeVocab,
  deleteVocab,
}: {
  vocab: Vocab;
  changeVocab: (vocab: Vocab) => void;
  deleteVocab: (id: string) => void;
}) {
  const { getUserID } = useAuthStore();
  const [isShowEditPopup, setIsShowEditPopup] = useState(false);

  const { funcFetch: fetchEditVocabulary } = useFetch(
    `/account/vocabulary`,
    RequestMethod.PUT,
    AuthStore.USE
  );
  const { funcFetch: fetchDeleteVocabulary } = useFetch(
    `/account/vocabulary`,
    RequestMethod.DELETE,
    AuthStore.USE
  );

  function editVocabulary(editData: IEditData) {
    async function asyncEditVocabulary() {
      const response = await fetchEditVocabulary({
        body: JSON.stringify({
          id: vocab.id,
          name: editData.name,
          description: editData.description,
          access_id: editData.accessID,
        }),
      });
      if (response.ok) {
        vocab.name = editData.name;
        vocab.description = editData.description;
        vocab.accessID = editData.accessID;
        changeVocab(vocab);
      } else {
        console.error(response);
      }
    }

    asyncEditVocabulary();
  }

  function deleteVocabulary() {
    async function asyncDeleteVocabulary() {
      const response = await fetchDeleteVocabulary({
        queries: new Map<string, string>([['name', vocab.name]]),
      });
      if (response.ok) {
        deleteVocab(vocab.id);
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
