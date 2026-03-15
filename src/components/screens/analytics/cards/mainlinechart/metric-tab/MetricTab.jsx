import {
  BounceRateSmallIcon,
  ClockSmallIcon,
  EventCountIcon,
  EyeIconSmall,
  UserSmallIcon,
  VisibilityIcons
} from '../../../../../../assets/Icons'

function deltaClass(delta, redDelta) {
  if (!delta || delta === '+0%') return 'change neutral'
  if (redDelta) return 'change red'
  return 'change'
}

function MetricTab({ icon, label, value, delta, active, loading, redDelta, onClick }) {
  return (
    <button
      className={`metrics-tab f-col g14${active ? ' active' : ''}`}
      onClick={onClick}
    >
      <div className="header f-row g10 medium">
        {icon}
        <p className="label font13 w560">{label}</p>
      </div>
      <div className="metric f-row a-f-e g12">
        <h2>{loading ? '—' : (value ?? '—')}</h2>
        <p className={deltaClass(delta, redDelta)}>{loading ? '' : (delta ?? '')}</p>
      </div>
    </button>
  )
}

export const UniqueVisitorsTab = ({ value, delta, loading, active, onClick }) => (
  <MetricTab active={active} onClick={onClick} icon={<UserSmallIcon />} label="Unique Visitors" value={value?.toLocaleString()} delta={delta} loading={loading} />
)

export const PageViewsTab = ({ value, delta, loading, active, onClick }) => (
  <MetricTab active={active} onClick={onClick} icon={<EyeIconSmall />} label="Page Views" value={value?.toLocaleString()} delta={delta} loading={loading} />
)

export const SessionDurationTab = ({ value, delta, loading, active, onClick }) => (
  <MetricTab active={active} onClick={onClick} icon={<ClockSmallIcon />} label="Session Duration" value={value} delta={delta} loading={loading} />
)

export const BounceRateTab = ({ value, delta, loading, active, onClick }) => (
  <MetricTab active={active} onClick={onClick} icon={<BounceRateSmallIcon />} label="Bounce Rate" value={value} delta={delta} loading={loading} redDelta />
)

export const EventCountTab = ({ value, delta, loading, active, onClick }) => (
  <MetricTab active={active} onClick={onClick} icon={<EventCountIcon />} label="Event Counts" value={value?.toLocaleString()} delta={delta} loading={loading} />
)

export const OrganisTrafficTab = ({ value, delta, loading, active, onClick }) => (
  <MetricTab active={active} onClick={onClick} icon={<VisibilityIcons />} label="Organic Traffic" value={value?.toLocaleString()} delta={delta} loading={loading} />
)