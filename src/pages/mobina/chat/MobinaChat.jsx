import BreathingDotGridRandom from "../../../components/ui/grid/GridBackground";
import Input from "./components/input/Input";
import './MobinaChat.css'

export default function MobinaChat({}) {
     return (
          <section className="f-col mobina-chat-section">
               <div className="chat-container f-col a-c j-c">
                    <div className="background">
                         <BreathingDotGridRandom />
                         <div></div>
                    </div>
                    
                    <div className="input-container">
                         <Input />
                    </div>
               </div>
          </section>
     )
}