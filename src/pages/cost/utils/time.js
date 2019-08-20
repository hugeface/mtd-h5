const timer = {
  getFirstDayOfMonth: function () {
    new Date().setDate(1)
  },
  getLastDayOfLastMonth: function () {
    const nowdays = new Date()
    const year = nowdays.getFullYear()
    const lastMonth = nowdays.getMonth() - 1
    return new Date(year, lastMonth, 1)
  },
  getFirstDayOfLastMonth: function () {
    const nowdays = new Date()
    const year = nowdays.getFullYear()
    const month = nowdays.getMonth()
    return new Date(year, month, 0)
  }
}

export default timer
