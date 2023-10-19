import { assert } from "vitest";
import { AttendType, Attendees, ClassSetting, ClassTerm } from "./attendStore";
import { AttendInvalidActionError, AttendTimeError } from "./errors";

describe('出席/退席', () => {
    test('正常系', () => {
        const no: number = 1;
        const begin: Date = new Date(2023, 8, 27, 10, 0, 0);
        // Attendsオブジェクトの生成
        const attends = new Attendees();
        // 出席
        attends.get(no).active(begin);
        // 結果がリストに追加されているか
        const attendee = attends.get(no);
        assert.notEqual(attendee, undefined);
        assert.equal(attendee.length, 1);
        // 結果の確認
        const attend = attendee.get(0);
        assert.equal(attend.no, no);
        assert.equal(attend.begin, begin);
        assert.equal(attend.end.toString(), new Date(2023, 8, 27, 23, 59, 59).toString());
        // 退席
        const end: Date = new Date(2023, 8, 27, 11, 0, 0);
        const attend2 = attends.get(no).inactive(end);
        // 結果の確認
        assert.equal(attend.no, no);
        assert.equal(attend.begin, begin);
        assert.equal(attend.end.toString(), new Date(2023, 8, 27, 11, 0, 0).toString());

        // 退席してから1分未満に出席にした場合は操作ミスとして前の出席と結合する
        const next: Date = new Date(2023, 8, 27, 11, 0, 59);
        const attend3 = attends.get(no).active(next);
        assert.equal(attends.get(no).length, 1, "出席データの数は変わらない");
        assert.equal(attend3.begin, attend.begin, "出席開始日時は変わらない");
        assert.equal(attend3.end.toString(), new Date(2023, 8, 27, 23, 59, 59).toString(), "退席日時が変更される");

        // 再び退席
        const end2: Date = new Date(2023, 8, 27, 11, 1, 0);
        const attend4 = attends.get(no).inactive(end2);

        // 退席後1分以上経つと新しい出席情報を作成する
        const next2: Date = new Date(2023, 8, 27, 11, 2, 0);
        const attend5 = attends.get(no).active(next2);
        assert.equal(attends.get(no).length, 2, "出席データの数が増える");
        assert.equal(attend5.begin, next2, "出席開始日時が変わる");
        assert.equal(attend5.end.toString(), new Date(2023, 8, 27, 23, 59, 59).toString(), "退席日時が変更される");
    });

    test('異常系:出席時間よりも退席時間のほうが前', () => {
        const no: number = 1;
        const begin: Date = new Date(2023, 8, 27, 10, 1, 0);
        const end: Date = new Date(2023, 8, 27, 10, 0, 0);

        const attends = new Attendees();
        // 出席していないのに退席した場合は例外が発生する
        const attendee = attends.get(no);
        attendee.active(begin);
        expect(() => {
            attendee.inactive(end);
        }).toThrow(AttendTimeError);
    });

    test('異常系:出席していないのに退席', () => {
        const no: number = 1;
        const now: Date = new Date();
        const attends = new Attendees();
        // 出席していないのに退席した場合は例外が発生する
        expect(() => {
            attends.get(no).inactive(now);
        }).toThrow(AttendInvalidActionError);
    });
});

