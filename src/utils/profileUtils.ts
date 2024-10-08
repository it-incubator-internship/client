// Функция для форматирования даты
export const formatDateOfBirth = (date: Date): string => {
  return new Date(date).toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}

// Функция для вычисления возраста
export const calculateAge = (birthDate: Date): number => {
  const today = new Date()
  let age = today.getFullYear() - birthDate.getFullYear()
  const monthDifference = today.getMonth() - birthDate.getMonth()

  if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
    age--
  }

  return age
}

export function range(start: number, end: number) {
  const ret: Array<number> = []

  for (let i = start; i < end; i++) {
    ret.push(i)
  }

  return ret
}

export function getYear(date: Date): number {
  return date.getFullYear()
}

export const years = range(1940, getYear(new Date()) + 1)
