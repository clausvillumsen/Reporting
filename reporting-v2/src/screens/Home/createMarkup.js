export default function createMarkup(str) {
  return { __html: str.replace(/(\r\n|\n|\r)/gm, '<br>') };
}
