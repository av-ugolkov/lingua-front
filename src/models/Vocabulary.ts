import { AccessID } from '@/models/Access.ts';

export interface VocabularyData {
  id: string;
  name: string;
  accessID: number;
  nativeLang: string;
  translateLang: string;
  description: string;
  wordsCount?: number;
  tags: string[];
  userID?: string;
  userName?: string;
  editable?: boolean;
  createdAt?: string;
  updatedAt?: string;
  words?: string[];
  isNotification?: boolean;
}

export const EmptyVocabulary: VocabularyData = {
  id: '',
  name: '',
  accessID: AccessID.Public,
  nativeLang: '',
  translateLang: '',
  description: '',
  wordsCount: 0,
  tags: [],
  userID: '',
  userName: '',
  editable: false,
};
