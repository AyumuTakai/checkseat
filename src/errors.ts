/**
 * 開始時間よりも終了時間の方が前の時刻を指定している
 */
export class AttendTimeError extends Error {
    static {
        this.prototype.name = 'AttendTimeError';
    }
    constructor(message:string, options?: ErrorOptions){
        super(message,options);
    }
}

/**
 * 出席していないのに退席したなどの不正な処理が行なわれた
 */
export class AttendInvalidActionError extends Error {
    static {
        this.prototype.name = 'AttendInvalidActionError';
    }
    constructor(message:string, options?: ErrorOptions){
        super(message,options);
    }
}