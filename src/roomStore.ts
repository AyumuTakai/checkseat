import { writable } from "svelte/store";
import { AttendTimeError, AttendInvalidActionError } from "./errors";

export class Term {
    begin: Date;
    end: Date;
    constructor(begin: Date, end: Date) {
        this.begin = begin;
        this.end = end;
    }
}

export class ClassSetting {
    room: string;
    beginHours: number;
    beginMinutes: number;
    endHours: number;
    endMinutes: number;
    lateLimit: number;
    ealyLimit: number;
    /**
     * 
     * @param room 
     * @param begin 
     * @param end 
     * @param lateLimit 
     * @param ealyLimit 
     */
    constructor(room: string, begin: number, end: number, lateLimit: number, ealyLimit: number) {
        this.room = room;
        this.beginHours = Math.floor(begin / 100);
        this.beginMinutes = begin % 100;
        this.endHours = Math.floor(end / 100);
        this.endMinutes = end % 100;
        this.lateLimit = lateLimit;
        this.ealyLimit = ealyLimit;
    }

    /**
     * 
     * @param date 
     * @returns 
     */
    createClassTerm(date: Date = new Date()) {
        const begin = new Date(date.getTime());
        begin.setHours(this.beginHours);
        begin.setMinutes(this.beginMinutes);
        begin.setSeconds(0, 0);
        const end = new Date(date.getTime());
        end.setHours(this.endHours);
        end.setMinutes(this.endMinutes);
        end.setSeconds(59, 999);
        const lateLimit = new Date(begin.getTime());
        lateLimit.setMinutes(lateLimit.getMinutes() + this.lateLimit);
        const ealyLimit = new Date(end.getTime());
        ealyLimit.setMinutes(ealyLimit.getMinutes() - this.ealyLimit);
        return new ClassTerm(begin, end, lateLimit, ealyLimit);
    }
}

/**
 * 授業時間
 */
export class ClassTerm extends Term {
    lateLimit: Date; // 遅刻限度
    ealyLimit: Date; // 早退限度
    constructor(begin: Date, end: Date, lateLimit: Date, ealyLimit: Date) {
        super(begin, end);
        this.lateLimit = lateLimit;
        this.ealyLimit = ealyLimit;
    }
}

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
    seats: any[];
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
        seats: [
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

export const AttendType = {
    "Absent": 0,
    "Attend": 1,
    "Late": 2,
    "Early": 4
}

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
    public active(no: any, now: Date = new Date()) {
        const end = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);
        let attend;
        if (!this.list[no]) {
            this.list[no] = [] as Attend[];
            attend = new Attend(no, now, end);
            this.list[no].push(attend);
        } else if ((now.getTime() - this.list[no].at(-1).end.getTime()) >= 1000 * 60) {
            attend = new Attend(no, now, end);
            this.list[no].push(attend);
        } else {
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
        if (list) {
            const attend = list.at(-1);
            if (attend.begin.getTime() > now.getTime()) {
                throw new AttendTimeError("Invalid Time");
            }
            attend.end = now;
            return attend;
        } else {
            throw new AttendInvalidActionError("Invalid action");
        }
    }

    /**
     * 出席リストの取得
     * @param {number} no 出席番号 
     * @returns Attendの配列
     */
    public get(no: number): Attend[] | undefined {
        return this.list[no];
    }

    /**
     * 出席状態の判定
     * @param {number} no 出席番号
     * @param {ClassTerm} classTerm 授業時間 
     * @returns {number} 欠席:0| 出席:1 | 遅刻:2 | 早退:4
     */
    public confirm(no: number, classTerm: ClassTerm) {
        const list = this.get(no);
        if (list) {
            // 出席した記録があれば出席
            const attend = list.filter((attend) => {
                return attend.begin <= classTerm.begin && classTerm.end <= attend.end;
            });
            if (attend.length > 0) {
                return AttendType.Attend;
            }
            // 出席していない場合の初期値は欠席とし、遅刻/早退のチェックを行なう
            let attendType = AttendType.Absent;
            // 遅刻
            const late = list.filter((attend) => {
                return attend.begin <= classTerm.lateLimit && classTerm.end <= attend.end;
            });
            if (late.length > 0) {
                attendType += AttendType.Late;
            }
            // 早退
            const ealry = list.filter((attend) => {
                // TODO: 一定時間までは早退,それ以上は欠席
                return attend.begin <= classTerm.begin && classTerm.ealyLimit <= attend.end;
            });
            if (ealry.length > 0) {
                attendType += AttendType.Early;
            }
            return attendType;
        } else {
            // 出席リストが存在しなければ欠席
            return AttendType.Absent;
        }
    }
}

export class Attend extends Term {
    no: number;
    constructor(no: number, begin: Date, end: Date) {
        super(begin, end);
        this.no = no;
    }
}

export { AttendInvalidActionError };
