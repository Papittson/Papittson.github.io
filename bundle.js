(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "v1", {
  enumerable: true,
  get: function () {
    return _v.default;
  }
});
Object.defineProperty(exports, "v3", {
  enumerable: true,
  get: function () {
    return _v2.default;
  }
});
Object.defineProperty(exports, "v4", {
  enumerable: true,
  get: function () {
    return _v3.default;
  }
});
Object.defineProperty(exports, "v5", {
  enumerable: true,
  get: function () {
    return _v4.default;
  }
});
Object.defineProperty(exports, "NIL", {
  enumerable: true,
  get: function () {
    return _nil.default;
  }
});
Object.defineProperty(exports, "version", {
  enumerable: true,
  get: function () {
    return _version.default;
  }
});
Object.defineProperty(exports, "validate", {
  enumerable: true,
  get: function () {
    return _validate.default;
  }
});
Object.defineProperty(exports, "stringify", {
  enumerable: true,
  get: function () {
    return _stringify.default;
  }
});
Object.defineProperty(exports, "parse", {
  enumerable: true,
  get: function () {
    return _parse.default;
  }
});

var _v = _interopRequireDefault(require("./v1.js"));

var _v2 = _interopRequireDefault(require("./v3.js"));

var _v3 = _interopRequireDefault(require("./v4.js"));

var _v4 = _interopRequireDefault(require("./v5.js"));

var _nil = _interopRequireDefault(require("./nil.js"));

var _version = _interopRequireDefault(require("./version.js"));

var _validate = _interopRequireDefault(require("./validate.js"));

var _stringify = _interopRequireDefault(require("./stringify.js"));

var _parse = _interopRequireDefault(require("./parse.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
},{"./nil.js":3,"./parse.js":4,"./stringify.js":8,"./v1.js":9,"./v3.js":10,"./v4.js":12,"./v5.js":13,"./validate.js":14,"./version.js":15}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/*
 * Browser-compatible JavaScript MD5
 *
 * Modification of JavaScript MD5
 * https://github.com/blueimp/JavaScript-MD5
 *
 * Copyright 2011, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * https://opensource.org/licenses/MIT
 *
 * Based on
 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
 * Digest Algorithm, as defined in RFC 1321.
 * Version 2.2 Copyright (C) Paul Johnston 1999 - 2009
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for more info.
 */
function md5(bytes) {
  if (typeof bytes === 'string') {
    const msg = unescape(encodeURIComponent(bytes)); // UTF8 escape

    bytes = new Uint8Array(msg.length);

    for (let i = 0; i < msg.length; ++i) {
      bytes[i] = msg.charCodeAt(i);
    }
  }

  return md5ToHexEncodedArray(wordsToMd5(bytesToWords(bytes), bytes.length * 8));
}
/*
 * Convert an array of little-endian words to an array of bytes
 */


function md5ToHexEncodedArray(input) {
  const output = [];
  const length32 = input.length * 32;
  const hexTab = '0123456789abcdef';

  for (let i = 0; i < length32; i += 8) {
    const x = input[i >> 5] >>> i % 32 & 0xff;
    const hex = parseInt(hexTab.charAt(x >>> 4 & 0x0f) + hexTab.charAt(x & 0x0f), 16);
    output.push(hex);
  }

  return output;
}
/**
 * Calculate output length with padding and bit length
 */


function getOutputLength(inputLength8) {
  return (inputLength8 + 64 >>> 9 << 4) + 14 + 1;
}
/*
 * Calculate the MD5 of an array of little-endian words, and a bit length.
 */


function wordsToMd5(x, len) {
  /* append padding */
  x[len >> 5] |= 0x80 << len % 32;
  x[getOutputLength(len) - 1] = len;
  let a = 1732584193;
  let b = -271733879;
  let c = -1732584194;
  let d = 271733878;

  for (let i = 0; i < x.length; i += 16) {
    const olda = a;
    const oldb = b;
    const oldc = c;
    const oldd = d;
    a = md5ff(a, b, c, d, x[i], 7, -680876936);
    d = md5ff(d, a, b, c, x[i + 1], 12, -389564586);
    c = md5ff(c, d, a, b, x[i + 2], 17, 606105819);
    b = md5ff(b, c, d, a, x[i + 3], 22, -1044525330);
    a = md5ff(a, b, c, d, x[i + 4], 7, -176418897);
    d = md5ff(d, a, b, c, x[i + 5], 12, 1200080426);
    c = md5ff(c, d, a, b, x[i + 6], 17, -1473231341);
    b = md5ff(b, c, d, a, x[i + 7], 22, -45705983);
    a = md5ff(a, b, c, d, x[i + 8], 7, 1770035416);
    d = md5ff(d, a, b, c, x[i + 9], 12, -1958414417);
    c = md5ff(c, d, a, b, x[i + 10], 17, -42063);
    b = md5ff(b, c, d, a, x[i + 11], 22, -1990404162);
    a = md5ff(a, b, c, d, x[i + 12], 7, 1804603682);
    d = md5ff(d, a, b, c, x[i + 13], 12, -40341101);
    c = md5ff(c, d, a, b, x[i + 14], 17, -1502002290);
    b = md5ff(b, c, d, a, x[i + 15], 22, 1236535329);
    a = md5gg(a, b, c, d, x[i + 1], 5, -165796510);
    d = md5gg(d, a, b, c, x[i + 6], 9, -1069501632);
    c = md5gg(c, d, a, b, x[i + 11], 14, 643717713);
    b = md5gg(b, c, d, a, x[i], 20, -373897302);
    a = md5gg(a, b, c, d, x[i + 5], 5, -701558691);
    d = md5gg(d, a, b, c, x[i + 10], 9, 38016083);
    c = md5gg(c, d, a, b, x[i + 15], 14, -660478335);
    b = md5gg(b, c, d, a, x[i + 4], 20, -405537848);
    a = md5gg(a, b, c, d, x[i + 9], 5, 568446438);
    d = md5gg(d, a, b, c, x[i + 14], 9, -1019803690);
    c = md5gg(c, d, a, b, x[i + 3], 14, -187363961);
    b = md5gg(b, c, d, a, x[i + 8], 20, 1163531501);
    a = md5gg(a, b, c, d, x[i + 13], 5, -1444681467);
    d = md5gg(d, a, b, c, x[i + 2], 9, -51403784);
    c = md5gg(c, d, a, b, x[i + 7], 14, 1735328473);
    b = md5gg(b, c, d, a, x[i + 12], 20, -1926607734);
    a = md5hh(a, b, c, d, x[i + 5], 4, -378558);
    d = md5hh(d, a, b, c, x[i + 8], 11, -2022574463);
    c = md5hh(c, d, a, b, x[i + 11], 16, 1839030562);
    b = md5hh(b, c, d, a, x[i + 14], 23, -35309556);
    a = md5hh(a, b, c, d, x[i + 1], 4, -1530992060);
    d = md5hh(d, a, b, c, x[i + 4], 11, 1272893353);
    c = md5hh(c, d, a, b, x[i + 7], 16, -155497632);
    b = md5hh(b, c, d, a, x[i + 10], 23, -1094730640);
    a = md5hh(a, b, c, d, x[i + 13], 4, 681279174);
    d = md5hh(d, a, b, c, x[i], 11, -358537222);
    c = md5hh(c, d, a, b, x[i + 3], 16, -722521979);
    b = md5hh(b, c, d, a, x[i + 6], 23, 76029189);
    a = md5hh(a, b, c, d, x[i + 9], 4, -640364487);
    d = md5hh(d, a, b, c, x[i + 12], 11, -421815835);
    c = md5hh(c, d, a, b, x[i + 15], 16, 530742520);
    b = md5hh(b, c, d, a, x[i + 2], 23, -995338651);
    a = md5ii(a, b, c, d, x[i], 6, -198630844);
    d = md5ii(d, a, b, c, x[i + 7], 10, 1126891415);
    c = md5ii(c, d, a, b, x[i + 14], 15, -1416354905);
    b = md5ii(b, c, d, a, x[i + 5], 21, -57434055);
    a = md5ii(a, b, c, d, x[i + 12], 6, 1700485571);
    d = md5ii(d, a, b, c, x[i + 3], 10, -1894986606);
    c = md5ii(c, d, a, b, x[i + 10], 15, -1051523);
    b = md5ii(b, c, d, a, x[i + 1], 21, -2054922799);
    a = md5ii(a, b, c, d, x[i + 8], 6, 1873313359);
    d = md5ii(d, a, b, c, x[i + 15], 10, -30611744);
    c = md5ii(c, d, a, b, x[i + 6], 15, -1560198380);
    b = md5ii(b, c, d, a, x[i + 13], 21, 1309151649);
    a = md5ii(a, b, c, d, x[i + 4], 6, -145523070);
    d = md5ii(d, a, b, c, x[i + 11], 10, -1120210379);
    c = md5ii(c, d, a, b, x[i + 2], 15, 718787259);
    b = md5ii(b, c, d, a, x[i + 9], 21, -343485551);
    a = safeAdd(a, olda);
    b = safeAdd(b, oldb);
    c = safeAdd(c, oldc);
    d = safeAdd(d, oldd);
  }

  return [a, b, c, d];
}
/*
 * Convert an array bytes to an array of little-endian words
 * Characters >255 have their high-byte silently ignored.
 */


function bytesToWords(input) {
  if (input.length === 0) {
    return [];
  }

  const length8 = input.length * 8;
  const output = new Uint32Array(getOutputLength(length8));

  for (let i = 0; i < length8; i += 8) {
    output[i >> 5] |= (input[i / 8] & 0xff) << i % 32;
  }

  return output;
}
/*
 * Add integers, wrapping at 2^32. This uses 16-bit operations internally
 * to work around bugs in some JS interpreters.
 */


function safeAdd(x, y) {
  const lsw = (x & 0xffff) + (y & 0xffff);
  const msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return msw << 16 | lsw & 0xffff;
}
/*
 * Bitwise rotate a 32-bit number to the left.
 */


function bitRotateLeft(num, cnt) {
  return num << cnt | num >>> 32 - cnt;
}
/*
 * These functions implement the four basic operations the algorithm uses.
 */


function md5cmn(q, a, b, x, s, t) {
  return safeAdd(bitRotateLeft(safeAdd(safeAdd(a, q), safeAdd(x, t)), s), b);
}

function md5ff(a, b, c, d, x, s, t) {
  return md5cmn(b & c | ~b & d, a, b, x, s, t);
}

function md5gg(a, b, c, d, x, s, t) {
  return md5cmn(b & d | c & ~d, a, b, x, s, t);
}

function md5hh(a, b, c, d, x, s, t) {
  return md5cmn(b ^ c ^ d, a, b, x, s, t);
}

function md5ii(a, b, c, d, x, s, t) {
  return md5cmn(c ^ (b | ~d), a, b, x, s, t);
}

var _default = md5;
exports.default = _default;
},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = '00000000-0000-0000-0000-000000000000';
exports.default = _default;
},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _validate = _interopRequireDefault(require("./validate.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function parse(uuid) {
  if (!(0, _validate.default)(uuid)) {
    throw TypeError('Invalid UUID');
  }

  let v;
  const arr = new Uint8Array(16); // Parse ########-....-....-....-............

  arr[0] = (v = parseInt(uuid.slice(0, 8), 16)) >>> 24;
  arr[1] = v >>> 16 & 0xff;
  arr[2] = v >>> 8 & 0xff;
  arr[3] = v & 0xff; // Parse ........-####-....-....-............

  arr[4] = (v = parseInt(uuid.slice(9, 13), 16)) >>> 8;
  arr[5] = v & 0xff; // Parse ........-....-####-....-............

  arr[6] = (v = parseInt(uuid.slice(14, 18), 16)) >>> 8;
  arr[7] = v & 0xff; // Parse ........-....-....-####-............

  arr[8] = (v = parseInt(uuid.slice(19, 23), 16)) >>> 8;
  arr[9] = v & 0xff; // Parse ........-....-....-....-############
  // (Use "/" to avoid 32-bit truncation when bit-shifting high-order bytes)

  arr[10] = (v = parseInt(uuid.slice(24, 36), 16)) / 0x10000000000 & 0xff;
  arr[11] = v / 0x100000000 & 0xff;
  arr[12] = v >>> 24 & 0xff;
  arr[13] = v >>> 16 & 0xff;
  arr[14] = v >>> 8 & 0xff;
  arr[15] = v & 0xff;
  return arr;
}

var _default = parse;
exports.default = _default;
},{"./validate.js":14}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;
exports.default = _default;
},{}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = rng;
// Unique ID creation requires a high quality random # generator. In the browser we therefore
// require the crypto API and do not support built-in fallback to lower quality random number
// generators (like Math.random()).
let getRandomValues;
const rnds8 = new Uint8Array(16);

