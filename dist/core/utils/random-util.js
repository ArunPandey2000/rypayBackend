"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.random = random;
exports.customRandom = customRandom;
exports.customAlphabet = customAlphabet;
const node_crypto_1 = require("node:crypto");
const POOL_SIZE_MULTIPLIER = 128;
let pool, poolOffset;
function fillPool(bytes) {
    if (!pool || pool.length < bytes) {
        pool = Buffer.allocUnsafe(bytes * POOL_SIZE_MULTIPLIER);
        node_crypto_1.webcrypto.getRandomValues(pool);
        poolOffset = 0;
    }
    else if (poolOffset + bytes > pool.length) {
        node_crypto_1.webcrypto.getRandomValues(pool);
        poolOffset = 0;
    }
    poolOffset += bytes;
}
function random(bytes) {
    fillPool((bytes |= 0));
    return pool.subarray(poolOffset - bytes, poolOffset);
}
function customRandom(alphabet, defaultSize, getRandom) {
    let mask = (2 << (31 - Math.clz32((alphabet.length - 1) | 1))) - 1;
    let step = Math.ceil((1.6 * mask * defaultSize) / alphabet.length);
    return (size = defaultSize) => {
        let id = '';
        while (true) {
            let bytes = getRandom(step);
            let i = step;
            while (i--) {
                id += alphabet[bytes[i] & mask] || '';
                if (id.length >= size)
                    return id;
            }
        }
    };
}
function customAlphabet(alphabet, size = 21) {
    return customRandom(alphabet, size, random);
}
//# sourceMappingURL=random-util.js.map