const everyHour = (work) => {
    work();
    const idInterval = setInterval(work, 3600000);
    return idInterval
}

module.exports = {
    everyHour
}