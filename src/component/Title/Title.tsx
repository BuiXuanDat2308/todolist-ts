import styles from './Title.module.scss'
// import React from 'react'
import React, { useRef } from 'react'
type TitleProp = {
  address:{
    street : string
  },
  handleClickTitle : (value : any) => void
}
function Title(props : TitleProp) {
  // console.log(props.address.street)
    // const {address} = props
    const h1Ref = useRef<HTMLHeadingElement>(null)
    const clickH1 = () =>{
      if(h1Ref.current !== null){
        h1Ref.current.style.color = 'red'
      } 
    }
    return (
        <div><h1 className={styles.title} onClick={clickH1} ref={h1Ref}> TODOLIST</h1></div>
      )
}
function equal(prevProp:TitleProp, nextProp:TitleProp){
  return prevProp.address.street === nextProp.address.street;
}
export default React.memo(Title)
