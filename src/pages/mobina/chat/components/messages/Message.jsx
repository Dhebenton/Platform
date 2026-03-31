import './Message.css'

export const UserMessage = ({ message }) => {
     return (
          <div className="f-col a-f-e">
               <p className="user-message">Why did my checkout speed drop yesterday?</p>
          </div>
     )
}

export const MobinaMessageDefault = ({ message }) => {
     return (
          <div className="f-col a-f-s">
               <p className="mobina-message">Checkout load time increased by 420ms after the 14:20 production deploy. A new client side validation script added blocking time on mobile. Stripe webhook retries increased server latency.</p>
          </div>
     )
}