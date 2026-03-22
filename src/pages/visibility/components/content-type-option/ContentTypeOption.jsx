import { PlusIcon, NewContentIcon, OptimiseContent, PerformanceIcon } from '../../../../assets/Icons'
import './ContentTypeOption.css'

export default function ContentTypeOption({}) {
     return (
          <div className="f-row g18">
               <button className="card flex f-row g20 content-type-option f-row card-button">
                    <div className="dotted-bg tra" />
                    <NewContentIcon />
                    <div className='f-col'>
                         <p className='h-s-semibold label-primary'>Create New Content</p>
                         <p className='b-r-regular label-quanternary line-height-14'>Improve ranking efficiency through targeted content adjustments.</p>
                         <div className="button-black plus small b-xs-medium f-row g9">
                              <PlusIcon />
                              <p>Create New Content</p>
                         </div>
                    </div>
               </button>
               <button className="card flex f-row g20 f-row content-type-option card-button">
                    <div className="dotted-bg" />
                    <OptimiseContent />
                    <div className='f-col'>
                         <p className='h-s-semibold label-primary'>Optimise Existing Content</p>
                         <p className='b-r-regular label-quanternary line-height-14'>Improve ranking efficiency through targeted content adjustments.</p>
                         <div className="button-black small b-xs-medium f-row g9">
                              <PerformanceIcon />
                              <p>Optimise Existing Content</p>
                         </div>
                    </div>
               </button>
          </div>
     )
}
