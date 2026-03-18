import { useState, useRef, useEffect } from 'react'

export default function SliderTabs({ tabs = [], onChange }) {
  const [active, setActive] = useState(0)
  const [sliderStyle, setSliderStyle] = useState({})
  const btnRefs = useRef([])

  useEffect(() => {
    const el = btnRefs.current[active]
    if (!el) return
    setSliderStyle({ width: el.offsetWidth, left: el.offsetLeft })
  }, [active])

  const handleClick = (index) => {
    setActive(index)
    onChange?.(tabs[index], index)
  }

  return (
    <div className="slider f-row">
      <div className="slider-active tra" style={sliderStyle} />
      {tabs.map((tab, index) => (
        <button
          key={tab}
          ref={el => btnRefs.current[index] = el}
          className={`f-row text-xsmall weight-medium ${active === index ? 'active' : ''}`}
          onClick={() => handleClick(index)}
        >
          {tab}
        </button>
      ))}
    </div>
  )
}