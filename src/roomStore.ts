import { get, writable } from "svelte/store";
import type { AttendLine } from "./attendStore";
import { StorageStore } from "./lib/common/Storage";
import { ulid } from "ulid";

export const mode = writable<"Check" | "Editor">("Check");
/*
 * シート設定
 */
export type Seat = {
    id: number;
    label: string;
    cx: number;
    cy: number
};

/**
 * 什器設定
 */
export type Furniture = {
    label: string,
    x: number,
    y: number,
    width: number,
    height: number
}

/**
 * 教室設定
 */
export type Room = {
    id: string;
    name: string;
    furnitures: Furniture[];
    seats: Seat[];
    timetables?: any[];
    attends: AttendLine[];
}

/**
 * 教室設定リスト
 */

const sample_data:Room[] = [
    {
        id: '1',
        name: "295",
        furnitures: [
            { x: 70, y: 440, width: 350, height: 60, label: "" },
            { x: 0, y: 354, width: 420, height: 60, label: "" },
            { x: 0, y: 260, width: 420, height: 60, label: "" },
            { x: 70, y: 170, width: 350, height: 60, label: "" },
            { x: 70, y: 80, width: 350, height: 60, label: "" },
            { x: 70, y: 0, width: 350, height: 60, label: "" },

            { x: 450, y: 440, width: 420, height: 60, label: "" },
            { x: 450, y: 354, width: 420, height: 60, label: "" },
            { x: 450, y: 260, width: 420, height: 60, label: "" },
            { x: 450, y: 170, width: 420, height: 60, label: "" },
            { x: 450, y: 80, width: 420, height: 60, label: "" },
            { x: 450, y: 0, width: 420, height: 60, label: "" },

            { x: 900, y: 440, width: 220, height: 60, label: "" },
            { x: 900, y: 354, width: 220, height: 60, label: "" },
            { x: 900, y: 260, width: 220, height: 60, label: "" },
            { x: 900, y: 170, width: 220, height: 60, label: "" },
            { x: 900, y: 80, width: 220, height: 60, label: "" },
            { x: 900, y: 0, width: 220, height: 60, label: "" },

            { x: 480, y: 540, width: 220, height: 60, label: "教卓" },
        ],
        seats: [
            { cx: 110, cy: 384, id: 1 ,label:""},
            { cx: 360, cy: 384, id: 2 ,label:""},
            { cx: 580, cy: 384, id: 3 ,label:""},
            { cx: 820, cy: 384, id: 4 ,label:""},
            { cx: 110, cy: 290, id: 5 ,label:""},
            { cx: 360, cy: 290, id: 6 ,label:""},
            { cx: 580, cy: 290, id: 7 ,label:""},
            { cx: 820, cy: 290, id: 8 ,label:""},
            { cx: 110, cy: 200, id: 9 ,label:""},
            { cx: 360, cy: 200, id: 11 ,label:""},
            { cx: 580, cy: 200, id: 12 ,label:""},
            { cx: 820, cy: 200, id: 13 ,label:""},
            { cx: 580, cy: 110, id: 15 ,label:""},
            { cx: 820, cy: 110, id: 14 ,label:""},
            { cx: 110, cy: 30, id: 40 ,label:""},
        ],
        timetables: [
            { "title": "19:00〜19:45", begin: 1900, end: 1945 },
            { "title": "19:45〜20:30", begin: 1945, end: 2030 },
            { "title": "20:30〜21:15", begin: 2030, end: 2115 }
        ],
        attends: []
    }
];

/**
 * ルーム一覧
 */
export const rooms = new StorageStore<Room[]>('rooms', {
    parse: (json) => {
        const rs = JSON.parse(json);
            return rs;
    },
    stringify: (rs) => {
        return JSON.stringify(rs);
    },
    defaultValue: sample_data
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
            const room = rs.find((r) => r.id === id);
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