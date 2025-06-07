import React, { useState } from 'react'

const OnlineStatus = () =>
{
    const [online,setOnline] = useState(true)
    window.addEventListener('offline',()=>
        {
            setOnline(false)
        })
    
    window.addEventListener('online',()=>
        {
            setOnline(true)
        })
    return online;
}

export default OnlineStatus;
