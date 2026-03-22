import { ArrChevronowIcon } from '../../../assets/Icons'
import './SiteDropdown.css'
import Placeholder from './placeholder.png'

export default function SiteDropdown({}) {
     return (
          <div className="f-col dropdown-wrap site-dropdown">
               <button className="tab dropdown-toggle b-xs-regular f-row g8">
                    <div className="site-dropdown-favicon-wrap f-row j-c">
                         <img src={Placeholder} />
                    </div>
                    <p>Bear Essentials</p>
                    <ArrChevronowIcon />
               </button>
          </div>
     )
}