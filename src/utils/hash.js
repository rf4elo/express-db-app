import * as bcrypt from "bcrypt";


export async function Hash(text) {

    const salt_rounds = 10;

    const hashText = await bcrypt.hash(text, salt_rounds);

    return hashText;

}


export async function CompareHash(text, hashText) {

    const HashIsCompare = await bcrypt.compare(text, hashText);

    return HashIsCompare;

}
