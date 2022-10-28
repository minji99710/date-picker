import Calendar from './components/calendar.js'
const get = (target) => {
  return document.querySelector(target)
}

const calendar = Calendar()
const date = calendar.date
const renderCalendar = calendar.renderCalendar

const $calendar = document.querySelector('.calendar')
const $nextMonthBtn = get('.next')
const $prevMonthBtn = get('.prev')
const $datePicker = get('.date-picker')
const $body = get('body')
const $days = get('.days')

// 다음 월 표시
const showNextMonth = (e) => {
  date.setMonth(date.getMonth() + 1)
  renderCalendar()
}

// 이전 월 표시
const showPrevMonth = (e) => {
  date.setMonth(date.getMonth() - 1)
  renderCalendar()
}

const logSelectedDay = (e) => {
  if (e.target.className !== 'day') return
  const $clickedDate = e.target
  const y = date.getFullYear()
  const m = (date.getMonth() + 1).toString().padStart(2, '0')
  const d = e.target.innerHTML.padStart(2, '0')
  const selectedDate = `${y}-${m}-${d}`
  console.log(selectedDate) // 로그 찍기
  $datePicker.value = selectedDate // 데이트 피커에 날짜 표시
  $calendar.classList.toggle('active')

  // 선택되어 있는 경우 삭제
  const $prevSelected = get('.days .day.selected')
  if ($prevSelected) {
    $prevSelected.classList.remove('selected')
  }
  // 현재 선택한 날짜 저장
  $clickedDate.classList.add('selected')
}

const toggleCalendar = (e) => {
  if (e.target.className !== 'date-picker') return
  $calendar.classList.toggle('active')
}

const closeCalendar = (e) => {
  if (!e.target.classList.contains('body')) return
  $calendar.classList.remove('active')
}

// 이벤트 리스너
$nextMonthBtn.addEventListener('click', showNextMonth)
$prevMonthBtn.addEventListener('click', showPrevMonth)
$days.addEventListener('click', logSelectedDay)

$datePicker.addEventListener('click', toggleCalendar)
$body.addEventListener('click', closeCalendar)
renderCalendar()
