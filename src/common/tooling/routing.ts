/**
 *
 * @param {(string|null)=} title
 */
export function setTitle(title: any) {
  document.title =
    title === null || title === undefined ? "ReCalc" : `ReCalc - ${title}`;
}
