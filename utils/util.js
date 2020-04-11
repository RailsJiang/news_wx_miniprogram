const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const getTime = dateStr=> {
  // 转化时间字符串
  let date = new Date(dateStr)
  let year = date.getFullYear()
  let month = date.getMonth() + 1
  let day = date.getDate()
  let hours = date.getHours()
  let minutes = date.getMinutes()

  let str_year = `${year}`
  let str_month = formatNumber(month)
  let str_day = formatNumber(day)
  let str_hours = formatNumber(hours)
  let str_minutes = formatNumber(minutes)

  let currentDate = new Date()
  let currentYear = currentDate.getFullYear()
  let currentMonth = currentDate.getMonth() + 1
  let currentDay = currentDate.getDate()

  if (year === currentYear) {
    if ((day === currentDay) && (month === currentMonth)){
      return str_hours + ":" + str_minutes
    }else {
      return str_month + "/" + str_day + " " + str_hours + ":" + str_minutes
    }
  }else {
    return str_year + "/" + str_month + "/" + str_day
  }
}

module.exports = {
  formatTime: formatTime,
  getTime: getTime
}
