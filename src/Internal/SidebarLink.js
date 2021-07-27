import React from 'react'
import { useHistory } from 'react-router-dom'

export default function SidebarLink(props) {

    let history = useHistory()

    return <p className='py-2 px-2 m-0 sidebar-link' onClick={() => {history.push(props.location)}}>{props.children}</p>
}