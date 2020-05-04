import Keyv from "keyv";
import KeyvFile from "keyv-file";

export default new Keyv({
    store: new KeyvFile({
        filename: process.env.DATABASE || "keyv.json",
    }),
});
