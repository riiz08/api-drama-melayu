"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resizeImageUrl = resizeImageUrl;
exports.cleanThumbnailUrl = cleanThumbnailUrl;
function resizeImageUrl(url, width = 640) {
    return url.replace(/w\d+-h\d+/, `w${width}`).replace(/-p-k-no-nu/, "");
}
function cleanThumbnailUrl(url) {
    return url.replace(/-\d+x\d+(?=\.webp)/, "");
}
