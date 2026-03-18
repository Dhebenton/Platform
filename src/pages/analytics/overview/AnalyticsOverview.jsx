import AnalyticsOverviewMetrics from "./cards/AnalyticsOverviewMetrics/AnalyticsOverviewMetrics";
import BarChart from "./cards/bar-chart/BarChart";
import KPICard from "./cards/KPICard/KPICard";


export default function AnalyticsOverview({}) {
     return (
          <section className="a-c f-col g64">
               <AnalyticsOverviewMetrics />
               <div className="f-col g20 small-padding-horizontal">
                    <div className="f-row a-s padding-bottom-40 g20">
                         <KPICard label={'Growth Score'} title={"Excellent"} subheading={'Your site is outperforming 78% of the sites in your industry this month. Minor improvements could increase load efficiency'}/>
                         <KPICard label={'Visibility Score'} title={"Good"} score={63} subheading={'Core vitals are stable. Minor improvements could increase load efficiency improvements could increase load efficiency'}/>
                    </div>
                    <div className="f-row a-s g20">
                         <BarChart type="pages"/>
                         <BarChart type="sources"/>
                    </div>
               </div>
          </section>
     )
}