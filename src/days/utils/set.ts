// Based on https://stackoverflow.com/a/29783624
export class GeneralSet<V> {
  private map: Map<string, V> = new Map();
  private toStringFn: (item: V) => string;

  constructor(values: V[], toStringFn: (item: V) => string) {
    this.toStringFn = toStringFn;
    for (const value of values) {
      this.add(value);
    }
  }

  [Symbol.iterator] = this.values;

  add(item: V) {
    this.map.set(this.toStringFn(item), item);
  }

  values() {
    return this.map.values();
  }

  delete(item: V) {
    return this.map.delete(this.toStringFn(item));
  }
}
