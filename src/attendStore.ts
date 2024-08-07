import { AttendTimeError, AttendInvalidActionError } from "./errors";
export { AttendInvalidActionError };

/**
 * 出席状態
 */
export const AttendType = {
    "Absent": 0,
    "Attend": 1,
    "Late": 2,
    "Early": 4
}

/**
 * 期間クラス
 */
export class Term {
    begin: Date;
    end: Date;
    /**
     * コンストラクタ
     * @param {Date} begin 開始日時
     * @param {Date} end 終了日時
     */
    constructor(begin: Date, end: Date) {
        this.begin = begin;
        this.end = end;
    }
}

/**
 * 授業時間クラス
 * 処理を簡潔にするため時刻をDateオブジェクトで扱うクラス
 */
export class ClassTerm extends Term {
    lateLimit: Date; // 遅刻限度
    ealyLimit: Date; // 早退限度
    /**
     * コンストラクタ
     * @param {Date} begin 開始日時
     * @param {Date} end 終了日時
     * @param {Date} lateLimit 遅刻限度日時
     * @param {Date} ealyLimit 早退限度日時
     */
    constructor(begin: Date, end: Date, lateLimit: Date, ealyLimit: Date) {
        super(begin, end);
        this.lateLimit = lateLimit;
        this.ealyLimit = ealyLimit;
    }
}

/**
 * 授業時間設定
 */
export class ClassSetting {
    room: string;
    beginHours: number;
    beginMinutes: number;
    endHours: number;
    endMinutes: number;
    lateLimit: number;
    ealyLimit: number;
    /**
     * コンストラクタ
     * @param {string} room 教室名
     * @param {number} begin 開始時刻 (HHMM)
     * @param {number} end 終了時刻 (HHMM)
     * @param {number} lateLimit 遅刻限度 (分)
     * @param {number} ealyLimit 早退限度 (分)
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
     * 指定日の授業時間オブジェクトを生成する
     * @param {Date} date 授業時間の基準になる日時 
     * @returns {ClassTerm} 授業時間オブジェクト
     */
    createClassTerm(date: Date = new Date()) {
        // 開始日時
        const begin = new Date(date.getTime());
        begin.setHours(this.beginHours);
        begin.setMinutes(this.beginMinutes);
        begin.setSeconds(0, 0);
        // 遅刻期限日時
        const lateLimit = new Date(begin.getTime());
        lateLimit.setMinutes(lateLimit.getMinutes() + this.lateLimit);
        // 終了日時
        const end = new Date(date.getTime());
        end.setHours(this.endHours);
        end.setMinutes(this.endMinutes);
        end.setSeconds(0, 0);
        // 早退期限日時
        const ealyLimit = new Date(end.getTime());
        ealyLimit.setMinutes(ealyLimit.getMinutes() - this.ealyLimit);

        return new ClassTerm(begin, end, lateLimit, ealyLimit);
    }
}

export type AttendLine = {
    no: number,
    begin: number,
    end: number
}

/**
 * 出席記録クラス
 */
export class Attend extends Term {
    no: number;
    constructor(no: number, begin: Date, end: Date) {
        super(begin, end);
        this.no = no;
    }
}

/**
 * 出席リストクラス
 */
export class Attends {
    private list: { [no: number]: Attend[] };
    constructor(list: { [no: number]: Attend[] } = {}) {
        this.list = list;
    }
    /**
     * 出席
     * @param {number} id 出席番号
     * @param {Date} [now = new Date() ] 現在時刻 
     */
    public active(id: number, now: Date = new Date()) {
        const end = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);
        let attend;
        if (!this.list[id]) {
            this.list[id] = [] as Attend[];
            attend = new Attend(id, now, end);
            this.list[id].push(attend);
        } else if ((now.getTime() - this.list[id].at(-1).end.getTime()) >= 1000 * 60) {
            attend = new Attend(id, now, end);
            this.list[id].push(attend);
        } else {
            // 退席してから1分未満に出席にした場合は操作ミスとして前の出席と結合
            // 終了時間を戻す
            attend = this.list[id].at(-1);
            if(attend) {
                attend.end = end;
            }
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
            if(attend) {
                if (attend.begin.getTime() > now.getTime()) {
                    throw new AttendTimeError("Invalid Time");
                }
                attend.end = now;
            }
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
                return classTerm.begin < attend.begin && attend.begin <= classTerm.lateLimit;
            });
            if (late.length > 0) {
                attendType += AttendType.Late;
            }
            // 早退
            const ealry = list.filter((attend) => {
                return classTerm.ealyLimit <= attend.end && attend.end < classTerm.end;
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


