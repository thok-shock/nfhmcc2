import React from 'react'
import { useParams } from 'react-router'


export default function User() {

    let {user} = useParams();
    
    return <div>
        <p>Information about user {user} will appear here</p>
    </div>
}