function rng() {
  // lazy load so that environments that need to polyfill have a chance to do so
  if (!getRandomValues) {
    // getRandomValues needs to be invoked in a context where "this" is a Crypto implementation. Also,
    // find the complete implementation of crypto (msCrypto) on IE11.
    getRandomValues = typeof crypto !== 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto !== 'undefined' && typeof msCrypto.getRandomValues === 'function' && msCrypto.getRandomValues.bind(msCrypto);

    if (!getRandomValues) {
      throw new Error('crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported');
    }
  }

  return getRandomValues(rnds8);
}
},{}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

// Adapted from Chris Veness' SHA1 code at
// http://www.movable-type.co.uk/scripts/sha1.html
function f(s, x, y, z) {
  switch (s) {
    case 0:
      return x & y ^ ~x & z;

    case 1:
      return x ^ y ^ z;

    case 2:
      return x & y ^ x & z ^ y & z;

    case 3:
      return x ^ y ^ z;
  }
}

function ROTL(x, n) {
  return x << n | x >>> 32 - n;
}

function sha1(bytes) {
  const K = [0x5a827999, 0x6ed9eba1, 0x8f1bbcdc, 0xca62c1d6];
  const H = [0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476, 0xc3d2e1f0];

  if (typeof bytes === 'string') {
    const msg = unescape(encodeURIComponent(bytes)); // UTF8 escape

    bytes = [];

    for (let i = 0; i < msg.length; ++i) {
      bytes.push(msg.charCodeAt(i));
    }
  } else if (!Array.isArray(bytes)) {
    // Convert Array-like to Array
    bytes = Array.prototype.slice.call(bytes);
  }

  bytes.push(0x80);
  const l = bytes.length / 4 + 2;
  const N = Math.ceil(l / 16);
  const M = new Array(N);

  for (let i = 0; i < N; ++i) {
    const arr = new Uint32Array(16);

    for (let j = 0; j < 16; ++j) {
      arr[j] = bytes[i * 64 + j * 4] << 24 | bytes[i * 64 + j * 4 + 1] << 16 | bytes[i * 64 + j * 4 + 2] << 8 | bytes[i * 64 + j * 4 + 3];
    }

    M[i] = arr;
  }

  M[N - 1][14] = (bytes.length - 1) * 8 / Math.pow(2, 32);
  M[N - 1][14] = Math.floor(M[N - 1][14]);
  M[N - 1][15] = (bytes.length - 1) * 8 & 0xffffffff;

  for (let i = 0; i < N; ++i) {
    const W = new Uint32Array(80);

    for (let t = 0; t < 16; ++t) {
      W[t] = M[i][t];
    }

    for (let t = 16; t < 80; ++t) {
      W[t] = ROTL(W[t - 3] ^ W[t - 8] ^ W[t - 14] ^ W[t - 16], 1);
    }

    let a = H[0];
    let b = H[1];
    let c = H[2];
    let d = H[3];
    let e = H[4];

    for (let t = 0; t < 80; ++t) {
      const s = Math.floor(t / 20);
      const T = ROTL(a, 5) + f(s, b, c, d) + e + K[s] + W[t] >>> 0;
      e = d;
      d = c;
      c = ROTL(b, 30) >>> 0;
      b = a;
      a = T;
    }

    H[0] = H[0] + a >>> 0;
    H[1] = H[1] + b >>> 0;
    H[2] = H[2] + c >>> 0;
    H[3] = H[3] + d >>> 0;
    H[4] = H[4] + e >>> 0;
  }

  return [H[0] >> 24 & 0xff, H[0] >> 16 & 0xff, H[0] >> 8 & 0xff, H[0] & 0xff, H[1] >> 24 & 0xff, H[1] >> 16 & 0xff, H[1] >> 8 & 0xff, H[1] & 0xff, H[2] >> 24 & 0xff, H[2] >> 16 & 0xff, H[2] >> 8 & 0xff, H[2] & 0xff, H[3] >> 24 & 0xff, H[3] >> 16 & 0xff, H[3] >> 8 & 0xff, H[3] & 0xff, H[4] >> 24 & 0xff, H[4] >> 16 & 0xff, H[4] >> 8 & 0xff, H[4] & 0xff];
}

