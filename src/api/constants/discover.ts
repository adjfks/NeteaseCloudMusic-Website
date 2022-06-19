export interface DiscoverMenuItem {
  title: string,
  link?: string,
  component?: string,
}

export type DiscoverMenu = Array<DiscoverMenuItem>

export default <DiscoverMenu> [
  {
    title: '个性推荐',
    link: '/discover/recommend',
    component: 'Recommend'
  },
  {
    title: '专属定制',
    link: '/discover/custom',
    component: 'Custom'
  },
  {
    title: '歌单',
    link: '/discover/playlist',
    component: 'Playlist'
  },
  {
    title: '排行榜',
    link: '/discover/toplist',
    component: 'Toplist'
  },
  {
    title: '歌手',
    link: '/discover/artlist',
    component: 'Artlist'
  },
  {
    title: '最新音乐',
    link: '/discover/song',
    component: 'Song'
  },
]
