import React, { useContext } from 'react'
import style from "./Home.module.css"
import RecentProduct from '../RecentProduct/RecentProduct'
import Sliders from './../Slider/Sliders';
import SubSlider from './../subSlider/subSlider';


export default function Home() {

 
  return (
    <>
    <div className='mt-[50px]'>
      <SubSlider/>
      <Sliders/>
 <RecentProduct/>
     
    </div>
   
    </>
  )
}
