module.exports = {
    gimmeString() {
        return "hai!"
    },
    getToday() {
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
    },
    tomorrow(date) {
        const ret = new Date(date);
        ret.setDate(ret.getDate() + 1);
        return ret;
    },
    yesterday(date) {
        const ret = new Date(date);
        ret.setDate(ret.getDate() - 1);
        return ret;
    },
    getMonday(date) {
        const ret = new Date(date);
        const day = ret.getDay();
        const diff = ret.getDate() - day + (day == 0 ? -6 : 1);
        ret.setDate(diff);
        return ret;
    }

}