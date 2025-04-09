export function resizeImageUrl(url: string, width = 640): string {
  return url.replace(/w\d+-h\d+/, `w${width}`).replace(/-p-k-no-nu/, "");
}
