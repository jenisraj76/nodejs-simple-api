const function1 = async (req: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        resolve(req + 'added and First Program Executed');
    })
}

const function2 = async (text1: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        resolve(text1 + ' after Second Program Executed');
    })
}

const function3 = async (text2: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        resolve(text2 + ' after Third Program Executed');
    })
}

const callbackHell = async (req: string) => {
    return new Promise<string>((resolve, reject) => {
        function1(req).then(text1 => {
            // console.log(text1);
            function2(text1).then(text2 => {
                // console.log(text2);
                function3(text2).then(text3 => {
                    // console.log(text3);
                    // console.log('finished');
                    resolve(text3);
                })
            })
        });
    })

}

export const main = async (req: string) => {

    return await callbackHell(req);
}