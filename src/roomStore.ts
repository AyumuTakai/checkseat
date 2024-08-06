import { get, writable } from "svelte/store";
import type { AttendLine } from "./attendStore";
import { StorageStore } from "./lib/common/Strage";
import { ulid } from "ulid";

export const mode = writable<"Check" | "Editor">("Check");
/*
 * シート設定
 */
export type Seat = { no: number; cx: number; cy: number };

/**
 * 教室設定
 */
export type Room = {
    id: string;
    name: string;
    furnitures: any[];
    seats: Seat[];
    timetables?: any[];
    attends: AttendLine[];
}

/**
 * 教室設定リスト
 */

const sample_data = [
    {
        id: '1',
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
        attends: []
    }
];

export const rooms = new StorageStore<Room[]>('rooms',{
    parse: (json)=>{
        const rs = JSON.parse(json);
        if( ! rs ) {
            return sample_data;
        }else{
            return rs;
        }
    },
    stringify: (rs)=>{
        return JSON.stringify(rs);
    }
});

/**
 * 操作対象教室
 */

export const currentRoom = new StorageStore<Room>("currentRoom", {
    parse: (json: string) => {
        const rs = get(rooms);
        if (json) {
            const data = JSON.parse(json);
            const id = data.id;
            const room = rs.find((r) => r.id === id );
            console.log({id,room,rs});
            if (room) {
                return room;
            } else {
                return rs[0];
            }
        } else {
            return rs[0];
        }
    },
    stringify: (room) => {
        return JSON.stringify({ id: room.id });
    }
});

/**
 * ユーティリティ関数
 */

export const createRoom = () => {
    const newRoom: Room = {
        id: ulid(),
        name: "New Room",
        furnitures: [],
        seats: [],
        attends: [],
    };
    rooms.update((r) => {
        r.push(newRoom);
        return r;
    });
    currentRoom.set(newRoom);
    mode.set("Editor");
};