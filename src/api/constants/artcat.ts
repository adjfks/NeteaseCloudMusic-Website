const initialList = Array(26).fill(0).map((_, idx) => {
  const str = String.fromCharCode(65 + idx);
  return {
    name: str,
    val: str
  }
})
export interface IArtCat {
  tag: string,
  param: string
  list: Array<any>
}
export default [
  {
    tag: '语种',
    param: 'area',
    list: [
      { name: '全部', val: -1 },
      { name: '华语', val: 7 },
      { name: '欧美', val: 96 },
      { name: '日本', val: 8 },
      { name: '韩国', val: 16 },
      { name: '其他', val: 0 },
    ]
  },
  {
    tag: '分类',
    param: 'type',
    list: [
      { name: '全部', val: -1 },
      { name: '男歌手', val: 1 },
      { name: '女歌手', val: 2 },
      { name: '乐队', val: 3 },
    ]
  },
  {
    tag: '筛选',
    param: 'initial',
    list: [
      { name: '热门', val: -1 },
      ...initialList,
      { name: '#', val: 0 }
    ]
  },

] as Array<IArtCat>;
