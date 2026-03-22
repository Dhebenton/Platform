import './ContentTable.css'

export default function ContentTable({}) {
     return (
          <>
               <div className="f-row j-s-b margin-top-64"></div>
               <table>
                    <tbody>
                         <tr className="b-r-medium label-black">
                              <th>
                                   <div className="f-row">Title</div>
                              </th>
                              <th>
                                   <div className="f-row">Goal</div>
                              </th>
                              <th>
                                   <div className="f-row">Primary Keyword</div>
                              </th>
                              <th>
                                   <div className="f-row">Performance</div>
                              </th>
                              <th>
                                   <div className="f-row">Status</div>
                              </th>
                              <th>
                                   <div className="f-row">Updated</div>
                              </th>
                         </tr>
                    </tbody>
               </table>
          </>
     )
}