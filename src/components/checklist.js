import React from "react";
import misaka from '../assets/images/misaka.png'
import vash from '../assets/images/vash1.png'
import hiei from '../assets/images/hiei.png'

export const Checklist = (props) => {
  const { misakaCheck, vashCheck, hieiCheck } = props.checks
  return (
    <div className="checklist">
      <div className="check-char">
        <img className="check-image" src={misaka} alt='Misaka'/>
        {misakaCheck ? <div className="gray-filter"> </div> : null}
      </div>
      <div className="check-char">
        <img className="check-image" src={vash} alt='Vash'/>
        {vashCheck ? <div className="gray-filter"> </div> : null}
      </div>
      <div className="check-char">
        <img className="check-image" src={hiei} alt='Hiei'/>
        {hieiCheck ? <div className="gray-filter"> </div> : null}
      </div>
    </div>
  )
}