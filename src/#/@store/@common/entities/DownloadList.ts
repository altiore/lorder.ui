/* tslint:disable */
/* eslint:disable */
import { AxiosResponse } from 'axios';
import get from 'lodash/get';
import uniqBy from 'lodash/uniqBy';

import { IDownloadList } from '@types';

export class DownloadList<T = any> implements IDownloadList<T> {
  expiredIn: number = 0;
  isLoaded: boolean = false;
  isLoading: boolean = false;
  list: T[] = [];

  private readonly Entity: any;

  constructor(Entity: any, initial?: Partial<DownloadList> | Array<Partial<T>> | T[], fromArray: boolean = false) {
    this.Entity = Entity;
    if (!initial) {
      return;
    }
    if (fromArray) {
      this.list = (initial as T[]).map(el => new this.Entity(el));
    } else {
      this.isLoaded = (initial as Partial<DownloadList>).isLoaded || this.isLoaded;
      this.isLoading = (initial as Partial<DownloadList>).isLoading || this.isLoading;
      this.list = ((initial as Partial<DownloadList>).list || this.list).map(el => new this.Entity(el));
    }
  }

  get length() {
    return this.list.length;
  }

  slice(start?: number, end?: number) {
    return this.list.slice(start, end);
  }

  find<S extends T>(
    predicate: (this: void, value: T, index: number, obj: T[]) => value is S,
    thisArg?: any
  ): S | undefined;
  // eslint-disable-next-line
  find(predicate: (value: T, index: number, obj: T[]) => boolean, thisArg?: any): T | undefined;
  // eslint-disable-next-line
  find(predicate, thisArg) {
    return this.list.find(predicate, thisArg);
  }

  // eslint-disable-next-line
  reduce(callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: T[]) => T, initialValue?: T): T;
  // eslint-disable-next-line
  reduce<U>(callbackfn: (previousValue: U, currentValue: T, currentIndex: number, array: T[]) => U, initialValue: U): U;
  // eslint-disable-next-line
  reduce(...args: any[]) {
    return (this.list.reduce.call as any)(this.list, ...args);
  }

  map<U>(callbackfn: (value: T, index: number, array: T[]) => U, thisArg?: any) {
    return this.list.map(callbackfn, thisArg);
  }

  startLoading(): DownloadList<T> {
    return new DownloadList<T>(this.Entity, {
      isLoaded: this.isLoaded,
      isLoading: true,
      list: this.list,
    });
  }

  finishLoading(payload?: AxiosResponse<T[]> | any, uniqueBy: string = 'id'): DownloadList<T> {
    let list = get(payload, ['data', 'list'], get(payload, 'data'));
    if (!Array.isArray(list)) {
      console.error(
        'В ответе нет массива данных для DownloadList. Убедитесь, что ответ сервера соответсвует стандарту DownloadList'
      );
      list = false;
    }
    return new DownloadList<T>(this.Entity, {
      isLoaded: Boolean(Array.isArray(list) || this.list.length),
      isLoading: false,
      list: uniqBy(
        [
          ...this.list,
          ...(list || []).map(
            (el: any) =>
              new this.Entity({
                ...(this.list.find(e => (e as any).id === el.id) || {}),
                ...el,
              })
          ),
        ],
        uniqueBy
      ),
    });
  }

  stopLoading(): DownloadList<T> {
    return new DownloadList<T>(this.Entity, {
      isLoaded: this.isLoaded,
      isLoading: false,
      list: this.list,
    });
  }

  addItem(data?: Partial<T>): DownloadList<T> {
    return new DownloadList<T>(this.Entity, {
      isLoaded: this.isLoaded,
      isLoading: this.isLoading,
      list: data ? [new this.Entity(data), ...this.list] : this.list,
    });
  }

  removeItem(index: number): DownloadList<T> {
    if (index < 0) {
      index = this.list.length + index;
    }
    return new DownloadList<T>(this.Entity, {
      isLoaded: this.isLoaded,
      isLoading: this.isLoading,
      list: [...this.list.slice(0, index), ...this.list.slice(index + 1)],
    });
  }

  updateItem(index: number, partialItem: Partial<T>): DownloadList<T> {
    if (!partialItem) {
      const errorText = `Error: ${DownloadList.name}.updateItem<${this.Entity.name}> empty data for update`;
      throw new Error(errorText);
    }
    if (index < 0) {
      index = this.list.length + index;
    }
    if (!this.list[index]) {
      const errorText = `Error: ${DownloadList.name}.updateItem<${this.Entity.name}> could not find item in the list`;
      throw new Error(errorText);
    }
    const newItem = new this.Entity({
      ...(this.list[index] as any),
      ...(partialItem as any),
    });
    return new DownloadList(this.Entity, {
      isLoaded: this.isLoaded,
      isLoading: this.isLoading,
      list: [...this.list.slice(0, index), newItem, ...this.list.slice(index + 1)],
    });
  }
}
