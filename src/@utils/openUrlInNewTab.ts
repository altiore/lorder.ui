export default function openUrlInNewTab(url: string) {
  let link: any = document.createElement('a');
  link.href = url;
  link.target = '_blank';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  link = undefined;
}
