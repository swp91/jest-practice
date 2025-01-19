class Testobj {
  a: string;
  constructor(str) {
    this.a = str;
  }
}
export function obj(str: string) {
  return new Testobj(str);
}
