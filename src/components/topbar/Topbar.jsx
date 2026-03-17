import { useLocation } from 'react-router-dom'
import AnalyticsTabs from './tabs/AnalyticsTabs'
import './Topbar.css'
import VisibilityTabs from './tabs/VisibilityTab'
 
const ROUTE_LABELS = {
  overview:          'Overview',
  mobina:            'Mobina',
  analytics:         'Analytics',
  visibility:        'Visibility',
  performance:       'Performance',
  'split-testing':   'Split Testing',
  'content-assets':  'Content & Assets',
  'modules-hub':     'Modules Hub',
  infrastructure:    'Infrastructure',
  security:          'Access & Security',
  'system-activity': 'System Activity',
}
 
const ROUTE_TABS = {
  analytics:  <AnalyticsTabs />,
  visibility: <VisibilityTabs />,
}
 
export default function Topbar() {
  const location = useLocation()
  const segment = location.pathname.split('/').filter(Boolean).pop()
  const heading = ROUTE_LABELS[segment] ?? 'Dashboard'
  const tabs = ROUTE_TABS[segment] ?? null
 
  return (
    <header className="f-col g28">
      <h1 className="font17 w680">{heading}</h1>
      {tabs && (
        <div className="topbar-tabs-wrap visibility content f-row be-rel">
          {tabs}
        </div>
      )}
    </header>
  )
}
 


