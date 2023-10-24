import {
  writable,
  type Updater,
  type Writable,
  type Subscriber,
  get,
} from "svelte/store";

// svelteでexportされていないので複製
declare type Invalidator<T> = (value?: T) => void;

/**
 * 値が更新されるとLocalStorageに保存する
 * Svelteのstoreラッパー
 */
export class StorageStore<T> {
  name: string;
  writable: Writable<T>;
  constructor(name: string, value?: T) {
    this.name = name;
    if (value) {
      localStorage.setItem(this.name, JSON.stringify(value));
    } else {
      const json = localStorage.getItem(name);
      if (json) {
        value = JSON.parse(json);
      } else {
        value = <T>[];
      }
    }
    this.writable = writable<T>(value);
  }
  set(value?: T) {
    localStorage.setItem(this.name, JSON.stringify(value));
    this.writable.set(value);
  }
  get(): T {
    return get(this.writable);
  }
  update(updater: Updater<T>) {
    this.writable.update((value: T) => {
      const updated = updater(value);
      localStorage.setItem(this.name, JSON.stringify(updated));
      return updated;
    });
  }
  subscribe(run: Subscriber<T>, invalidate?: Invalidator<T>) {
    return this.writable.subscribe(run, invalidate);
  }
}
