const everyDay = (work) => {
    work();
    const idInterval = setInterval(work, 86400000);
    return idInterval;
}

module.exports = {
    everyDay
}