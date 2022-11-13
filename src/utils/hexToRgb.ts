/**
 * Converts hex to rgba(...)
 * @param hex
 * @param opacity
 */
export const hexToRGBA = (hex: string, opacity: number) => {
  let r = '0',
    g = '0',
    b = '0';
  if (hex && hex.length === 4) {
    r = '0x' + hex[1] + hex[1];
    g = '0x' + hex[2] + hex[2];
    b = '0x' + hex[3] + hex[3];
  } else if (hex && hex.length === 7) {
    r = '0x' + hex[1] + hex[2];
    g = '0x' + hex[3] + hex[4];
    b = '0x' + hex[5] + hex[6];
  }

  return 'rgba(' + +r + ',' + +g + ',' + +b + ',' + String(opacity) + ')';
};

/**
 * Converts hex to RGB number string
 * @param hex
 */
export const hexToRGBNums = (hex: string) => {
  let r = '0',
    g = '0',
    b = '0';
  if (hex && hex.length === 4) {
    r = '0x' + hex[1] + hex[1];
    g = '0x' + hex[2] + hex[2];
    b = '0x' + hex[3] + hex[3];
  } else if (hex && hex.length === 7) {
    r = '0x' + hex[1] + hex[2];
    g = '0x' + hex[3] + hex[4];
    b = '0x' + hex[5] + hex[6];
  }

  return [+r, +g, +b];
};
