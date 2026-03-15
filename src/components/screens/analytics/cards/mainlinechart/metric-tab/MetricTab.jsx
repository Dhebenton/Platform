import { BounceRateSmallIcon, ClockSmallIcon, EventCountIcon, EyeIconSmall, UserSmallIcon, VisibilityIcons } from "../../../../../../assets/Icons"


export const UniqueVisitorsTab = ({}) => {
     return (
          <button className="metrics-tab active f-col g14">
               <div className="header f-row g10 medium">
                    <UserSmallIcon />
                    <p className="label font13 w560">Unique Visitors</p>
               </div>
               <div className="metric f-row a-f-e g12">
                    <h2>61,905</h2>
                    <p className="change">+12%</p>
               </div>
          </button>
     )
} 

export const PageViewsTab = ({}) => {
     return (
          <button className="metrics-tab f-col g14">
               <div className="header f-row g10 medium">
                    <EyeIconSmall />
                    <p className="label font13 w560">Page Views</p>
               </div>
               <div className="metric f-row a-f-e g12">
                    <h2>143,220</h2>
                    <p className="change">+10%</p>
               </div>
          </button>
     )
} 

export const SessionDurationTab = ({}) => {
     return (
          <button className="metrics-tab f-col g14">
               <div className="header f-row g10 small">
                    <ClockSmallIcon />
                    <p className="label font13 w560">Session Duration</p>
               </div>
               <div className="metric f-row a-f-e g12">
                    <h2>2m 47s</h2>
                    <p className="change">+7%</p>
               </div>
          </button>
     )
} 

export const OrganisTrafficTab = ({}) => {
     return (
          <button className="metrics-tab f-col g14">
               <div className="header f-row g10 small">
                    <VisibilityIcons />
                    <p className="label font13 w560">Organic Traffic</p>
               </div>
               <div className="metric f-row a-f-e g12">
                    <h2>34,871</h2>
                    <p className="change">+25%</p>
               </div>
          </button>
     )
} 

export const BounceRateTab = ({}) => {
     return (
          <button className="metrics-tab f-col g14">
               <div className="header f-row g10 small">
                    <BounceRateSmallIcon />
                    <p className="label font13 w560">Bounce Rate</p>
               </div>
               <div className="metric f-row a-f-e g12">
                    <h2>38.4%</h2>
                    <p className="change red">+12%</p>
               </div>
          </button>
     )
} 

export const EventCountTab = ({}) => {
     return (
          <button className="metrics-tab f-col g14">
               <div className="header f-row g10 medium">
                    <EventCountIcon />
                    <p className="label font13 w560">Event Cosunts</p>
               </div>
               <div className="metric f-row a-f-e g12">
                    <h2>1,204</h2>
                    <p className="change">+14%</p>
               </div>
          </button>
     )
} 