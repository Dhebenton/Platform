import { useState, useRef, useEffect } from 'react'

const TABS = ['Overview', 'Behavioural Flow', 'Visitors', 'Events', 'Sources']

export default function VisiblityTabs({ onTabChange }) {
  const [activeTab, setActiveTab] = useState(0)
  const [sliderStyle, setSliderStyle] = useState({})
  const [hoverStyle, setHoverStyle] = useState({})
  const [isHovering, setIsHovering] = useState(false)
  const tabRefs = useRef([])

  useEffect(() => {
    const activeEl = tabRefs.current[activeTab]
    if (!activeEl) return
    const paddingX = parseFloat(getComputedStyle(activeEl).paddingLeft)
    setSliderStyle({
      width: activeEl.offsetWidth - (paddingX * 2) + 4,
      left: activeEl.offsetLeft + paddingX - 2,
    })
  }, [activeTab])

  const handleClick = (index) => {
    setActiveTab(index)
    onTabChange?.(TABS[index])
  }

  const handleMouseEnter = (index) => {
    const el = tabRefs.current[index]
    if (!el) return
    setHoverStyle({ width: el.offsetWidth, left: el.offsetLeft })
    setIsHovering(true)
  }

  const handleMouseLeave = () => {
    setIsHovering(false)
  }

  return (
    <>
     <div
     className="slider-hover tra"
     style={{ ...hoverStyle, opacity: isHovering ? 1 : 0 }}
     />
      {TABS.map((tab, index) => (
        <button
          key={tab}
          ref={el => tabRefs.current[index] = el}
          className={`tab ${activeTab === index ? 'active' : ''}`}
          onClick={() => handleClick(index)}
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={handleMouseLeave}
        >
          {tab}
        </button>
      ))}
      <div className="slider tra" style={sliderStyle} />
    </>
  )
}