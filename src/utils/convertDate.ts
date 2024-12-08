import { LocaleType } from '@/locales/ru'

const convertDate = {
  timePassedFromDate(date: string, t: LocaleType) {
    const past = Date.parse(date)
    const now = Date.now()

    const diffMs = now - past

    // Convert milliseconds to days and hours
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
    const diffHours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60))

    if (diffDays >= 1) {
      return t.dateTexts.daysAgo(diffDays)
    } else if (diffHours >= 1) {
      return t.dateTexts.hoursAgo(diffHours)
    }

    return t.dateTexts.minAgo(diffMinutes)
  },
  toLocaleString(date: string) {
    return new Date(date).toLocaleDateString()
  },
}

export default convertDate
