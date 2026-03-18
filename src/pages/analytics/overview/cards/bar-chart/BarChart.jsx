import { HomeIcon } from '../../../../../assets/Icons'
import SliderTabs from '../../../../../components/ui/slider/Slider'
import './BarChart.css'
import { useRef } from 'react'


export default function BarChart({}) {
     const handleMouseEnter = (e) => {
          const wrap = e.currentTarget.querySelector('.percentage-wrap')
          if (!wrap) return
          const inner = wrap.firstElementChild
          if (!inner) return
          wrap.style.width = inner.scrollWidth + 'px'
     }

          const handleMouseLeave = (e) => {
          const wrap = e.currentTarget.querySelector('.percentage-wrap')
          if (!wrap) return
          wrap.style.width = '0px'
     }


     return (
          <div className="card flex bar-chart-card g24 f-col">
               <div className="f-row j-s-b">
                    <p className="label text-xsmall weight-medium t900">Page Views</p>
                    <SliderTabs tabs={['Top', 'Entry', 'Exit']} onChange={(tab) => console.log(tab)} />
               </div>
               <button className="bar-chart-list-wrap f-col g5">
                    <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="list-row f-row j-s-b">
                         <div className="bar tra f-row g8">
                              <HomeIcon />
                              <span className="list-label text-xsmall weight-medium t600">Home</span>
                         </div>
                         <div className="bar-chart-metric-wrap f-row g6 a-f-e j-f-e">
                              <span className="text-small weight-semi-medium t900">1,243</span>
                              <div className="percentage-wrap tra f-row tra j-f-s">
                                   <span className='text-xsmall t600 weight-medium'>(12%)</span>
                              </div>
                         </div>
                    </div>
               </button>
          </div>
     )
}