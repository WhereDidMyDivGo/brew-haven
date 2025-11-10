import { useEffect } from "react"

export function useOverlayScrollLock(open) {
  useEffect(() => {
    const root = document.documentElement
    const body = document.body

    const setFlag = () => {
      const hasScroll = root.scrollHeight > window.innerHeight
      root.classList.toggle("had-scroll", hasScroll && open)
    }

    if (open) {
      root.classList.add("overlay-open")
      body.classList.add("overlay-locked")
      setFlag()
    } else {
      root.classList.remove("overlay-open", "had-scroll")
      body.classList.remove("overlay-locked")
    }

    const ro = new ResizeObserver(setFlag)
    ro.observe(root)
    window.addEventListener("resize", setFlag)

    return () => {
      ro.disconnect()
      window.removeEventListener("resize", setFlag)
      root.classList.remove("overlay-open", "had-scroll")
      body.classList.remove("overlay-locked")
    }
  }, [open])
}
