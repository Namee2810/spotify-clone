function convertTime(time) {
  const minute = ~~(time / 60), second = ~~(time % 60);
  return `${minute}:${("0" + second).slice(-2)}`
}
export default convertTime