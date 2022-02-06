export const local = {
  set(key: string, value: string): void {
    window.localStorage.setItem(key, value)
  },

  get(key: string): string | null {
    if (window.localStorage.getItem(key)) {
      return window.localStorage.getItem(key)
    } else {
      return ''
    }
  },

  remove(key: string): void {
    localStorage.removeItem(key)
  },
}
