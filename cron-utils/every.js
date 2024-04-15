const every = (interval) => {
    const milliseconds = interval * 1000;

    return {
        seconds: (work) => {
            setInterval(work, milliseconds);
        },
        minutes: (work) => {
            setInterval(work, milliseconds * 60);
        },
        hours: (work) => {
            setInterval(work, milliseconds * 3600);
        }
    };
}

module.exports = {
    every
}