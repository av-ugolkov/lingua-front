import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { getLangs, ILanguage, setCurrentLang } from '@/redux/languages/slice';
import { RootState } from '@/redux/store/store';
import { useEffect, useState } from 'react';
import ListBox, { IListBoxItem } from './elements/ListBox';

interface Props {
  additionalLangs?: ILanguage[];
}

export default function LanguagesListBox({ additionalLangs }: Props) {
  const dispatch = useAppDispatch();
  const languages = useAppSelector((state: RootState) => getLangs(state));
  const currentLang = useAppSelector(
    (state: RootState) => state.langStore.currentLang
  );
  const [listLangs, setListLangs] = useState<ILanguage[]>(
    additionalLangs || []
  );

  function mapToLanguages(): IListBoxItem[] {
    const items: IListBoxItem[] = [];
    listLangs.forEach((item) => {
      items.push({ key: item.code, value: item.lang });
    });
    return items;
  }

  useEffect(() => {
    if (languages.length > 0) {
      languages.forEach((lang) => {
        setListLangs((prev) => [...prev, lang]);
      });
    }

    return () => {
      setListLangs([]);
    };
  }, [languages]);

  if (listLangs.length === 0) {
    return <div>Not found languages. Please, reload page</div>;
  }

  return (
    <>
      <ListBox
        id='languages'
        items={mapToLanguages()}
        indexValue={listLangs.findIndex((l) => l.code === currentLang)}
        onChange={(v) => {
          const lang = listLangs.find((tp) => tp.lang === v) || listLangs[0];
          dispatch(setCurrentLang(lang.code));
        }}
        classSelect='block w-fit p-1 bg-transparent border border-black text-black text-sm focus:ring-primary-500 focus:border-primary-500'
      />
    </>
  );
}
