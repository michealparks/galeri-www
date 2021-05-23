export const randInt = (bottom: number, top: number): number => {
  return bottom + Math.floor(Math.random() * (top - bottom))
}

export default {
  randInt
}