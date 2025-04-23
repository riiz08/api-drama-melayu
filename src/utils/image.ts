export function resizeImageUrl(url: string, width = 640): string {
  return url.replace(/w\d+-h\d+/, `w${width}`).replace(/-p-k-no-nu/, "");
}
export function cleanThumbnailUrl(url: string): string {
  return url.replace(/-\d+x\d+(?=\.webp)/, "");
}

export function upgradePosterUrl(url: string): string {
  return url.replace(/\/s\d+\//, "/s1600/");
}
