import ContentTable from "./components/content-table/ContentTable";
import ContentTypeOption from "./components/content-type-option/ContentTypeOption";


export default function VisiblityContent({}) {
     return (
          <section className="padding-default f-col">
               <h1 className="h-s-semibold margin-bottom-28 label-black">Start A New Project</h1>
               <ContentTypeOption />
               <ContentTable />
          </section>
     )
}