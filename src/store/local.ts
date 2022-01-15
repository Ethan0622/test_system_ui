export const local = {
  set(key: string, value: string) {
    window.localStorage.setItem(key, value)
  },

  get(key: string) {
    if (window.localStorage.getItem(key)) {
      return window.localStorage.getItem(key)
    } else {
      return ''
    }
  },

  remove(key: string) {
    localStorage.removeItem(key)
  },
}
