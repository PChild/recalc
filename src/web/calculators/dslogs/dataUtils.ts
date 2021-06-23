export function decimate(data: any, precision: any) {
  return data.filter((_: any, i: any) => i % precision === 0);
}
