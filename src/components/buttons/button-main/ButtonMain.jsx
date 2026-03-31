import './ButtonMain.css'

export const ButtonMainSmall = ({ children, className="" }) => {
     return (
          <button className={`button-main ${className} b-s-medium f-row`}>
               {children}
          </button>
     )
}

export const ButtonMainIconSmall = ({ children, className="" }) => {
     return (
          <button className={`button-main ${className} icon small j-c f-row`}>
               {children}
          </button>
     )
}