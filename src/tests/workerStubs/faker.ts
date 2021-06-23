export function createFakeWorkerInstance(module: any) {
    return () => Object.entries(module).reduce((accum, [fnName, fn]) => {
        return {
            ...accum,
            [fnName]: (args: any) => {
                return new Promise((resolve, _) => {
                    resolve((fn as any)(args));
                });
            },
        };
    }, {});
}
