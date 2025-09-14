import { useTheme } from "./ui/theme-provider"

export default function Loader() {
  const { theme } = useTheme()

  return (
      <div className='flex flex-1 justify-center items-center'>
        <div className={`loader${theme !== 'dark' && '-light'}`}></div>
      </div>
    )
}