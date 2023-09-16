import { writable } from "svelte/store";

export type Action = {
    datetime:Date;
    no:number;
    action:string;
}

export const events = writable<Action[]>([]);