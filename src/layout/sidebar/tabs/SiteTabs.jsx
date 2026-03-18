import { NavLink } from "react-router-dom";
import { AnalyticsIcon, ContentAssetsIcon, HomeIcon, LogsIcon, MobinaIcon, ModulesHubIcon, PerformanceIcon, SplitTestingIcon, VisibilityIcon } from "../../../assets/Icons";
import { Fragment } from "react";

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
      { to: "/content-assets",  icon: <ContentAssetsIcon />,  label: "Content & Assets" },
      { to: "/modules-hub",     icon: <ModulesHubIcon />,     label: "Modules Hub" },
    ],
  },
  {
    label: "Management",
    tabs: [
      { to: "/infrastructure",    icon: <SplitTestingIcon />,  label: "Infrastructure" },
      { to: "/access-security",   icon: <ContentAssetsIcon />, label: "Access & Security" },
      { to: "/system-activity",   icon: <LogsIcon />,    label: "System Activity" },
    ],
  },
];

export default function SiteTabs() {
  return (
    <>
      {TAB_GROUPS.map(({ label, tabs }) => (
        <Fragment key={label}>
          <div className="f-row tab-group be-rel">
            <span className="text-xsmall weight-medium t300">{label}</span>
          </div>
          {tabs.map(({ to, icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) => `tab g9${isActive ? " active" : ""}`}
            >
              {icon}
              <p>{label}</p>
            </NavLink>
          ))}
        </Fragment>
      ))}
    </>
  );
}