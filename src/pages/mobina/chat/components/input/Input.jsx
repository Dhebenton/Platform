import { useState } from 'react'
import { ArrowTopRight, DepthThinking, PlusIcon, QuickThinking } from '../../../../../assets/icons'
import { ButtonMainSmallIcon } from '../../../../../components/buttons/button-main/ButtonMain'
import './Input.css'

export default function Input({ onSend, loading }) {
     const [value, setValue] = useState('')

     const handleSubmit = () => {
     console.log('handleSubmit called, value:', value)
     if (!value.trim() || loading) return
     onSend(value.trim())
     setValue('')
}

     const handleKeyDown = (e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
               e.preventDefault()
               handleSubmit()
          }
     }

     return (
          <div className="input-wrap tra">
               <h2 className='h-r-medium tra'>Enter an instruction or question</h2>
               <input
                    type="text"
                    className='b-m-medium'
                    placeholder='Enter an instruction or question'
                    value={value}
                    onChange={e => setValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    disabled={loading}
               />
               <button
                    className="submit-button f-row j-c"
                    onClick={handleSubmit}
                    disabled={loading || !value.trim()}
               >
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