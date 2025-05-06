const stopScroll = () => {
    document.body.classList.add("no-scroll");
}

const resumeScroll = () => {
    document.body.classList.remove("no-scroll");
}

const cacheImages = async (srcArray: string[]): Promise<string[] | void> => {
    const promises = await srcArray.map(src => {
        return new Promise(function(resolve, reject){
            const img = new Image();

            img.src = src;
            img.onload = () => resolve(undefined);
            img.onerror= () => reject();
        });
    });

    await Promise.all(promises);
}

export {
    stopScroll,
    resumeScroll,
    cacheImages
}