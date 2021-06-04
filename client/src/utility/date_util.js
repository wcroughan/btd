module.exports = {
    gimmeString() {
        return "hai!"
    },
    getToday() {
        const d = new Date();
        d.setHours(0, 0, 0, 0);
        return d;
    },
    getTomorrow() {
        return this.tomorrow(this.getToday())
    },
    // dayOfWeekShortAbbr(date) {
    //     const vals = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    //     return vals[date.getDay()];
    // },
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
        // console.log("gm:", ret, day, diff)
        return ret;
    },
    plusOneWeek(date) {
        // console.log("pow:", date)
        const ret = new Date(date);
        ret.setDate(ret.getDate() + 7);
        return ret;
    },
    apiDateStr(date) {
        return date.getFullYear() +
            ("0" + (date.getMonth() + 1)).slice(-2) +
            ("0" + date.getDate()).slice(-2)
    },
    getDateFromIdStr(str) {
        const yr = parseInt(str.substring(0, 4));
        const mo = parseInt(str.substring(4, 6)) - 1;
        const da = parseInt(str.substring(6, 8));
        const ret = new Date(yr, mo, da, 0, 0, 0, 0);
        // console.log("converted", str, "into", ret);
        return ret;
    },
    daysBetween(d1, d2) {
        const denom = 1000 * 60 * 60 * 24;
        return Math.round((d2.getTime() - d1.getTime()) / denom)
    },
    startOfDay(d) {
        const ret = new Date(d);
        ret.setHours(0, 0, 0, 0)
        return ret;
    }
}