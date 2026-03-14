import KPICard from "../../cards/KPICards/KPICard";
import MainChartLine from "../../cards/mainlinechart/MainLineChart";


export default function AnalyticsOverview({}) {
     return (
          <section className="padding-main f-col">
               <div className="f-row g14">
                    <KPICard label={'Growth Score'} score={93} heading={'Excellent'} subheading={'Your site is outperforming 78% of sites in your industry this month.'}/>
                    <KPICard label={'Performance Score'} score={64} heading={'Needs Attentions'} subheading={'Core vitals are stable. Minor improvements could increase load efficiency'}/>
                    <KPICard label={'Visiblity Score'} score={72} heading={'Good'} subheading={'3 critical issues detected. Addressing them could improve search visibility.'}/>
               </div>

               <div className="section-block f-col">
                    <div className="section-block-heading f-col g4">
                         <h2>Site Performance</h2>
                         <p className="sub">Key metrics across traffic, engagement, and visibility. Deltas reflect change against the previous period.</p>
                    </div>
                    <MainChartLine />
               </div>

          </section>
     )
}