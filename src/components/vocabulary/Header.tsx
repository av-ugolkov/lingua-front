import NotificationBtn from "@/components/elements/Vocabulary/NotificationBtn.tsx";
import { useParams } from "react-router-dom";
import { useVocabulariesStore } from "@/hooks/stores/useVocabulariesStore.ts";

export default function Header() {
    const {id} = useParams()
    const {getVocabulary} = useVocabulariesStore()

    return <div className='flex justify-between mt-6 mb-2'>
        <h2 className='text-2xl font-bold text-center'>
            {getVocabulary(id).name}
        </h2>
        {!getVocabulary(id).editable && <div className='flex w-8 items-center'>
            <NotificationBtn id={getVocabulary(id).id}/>
        </div>}
    </div>
}