import BarChart from "./components/bar-chart/BarChart";

export default function AnalyticsOverview({}) {
     return (
          <section className="no-padding a-c f-col">
               <div className="grid medium-width two-columns g18">
                    <BarChart />
                    <BarChart />
                    <BarChart />
                    <BarChart />
                    <BarChart />
                    <BarChart />
               </div>
          </section>
     )
}