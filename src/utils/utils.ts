const stopScroll = () => {
    document.body.classList.add("no-scroll");
}

const resumeScroll = () => {
    document.body.classList.remove("no-scroll");
}

export {
    stopScroll,
    resumeScroll
}