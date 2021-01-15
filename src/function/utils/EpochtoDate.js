export function epochToDate(epoch) {
    const newDate = new Date(epoch * 1000);
    const fullDate = {
        fullDate: newDate.toDateString(),
        hour: newDate.getHours() + ":00"
    }
    return fullDate
}