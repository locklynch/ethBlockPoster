// cut saturation of hex colors in half for alternating cube layers

// Function to darken a color by reducing its saturation
function darkenColor(hex, amount) {
  // Convert hex to RGB
  var r = parseInt(hex.substring(1, 3), 16) / 255;
  var g = parseInt(hex.substring(3, 5), 16) / 255;
  var b = parseInt(hex.substring(5, 7), 16) / 255;

  // Convert RGB to HSL
  var max = Math.max(r, g, b),
      min = Math.min(r, g, b);
  var h, s, l = (max + min) / 2;

  if (max == min) {
      h = s = 0; // achromatic
  } else {
      var d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
          case r:
              h = (g - b) / d + (g < b ? 6 : 0);
              break;
          case g:
              h = (b - r) / d + 2;
              break;
          case b:
              h = (r - g) / d + 4;
              break;
      }
      h /= 6;
  }

  // Darken the saturation by the specified amount
  s -= amount;

  // Ensure saturation is within bounds
  s = Math.max(0, Math.min(s, 1));

  // Convert back to RGB
  var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  var p = 2 * l - q;
  r = hue2rgb(p, q, h + 1 / 3) * 255;
  g = hue2rgb(p, q, h) * 255;
  b = hue2rgb(p, q, h - 1 / 3) * 255;

  // Convert RGB to hex
  var newHex = '#' + Math.round(r).toString(16).padStart(2, '0') +
      Math.round(g).toString(16).padStart(2, '0') +
      Math.round(b).toString(16).padStart(2, '0');

  return newHex;
}

// Function to convert hue to RGB
function hue2rgb(p, q, t) {
  if (t < 0) t += 1;
  if (t > 1) t -= 1;
  if (t < 1 / 6) return p + (q - p) * 6 * t;
  if (t < 1 / 2) return q;
  if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
  return p;
}

// Example usage
var originalColor = '#808080';
var darkenedColor = darkenColor(originalColor, 0.5);
console.log('Original Color:', originalColor);
console.log('Darkened Color:', darkenedColor);


export default darkenColor