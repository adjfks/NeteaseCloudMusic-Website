export interface SideBarItem {
  title: string,
  link?: string,
  items?: Array<SideBarItem>
}

export type SideBar = Array<SideBarItem>

export default <SideBar> [
  {
    title: '发现音乐',
    link: '/discover'
  },
  {
    title: '播客',
    link: '/'
  },
  {
    title: '视频',
    link: '/'
  },
  {
    title: '关注',
    link: '/'
  },
  {
    title: '直播',
    link: '/'
  },
  {
    title: '私人FM',
    link: '/'
  },
  {
    title: '我的音乐',
    items: [
      {
        title: '本地与下载',
        link: '/'
      },
      {
        title: '最近播放',
        link: '/'
      },
      {
        title: '我的音乐云盘',
        link: '/'
      },
      {
        title: '我的播客',
        link: '/'
      },
      {
        title: '我的收藏',
        link: '/'
      },
    ]
  }
]
