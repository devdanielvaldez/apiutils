const everyMinute = (work) => {
    work();
    const idInterval = setInterval(work, 60000);
    return idInterval;
}

module.exports = {
    everyMinute
}