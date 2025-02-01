import { customAlphabet } from "./random-util"

describe('random util', () => {
    it('should genrate random ref', () => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const ref = customAlphabet(characters, 12)();
        console.log(ref);
    })
})