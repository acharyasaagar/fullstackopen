export const capitalize = str => {
  const first = str.split('')[0].toUpperCase()
  const last = str.slice(1).toLowerCase()
  return first + last
}
