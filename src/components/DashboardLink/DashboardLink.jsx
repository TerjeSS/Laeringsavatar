import React from 'react'
import { Link } from 'react-router-dom'

const DashboardLink = ({link}) => {
  return (
     <div>
         <Link
                    to={"/visualisering/" + link.name}
                    key={link.fullPath}
                  >
                    {link.name}
                  </Link><button>Kopier URL</button>
             
     </div>
  )
}

export default DashboardLink