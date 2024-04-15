const everyWeekend = (work, { hour, minute }) => {
    const today = new Date();
    const desiredDay = new Date(today);

    const dayOfWeek = today.getDay();
    if (dayOfWeek === 6) {
        desiredDay.setDate(today.getDate() + 1);
    } else if (dayOfWeek === 0) {
        desiredDay.setDate(today.getDate() + 6);
    } else {
        const daysUntilSaturday = 6 - dayOfWeek;
        desiredDay.setDate(today.getDate() + daysUntilSaturday);
    }

    desiredDay.setHours(hour, minute, 0, 0);

    let timeRemaining = desiredDay.getTime() - today.getTime();
    if (timeRemaining < 0) {
        timeRemaining += 7 * 24 * 60 * 60 * 1000;
    }

    setTimeout(() => {
        work();
        setInterval(work, 7 * 24 * 60 * 60 * 1000);
    }, timeRemaining);
}

// executeTaskOnWeekend({ hour: 13, minute: 30 }, task);

module.exports = {
    everyWeekend
}
