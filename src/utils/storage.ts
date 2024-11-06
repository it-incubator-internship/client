export class Storage {
  getItem(key: string) {
    return localStorage.getItem(key)
  }

  removeItem(key: string) {
    return localStorage.removeItem(key)
  }

  setItem(key: string, value: string) {
    return localStorage.setItem(key, value)
  }
}
