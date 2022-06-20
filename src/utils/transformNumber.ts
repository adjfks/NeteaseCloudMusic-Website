const transformNumber = (num: number) => {
  if (num < 10000) return num
  if(num < 100000000) return `${Math.floor(num / 10000)}万`
  return `${Math.floor(num / 100000000)}亿`
}

export default transformNumber
