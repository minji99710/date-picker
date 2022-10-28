const get = (target) => {
  return document.querySelector(target)
}

export default function Calendar () {
  const $selectedMonth = get('.selected-month')
  const $selectedYear = get('.selected-year')
  // const $dates = get('.dates')

  // const $currentDate = get('.currentDate')

  const $days = get('.days')
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]

  const date = new Date()

  const renderCalendar = () => {
    date.setDate(1) // 찾아보기
    //   const day = date.getDate()
    const month = date.getMonth()
    const year = date.getFullYear()
    const lastDay = new Date(year, month + 1, 0).getDate()
    const prevLastDay = new Date(year, month, 0).getDate()
    const firstdayIndex = date.getDay()
    const lastDayIndex = new Date(year, month + 1, 0).getDay() // 현재 달 마지막 요일
    const nextDays = 7 - lastDayIndex - 1

    // 위에 현재 날짜 표시
    $selectedMonth.innerHTML = months[month]
    $selectedYear.innerHTML = year

    const dayNames = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

    // 달력에 요일 표시
    const createDayNames = () => {
      const $dayNamesFragment = document.createDocumentFragment()
      dayNames.forEach((day, idx) => {
        const $daystr = document.createElement('div')
        $daystr.classList.add('day', 'daystr')
        $daystr.textContent = dayNames[idx]
        $dayNamesFragment.appendChild($daystr)
      })
      $days.appendChild($dayNamesFragment)
    }

    // 달력에 날짜 숫자 표시
    const showDates = () => {
      $days.innerHTML = ''
      createDayNames()
      let days = ''
      // 이전 달 날짜 표시
      for (let i = firstdayIndex; i > 0; i--) {
        days += `<div class='day prev-date'>${prevLastDay - i + 1}</div>`
      }

      for (let j = 1; j <= lastDay; j++) {
        // 오늘 날짜인 경우
        if (
          j === new Date().getDate() &&
                      date.getMonth() === new Date().getMonth()
        ) {
          if (new Date(year, month, j).getDay() === 0) {
            days += `<div class="day today sunday">${j}</div>`
          } else {
            days += `<div class="day today">${j}</div>`
          }
        } else if (new Date(year, month, j).getDay() === 0) {
          // 일요일인 경우
          days += `<div class="day sunday">${j}</div>`
        } else {
          days += `<div class="day">${j}</div>`
        }
      }
      // 다음 달 날짜 표시
      for (let k = 1; k <= nextDays; k++) {
        days += `<div class="day next-date">${k}</div>`
      }

      $days.innerHTML += days
    }
    showDates()
  }

  return { date, renderCalendar }
}
