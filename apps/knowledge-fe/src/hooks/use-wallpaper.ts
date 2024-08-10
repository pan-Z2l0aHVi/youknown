import { useEffect, useState } from 'react'

// Try wallpaper accessibility
export function useWallpaperAccessible() {
  const [accessible, set_accessible] = useState(false)
  useEffect(() => {
    const wallpaper_img = new Image()
    wallpaper_img.src = 'https://th.wallhaven.cc/orig/2y/2ylrr9.jpg'
    wallpaper_img.onload = () => {
      set_accessible(true)
    }
  }, [])
  return accessible
}
