import React, { useEffect, useRef, useState } from 'react'
function WatchTimer(){
    const [second, setSecond] = useState<number>(0)
    const intervalRef = useRef<any>(null)
    useEffect(()=>{
      intervalRef.current=  setInterval(() =>{
            setSecond(prev => prev+1)
            console.log("đang chạy")
        },3000)
        return () =>{
        clearInterval(intervalRef.current)
        console.log("unmout")
        }
    },[])
  return (
    <div>Watch :{second}</div>
  )
}
export default function Watch() {
    const [visiable, setVisiable] = useState<boolean>(true)
  return (
    <div>
        <button onClick={() => {setVisiable(prev => !prev)}}>set visiable</button>
        {visiable&& <WatchTimer/>}
        </div>
  )
}
