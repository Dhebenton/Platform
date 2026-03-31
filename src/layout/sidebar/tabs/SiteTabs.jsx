import { NavLink } from "react-router-dom";
import { Fragment } from "react";
import { AnalyticsIcon, ContentIcon, HomeIcon, InfrastructureIcon, LogsIcon, MobinaIcon, ModulesIcon, PerformanceIcon, SecurityIcon, SmartFormsIcon, SplitTestingIcon, VisibilityIcon } from "../../../assets/Icons";
import { CloseNav, GearIcons } from "../../../assets/icons";

const TAB_GROUPS = [
  {
    label: "Workspace",
    tabs: [
      { to: "/overview",   icon: <HomeIcon />,       label: "Overview" },
      { to: "/mobina",     icon: <MobinaIcon />,     label: "Mobina" },
      { to: "/analytics",  icon: <AnalyticsIcon />,  label: "Analytics" },
      { to: "/visibility", icon: <VisibilityIcon />, label: "Visibility" },
    ],
  },
  {
    label: "Tools",
    tabs: [
      { to: "/performance",     icon: <PerformanceIcon />,    label: "Performance" },
      { to: "/split-testing",   icon: <SplitTestingIcon />,   label: "Split Testing" },
      { to: "/content-assets",  icon: <ContentIcon />,  label: "Content & Assets" },
      { to: "/smart-forms",     icon: <SmartFormsIcon />,     label: "Smart Forms" },
      { to: "/modules-hub",     icon: <ModulesIcon />,     label: "Modules Hub" },
    ],
  },
  {
    label: "Management",
    tabs: [
      { to: "/infrastructure",    icon: <InfrastructureIcon />,  label: "Infrastructure" },
      { to: "/access-security",   icon: <SecurityIcon />, label: "Access & Security" },
      { to: "/system-activity",   icon: <LogsIcon />,    label: "System Activity" },
    ],
  },
];

export default function SiteTabs({ToggleSidebar}) {
  return (
    <>
     {TAB_GROUPS.map(({ label, tabs }) => (
        <Fragment key={label}>
          <div className="f-row tab-group be-rel">
            <span className="label-quinary b-xs-regular">{label}</span>
          </div>
          {tabs.map(({ to, icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) => `tab b-s-regular g9${isActive ? " active" : ""}`}
            >
              {icon}
              <p>{label}</p>
            </NavLink>
          ))}
        </Fragment>
     ))}
     <button onClick={ToggleSidebar} className="tab g9 b-s-regular mar-top-auto">
          <CloseNav />
     </button>
     <button className="tab g9 b-s-regular">
          <GearIcons />
          <p>Site Settings</p>
     </button>
    </>
  );
}