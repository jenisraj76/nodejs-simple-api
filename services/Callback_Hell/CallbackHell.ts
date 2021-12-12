const function1 = async (req: string, callback: Function) => {
    let result = req + 'added and First Program Executed';
    callback(result);
}

const function2 = async (text1: string, callback: Function) => {
    let result = text1 + ' after Second Program Executed'
    callback(result);
}

const function3 = async (text2: string, callback: Function) => {
    let result = text2 + ' after Third Program Executed';
    callback(result);
}

const callbackHell = async (req: string) => {
    return new Promise<string>((resolve, reject) => {
        function1(req,function(text1:string)
        {
            function2(text1, function(text2:string)
            {
                function3(text2, function(text3:string)
                {
                    resolve(text3);
                })
            })
        })
    })  
}

export const main = async (req: string) => {

    return await callbackHell(req);
}