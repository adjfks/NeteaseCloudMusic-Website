// tab切换
const useToggleTab = (...tabs: string[]) => {
  const activeName = ref(tabs[0])
  const handleClick = (tab: string) => {
    activeName.value = tab
  }
  return { activeName, handleClick }
}
export default useToggleTab
