const function1 = async (req: string) => {
    return new Promise<string>((resolve, reject) => {
        resolve(req + ' added and First Program Executed');
    })
}

const function2 = async (text1: string) => {
    return new Promise<string>((resolve, reject) => {
        resolve(text1 + ' after Second Program Executed');
    })
}

const function3 = async (text2: string) => {
    return new Promise<string>((resolve, reject) => {
        resolve(text2 + ' after Third Program Executed');
    })
}

export const main = async (req: string) => {
    let text1 = await function1(req);
    // console.log(text1);
    let text2 = await function2(text1);
    // console.log(text2);
    let text3 = await function3(text2);
    // console.log(text3);
    return {
        first: text1,
        second: text2,
        third: text3
    };
}