var _default = sha1;
exports.default = _default;
},{}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _validate = _interopRequireDefault(require("./validate.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */
const byteToHex = [];

for (let i = 0; i < 256; ++i) {
  byteToHex.push((i + 0x100).toString(16).substr(1));
}

function stringify(arr, offset = 0) {
  // Note: Be careful editing this code!  It's been tuned for performance
  // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434
  const uuid = (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase(); // Consistency check for valid UUID.  If this throws, it's likely due to one
  // of the following:
  // - One or more input array values don't map to a hex octet (leading to
  // "undefined" in the uuid)
  // - Invalid input values for the RFC `version` or `variant` fields

  if (!(0, _validate.default)(uuid)) {
    throw TypeError('Stringified UUID is invalid');
  }

  return uuid;
}

var _default = stringify;
exports.default = _default;
},{"./validate.js":14}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _rng = _interopRequireDefault(require("./rng.js"));

var _stringify = _interopRequireDefault(require("./stringify.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// **`v1()` - Generate time-based UUID**
//
// Inspired by https://github.com/LiosK/UUID.js
// and http://docs.python.org/library/uuid.html
let _nodeId;

let _clockseq; // Previous uuid creation time


let _lastMSecs = 0;
let _lastNSecs = 0; // See https://github.com/uuidjs/uuid for API details

function v1(options, buf, offset) {
  let i = buf && offset || 0;
  const b = buf || new Array(16);
  options = options || {};
  let node = options.node || _nodeId;
  let clockseq = options.clockseq !== undefined ? options.clockseq : _clockseq; // node and clockseq need to be initialized to random values if they're not
  // specified.  We do this lazily to minimize issues related to insufficient
  // system entropy.  See #189

  if (node == null || clockseq == null) {
    const seedBytes = options.random || (options.rng || _rng.default)();

    if (node == null) {
      // Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
      node = _nodeId = [seedBytes[0] | 0x01, seedBytes[1], seedBytes[2], seedBytes[3], seedBytes[4], seedBytes[5]];
    }

    if (clockseq == null) {
      // Per 4.2.2, randomize (14 bit) clockseq
      clockseq = _clockseq = (seedBytes[6] << 8 | seedBytes[7]) & 0x3fff;
    }
  } // UUID timestamps are 100 nano-second units since the Gregorian epoch,
  // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
  // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
  // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.


  let msecs = options.msecs !== undefined ? options.msecs : Date.now(); // Per 4.2.1.2, use count of uuid's generated during the current clock
  // cycle to simulate higher resolution clock

  let nsecs = options.nsecs !== undefined ? options.nsecs : _lastNSecs + 1; // Time since last uuid creation (in msecs)

  const dt = msecs - _lastMSecs + (nsecs - _lastNSecs) / 10000; // Per 4.2.1.2, Bump clockseq on clock regression

  if (dt < 0 && options.clockseq === undefined) {
    clockseq = clockseq + 1 & 0x3fff;
  } // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
  // time interval


  if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === undefined) {
    nsecs = 0;
  } // Per 4.2.1.2 Throw error if too many uuids are requested


  if (nsecs >= 10000) {
    throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
  }

  _lastMSecs = msecs;
  _lastNSecs = nsecs;
  _clockseq = clockseq; // Per 4.1.4 - Convert from unix epoch to Gregorian epoch

  msecs += 12219292800000; // `time_low`

  const tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
  b[i++] = tl >>> 24 & 0xff;
  b[i++] = tl >>> 16 & 0xff;
  b[i++] = tl >>> 8 & 0xff;
  b[i++] = tl & 0xff; // `time_mid`

  const tmh = msecs / 0x100000000 * 10000 & 0xfffffff;
  b[i++] = tmh >>> 8 & 0xff;
  b[i++] = tmh & 0xff; // `time_high_and_version`

  b[i++] = tmh >>> 24 & 0xf | 0x10; // include version

  b[i++] = tmh >>> 16 & 0xff; // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)

  b[i++] = clockseq >>> 8 | 0x80; // `clock_seq_low`

  b[i++] = clockseq & 0xff; // `node`

  for (let n = 0; n < 6; ++n) {
    b[i + n] = node[n];
  }

  return buf || (0, _stringify.default)(b);
}

var _default = v1;
exports.default = _default;
},{"./rng.js":6,"./stringify.js":8}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _v = _interopRequireDefault(require("./v35.js"));

var _md = _interopRequireDefault(require("./md5.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const v3 = (0, _v.default)('v3', 0x30, _md.default);
var _default = v3;
exports.default = _default;
},{"./md5.js":2,"./v35.js":11}],11:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
exports.URL = exports.DNS = void 0;

var _stringify = _interopRequireDefault(require("./stringify.js"));

var _parse = _interopRequireDefault(require("./parse.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function stringToBytes(str) {
  str = unescape(encodeURIComponent(str)); // UTF8 escape

  const bytes = [];

  for (let i = 0; i < str.length; ++i) {
    bytes.push(str.charCodeAt(i));
  }

  return bytes;
}

const DNS = '6ba7b810-9dad-11d1-80b4-00c04fd430c8';
exports.DNS = DNS;
const URL = '6ba7b811-9dad-11d1-80b4-00c04fd430c8';
exports.URL = URL;

function _default(name, version, hashfunc) {
  function generateUUID(value, namespace, buf, offset) {
    if (typeof value === 'string') {
      value = stringToBytes(value);
    }

    if (typeof namespace === 'string') {
      namespace = (0, _parse.default)(namespace);
    }

    if (namespace.length !== 16) {
      throw TypeError('Namespace must be array-like (16 iterable integer values, 0-255)');
    } // Compute hash of namespace and value, Per 4.3
    // Future: Use spread syntax when supported on all platforms, e.g. `bytes =
    // hashfunc([...namespace, ... value])`


    let bytes = new Uint8Array(16 + value.length);
    bytes.set(namespace);
    bytes.set(value, namespace.length);
    bytes = hashfunc(bytes);
    bytes[6] = bytes[6] & 0x0f | version;
    bytes[8] = bytes[8] & 0x3f | 0x80;

    if (buf) {
      offset = offset || 0;

      for (let i = 0; i < 16; ++i) {
        buf[offset + i] = bytes[i];
      }

      return buf;
    }

    return (0, _stringify.default)(bytes);
  } // Function#name is not settable on some platforms (#270)


  try {
    generateUUID.name = name; // eslint-disable-next-line no-empty
  } catch (err) {} // For CommonJS default export support


  generateUUID.DNS = DNS;
  generateUUID.URL = URL;
  return generateUUID;
}
},{"./parse.js":4,"./stringify.js":8}],12:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _rng = _interopRequireDefault(require("./rng.js"));

var _stringify = _interopRequireDefault(require("./stringify.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function v4(options, buf, offset) {
  options = options || {};

  const rnds = options.random || (options.rng || _rng.default)(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`


  rnds[6] = rnds[6] & 0x0f | 0x40;
  rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided

  if (buf) {
    offset = offset || 0;

    for (let i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }

    return buf;
  }

  return (0, _stringify.default)(rnds);
}

var _default = v4;
exports.default = _default;
},{"./rng.js":6,"./stringify.js":8}],13:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _v = _interopRequireDefault(require("./v35.js"));

var _sha = _interopRequireDefault(require("./sha1.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const v5 = (0, _v.default)('v5', 0x50, _sha.default);
var _default = v5;
exports.default = _default;
},{"./sha1.js":7,"./v35.js":11}],14:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regex = _interopRequireDefault(require("./regex.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function validate(uuid) {
  return typeof uuid === 'string' && _regex.default.test(uuid);
}

var _default = validate;
exports.default = _default;
},{"./regex.js":5}],15:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _validate = _interopRequireDefault(require("./validate.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function version(uuid) {
  if (!(0, _validate.default)(uuid)) {
    throw TypeError('Invalid UUID');
  }

  return parseInt(uuid.substr(14, 1), 16);
}

var _default = version;
exports.default = _default;
},{"./validate.js":14}],16:[function(require,module,exports){
const { NEEDS, TILE_TYPES } = require("../../utils/constants.js");
const { HUNGER, THIRST, SLEEP, MATING } = NEEDS;
const Entity = require("./entity.js");
const _ = require("../../utils/functions.js");
const findPath = require("../../utils/shortestPathAlgo.js");
const Logger = require("../../utils/logger");

class Creature extends Entity {
  static hasReproduced = false;
  /**
   * Represents a player's creature.
   * @constructor
   * @param {number} x - Position X of the creature.
   * @param {number} y - Position Y of the creature.
   * @param {Player} player - Owner of the creature.
   */
  constructor(x, y, player) {
    const { id, img, reproducibility, strength, moveSpeed, perception, hole } =
      player;
    super(x, y, hole.size);
    this.player = player;
    this.playerId = id;
    this.reproducibility = reproducibility;
    this.reproductionPercentage = reproducibility / 10;
    this.strength = strength;
    this.moveSpeed = moveSpeed;
    this.perception = perception;
    this.hole = hole;
    this.needs = {
      HUNGER: HUNGER.default,
      THIRST: THIRST.default,
      SLEEP: SLEEP.default,
      MATING: MATING.default - reproducibility,
    };
    this.img = img;
    this.render();
  }

  static resetReproduction() {
    Creature.hasReproduced = false;
  }

  /**
   * Decrease all creature's needs.
   */
  decreaseNeeds() {
    const needs = Object.keys(this.needs);
    needs.forEach((need) => {
      const decreaseAmount = this.needs[need] - NEEDS[need].decreaseAmount;
      this.needs[need] = Math.max(0, decreaseAmount);
      if (need != "SLEEP" && need != "MATING" && this.needs[need] === 0) {
        this.die(need);
        return;
      }
    });
  }

  /**
   * Increase a creature's need according to current tile type.
   * @param {string} need - String representation of the need.
   * @param {TILE_TYPES} tileType - Tile type that fulfill creature's need.
   */
  increaseNeed(need, tileType) {
    let increaseAmount = this.needs[need] + tileType[need];
    if (need != "MATING") {
      this.needs[need] = Math.min(100, increaseAmount);
      const needStr = need.toLowerCase();
      Logger.info(`🆙 [${this.id}] augmente son besoin "${needStr}".`);
      return;
    }

    if (need == "MATING" && !Creature.hasReproduced) {
      const player = this.player;
      const creatures = this.player.getCreatures();
      const mates = creatures.filter(
        (mate) => mate.getCriticalNeed() == "MATING"
      );
      const mate = mates.find(
        (entity) =>
          entity.id != this.id && entity.x === this.x && entity.y === this.y
      );
      if (mate != null) {
        const nbNewborn = Math.ceil(player.reproducibility / 2);
        let creaturesCreated = 0;
        for (let i = 0; i < nbNewborn; i++) {
          if (Math.random() < this.reproductionPercentage) {
            player.addCreature();
            creaturesCreated++;
          }
        }
        if (creaturesCreated > 0) {
          Creature.hasReproduced = true;
          increaseAmount -= this.reproducibility;
          this.needs[need] = Math.min(100, increaseAmount);
          mate.needs[need] = Math.min(100, increaseAmount);
          Logger.info(`💕 [${this.id}] s'est reproduit.`);
        }
      }
    }
  }

  /**
   * Get the priority critical need of the creature.
   * @returns {string}
   */
  getCriticalNeed() {
    const criticalNeed = Object.keys(this.needs)
      .sort((a, b) => NEEDS[b].priority - NEEDS[a].priority)
      .find((need) => this.needs[need] < NEEDS[need].critical);
    return criticalNeed;
  }

  /**
   * Do the creature action for the game turn.
   * @param {Tile[]} tiles - Tiles in the creature's perception.
   * @param {Creature[]} creatures - Creatures in the creature's perception.
   * @returns {boolean} True if the action is done (need satisfied).
   */
  doAction(tiles, creatures) {
    const criticalNeed = this.getCriticalNeed();
    if (criticalNeed != null) {
      const needStr = criticalNeed.toLowerCase();
      Logger.info(`💫 [${this.id}] a un besoin de "${needStr}".`);
    }
    let goal;

    switch (criticalNeed) {
      case "THIRST":
        goal = [TILE_TYPES.SAND];
        break;
      case "HUNGER":
        goal = [TILE_TYPES.GRASS, TILE_TYPES.FOREST];
        break;
      case "SLEEP":
      case "MATING":
        goal = this.hole.id;
        break;
      default:
        this.wander(tiles);
        return false;
    }

    const path = findPath(this, goal, tiles);

    if (path.length === 0) {
      this.wander(tiles);
      return false;
    }

    const targetTile = tiles.get(_.last(path));
    this.walk(path, tiles, creatures);

    // The creature arrived to its goal
    if (path.length === 0) {
      this.increaseNeed(criticalNeed, targetTile.type);
      return true;
    }

    return false;
  }

  /**
   * Make the creature walk along the path.
   * @param {string[]} path - Array of tile ids.
   * @param {Tile[]} tiles - Tiles in the creature's perception.
   * @param {Creature[]} creatures - Creatures in the creature's perception.
   */
  walk(path, tiles, creatures) {
    path.shift(); // Remove current tile from path.
    for (let step = 0; step < this.moveSpeed; step++) {
      const nextStep = path.shift();
      if (nextStep == null) {
        break;
      }
      const { x, y } = tiles.get(nextStep);
      const occupant = creatures.find(
        (creature) =>
          creature.playerId != this.playerId &&
          creature.x == x &&
          creature.y == y
      );

      if (this.fight(occupant)) {
        occupant?.move(this.x, this.y);
        this.move(x, y);
      } else {
        break;
      }
    }
  }

  /**
   * Make the creature fight another creature.
   * @param {Creature} creature - The creature to fight against.
   * @returns {boolean} True if the creature won the fight, false otherwise.
   */
  fight(creature) {
    return creature == null || creature.strength <= this.strength;
  }
}

