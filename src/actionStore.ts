import { writable } from "svelte/store";

/**
 * 出席操作記録
 */
export type Action = {
  roomId: number;
  datetime: Date;
  no: number;
  action: string;
  msg?: string;
};

/**
 * 出席操作ログ
 * 時刻の降順で保存
 */
export const actionLog = writable<Action[]>(
  // ローカルストレージから復元
  JSON.parse(localStorage.getItem("log") ?? "[]").map((action) => {
    action.datetime = new Date(action.datetime);
    return action;
  })
);

/**
 * 出席操作ログ追加
 * @param {Action} action 操作記録
 */
export function addLog(action: Action) {
  actionLog.update((log: Action[]) => {
    // 時刻の降順で保存
    log.unshift(action);
    localStorage.setItem("log", JSON.stringify(log));
    return log;
  });
}
