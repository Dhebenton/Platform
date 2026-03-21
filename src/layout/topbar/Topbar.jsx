import { useEffect, useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import AnalyticsTabs from './tabs/AnalyticsTabs'
import MobinaTabs from './tabs/MobinaTabs'
import PerformanceTabs from './tabs/PerformanceTabs'
import VisibilityTabs from './tabs/VisibilityTabs'
import './Topbar.css'

const ROUTE_CONFIG = {
  '/analytics':   { label: 'Analytics',   Tabs: AnalyticsTabs },
  '/mobina':      { label: 'Mobina',       Tabs: MobinaTabs },
  '/performance': { label: 'Performance',  Tabs: PerformanceTabs },
  '/visibility':  { label: 'Visibility',   Tabs: VisibilityTabs },
  '/overview':        { label: 'Overview' },
  '/split-testing':   { label: 'Split Testing' },
  '/content-assets':  { label: 'Content & Assets' },
  '/modules-hub':     { label: 'Modules Hub' },
  '/infrastructure':  { label: 'Infrastructure' },
  '/access-security': { label: 'Access & Security' },
  '/system-activity': { label: 'System Activity' },
}

export default function Topbar() {
  const { pathname } = useLocation()

  const { label, Tabs } = useMemo(
    () => ROUTE_CONFIG[pathname] ?? { label: 'Hypeify' },
    [pathname]
  )

  useEffect(() => {
    document.title = `Hypeify | ${label}`
  }, [label])

  return (
    <header className="f-col g18">
      <p className="heading-regular tblack weight-semibold">{label}</p>
      {Tabs && (
        <div className="tabs-wrap f-row">
          <Tabs />
        </div>
      )}
    </header>
  )
}