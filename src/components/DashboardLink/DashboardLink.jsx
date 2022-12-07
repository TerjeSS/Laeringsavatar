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
                  </Link>
                  <button disabled>Kopier URL</button>
                  <button disabled>Slett visualisering</button>
             <p>Beskrivelse. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Suscipit fuga odit aperiam, rem molestias nesciunt commodi iusto error ratione, vero neque tempora provident non esse. Ipsam aut impedit delectus! At expedita placeat consectetur ut asperiores sint laboriosam provident vel necessitatibus.</p>
     </div>
  )
}

export default DashboardLink