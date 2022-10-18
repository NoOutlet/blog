// hex should be of the form "ff"
export const getColorValue = (hex: string) => parseInt(hex, 16) / 255;

// colorHex should be of the form "#ff00ff"
export const getHSL = (colorHex: string) => {
  const red = getColorValue(colorHex.slice(1, 3));
  const green = getColorValue(colorHex.slice(3, 5));
  const blue = getColorValue(colorHex.slice(5, 7));
  let max = Math.max(red, green, blue),
    min = Math.min(red, green, blue);
  let hue = 0;
  let saturation = 0;
  let luminance = (max + min) / 2;

  // TODO fix this bullshit up
  if (max == min) {
    hue = saturation = 0; // achromatic
  } else {
    var d = max - min;
    saturation = luminance > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case red:
        hue = (green - blue) / d + (green < blue ? 6 : 0);
        break;
      case green:
        hue = (blue - red) / d + 2;
        break;
      case blue:
        hue = (red - green) / d + 4;
        break;
    }
    hue /= 6;
  }

  return [hue * 360, saturation, luminance];
};

export const getLuminance = (colorHex: string) => {
  const rgb = [
    getColorValue(colorHex.slice(1, 3)),
    getColorValue(colorHex.slice(3, 5)),
    getColorValue(colorHex.slice(5, 7)),
  ].map((color) =>
    color <= 0.03928 ? color / 12.92 : Math.pow((color + 0.055) / 1.055, 2)
  );
  const luminance = rgb[0] * 0.2126 + rgb[1] * 0.7152 + rgb[2] * 0.0722;
  return luminance;
};

export const isLight = (colorHex: string) => {
  const luminance = getLuminance(colorHex);
  return luminance > 0.55;
};
