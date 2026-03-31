import './ButtonMain.css'

export const ButtonMainSmallIcon = ({ className, children }) => {
     return (
          <button className={`button-main f-row ${className} j-c icon small`}>
               {children}
          </button>
     )
}