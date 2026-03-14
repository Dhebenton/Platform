import { AnalyticsIcon, MobinaIcon, OverviewIcon, PerfromanceIcon, SplitTestingIcon, VisibilityIcons, ContentAndAssets, ModulesHub, LogIcon, SecurityIcon, InfrastructureIcon } from "../../../assets/Icons";


export default function Tabs({}) {
     return (
          <>
               <span className="nav-tab-group-h be-rel">
                    <p className="font12 w570">Workspace</p>
               </span>
               <button className="tab not-ready font13 g10">
                    <OverviewIcon />
                    <p>Overview</p>
               </button>
               <button className="tab not-ready font13 g10">
                    <MobinaIcon />
                    <p>Mobina</p>
               </button>
               <button className="tab active font13 g10">
                    <AnalyticsIcon />
                    <p>Analytics</p>
               </button>
               <button className="tab not-ready font13 g10">
                    <VisibilityIcons />
                    <p>Visibility</p>
               </button>

               <span className="nav-tab-group-h be-rel">
                    <p className="font12 w570">Tools</p>
               </span>
               <button className="tab not-ready font13 g10">
                    <PerfromanceIcon />
                    <p>Performance</p>
               </button>
               <button className="tab not-ready font13 g10">
                    <SplitTestingIcon />
                    <p>Split Testing</p>
               </button>
               <button className="tab not-ready font13 g10">
                    <ContentAndAssets />
                    <p>Content & Assets</p>
               </button>
               <button className="tab not-ready font13 g10">
                    <ModulesHub />
                    <p>Modules Hub</p>
               </button>

               <span className="nav-tab-group-h be-rel">
                    <p className="font12 w570">Management</p>
               </span>
               <button className="tab not-ready font13 g10">
                    <InfrastructureIcon />
                    <p>Infrastructure</p>
               </button>
               <button className="tab not-ready font13 g10">
                    <SecurityIcon />
                    <p>Access & Security</p>
               </button>
               <button className="tab not-ready font13 g10">
                    <LogIcon />
                    <p>System Activity</p>
               </button>
          </>
     )
}