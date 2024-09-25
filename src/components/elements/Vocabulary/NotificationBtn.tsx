import { useEffect, useState } from "react";
import { BellIcon } from "@heroicons/react/24/outline";
import { BellAlertIcon } from "@heroicons/react/24/solid";

import { AuthStore, RequestMethod, useFetch, useFetchFunc } from "@/hooks/fetch/useFetch.ts";
import { getUserID, isActiveToken } from "@/scripts/AuthToken.ts";

export default function NotificationBtn({vocabID}:{vocabID:string}) {
    const [isAlarm, setAlarm] = useState(false)
    const {
        isLoading,
        response: respGetNotification
    } = useFetch('/notifications/vocabulary', RequestMethod.GET, AuthStore.USE, {query: `user_id=${getUserID()}&vocab_id=${vocabID}`});
    const {fetchFunc: setFetchFunc} = useFetchFunc('/notifications/vocabulary', RequestMethod.POST, AuthStore.USE);

    useEffect(() => {
        if (respGetNotification.ok) {
            setAlarm(respGetNotification.data['notification'])
        }
    }, [respGetNotification.ok])

    function setNotificationVocab() {
        async function asyncSetNotificationVocab() {
            const resp = await setFetchFunc({query: `user_id=${getUserID()}&vocab_id=${vocabID}`})
            if (resp.ok) {
                setAlarm(resp.data['notification'])
            }
        }

        asyncSetNotificationVocab()
    }

    if (isLoading) {
        return <></>
    } else if (!isActiveToken()) {
        return <div className='w-full text-gray-400' title='You need SingIn'>
            <BellIcon/>
        </div>
    }

    return <button className='w-full duration-300 hover:scale-150 hover:duration-300'
                   onClick={(event) => {
                       setNotificationVocab();
                       event.stopPropagation();
                   }}>
        {isAlarm ? (<BellAlertIcon className='text-green-500' title='ON'/>) : (
            <BellIcon className='text-red-500' title='OFF'/>)}
    </button>
}