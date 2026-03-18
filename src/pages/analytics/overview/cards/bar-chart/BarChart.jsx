import { HomeIcon, PageIcon, Globe } from '../../../../../assets/Icons'
import SliderTabs from '../../../../../components/ui/slider/Slider'
import './BarChart.css'
import { usePages, useSources } from './../../../../../hooks/useAnalytics'

function RowIcon({ type, pathname, source }) {
  if (type === 'pages') {
    return pathname === '/' ? <HomeIcon /> : <PageIcon />
  }
  if (!source) return <Globe />
  return (
    <img
      src={`https://www.google.com/s2/favicons?domain=${source}&sz=16`}
      width={12.5}
      height={12.5}
      style={{ borderRadius: 4 }}
    />
  )
}

function RowLabel({ type, pathname, source }) {
  if (type === 'pages') return pathname === '/' ? 'Home' : pathname
  return source || 'Unknown'
}

export default function BarChart({ type = 'pages' }) {
  const { data, loading } = type === 'pages' ? usePages() : useSources()

  const handleMouseEnter = (e) => {
    const wrap = e.currentTarget.querySelector('.percentage-wrap')
    if (!wrap) return
    wrap.style.width = wrap.firstElementChild.scrollWidth + 'px'
  }

  const handleMouseLeave = (e) => {
    const wrap = e.currentTarget.querySelector('.percentage-wrap')
    if (!wrap) return
    wrap.style.width = '0px'
  }

  const label = type === 'pages' ? 'Page Views' : 'Sources'
  const maxValue = data[0]?.value ?? 1

  return (
    <div className="card flex bar-chart-card g24 f-col">
      <div className="f-row j-s-b">
        <p className="label text-xsmall weight-medium t900">{label}</p>
        <SliderTabs tabs={['Top', 'Entry', 'Exit']} onChange={(tab) => console.log(tab)} />
      </div>
      <div
        className="bar-chart-list-wrap f-col g5"
        style={{ opacity: loading ? 0.4 : 1, transition: 'opacity 0.3s ease' }}
      >
        {loading
          ? Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="list-row f-row j-s-b">
                <div className="bar tra f-row g8">
                  <span className="list-label text-xsmall weight-medium t600">—</span>
                </div>
              </div>
            ))
          : data.map((row, i) => (
              <div
                key={i}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className="list-row"
              >
                <div
                  className="bar tra f-row g8"
                  style={{ width: `${(row.value / maxValue) * 100}%` }}
                >
                  <RowIcon type={type} pathname={row.pathname} source={row.source} />
                  <span className="list-label text-xsmall weight-medium t600">
                    <RowLabel type={type} pathname={row.pathname} source={row.source} />
                  </span>
                </div>
                <div className="bar-chart-metric-wrap f-row g6 a-f-e j-f-e">
                  <span className="text-small weight-semi-medium t900">
                    {Number(row.value).toLocaleString()}
                  </span>
                  <div className="percentage-wrap tra f-row tra j-f-s">
                    <span className="text-xsmall t600 weight-medium">({row.percentage}%)</span>
                  </div>
                </div>
              </div>
            ))
        }
      </div>
    </div>
  )
}