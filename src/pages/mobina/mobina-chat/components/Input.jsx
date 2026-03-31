import { ArrowTopRIght, DepthResponse, PlusIcon, QuickResponse } from "../../../../assets/Icons";
import { ButtonBlackSmallIcon } from "../../../../components/buttons/button-black/ButtonBlack";
import { ButtonMainIconSmall } from "../../../../components/buttons/button-main/ButtonMain";


export default function Input({}) {
     return (
          <div className="input-container f-col j-f-s">
               <div className="input-wrap tra">
                    <h2 className="h-r-medium label-black">Enter an instruction or question</h2>
                    <input type="text" className="b-m-regular" placeholder="Enter an instruction or question" />
                    <ButtonBlackSmallIcon>
                         <ArrowTopRIght />
                    </ButtonBlackSmallIcon>
                    <ButtonMainIconSmall className="plus-icon">
                         <PlusIcon />
                    </ButtonMainIconSmall>
                    <div className="slider-container f-row">
                         <div className="slider"></div>
                         <button className="f-row j-c active">
                              <QuickResponse />
                         </button>
                         <button className="f-row j-c">
                              <DepthResponse />
                         </button>
                    </div>
               </div>
          </div>
     )
}