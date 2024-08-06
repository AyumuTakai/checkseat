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
  stringify: (v: T) => string;
  parse: (json: string) => T;
  constructor(
    name: string,
    opt?: {
      value?: T;
      stringify?: (value: T) => string;
      parse?: (json: string) => T;
    }
  ) {
    this.name = name;
    let value: T;

    if (opt && opt.stringify) {
      this.stringify = opt.stringify;
    } else {
      this.stringify = (v: T) => {
        return JSON.stringify(v);
      };
    }
    if (opt && opt.parse) {
      this.parse = opt.parse;
    } else {
      this.parse = (json: string) => {
        return JSON.parse(json) as T;
      };
    }
    if (opt && opt.value) {
      value = opt.value;
      localStorage.setItem(this.name, JSON.stringify(opt.value));
      this.writable = writable<T>(value);
    } else {
      const json = localStorage.getItem(name);
      if(json) {
        value = this.parse(json);
        this.writable = writable<T>(value);
      }else{
        this.writable = writable<T>();
      }
    }
  }
  set(value?: T) {
    if (value) {
      localStorage.setItem(this.name, this.stringify(value));
      this.writable.set(value);
    }
  }
  get(): T {
    return get(this.writable);
  }
  update(updater: Updater<T>) {
    this.writable.update((value: T) => {
      const updated = updater(value);
      localStorage.setItem(this.name, this.stringify(updated));
      return updated;
    });
  }
  subscribe(run: Subscriber<T>, invalidate?: Invalidator<T>) {
    return this.writable.subscribe(run, invalidate);
  }
}
