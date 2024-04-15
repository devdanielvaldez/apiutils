const { everyMinute } = require('./everyMinute');
const { everyHour } = require('./everyHour');
const { everyDay } = require('./everyDay');
const { everyDayAt } = require('./everyDayAt');
const { everyDayWeek } = require('./everyDayWeek');
const { everyWeekend } = require('./everyWeekend');
const { every } = require('./every');

module.exports = {
    everyMinute,
    everyHour,
    everyDay,
    everyDayAt,
    everyDayWeek,
    everyWeekend,
    every
}