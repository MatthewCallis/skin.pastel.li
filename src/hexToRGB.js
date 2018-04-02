export default function hexToRGB(hex) {
  const bytes = [];
  if (hex[0] === '#') {
    hex = hex.substring(1);
  }
  const l = hex.length;
  for (let c = 0; c < l; c += 2) {
    bytes.push(parseInt(hex.substr(c, 2), 16));
  }
  return bytes;
}
