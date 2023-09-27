import { assert } from "vitest";
import { Attend, Attends } from "./roomStore";
import {AttendInvalidActionError,AttendTimeError} from "./errors";

describe('出席/退席',()=>{
    test('正常系',()=>{
        const no:number = 1;
        const begin:Date = new Date(2023,8,27,10,0,0);
        // Attendsオブジェクトの生成
        const attends = new Attends();
        // 出席
        attends.active(no,begin);
        // 結果がリストに追加されているか
        const list = attends.get(no);
        assert.notEqual(list,undefined);
        assert.equal(list.length,1);
        // 結果の確認
        const attend = list[0];
        assert.equal(attend.no,no);
        assert.equal(attend.begin,begin);
        assert.equal(attend.end.toString(),new Date(2023,8,27,23,59,59).toString());
        // 退席
        const end:Date = new Date(2023,8,27,11,0,0);
        const attend2 = attends.inactive(no,end);
        // 結果の確認
        assert.equal(attend.no,no);
        assert.equal(attend.begin,begin);
        assert.equal(attend.end.toString(),new Date(2023,8,27,11,0,0).toString());

        // 退席してから1分未満に出席にした場合は操作ミスとして前の出席と結合する
        const next:Date = new Date(2023,8,27,11,0,59);
        const attend3 = attends.active(no,next);
        assert.equal(attends.get(no).length,1,"出席データの数は変わらない");
        assert.equal(attend3.begin,attend.begin,"出席開始日時は変わらない");
        assert.equal(attend3.end.toString(),new Date(2023,8,27,23,59,59).toString(),"退席日時が変更される");

        // 再び退席
        const end2:Date = new Date(2023,8,27,11,1,0);
        const attend4 = attends.inactive(no,end2);

        // 退席後1分以上経つと新しい出席情報を作成する
        const next2:Date = new Date(2023,8,27,11,2,0);
        const attend5 = attends.active(no,next2);
        assert.equal(attends.get(no).length,2,"出席データの数が増える");
        assert.equal(attend5.begin,next2,"出席開始日時が変わる");
        assert.equal(attend5.end.toString(),new Date(2023,8,27,23,59,59).toString(),"退席日時が変更される");
    })

    test('出席時間よりも退席時間のほうが前',()=>{
        const no:number = 1;
        const begin:Date = new Date(2023,8,27,10,1,0);
        const end:Date = new Date(2023,8,27,10,0,0);

        const attends = new Attends();
        // 出席していないのに退席した場合は例外が発生する
        attends.active(no,begin);
        expect(()=>{
            attends.inactive(no,end);
        }).toThrow(AttendTimeError);
    })

    test('出席していないのに退席',()=>{
        const no:number = 1;
        const now:Date = new Date();
        const attends = new Attends();
        // 出席していないのに退席した場合は例外が発生する
        expect(()=>{
            attends.inactive(no,now);
        }).toThrow(AttendInvalidActionError);
    })
})