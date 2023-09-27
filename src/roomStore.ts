import { writable } from "svelte/store";
import { AttendTimeError, AttendInvalidActionError } from "./errors";

export type Action = {
    datetime: Date;
    no: number;
    action: string;
    msg?: string;
}

export type AttendLine = {
    no: number,
    begin: number,
    end: number
}

export type Room = {
    name: string;
    furnitures: any[];
    sheats: any[];
    events: Action[];
    timetables?: any[];
    attends: AttendLine[];
}
export const currentRoom = writable<Room>();
export const rooms = writable<Room[]>([
    {
        name: "295",
        furnitures: [
            { x: 70, y: 440, width: 350, height: 60, text: "" },
            { x: 0, y: 354, width: 420, height: 60, text: "" },
            { x: 0, y: 260, width: 420, height: 60, text: "" },
            { x: 70, y: 170, width: 350, height: 60, text: "" },
            { x: 70, y: 80, width: 350, height: 60, text: "" },
            { x: 70, y: 0, width: 350, height: 60, text: "" },

            { x: 450, y: 440, width: 420, height: 60, text: "" },
            { x: 450, y: 354, width: 420, height: 60, text: "" },
            { x: 450, y: 260, width: 420, height: 60, text: "" },
            { x: 450, y: 170, width: 420, height: 60, text: "" },
            { x: 450, y: 80, width: 420, height: 60, text: "" },
            { x: 450, y: 0, width: 420, height: 60, text: "" },

            { x: 900, y: 440, width: 220, height: 60, text: "" },
            { x: 900, y: 354, width: 220, height: 60, text: "" },
            { x: 900, y: 260, width: 220, height: 60, text: "" },
            { x: 900, y: 170, width: 220, height: 60, text: "" },
            { x: 900, y: 80, width: 220, height: 60, text: "" },
            { x: 900, y: 0, width: 220, height: 60, text: "" },

            { x: 480, y: 540, width: 220, height: 60, text: "教卓" },
        ],
        sheats: [
            { cx: 110, cy: 384, no: 1 },
            { cx: 360, cy: 384, no: 2 },
            { cx: 580, cy: 384, no: 3 },
            { cx: 820, cy: 384, no: 4 },
            { cx: 110, cy: 290, no: 5 },
            { cx: 360, cy: 290, no: 6 },
            { cx: 580, cy: 290, no: 7 },
            { cx: 820, cy: 290, no: 8 },
            { cx: 110, cy: 200, no: 9 },
            { cx: 360, cy: 200, no: 11 },
            { cx: 580, cy: 200, no: 12 },
            { cx: 820, cy: 200, no: 13 },
            { cx: 580, cy: 110, no: 15 },
            { cx: 820, cy: 110, no: 14 },
            { cx: 110, cy: 30, no: 40 },
        ],
        timetables: [
            { "title": "19:00〜19:45", begin: 1900, end: 1945 },
            { "title": "19:45〜20:30", begin: 1945, end: 2030 },
            { "title": "20:30〜21:15", begin: 2030, end: 2115 }
        ],
        events: [

        ],
        attends: []
    }
]);

export class Attends {
    private list: { [no: number]: Attend[] };
    constructor(list: { [no: number]: Attend[] } = {}) {
        this.list = list;
    }
    /**
     * 出席
     * @param {number} no 出席番号
     * @param {Date} [now = new Date() ] 現在時刻 
     */
    public active(no: any, now: Date=new Date()) {
        const end = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);
        let attend;
        if( ! this.list[no]) {
            this.list[no] = [] as Attend[];
            attend = new Attend(no, now, end);
            this.list[no].push(attend);            
        }else if((now.getTime() - this.list[no].at(-1).end.getTime()) >= 1000 * 60){
            attend = new Attend(no, now, end);
            this.list[no].push(attend);            
        }else{
            // 退席してから1分未満に出席にした場合は操作ミスとして前の出席と結合
            // 終了時間を戻す
            attend = this.list[no].at(-1);
            attend.end = end;
        }
        return attend;
    }
    /**
     * 退席
     * @param {number} no 出席番号
     * @param {Date} [now = new Date() ] 現在時刻 
     */
    public inactive(no: any, now: Date = new Date()) {
        const list = this.get(no);
        if(list){
            const attend = list.at(-1);
            if(attend.begin.getTime() > now.getTime()) {
                throw new AttendTimeError("Invalid Time");
            }
            attend.end = now;
            return attend;
        }else{
            throw new AttendInvalidActionError("Invalid action");
        }
    }

    /**
     * 出席リストの取得
     * @param {number} no 出席番号 
     * @returns Attendの配列
     */
    public get(no: number):Attend[]|undefined {
        return this.list[no];
    }
}

export class Attend {
    no: number;
    begin: Date;
    end: Date;
    constructor(no: number, begin: Date, end: Date) {
        this.no = no;
        this.begin = begin;
        this.end = end;
    }
}

export { AttendInvalidActionError };
