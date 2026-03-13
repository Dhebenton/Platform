import { AnalyticsIcon, MobinaIcon, OverviewIcon, VisibilityIcons } from "../../../assets/Icons";


export default function Tabs({}) {
     return (
          <>
               <span className="nav-tab-group-h font12">Workspace</span>
               <button className="tab not-ready font13 active g10">
                    <OverviewIcon />
                    <p>Overview</p>
               </button>
               <button className="tab not-ready font13 g10">
                    <MobinaIcon />
                    <p>Mobina</p>
               </button>
               <button className="tab not-ready font13 g10">
                    <AnalyticsIcon />
                    <p>Analytics</p>
               </button>
               <button className="tab not-ready font13 g10">
                    <VisibilityIcons />
                    <p>Visibility</p>
               </button>

               <span className="nav-tab-group-h font12">Workspace</span>
               <button className="tab not-ready font13 g10">
                    <OverviewIcon />
                    <p>Performance</p>
               </button>
               <button className="tab not-ready font13 g10">
                    <MobinaIcon />
                    <p>Split Testing</p>
               </button>
               <button className="tab not-ready font13 g10">
                    <OverviewIcon />
                    <p>Content & Assets</p>
               </button>
               <button className="tab not-ready font13 g10">
                    <MobinaIcon />
                    <p>Modules Hub</p>
               </button>

               <span className="nav-tab-group-h font12">Management</span>
               <button className="tab not-ready font13 g10">
                    <OverviewIcon />
                    <p>Infrastructure</p>
               </button>
               <button className="tab not-ready font13 g10">
                    <MobinaIcon />
                    <p>Access & Security</p>
               </button>
               <button className="tab not-ready font13 g10">
                    <OverviewIcon />
                    <p>System Activity</p>
               </button>
          </>
     )
}