module.exports = Creature;

},{"../../utils/constants.js":24,"../../utils/functions.js":26,"../../utils/logger":27,"../../utils/shortestPathAlgo.js":28,"./entity.js":17}],17:[function(require,module,exports){
const { v4: uuidv4 } = require("uuid");
const D3 = require("../../utils/d3");
const _ = require("../../utils/functions.js");
const Logger = require("../../utils/logger");

class Entity {
  /**
   * Represents a generic entity.
   * @constructor
   * @param {number} x - Position X of the entity.
   * @param {number} y - Position Y of the entity.
   * @param {number} size - Size of the entity.
   */
  constructor(x, y, size) {
    this.id = uuidv4();
    this.x = x;
    this.y = y;
    this.size = size;
    this.isAlive = true;
    this.img = "";
  }

  /**
   * Render the HTML element associated with the entity.
   */
  render() {
    this.htmlElement = D3.select("#grid")
      .append("svg:image")
      .attr("id", this.id)
      .attr("width", this.size)
      .attr("height", this.size)
      .attr("x", this.x * this.size)
      .attr("y", this.y * this.size)
      .attr("class", "entity")
      .attr("xlink:href", this.img);
  }

  /**
   * Make the entity wander around.
   * @param {Tile[]} tiles - Tiles in the entity perception.
   */
  wander(tiles) {
    for (let step = 0; step < this.moveSpeed; step++) {
      const neighbours = tiles
        .get(`${this.x};${this.y}`)
        .neighbours(tiles)
        .filter((tile) => !tile.isObstacle());
      const { x, y } = _.random(neighbours);
      this.move(x, y);
    }
  }

  /**
   * Move the entity to the specified location.
   * @param {number} x - Position X of the location.
   * @param {number} y - Position Y of the location.
   */
  move(x, y) {
    this.x = x;
    this.y = y;
    this.htmlElement.attr("x", x * this.size).attr("y", y * this.size);
  }

  /**
   * Make the entity die.
   * @param {String} deathCause - Cause of the death.
   */
  die(deathCause) {
    if (!this.isAlive) {
      return;
    }
    this.deathCause = deathCause.toLowerCase();
    this.isAlive = false;
    this.htmlElement
      .classed("dead", true)
      .attr("xlink:href", "./images/DEAD_CREATURE.png");
    Logger.info(`💀 [${this.id}] est mort de "${this.deathCause}".`);
  }
}

module.exports = Entity;

},{"../../utils/d3":25,"../../utils/functions.js":26,"../../utils/logger":27,"uuid":1}],18:[function(require,module,exports){
const { PREDATOR_SETTINGS } = require("../../utils/constants.js");
const { STRENGTH, PERCEPTION, MOVE_SPEED, IMG } = PREDATOR_SETTINGS;
const Entity = require("./entity.js");
const findPath = require("../../utils/shortestPathAlgo.js");
const _ = require("../../utils/functions.js");
const Logger = require("../../utils/logger");

class Predator extends Entity {
  /**
   * Represents a predator.
   * @constructor
   * @param {number} x - Position X of the predator.
   * @param {number} y - Position Y of the predator.
   * @param {number} size - Size of the predator.
   */
  constructor(x, y, size) {
    super(x, y, size);
    this.strength = STRENGTH;
    this.moveSpeed = MOVE_SPEED;
    this.perception = PERCEPTION;
    this.img = IMG;
    this.render();
  }

  /**
   * Do the predator action for the game turn.
   * @param {Tile[]} tiles - Tiles in the predator's perception.
   * @param {Creature[]} creatures - Creatures in the predator's perception.
   * @returns {boolean} True if the action is done (creature eaten).
   */
  doAction(tiles, creatures) {
    const crowdStrength = creatures.reduce(
      (sum, creature) => sum + creature.strength,
      0
    );

    if (crowdStrength > this.strength) {
      this.wander(tiles);
      return false;
    }

    const path = findPath(this, "creature", tiles, creatures);

    if (path.length === 0) {
      this.wander(tiles);
      return false;
    }

    this.walk(path, tiles, creatures);

    // The predator arrived to its goal
    if (path.length === 0) {
      this.eat(creatures);
      return true;
    }

    return false;
  }

  /**
   * Make the predator walk along the path.
   * @param {string[]} path - Array of tile ids.
   * @param {Tile[]} tiles - Tiles in the predator's perception.
   */
  walk(path, tiles) {
    path.shift(); // Remove current tile from path.
    for (let step = 0; step < this.moveSpeed; step++) {
      const nextStep = path.shift();
      if (nextStep == null) {
        break;
      }
      const { x, y } = tiles.get(nextStep);
      this.move(x, y);
    }
  }

  /**
   * Make the predator eat a random creature at its position.
   * @param {Creature[]} creatures - Creatures in the predator's perception.
   */
  eat(creatures) {
    const edibleCreatures = creatures.filter(
      ({ x, y }) => this.x === x && this.y === y
    );
    const creature = _.random(edibleCreatures);
    if (creature != null) {
      Logger.info(`🩸 [${this.id}] a mangé une créature.`);
      creature.die("PREDATOR");
    }
  }
}

module.exports = Predator;

},{"../../utils/constants.js":24,"../../utils/functions.js":26,"../../utils/logger":27,"../../utils/shortestPathAlgo.js":28,"./entity.js":17}],19:[function(require,module,exports){
const Logger = require("../utils/logger.js");
const Grid = require("./grid.js");
const Predator = require("./entities/predator.js");
const { updateDetails } = require("../views/game.js");
const Creature = require("./entities/creature.js");

class GameEngine {
  /**
   * Represents a game engine.
   * @constructor
   * @param {Player[]} players - Players entering the game.
   * @param {number} [tileSize] - Tile size (optional, default 20).
   * @param {number} [maxRounds] - Max number of rounds (optional, default 50).
   */
  constructor(players, maxRounds = 50, tileSize = 20) {
    this.players = players;
    this.creatures = [];
    this.predators = [];
    this.tileSize = tileSize;
    this.rounds = 0;
    this.maxRounds = maxRounds;
    if (this.players.length < 1 || this.players.length > 4) {
      throw new Error("The game can be played with 1 to 4 players only!");
    }
  }

  /**
   * Function that starts the game.
   */
  start() {
    this.grid = new Grid(this.players, this.tileSize);
    this.players.forEach((player) => {
      let creature = player.addCreature();
      this.creatures.push(creature);
      creature = player.addCreature();
      this.creatures.push(creature);
    });
    const nbOfPredators = this.players.length > 2 ? 2 : 1;
    for (let i = 0; i < nbOfPredators; i++) {
      const predator = new Predator(
        this.grid.predatorSpawn.x,
        this.grid.predatorSpawn.y,
        this.tileSize
      );
      this.predators.push(predator);
    }

    const gameId = setInterval(() => this.startRound(gameId), 500);
  }

  /**
   * Function that starts a new round.
   * @param {number} gameId - Game id used to stop the game (interval).
   */
  startRound(gameId) {
    if (this.rounds == this.maxRounds) {
      clearInterval(gameId);
      return;
    }
    this.rounds++;
    updateDetails(this.players);
    Logger.startRoundLog(this.rounds);
    // Grow dirt to grass
    this.grid.grow();
    // Do creatures' action
    this.players.forEach((player) => {
      Creature.resetReproduction();
      player.getCreatures().forEach((creature) => {
        const { x, y, perception } = creature;
        creature.decreaseNeeds();
        if (creature.isAlive) {
          const criticalNeed = creature.getCriticalNeed();
          const sendAllTiles =
            criticalNeed == "SLEEP" || criticalNeed == "MATING";
          const tilesToSend = sendAllTiles
            ? this.grid.tiles
            : this.grid.getTilesInArea(x, y, perception);
          const creatures = this.grid.getCreaturesInArea(
            this.creatures,
            x,
            y,
            perception
          );
          const isActionDone = creature.doAction(tilesToSend, creatures);
          if (isActionDone) {
            this.grid.degrow(x, y);
          }
        }

        player.getCreatures().forEach((creature) => {
          const creatureExists = this.creatures.indexOf(creature) !== -1;
          if (!creatureExists) {
            this.creatures.push(creature);
          }
        });
        this.creatures = this.creatures.filter((creature) => creature.isAlive);
      });
    });

    this.predators.forEach((predator) => {
      const { x, y, perception } = predator;
      const tiles = this.grid.getTilesInArea(x, y, perception);
      const creatures = this.grid.getCreaturesInArea(
        this.creatures,
        x,
        y,
        perception
      );
      predator.doAction(tiles, creatures);
      this.creatures = this.creatures.filter((creature) => creature.isAlive);
    });
    Logger.endRoundLog();
  }
}

module.exports = GameEngine;

},{"../utils/logger.js":27,"../views/game.js":30,"./entities/creature.js":16,"./entities/predator.js":18,"./grid.js":20}],20:[function(require,module,exports){
const D3 = require("../utils/d3");
const { TILE_TYPES } = require("../utils/constants.js");
const { SAND, ROCK, WATER, DIRT, GRASS, FOREST, HOLE } = TILE_TYPES;
const Tile = require("./tile.js");
const _ = require("../utils/functions.js");
const findPath = require("../utils/shortestPathAlgo.js");

class Grid {
  /**
   * Represents a grid.
   * @constructor
   * @param {Player[]} players - Array of players.
   * @param {number} tileSize - Tile size.
   */
  constructor(players, tileSize) {
    this.players = players;
    this.size = players.length < 3 ? 500 : 700;
    this.tileSize = tileSize;
    this.tilesPerSide = Math.trunc(this.size / tileSize);
    this.nbOfTiles = Math.pow(this.tilesPerSide, 2);
    this.tiles = new Map();
    this.render();
    this.createTiles();
  }

  /**
   * Render the HTML element associated with the grid.
   */
  render() {
    D3.select("main").classed("removed", false);
    D3.select("#map")
      .append("svg")
      .attr("width", this.size)
      .attr("height", this.size)
      .attr("id", "grid");
  }

  /**
   * Remove the tiles associated with the grid.
   */
  remove() {
    this.tiles.forEach((tile) => tile.remove());
    this.tiles = new Map();
  }

  /**
   * Get area of tiles around a center position.
   * @param {number} posX - Position X of the location.
   * @param {number} posY - Position Y of the location.
   * @param {number} radius - Radius of the area.
   */
  getTilesInArea(posX, posY, radius) {
    const minX = Math.max(posX - radius, 0);
    const maxX = Math.min(posX + radius, this.tilesPerSide - 1);
    const minY = Math.max(posY - radius, 0);
    const maxY = Math.min(posY + radius, this.tilesPerSide - 1);
    const tiles = new Map();
    for (let x = minX; x <= maxX; x++) {
      for (let y = minY; y <= maxY; y++) {
        if (!this.tiles.has(`${x};${y}`)) {
          throw Error(`The tile ${x};${y} doesn't exist!`);
        }
        tiles.set(`${x};${y}`, this.tiles.get(`${x};${y}`));
      }
    }
    return tiles;
  }

  /**
   * Get area of creatures around a center position.
   * @param {number} posX - Position X of the location.
   * @param {number} posY - Position Y of the location.
   * @param {number} radius - Radius of the area.
   */
  getCreaturesInArea(creatures, posX, posY, radius) {
    const minX = Math.max(posX - radius, 0);
    const maxX = Math.min(posX + radius, this.tilesPerSide - 1);
    const minY = Math.max(posY - radius, 0);
    const maxY = Math.min(posY + radius, this.tilesPerSide - 1);
    let creaturesInArea = [];
    for (let x = minX; x <= maxX; x++) {
      for (let y = minY; y <= maxY; y++) {
        const creaturesAtPosition = creatures.filter(
          (creature) => creature.x === x && creature.y === y
        );
        creaturesInArea = creaturesInArea.concat(creaturesAtPosition);
      }
    }
    return creaturesInArea;
  }

  /**
   * Grow all tiles (growable tiles only).
   */
  grow() {
    this.tiles.forEach((tile) => tile.grow());
  }

  /**
   * Degrow a tile at specific position, if growable.
   * @param {number} x - Position X of the location.
   * @param {number} y - Position Y of the location.
   */
  degrow(x, y) {
    this.tiles.get(`${x};${y}`).degrow();
  }

  /**
   * Generate and render tiles on the grid.
   */
  createTiles() {
    let holes = [];
    do {
      this.remove();
      this.createDirtTiles();
      holes = this.createHoles();
      this.createTilesByType(WATER);
      this.createTilesByType(SAND);
      this.createTilesByType(GRASS);
      this.createTilesByType(FOREST);
      this.createTilesByType(ROCK);
      const neighbours = this.predatorSpawn.neighbours(this.tiles);
      let spawnType = GRASS;
      if (neighbours.find((neighbour) => neighbour.type == WATER)) {
        spawnType = SAND;
      }
      this.predatorSpawn.setType(spawnType);
    } while (!this.verifyTiles(holes));
  }

  /**
   * Verify that there is a path to every need.
   * @param {Tile[]} holes - Generated holes.
   * @returns {boolean} True if the map is verified, false otherwise.
   */
  verifyTiles(holes) {
    for (let hole of holes) {
      const pathToWater = findPath(hole, [SAND], this.tiles);
      if (pathToWater.length === 0) {
        return false;
      }
      const pathToFood = findPath(hole, [GRASS, FOREST, DIRT], this.tiles);
      if (pathToFood.length === 0) {
        return false;
      }
      const pathToPredator = findPath(hole, this.predatorSpawn.id, this.tiles);
      if (pathToPredator.length === 0) {
        return false;
      }
    }
    return true;
  }

  /**
   * Generate and render dirt tiles on the grid.
   */
  createDirtTiles() {
    for (let x = 0; x < this.tilesPerSide; x++) {
      for (let y = 0; y < this.tilesPerSide; y++) {
        this.tiles.set(`${x};${y}`, new Tile(x, y, this.tileSize, DIRT));
      }
    }
  }

  /**
   * Generate and render tiles by type on the grid.
   * @param {TILE_TYPES} type - Type of tile to generate.
   */
  createTilesByType(type) {
    const nbOfTilesToCreate = this.getNumberOfTiles(type);
    const tiles = Array.from(this.tiles.values());
    let cpt = 0;
    while (cpt < nbOfTilesToCreate) {
      const tile = _.random(tiles);
      if (tile.type == DIRT) {
        cpt++;
        tile.setType(type);
        if (type == WATER) {
          const remainingWaterSize = nbOfTilesToCreate - cpt;
          const waterTiles = this.getWaterShape(tile, remainingWaterSize);
          waterTiles
            .filter((tile) => tile.type != WATER && tile.type != HOLE)
            .forEach((tile) => tile.setType(type));
          cpt += waterTiles.length;
        }
      }
    }
    if (type == SAND) {
      tiles
        .filter((tile) => tile.type == WATER)
        .forEach((tile) => {
          tile
            .neighbours(this.tiles)
            .filter(
              (neighbour) => neighbour.type != WATER && neighbour.type != HOLE
            )
            .forEach((neighbour) => neighbour.setType(type));
        });
    }
  }

  /**
   * Get the number of tiles by type.
   * @param {TILE_TYPES} type - Type of tile to get.
   */
  getNumberOfTiles(type) {
    return Math.trunc(type.freq * this.nbOfTiles);
  }

  /**
   * Generate and render creature's holes on the grid.
   * @returns {Tile[]}
   */
  createHoles() {
    const holes = [];
    const quarter = Math.trunc(this.tilesPerSide / 4);
    const threeQuarter = Math.trunc((3 * this.tilesPerSide) / 4);
    const middle = Math.trunc(this.tilesPerSide / 2);
    this.predatorSpawn = this.tiles.get(`${middle};${middle}`);
    this.predatorSpawn.setType(HOLE, "");
    switch (this.players.length) {
      case 1:
        {
          const tile = this.tiles.get(`${quarter};${quarter}`);
          holes.push(tile);
          this.players[0].setHole(tile);
        }
        break;
      case 2:
        {
          const tile1 = this.tiles.get(`${quarter};${quarter}`);
          const tile2 = this.tiles.get(`${threeQuarter};${threeQuarter}`);
          holes.push(tile1);
          holes.push(tile2);
          this.players[0].setHole(tile1);
          this.players[1].setHole(tile2);
        }
        break;
      case 3:
        {
          const tile1 = this.tiles.get(`${quarter};${quarter}`);
          const tile2 = this.tiles.get(`${threeQuarter};${quarter}`);
          const tile3 = this.tiles.get(`${quarter};${threeQuarter}`);
          holes.push(tile1);
          holes.push(tile2);
          holes.push(tile3);
          this.players[0].setHole(tile1);
          this.players[1].setHole(tile2);
          this.players[2].setHole(tile3);
        }
        break;
      case 4:
        {
          const tile1 = this.tiles.get(`${quarter};${quarter}`);
          const tile2 = this.tiles.get(`${threeQuarter};${quarter}`);
          const tile3 = this.tiles.get(`${quarter};${threeQuarter}`);
          const tile4 = this.tiles.get(`${threeQuarter};${threeQuarter}`);
          holes.push(tile1);
          holes.push(tile2);
          holes.push(tile3);
          holes.push(tile4);
          this.players[0].setHole(tile1);
          this.players[1].setHole(tile2);
          this.players[2].setHole(tile3);
          this.players[3].setHole(tile4);
        }
        break;
      default:
        throw Error("You need to have 1 to 4 players!");
    }
    return holes;
  }

  /**
   * Get a random water shape.
   * @param {Tile} tile - Base tile to generate water shape from.
   * @param {number} remainingWaterSize - Water generation limit.
   */
  getWaterShape(tile, remainingWaterSize) {
    const shapes = [
      [`${tile.x - 1};${tile.y}`, `${tile.x + 1};${tile.y}`], // Shape 1
      [`${tile.x};${tile.y - 1}`, `${tile.x};${tile.y + 1}`], // Shape 2
      [`${tile.x + 1};${tile.y}`, `${tile.x};${tile.y + 1}`], // Shape 3
      [`${tile.x - 1};${tile.y}`, `${tile.x};${tile.y + 1}`], // Shape 4
      [`${tile.x};${tile.y - 1}`, `${tile.x + 1};${tile.y}`], // Shape 5
      [`${tile.x - 1};${tile.y}`, `${tile.x};${tile.y - 1}`], // Shape 6
      [
        `${tile.x - 1};${tile.y}`,
        `${tile.x - 1};${tile.y + 1}`,
        `${tile.x};${tile.y + 1}`,
      ], // Shape 7
    ];
    const randomShape = _.random(shapes);
    const tiles = randomShape.map((id) => this.tiles.get(id));
    tiles.length = Math.min(remainingWaterSize, tiles.length);

    return tiles.filter((tile) => tile != null);
  }
}

module.exports = Grid;

},{"../utils/constants.js":24,"../utils/d3":25,"../utils/functions.js":26,"../utils/shortestPathAlgo.js":28,"./tile.js":22}],21:[function(require,module,exports){
const { v4: uuidv4 } = require("uuid");
const { TILE_TYPES } = require("../utils/constants.js");
const Creature = require("./entities/creature.js");

class Player {
  /**
   * Represents a player.
   * @constructor
   * @param {string} img - URL to the player's species image.
   * @param {Object} attributes - Attribute levels selected by the player.
   */
  constructor(attributes) {
    const { img, reproduction, strength, mobility, perception } = attributes;
    this.id = uuidv4();
    this.img = img;
    this.creatures = [];
    this.reproducibility = reproduction;
    this.strength = strength;
    this.moveSpeed = mobility + 2;
    this.perception = perception < 3 ? perception * 2 : perception + 2;
  }

  /**
   * Assign a hole to the player.
   * @param {Tile} tile - The tile to set as player's hole.
   */
  setHole(tile) {
    this.hole = tile;
    tile.setType(TILE_TYPES.HOLE, this.img);
  }

  /**
   * Add a new creature to player's creatures.
   */
  addCreature() {
    const { x, y } = this.hole;
    const creature = new Creature(x, y, this);
    this.creatures.push(creature);
    return creature;
  }

  /**
   * Get player's alive creatures.
   * @returns {Creature[]}
   */
  getCreatures() {
    return this.creatures.filter((creature) => creature.isAlive);
  }
}

module.exports = Player;

},{"../utils/constants.js":24,"./entities/creature.js":16,"uuid":1}],22:[function(require,module,exports){
const { TILE_TYPES } = require("../utils/constants.js");
const { DIRT, WATER, GRASS, ROCK } = TILE_TYPES;
const D3 = require("../utils/d3");
const _ = require("../utils/functions.js");

class Tile {
  /**
   * Represents a tile.
   * @constructor
   * @param {number} x - Position X of the tile.
   * @param {number} y - Position Y of the tile.
   * @param {number} size - Size of the tile.
   * @param {TILE_TYPES} type - Type of the tile.
   */
  constructor(x, y, size, type) {
    this.id = `${x};${y}`;
    this.x = x;
    this.y = y;
    this.size = size;
    this.type = type;
    this.render(size);
  }

  /**
   * Render the HTML element associated with the tile.
   */
  render() {
    this.htmlElement = D3.select("#grid")
      .append("svg:image")
      .attr("id", this.id)
      .attr("width", this.size)
      .attr("height", this.size)
      .attr("x", this.x * this.size)
      .attr("y", this.y * this.size)
      .attr("xlink:href", _.random(this.type.images));
  }

  /**
   * Remove the HTML element associated with the tile.
   */
  remove() {
    this.htmlElement.remove();
  }

  /**
   * Make the tile grow (if dirt).
   */
  grow() {
    if (this.type == DIRT && Math.random() <= 0.05) {
      this.setType(GRASS);
    }
  }

  /**
   * Make the tile degrow (if grass).
   */
  degrow() {
    if (this.type == GRASS) {
      this.setType(DIRT);
    }
  }

  /**
   * Check if the tile in an obstacle (rock or water).
   * @returns {boolean} True if the is an obstacle, false otherwise.
   */
  isObstacle() {
    return this.type == ROCK || this.type == WATER;
  }

  /**
   * Get tile neighbours tiles
   * @param {Tile[]} tiles - Grid tiles.
   * @returns {Tile[]} The neighbours of the tile.
   */
  neighbours(tiles) {
    const neighbours = [
      tiles.get(`${this.x - 1};${this.y}`),
      tiles.get(`${this.x + 1};${this.y}`),
      tiles.get(`${this.x};${this.y - 1}`),
      tiles.get(`${this.x};${this.y + 1}`),
    ];
    return neighbours.filter((tile) => tile != null);
  }

  /**
   * Change tile's type
   * @param {TILE_TYPES} type - Type of the tile to set.
   * @param {string} [img] - Image url for hole type only (optional).
   */
  setType(type, img) {
    this.type = type;
    img = img ? img.replace("CREATURE", "HOLE") : _.random(this.type.images);
    this.htmlElement.attr("xlink:href", img);
  }
}

module.exports = Tile;

},{"../utils/constants.js":24,"../utils/d3":25,"../utils/functions.js":26}],23:[function(require,module,exports){
const GameEngine = require("./components/gameEngine.js");
const Player = require("./components/player.js");
const fetchFormData = require("./views/form.js");
const { renderDetails } = require("./views/game.js");

function startGame(data) {
  const maxRounds = data.maxRounds;
  const players = data.players.map((playerData) => new Player(playerData));
  const gameEngine = new GameEngine(players, maxRounds);
  gameEngine.start();
  renderDetails(players);
}

fetchFormData().then((data) => {
  startGame(data);
});

},{"./components/gameEngine.js":19,"./components/player.js":21,"./views/form.js":29,"./views/game.js":30}],24:[function(require,module,exports){
const SETTINGS = Object.freeze({
  MAX_PLAYERS: 4,
  MAX_POINTS: 15,
  MAX_NEED: 5,
});

const PREDATOR_SETTINGS = Object.freeze({
  PERCEPTION: 1,
  MOVE_SPEED: 1,
  STRENGTH: 9,
  IMG: "./images/PREDATOR.png",
});

const NEEDS = Object.freeze({
  HUNGER: {
    default: 100,
    decreaseAmount: 3,
    critical: 40,
    priority: 50,
  },
  THIRST: {
    default: 100,
    decreaseAmount: 5,
    critical: 50,
    priority: 100,
  },
  SLEEP: {
    default: 100,
    decreaseAmount: 4,
    critical: 20,
    priority: 20,
  },
  MATING: {
    default: 15,
    decreaseAmount: 1,
    critical: 1,
    priority: 10,
  },
});

const TILE_TYPES = Object.freeze({
  DIRT: {
    freq: 0.28,
    images: ["./images/DIRT01.png"],
  },
  GRASS: {
    freq: 0.35,
    HUNGER: 30,
    images: ["./images/GRASS01.png", "./images/GRASS02.png"],
  },
  FOREST: {
    freq: 0.22,
    HUNGER: 12,
    images: ["./images/FOREST01.png"],
  },
  ROCK: {
    freq: 0.08,
    images: ["./images/ROCK01.png"],
  },
  WATER: {
    freq: 0.03,
    images: ["./images/WATER01.png"],
  },
  SAND: {
    THIRST: 50,
    images: ["./images/SAND01.png"],
  },
  HOLE: {
    SLEEP: 100,
    MATING: NEEDS.MATING.default,
    images: [],
  },
});

module.exports = {
  PREDATOR_SETTINGS,
  TILE_TYPES,
  NEEDS,
  SETTINGS,
};

},{}],25:[function(require,module,exports){
// eslint-disable-next-line no-undef
module.exports = d3;

},{}],26:[function(require,module,exports){
/**
 * Get a random item from an array.
 * @param {Object[]} array
 * @returns {Object}
 */
function random(array) {
  return array[Math.floor(Math.random() * array.length)];
}

/**
 * Get the last item from an array.
 * @param {Object[]} array
 * @returns {Object}
 */
function last(array) {
  return array[array.length - 1];
}

module.exports = {
  random,
  last,
};

},{}],27:[function(require,module,exports){
class Logger {
  info(message, color) {
    const options = color ? `background: #202124; color: ${color}` : undefined;
    console.info(`%c${message}`, options);
  }

  warn(message) {
    console.warn(`[WARN] ${message}`);
  }

  error(message) {
    console.error(`[ERROR] ${message}`);
  }

  startRoundLog(roundNumber) {
    console.group(
      `%cTour de jeu n° ${roundNumber}.`,
      `background: #202124; color: #0eebd1`
    );
  }

  endRoundLog() {
    console.groupEnd();
  }
}

module.exports = new Logger();

},{}],28:[function(require,module,exports){
/**
 * Find a path from an entity to a specific goal.
 * @param {(Creature | Predator)} entity - Entity where the path goes from.
 * @param {(string | TILE_TYPES[])} goal - Goal to find (tile id/types or "creature").
 * @param {Map<string, Tile>} tiles - Tiles to find from.
 * @param {Creature[]} [creatures] - Creatures to find from (optional).
 * @returns {string[]} Array of tile ids.
 */
function findPath(entity, goal, tiles, creatures) {
  const tilesExplored = new Map();
  const tilesToExplore = new Map().set(`${entity.x};${entity.y}`, null);
  const isTarget =
    typeof goal === "string"
      ? goal == "creature"
        ? (tileId) =>
            creatures.some(
              (creature) =>
                creature.x == tiles.get(tileId).x &&
                creature.y == tiles.get(tileId).y
            )
        : (tileId) => tileId == goal
      : (tileId) => goal.includes(tiles.get(tileId).type);

  return shortestPath(tilesExplored, tilesToExplore, isTarget, tiles);
}

/**
 * Shortest path algorithm.
 * @param {Map<string, Tile>} tilesExplored - Tiles explored during search.
 * @param {Map<string, Tile>} tilesToExplore - Tiles to explore during search.
 * @param {Function} isTarget - Function that returns true if target is found.
 * @param {Map<string, Tile>} tiles - Tiles to find from.
 * @returns {string[]} Array of tile ids.
 */
function shortestPath(tilesExplored, tilesToExplore, isTarget, tiles) {
  while (tilesToExplore.size > 0) {
    const tileId = Array.from(tilesToExplore.keys(tilesToExplore))[0];
    tilesExplored.set(tileId, tilesToExplore.get(tileId));
    tilesToExplore.delete(tileId);

    if (isTarget(tileId)) {
      const path = [];
      let key = tileId;
      while (key != null) {
        path.unshift(key);
        key = tilesExplored.get(key);
      }
      return path;
    }

    const neighbours = tiles.get(tileId).neighbours(tiles);
    for (let i = 0; i < neighbours.length; i++) {
      if (
        tilesExplored.has(neighbours[i].id) ||
        tilesToExplore.has(neighbours[i].id) ||
        neighbours[i].isObstacle()
      ) {
        continue;
      } else {
        tilesToExplore.set(neighbours[i].id, tileId);
      }
    }
  }

  return [];
}

module.exports = findPath;

},{}],29:[function(require,module,exports){
const D3 = require("../utils/d3");
const { SETTINGS } = require("../utils/constants.js");
const { MAX_PLAYERS, MAX_POINTS, MAX_NEED } = SETTINGS;
const containerTemplate = require("./templates/container.js");

// Form data
let playersNumber = { id: 0, total: 1, min: 1, max: 4 };
let roundsNumber = { id: 1, total: 50, min: 50, max: Infinity };
const players = [];

for (let i = 0; i < MAX_PLAYERS; i++) {
  players.push({
    img: "",
    mobility: 1,
    reproduction: 1,
    perception: 1,
    strength: 1,
  });
}

// Create player sections in the form
for (let playerId = 0; playerId < MAX_PLAYERS; playerId++) {
  const container = D3.select(`#container_${playerId}`);
  container.html(containerTemplate(playerId));
  updateRemainingPoints(playerId);
}

// Update inputs values
updateInputs();

// Add event listeners to form elements
D3.select("#minus_0").on("click", () => editInput(playersNumber, -1));
D3.select("#plus_0").on("click", () => editInput(playersNumber, 1));
D3.select("#minus_1").on("click", () => editInput(roundsNumber, -10));
D3.select("#plus_1").on("click", () => editInput(roundsNumber, 10));
D3.selectAll(".slider").on("input", (event) => changeNeedPoints(event));
D3.selectAll("select")
  .datum("")
  .on("change", (event) => updateSelects(event));

// FUNCTIONS

function updateRemainingPoints(playerId) {
  const pointsHtmlElem = D3.select(`#points_${playerId}`);
  const { mobility, reproduction, perception, strength } = players[playerId];
  const totalPoints = mobility + reproduction + perception + strength;
  const remainingPoints = MAX_POINTS - totalPoints;
  pointsHtmlElem.html(remainingPoints);
}

function changeNeedPoints(event) {
  let [need, playerId] = event.target.id.split("_");
  playerId = parseInt(playerId);
  const value = parseInt(event.target.value);
  const player = players[playerId];
  player[need] = value;
  const sliderPoints = D3.select(`#${need}-points_${playerId}`);
  sliderPoints.html(value);
  updateRemainingPoints(playerId);
  updateSliders();
}

function updateSliders() {
  const needs = ["mobility", "reproduction", "perception", "strength"];
  for (let playerId = 0; playerId < MAX_PLAYERS; playerId++) {
    const remainingPoints = parseInt(D3.select(`#points_${playerId}`).html());
    for (let need of needs) {
      const slider = D3.select(`#${need}_${playerId}`);
      const sliderValue = parseInt(slider.property("value"));
      const sliderMax = Math.min(MAX_NEED, remainingPoints + sliderValue);
      slider.property("max", sliderMax);
    }
  }
}

function editInput(input, amount) {
  let { total, min, max } = input;
  const value = total + amount;
  input.total = amount > 0 ? Math.min(value, max) : Math.max(value, min);
  updateInputs();
}

function updateInputs() {
  D3.select("#input_0").html(playersNumber.total);
  D3.select("#input_1").html(roundsNumber.total);
  updateContainers();
}

function updateContainers() {
  const { total } = playersNumber;
  for (let playerId = 0; playerId < MAX_PLAYERS; playerId++) {
    const container = D3.select(`#container_${playerId}`);
    const select = D3.select(`#species_${playerId}`);
    const setHidden = playerId >= total;
    const isRequired = setHidden ? undefined : true;
    container.classed("removed", setHidden);
    select.attr("required", isRequired);
  }
}

function updateSelects(event) {
  let [, playerId] = event.target.id.split("_");
  const select = D3.select(`#${event.target.id}`);
  const oldValue = select.datum();
  const selectValue = select.property("value");
  players[playerId].img = selectValue;
  for (let i = 0; i < MAX_PLAYERS; i++) {
    const options = D3.select(`#species_${i}`).selectChildren("option");
    options.each(function () {
      const option = D3.select(this);
      if (option.property("value") == oldValue) {
        option.attr("hidden", undefined);
      }
      if (
        option.property("value") == selectValue &&
        option.property("value") != ""
      ) {
        option.attr("hidden", true);
      }
    });
  }
  select.datum(selectValue);
}

/**
 * Fetch form data.
 * @returns {Promise} Promise that returns data fetch from form
 */
function fetchFormData() {
  const form = D3.select("#form");
  const promise = new Promise((resolve) => {
    form.on("submit", (event) => {
      event.preventDefault();
      form.classed("removed", true);
      D3.select("h1").classed("removed", true);
      players.length = playersNumber.total;
      const formData = {
        players,
        maxRounds: roundsNumber.total,
      };
      resolve(formData);
    });
  });
  return promise;
}

module.exports = fetchFormData;

},{"../utils/constants.js":24,"../utils/d3":25,"./templates/container.js":31}],30:[function(require,module,exports){
const D3 = require("../utils/d3");
const detailsTemplate = require("./templates/details.js");

// Create player details in the main section
function renderDetails(players) {
  for (let playerId = 0; playerId < players.length; playerId++) {
    const container = D3.select(`#details_${playerId}`);
    container.html(detailsTemplate(players[playerId], playerId));
  }
  updateDetails(players);
}

function updateDetails(players) {
  for (let playerId = 0; playerId < players.length; playerId++) {
    const player = players[playerId];
    const creaturesSize = player.creatures.length;
    const alivesSize = player.getCreatures().length;
    const creaturesHtmlElem = D3.select(`#creatures_${playerId}`);
    const alivesHtmlElem = D3.select(`#alives_${playerId}`);
    creaturesHtmlElem.html(creaturesSize);
    alivesHtmlElem.html(alivesSize);
  }
}

module.exports = {
  renderDetails,
  updateDetails,
};

},{"../utils/d3":25,"./templates/details.js":32}],31:[function(require,module,exports){
const slider = require("./slider.js");
module.exports = (id) =>
  `<div>
    <h2 class="center">Joueur ${id + 1}</h2>
    <p>
      Points restants :
      <span id="points_${id}">?</span>
    </p>
  </div>
  <select id="species_${id}" name="species_${id}" required>
    <option selected value="">Choisissez votre espèce</option>
    <option value="./images/CREATURE_0.png">🐰 Lapin</option>
    <option value="./images/CREATURE_1.png">🐹 Hamster</option>
    <option value="./images/CREATURE_2.png">🐭 Rat</option>
    <option value="./images/CREATURE_3.png">🦝 Raton</option>
  </select>
  ${slider("mobility", id, "Mobilité")}
  ${slider("reproduction", id, "Reproduction")}
  ${slider("perception", id, "Perception")}
  ${slider("strength", id, "Force")}`;

},{"./slider.js":33}],32:[function(require,module,exports){
module.exports = (player, id) => {
  const { img, reproducibility, moveSpeed, perception, strength } = player;
  return `<details>
        <summary>
            INFORMATIONS DU JOUEUR ${id + 1}
        <img
            alt="Creature icon"
            src="${img}"
        />
        </summary>
        <ul>
            <li>
                <span id="creatures_${id}">?</span> créatures créées.
            </li>
            <li>
                <span id="alives_${id}">?</span> créature(s) en vie.
            </li>
        </ul>
        <p>🐌 Mobilité : ${moveSpeed} cases</p>
        <p>💕 Reproduction : ${reproducibility}</p>
        <p>👁️ Perception : ${perception} cases</p>
        <p>💪 Force : ${strength}</p>
    </details>`;
};

},{}],33:[function(require,module,exports){
module.exports = (need, id, text) =>
  `<div class="slider-container">
  <label for="${need}_${id}" class="thin-text">
        ${text} :
        <span id="${need}-points_${id}">1</span>
    </label>
    <input
        class="slider"
        type="range"
        id="${need}_${id}"
        name="${need}_${id}"
        step="1"
        min="1"
        max="5"
        value="1"
    />
    </div>`;

},{}]},{},[23]);
