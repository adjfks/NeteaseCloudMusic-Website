import { usePlayer } from '@/store/player'

const useDbPlay = () => {
  const player = usePlayer()

  const handleDblclick = async (val: { data: any; idx: number }) => {
    player.replacePlaylist(val.data, val.idx)
  }
  return { player, handleDblclick }
}

export default useDbPlay
