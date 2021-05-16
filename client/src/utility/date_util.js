module.exports = {
    gimmeString: function () {
        return "hai!"
    },
    getToday: function () {
        const d = new Date();
        d.setHours(0, 0, 0, 0);
        return d;
    },
    dayOfWeekShortAbbr(date) {
        const vals = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
        return vals[date.getDay()];
    },
    formatDate(date, format, separator) {
        function ff(m) {
            let f = new Intl.DateTimeFormat('en', m);
            return f.format(date);
        }
        return format.map(ff).join(separator);
    }

}