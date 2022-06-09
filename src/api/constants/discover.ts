export interface DiscoverMenuItem {
  title: string,
  link?: string
}

export type DiscoverMenu = Array<DiscoverMenuItem>

export default <DiscoverMenu> [
  {
    title: '个性推荐',
    link: '/'
  },
  {
    title: '专属定制',
    link: '/'
  },
  {
    title: '歌单',
    link: '/'
  },
  {
    title: '排行榜',
    link: '/'
  },
  {
    title: '歌手',
    link: '/'
  },
  {
    title: '最新音乐',
    link: '/'
  },
]
