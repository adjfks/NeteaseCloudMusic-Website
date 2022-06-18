/**
 * 将数组项分组
 * @param list 数组
 * @param groups  分组数量
 * @returns 
 */
const transformList = (list: any[], groups: number) => {
  const result = []
  const group = Math.ceil(list.length / groups)
  for (let i = 0; i < groups; i++) {
    result.push(list.slice(i * group, (i + 1) * group))
  }
  return result
}

export default transformList