describe('出席チェック', () => {
    test('正常系:開始時間以前に出席、終了時間以後に退席は出席', () => {
        const no: number = 1;
        const begin: Date = new Date(2023, 8, 27, 10, 0, 0);
        const end: Date = new Date(2023, 8, 27, 11, 0, 0);
        const lateLimit: Date = new Date(2023, 8, 27, 10, 10, 0);
        const ealryLimit: Date = new Date(2023, 8, 27, 10, 40, 59, 999);
        const term = new ClassTerm(begin, end, lateLimit, ealryLimit);
        // Attendsオブジェクトの生成
        const attends = new Attendees();
        // 出席
        const attend = attends.get(no).active(begin);
        attends.get(no).inactive(end);
        assert.equal(attends.get(no).confirm(term), AttendType.Attend);
    });
    test('正常系:開始時間後に出席、終了時間後に退席は遅刻', () => {
        const no: number = 1;
        const begin: Date = new Date(2023, 8, 27, 10, 0, 0);
        const end: Date = new Date(2023, 8, 27, 11, 0, 0);
        const lateLimit: Date = new Date(2023, 8, 27, 10, 10, 0);
        const ealryLimit: Date = new Date(2023, 8, 27, 10, 40, 59, 999);
        const term = new ClassTerm(begin, end, lateLimit, ealryLimit);
        // Attendsオブジェクトの生成
        const attends = new Attendees();
        // 出席
        attends.get(no).active(lateLimit);
        attends.get(no).inactive(end);
        assert.equal(attends.get(no).confirm(term), AttendType.Late);
    });
    test('正常系:開始時間以前に出席、終了時間前に退席は早退', () => {
        const no: number = 1;
        const begin: Date = new Date(2023, 8, 27, 10, 0, 0);
        const end: Date = new Date(2023, 8, 27, 11, 0, 0);
        const lateLimit: Date = new Date(2023, 8, 27, 10, 10, 0);
        const ealryLimit: Date = new Date(2023, 8, 27, 10, 40, 59, 999);
        const term = new ClassTerm(begin, end, lateLimit, ealryLimit);
        // Attendsオブジェクトの生成
        const attends = new Attendees();
        // 出席
        attends.get(no).active(begin);
        attends.get(no).inactive(ealryLimit);
        assert.equal(attends.get(no).confirm(term), AttendType.Early);
    });
    test('正常系:出席情報が無ければ欠席', () => {
        const no: number = 1;
        const begin: Date = new Date(2023, 8, 27, 10, 0, 0);
        const end: Date = new Date(2023, 8, 27, 11, 0, 0);
        const lateLimit: Date = new Date(2023, 8, 27, 10, 10, 0);
        const ealryLimit: Date = new Date(2023, 8, 27, 10, 40, 59, 999);
        const term = new ClassTerm(begin, end, lateLimit, ealryLimit);
        // Attendsオブジェクトの生成
        const attends = new Attendees();
        // 出席
        attends.get(no).active(begin);
        attends.get(no).inactive(end);
        assert.equal(attends.get(2).confirm(term), AttendType.Absent);
    });
});

describe('クラス設定', () => {
    test('正常系:クラス設定から授業時間オブジェクトを生成する', () => {
        // 授業設定:10:00から11:00まで。10:10までは遅刻,10:40以降は早退
        const setting = new ClassSetting('101', 1000, 1100, 10, 20);
        const today = new Date(2023, 8, 27, 0, 0, 0);
        const classTerm = setting.createClassTerm(today);
        const attends = new Attendees();
        // 出席
        const no: number = 1;
        const begin: Date = new Date(2023, 8, 27, 10, 0, 0);
        attends.get(no).active(begin);
        // 出席確認
        assert.equal(attends.get(no).confirm(classTerm), AttendType.Attend);

        // 欠席
        const no2: number = 2;
        const begin2: Date = new Date(2023, 8, 27, 10, 12, 0);
        attends.get(no2).active( begin2);
        assert.equal(attends.get(no2).confirm(classTerm), AttendType.Absent);

    });
    test.each([
        [[10,11], [10,39], AttendType.Absent], // 欠席
        [[10,0], [11,0], AttendType.Attend], // 出席
        [[10,9], [11,0], AttendType.Late], // 遅刻
        [[10,0], [10,40], AttendType.Early], // 早退
        [[10,9], [10,40], AttendType.Late | AttendType.Early], // 遅刻 | 早退


        [[11,11], [12,0], AttendType.Absent], // 欠席
        [[9,0], [9,30], AttendType.Absent], // 欠席

    ])('パターンテスト(%o - %o => %i)', (begin, end, expected) => {
        // 授業設定:10:00から11:00まで。10:10までは遅刻,10:40以降は早退
        const setting = new ClassSetting('101', 1000, 1100, 10, 20);
        const today = new Date(2023, 8, 27, 0, 0, 0);
        const classTerm = setting.createClassTerm(today);

        const attends = new Attendees();
        const no = 1;
        attends.get(no).active(new Date(2023, 8, 27, begin[0], begin[1], 0));
        const attend = attends.get(no).inactive(new Date(2023, 8, 27, end[0], end[1], 0));
        // console.log({classTerm,attend});
        expect(attends.get(no).confirm(classTerm)).toBe(expected);
      });
});