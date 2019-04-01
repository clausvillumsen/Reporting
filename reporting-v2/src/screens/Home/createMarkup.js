export default function createMarkup(str) {
  if (str) {
    return { __html: str.replace(/(\r\n|\n|\r)/gm, '<br>') };
  }
  return { __html: '' };
}
