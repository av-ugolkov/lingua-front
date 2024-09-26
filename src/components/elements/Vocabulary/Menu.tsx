import { useState } from 'react';

import {
  DocumentDuplicateIcon,
  PencilIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import DropdownMenu from '../Dropdown/DropdownMenu';
import DropdownItem from '../Dropdown/Item';
import { AuthStore, RequestMethod, useFetchFunc } from '@/hooks/fetch/useFetch';
import Edit, { IEditData } from '@/components/user_vocabularies/Edit';
import { getUserID } from '@/scripts/AuthToken';
import { VocabularyData } from "@/models/Vocabulary.ts";

export default function Menu({
  vocab,
  changeVocab,
  deleteVocab,
}: {
  vocab: VocabularyData;
  changeVocab: (vocab: VocabularyData) => void;
  deleteVocab: (id: string) => void;
}) {
  const [isShowEditPopup, setIsShowEditPopup] = useState(false);

  const { fetchFunc: fetchEditVocabulary } = useFetchFunc(
    `/account/vocabulary`,
    RequestMethod.PUT,
    AuthStore.USE
  );
  const { fetchFunc: fetchDeleteVocabulary } = useFetchFunc(
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
        query: `name=${vocab.name}`,
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
