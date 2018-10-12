import { AxiosResponse } from 'axios';
import map from 'lodash-es/map';

export class DownloadList<T = any> {
  public isLoaded: boolean = false;
  public isLoading: boolean = false;
  public list: T[] = [];

  private readonly Entity: any;

  constructor(Entity: any, initial?: Partial<DownloadList> | T[]) {
    this.Entity = Entity;
    if (initial && (initial as T[]).length !== undefined) {
      this.list = (initial as T[]).map(el => new this.Entity(el));
    } else {
      map(initial, (val: any, key: string) => {
        this[key] = val;
      });
    }
  }

  get length() {
    return this.list.length;
  }

  public slice(start?: number, end?: number) {
    return this.list.slice(start, end);
  }

  public map<U>(callbackfn: (value: T, index: number, array: T[]) => U, thisArg?: any) {
    return this.list.map(callbackfn, thisArg);
  }

  public startLoading(): DownloadList<T> {
    this.isLoading = true;
    return this;
  }

  public finishLoading(payload?: AxiosResponse<T[]>): DownloadList<T> {
    const data = payload && payload.data;
    return new DownloadList<T>(this.Entity, {
      isLoaded: !!data,
      isLoading: false,
      list: (data || []).map((el: any) => new this.Entity(el)),
    });
  }

  public addItem(data?: T): DownloadList<T> {
    return new DownloadList<T>(this.Entity, {
      isLoaded: this.isLoaded,
      isLoading: this.isLoading,
      list: data ? [...this.list, new this.Entity(data)] : this.list,
    });
  }

  public removeItem(index: number): DownloadList<T> {
    return new DownloadList<T>(this.Entity, {
      isLoaded: this.isLoaded,
      isLoading: this.isLoading,
      list: [...this.list.slice(0, index), ...this.list.slice(index + 1)],
    });
  }

  public updateItem(index: number, partialItem: Partial<T>): DownloadList<T> {
    if (!this.list[index]) {
      const errorText = `Error: ${DownloadList.name}.updateItem<${this.Entity.name}> could not find item in the list`;
      console.log(errorText, { index, partialItem });
      throw new Error(errorText);
    }
    const newProject = new this.Entity({
      ...(this.list[index] as any),
      ...(partialItem as any),
    });
    return new DownloadList(this.Entity, {
      isLoaded: this.isLoaded,
      isLoading: this.isLoading,
      list: [...this.list.slice(0, index), newProject, ...this.list.slice(index + 1)],
    });
  }
}
