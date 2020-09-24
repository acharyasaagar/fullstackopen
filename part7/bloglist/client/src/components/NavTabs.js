import React from 'react'

import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

import { Link } from 'react-router-dom'

const NavLinkTab = props => <Tab component={Link} {...props} />

const NavTabs = props => {
  const [value, setValue] = React.useState(0)

  const handleChange = (e, newValue) => setValue(newValue)

  return (
    <Tabs value={value} onChange={handleChange}>
      <NavLinkTab label="Blogs" to="/" />
      <NavLinkTab label="Users" to="/users" />
      <NavLinkTab label="Create Blog" to="/create-blog" />
    </Tabs>
  )
}

export default NavTabs
