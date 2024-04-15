const everyDayWeek = (work, dayOfWeek) => {
    const daysOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const dayIndex = daysOfWeek.indexOf(dayOfWeek.toLowerCase());
    
    if (dayIndex === -1) {
        console.error("Invalid day of the week");
        return;
    }

    const today = new Date();
    const desiredDay = new Date(today);
    const currentDayIndex = today.getDay();
    const daysUntilDesiredDay = (dayIndex + 7 - currentDayIndex) % 7;

    desiredDay.setDate(today.getDate() + daysUntilDesiredDay);
    desiredDay.setHours(0, 0, 0, 0);

    const idInterval = setTimeout(() => {
        work();
        setInterval(work, 7 * 24 * 60 * 60 * 1000);
    }, desiredDay.getTime() - today.getTime());

    return idInterval;
}

module.exports = {
    everyDayWeek
}