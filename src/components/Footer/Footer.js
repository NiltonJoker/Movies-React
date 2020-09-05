import React from 'react'
import {Layout} from 'antd'

import './Footer.scss'

export default function Footer() {

  const {Footer} = Layout
  const date = new Date()
  return (
    <Footer className="footer">
      <p>Nilton Riega Manchego</p>
      <p>Todos los derechos reservados &copy; {date.getFullYear()}</p>
    </Footer>
  )
}
