import { InvalidateDate } from "@/models/Base.ts";

export interface VocabWord {
    id: string;
    vocabID: string,
    native: Word,
    translates: string[],
    examples: string[],
    updated: Date,
    created: Date,
}

export interface Word {
    id: string,
    text: string,
    pronunciation: string,
}

export const EmptyVocabWord:VocabWord= {
    id: '',
    vocabID: '',
    native: {
        id: '',
        text: '',
        pronunciation: ''
    },
    translates:[],
    examples: [],
    created: InvalidateDate,
    updated: InvalidateDate
}