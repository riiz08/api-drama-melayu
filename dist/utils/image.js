"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resizeImageUrl = resizeImageUrl;
function resizeImageUrl(url, width = 640) {
    return url.replace(/w\d+-h\d+/, `w${width}`).replace(/-p-k-no-nu/, "");
}
