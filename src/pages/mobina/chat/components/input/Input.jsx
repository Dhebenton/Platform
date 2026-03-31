import { ArrowTopRight, DepthThinking, PlusIcon, QuickThinking } from '../../../../../assets/icons'
import { ButtonMainSmallIcon } from '../../../../../components/buttons/button-main/ButtonMain'
import './Input.css'

export default function Input({}) {
     return (
          <div className="input-wrap tra">
               <h2 className='h-r-medium tra'>Enter an instruction or question</h2>
               <input type="text" className='b-m-medium' placeholder='Enter an instruction or question' />
               <button className="submit-button f-row j-c">
                    <ArrowTopRight />
               </button>
               <ButtonMainSmallIcon className={'plus'}>
                    <PlusIcon />
               </ButtonMainSmallIcon>
               <div className="slider-wrap f-row be-rel icon">
                    <button className="active f-row j-c">
                         <QuickThinking />
                    </button>
                    <button className="f-row j-c">
                         <DepthThinking />
                    </button>
               </div>
          </div>
     )
}