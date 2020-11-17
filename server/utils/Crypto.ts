import { default as crypto } from "crypto";

class _Uuid {
  static v4(offset = 0) {
    let byteToHex = [],
      rnds = crypto.randomBytes(16);

    rnds[6] = (rnds[6] & 0x0f) | 0x40; // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
    rnds[8] = (rnds[8] & 0x3f) | 0x80; // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`

    for (var i = 0; i < 256; ++i) {
      byteToHex[i] = (i + 0x100).toString(16).substr(1);
    }

    return [
      byteToHex[rnds[offset++]],
      byteToHex[rnds[offset++]],
      byteToHex[rnds[offset++]],
      byteToHex[rnds[offset++]],
      "-",
      byteToHex[rnds[offset++]],
      byteToHex[rnds[offset++]],
      "-",
      byteToHex[rnds[offset++]],
      byteToHex[rnds[offset++]],
      "-",
      byteToHex[rnds[offset++]],
      byteToHex[rnds[offset++]],
      "-",
      byteToHex[rnds[offset++]],
      byteToHex[rnds[offset++]],
      byteToHex[rnds[offset++]],
      byteToHex[rnds[offset++]],
      byteToHex[rnds[offset++]],
      byteToHex[rnds[offset++]],
    ].join("");
  }
}
const uuid = _Uuid.v4;

/**
 * Return a unique identifier with the given `len`.
 *
 * @param {Number} length
 * @return {String}
 * @api private
 */
export const getUid = function (length: number) {
  let uid = "";
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charsLength = chars.length;

  for (let i = 0; i < length; ++i) {
    uid += chars[getRandomInt(0, charsLength - 1)];
  }

  return uid;
};

/**
 * Return a random int, used by `utils.getUid()`.
 *
 * @param {Number} min
 * @param {Number} max
 * @return {Number}
 * @api private
 */
export function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default uuid;
