import { NavLink } from 'react-router-dom'
import { AnalyticsIcon, MobinaIcon, OverviewIcon, PerfromanceIcon, SplitTestingIcon, VisibilityIcons, ContentAndAssets, ModulesHub, LogIcon, SecurityIcon, InfrastructureIcon } from "../../../assets/Icons"
import { Fragment } from 'react'

const TAB_GROUPS = [
  {
    label: 'Workspace',
    tabs: [
      { label: 'Overview',  icon: <OverviewIcon />,  path: '/overview',  ready: false },
      { label: 'Mobina',    icon: <MobinaIcon />,    path: '/mobina',    ready: true },
      { label: 'Analytics', icon: <AnalyticsIcon />, path: '/',          ready: true  },
      { label: 'Visibility',icon: <VisibilityIcons />,path: '/visibility',ready: true },
    ]
  },
  {
    label: 'Tools',
    tabs: [
      { label: 'Performance',     icon: <PerfromanceIcon />,  path: '/performance',     ready: true },
      { label: 'Split Testing',   icon: <SplitTestingIcon />, path: '/split-testing',   ready: false },
      { label: 'Content & Assets',icon: <ContentAndAssets />, path: '/content-assets',  ready: false },
      { label: 'Modules Hub',     icon: <ModulesHub />,       path: '/modules-hub',     ready: false },
    ]
  },
  {
    label: 'Management',
    tabs: [
      { label: 'Infrastructure',  icon: <InfrastructureIcon />, path: '/infrastructure', ready: false },
      { label: 'Access & Security',icon: <SecurityIcon />,      path: '/security',       ready: false },
      { label: 'System Activity', icon: <LogIcon />,            path: '/system-activity',ready: false },
    ]
  }
]

export default function Tabs() {
  return (
    <>
{TAB_GROUPS.map(({ label, tabs }) => (
  <Fragment key={label}>
    <span className="nav-tab-group-h be-rel">
      <p className="font12 w570">{label}</p>
    </span>
    {tabs.map(({ label, icon, path, ready }) => (
      <NavLink
        key={path}
        to={path}
        className={({ isActive }) =>
          `tab font13 g10${isActive ? ' active' : ''}${!ready ? ' not-ready' : ''}`
        }
        onClick={!ready ? (e) => e.preventDefault() : undefined}
      >
        {icon}
        <p>{label}</p>
      </NavLink>
    ))}
  </Fragment>
))}
    </>
  )
}