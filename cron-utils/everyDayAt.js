const everyDayAt = (work, specificTime) => {
    const now = new Date();
    const desiredTime = new Date(now);

    desiredTime.setHours(specificTime.hours, specificTime.minutes, 0, 0);

    let remainingTime = desiredTime.getTime() - now.getTime();
    if (remainingTime < 0) {
        remainingTime += 24 * 60 * 60 * 1000;
    }

    const idInterval = setTimeout(() => {
        work();
        setInterval(work, 24 * 60 * 60 * 1000);
    }, remainingTime);

    return idInterval;
}

module.exports = {
    everyDayAt
}