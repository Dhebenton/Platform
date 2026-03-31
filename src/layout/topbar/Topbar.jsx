import { useState, useRef, useEffect, useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import './Topbar.css'
import MobinaTabs from './tabs/MobinaTabs'

const ROUTE_CONFIG = {
  '/visibility':      { label: 'Visibility' },
  '/analytics':       { label: 'Analytics' },
  '/mobina':          { label: 'Mobina', Tabs: MobinaTabs },
  '/performance':     { label: 'Performance' },
  '/overview':        { label: 'Overview' },
  '/split-testing':   { label: 'Split Testing' },
  '/smart-forms':     { label: 'Smart Forms' },
  '/content-assets':  { label: 'Content & Assets' },
  '/modules-hub':     { label: 'Modules Hub' },
  '/infrastructure':  { label: 'Infrastructure' },
  '/access-security': { label: 'Access & Security' },
  '/system-activity': { label: 'System Activity' },
}

export default function Topbar() {
  const { pathname } = useLocation()
  const [activeTab, setActiveTab]   = useState(0)
  const [sliderStyle, setSliderStyle] = useState({})
  const [hoverStyle, setHoverStyle]  = useState({})
  const [isHovering, setIsHovering]  = useState(false)
  const tabRefs = useRef([])

  const { label, Tabs, TabsInline, SubBar } = useMemo(
    () => ROUTE_CONFIG[pathname] ?? { label: 'Hypeify' },
    [pathname]
  )

  useEffect(() => {
    setActiveTab(0)
  }, [pathname])

  useEffect(() => {
    const activeEl = tabRefs.current[activeTab]
    if (!activeEl) return
    const paddingX = parseFloat(getComputedStyle(activeEl).paddingLeft)
    setSliderStyle({
      width: activeEl.offsetWidth - paddingX * 2 + 2,
      left:  activeEl.offsetLeft  + paddingX     - 1,
    })
  }, [activeTab])

  useEffect(() => {
    document.title = `Hypeify | ${label}`
  }, [label])

  const handleClick = (index) => setActiveTab(index)

  const handleMouseEnter = (index) => {
    const el = tabRefs.current[index]
    if (!el) return
    setHoverStyle({ width: el.offsetWidth, left: el.offsetLeft })
    setIsHovering(true)
  }

  return (
    <>
      <header className="f-col g18">
        <p className="h-m-medium label-black">{label}</p>
        {Tabs && (
          <div className="tabs-wrap b-r-regular f-row">
            <div
              className="slider-hover tra"
              style={{ ...hoverStyle, opacity: isHovering ? 1 : 0 }}
            />
            <Tabs
              activeTab={activeTab}
              tabRefs={tabRefs}
              onTabClick={handleClick}
              onTabEnter={handleMouseEnter}
              onTabLeave={() => setIsHovering(false)}
            />
            {TabsInline && <TabsInline />}
            <div className="slider tra" style={sliderStyle} />
          </div>
        )}
      </header>

      {SubBar && <SubBar activeTab={activeTab} />}
    </>
  )
}