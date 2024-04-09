const os = require('os');
const { performance } = require('perf_hooks');

let requestCount = 0;

function processMonitoring(req, res, next) {
    const startTime = performance.now();
    requestCount++;
    console.log(`[${new Date().toISOString()}] Process started: ${req.method} ${req.originalUrl}`);
    console.log(`[${new Date().toISOString()}] Total requests: ${requestCount}`);

    const intervalId = setInterval(() => {
        const cpuUsage = process.cpuUsage();
        const totalMemory = os.totalmem();
        const freeMemory = os.freemem();
        console.log(`[${new Date().toISOString()}] CPU usage: ${cpuUsage.user}μs user, ${cpuUsage.system}μs system`);
        console.log(`[${new Date().toISOString()}] Memory usage: ${(totalMemory - freeMemory) / 1024 / 1024} MB used, ${freeMemory / 1024 / 1024} MB free`);
    }, 5000);

    res.on('finish', () => {
        const elapsedTime = performance.now() - startTime;
        console.log(`[${new Date().toISOString()}] Process finished: ${req.method} ${req.originalUrl}`);
        console.log(`[${new Date().toISOString()}] Elapsed time: ${elapsedTime}ms`);
        console.log(`[${new Date().toISOString()}] Total requests: ${requestCount}`);
        clearInterval(intervalId);
    });

    next();
}

module.exports = processMonitoring;