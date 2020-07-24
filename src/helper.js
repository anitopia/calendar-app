export const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
export const monthsText = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export const compareDates = (d1, d2, d3) => d1 >= d2.getTime() && d1 < d3.getTime();
export const isToday = (year, month, day) => compareDates(new Date(), new Date(year, month, day), new Date(year, month, day+1));

export const getTime = (time) => {
    const d = new Date(time);
    return (d.getUTCHours() + ':' + addZero(d.getMinutes()))
};
export const addZero = (i) => {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}