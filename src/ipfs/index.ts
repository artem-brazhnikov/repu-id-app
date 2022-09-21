import * as IPFS from 'ipfs-core';

let ipfs: any = undefined;

export async function readIpfsFile(path: string) {
    console.log('%cpath: ' + path, 'color: green');
    if (!ipfs) {
        ipfs = await IPFS.create();
    }
    const stream = ipfs.cat(path);
    const decoder = new TextDecoder();

    let data = '';
    for await (const chunk of stream) {
        data += decoder.decode(chunk, { stream: true })
    }

    console.log('%c' + data, 'color: yellow');
    return data;
}