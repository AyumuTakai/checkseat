import { writable } from "svelte/store";
import Furniture from "./lib/Furniture.svelte";
import Seat from "./lib/SeatChecker.svelte";
import { StorageStore } from "./lib/common/Strage";

/**
 * 教室設定
 */
export type Room = {
  id: number;
  name: string;
  furnitures: any[];
  seats: any[];
  timetables?: any[];
};

/**
 * 編集対象
 * 値が設定されていたら編集モードと判断する
 */
export const editingObject = writable<Furniture | Seat>();

/**
 * サンプルデータ
 */
export const sampleRoom = {
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
};

/**
 * 教室設定リスト
 */
export const rooms = new StorageStore<Room[]>("rooms");
// , [
//   {
//     name: "295",
//     furnitures: [
//       { x: 70, y: 440, width: 350, height: 60, text: "" },
//       { x: 0, y: 354, width: 420, height: 60, text: "" },
//       { x: 0, y: 260, width: 420, height: 60, text: "" },
//       { x: 70, y: 170, width: 350, height: 60, text: "" },
//       { x: 70, y: 80, width: 350, height: 60, text: "" },
//       { x: 70, y: 0, width: 350, height: 60, text: "" },

//       { x: 450, y: 440, width: 420, height: 60, text: "" },
//       { x: 450, y: 354, width: 420, height: 60, text: "" },
//       { x: 450, y: 260, width: 420, height: 60, text: "" },
//       { x: 450, y: 170, width: 420, height: 60, text: "" },
//       { x: 450, y: 80, width: 420, height: 60, text: "" },
//       { x: 450, y: 0, width: 420, height: 60, text: "" },

//       { x: 900, y: 440, width: 220, height: 60, text: "" },
//       { x: 900, y: 354, width: 220, height: 60, text: "" },
//       { x: 900, y: 260, width: 220, height: 60, text: "" },
//       { x: 900, y: 170, width: 220, height: 60, text: "" },
//       { x: 900, y: 80, width: 220, height: 60, text: "" },
//       { x: 900, y: 0, width: 220, height: 60, text: "" },

//       { x: 480, y: 540, width: 220, height: 60, text: "教卓" },
//     ],
//     seats: [
//       { cx: 110, cy: 384, no: 1 },
//       { cx: 360, cy: 384, no: 2 },
//       { cx: 580, cy: 384, no: 3 },
//       { cx: 820, cy: 384, no: 4 },
//       { cx: 110, cy: 290, no: 5 },
//       { cx: 360, cy: 290, no: 6 },
//       { cx: 580, cy: 290, no: 7 },
//       { cx: 820, cy: 290, no: 8 },
//       { cx: 110, cy: 200, no: 9 },
//       { cx: 360, cy: 200, no: 11 },
//       { cx: 580, cy: 200, no: 12 },
//       { cx: 820, cy: 200, no: 13 },
//       { cx: 580, cy: 110, no: 15 },
//       { cx: 820, cy: 110, no: 14 },
//       { cx: 110, cy: 30, no: 40 },
//     ],
//     timetables: [
//       { title: "19:00〜19:45", begin: 1900, end: 1945 },
//       { title: "19:45〜20:30", begin: 1945, end: 2030 },
//       { title: "20:30〜21:15", begin: 2030, end: 2115 },
//     ],
//   },
// ]);

export function createNewRoom() {
  // 既存IDの最大値 + 1
  const id =
    rooms.get().reduce((maxValue, room) => {
      return Math.max(maxValue, room.id);
    }, 0) + 1;
  const room = {
    id,
    name: "new room",
    furnitures: [],
    seats: [],
    timetables: [],
  };
  rooms.update((r) => {
    r.unshift(room);
    return r;
  });
  return room;
}
/**
 * 操作対象教室
 */
export const currentRoom = new StorageStore<Room>("currentRoom", {
  stringify: (v: Room) => {
    return JSON.stringify({ id: v.id });
  },
  parse: (json: string) => {
    const rms = rooms.get();
    const v = JSON.parse(json);
    let room;
    if (v) {
      room = rms.find((room) => room.id === v.id);
    }
    if (rms && rms.length > 0 && !room) {
      room = rms[0];
    }
    return room;
  },
});
console.log({ currentRoom: currentRoom.get() });
