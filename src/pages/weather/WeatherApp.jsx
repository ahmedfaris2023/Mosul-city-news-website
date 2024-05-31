import React, { useState ,useEffect} from 'react'
import images from '../../constants/images'
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import './WeatherApp.css'
const WeatherApp = () => {
    let api_key="7619956ca0fcb77caba73ae235c5a000"
    const [wicon,setWicon]=useState(images.cloudy)
    const search= async()=>{
        
        const element=document.getElementsByClassName('cityInput')
        if(element[0].value===''){
            return 0
        }
        let url=`https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`

        let response=await fetch(url)
        let data= await response.json()
        const humidity=document.getElementsByClassName("humidity-percent")
        const wind=document.getElementsByClassName('wind-rate')
        let temprature=document.getElementsByClassName('weather-temp')
        const location=document.getElementsByClassName('weather-location')

        humidity[0].innerHTML=data.main.humidity+' %';
        wind[0].innerHTML=data.wind.speed+" km/h"
        temprature[0].innerHTML=data.main.temp+'\u00B0'+'c'
        location[0].innerHTML=data.name

        if(data.weather[0].icon==='01d' || data.weather[0].icon==='01n'){
            setWicon(images.clear)
        }
        else if(data.weather[0].icon==='02d' || data.weather[0].icon==='02n'){
            setWicon(images.cloudy)
        }else if(data.weather[0].icon==='03d' || data.weather[0].icon==='03n'){
            setWicon(images.drizzle)
        }else if(data.weather[0].icon==='04d' || data.weather[0].icon==='04n'){
            setWicon(images.drizzle)
        }else if(data.weather[0].icon==='09d' || data.weather[0].icon==='09n'){
            setWicon(images.rain)
        }else if(data.weather[0].icon==='13d' || data.weather[0].icon==='13n'){
            setWicon(images.snow)
        }
        else{
            setWicon(images.clear)
        }
      
    }
    useEffect(() => {
    const element = document.getElementsByClassName('cityInput');
    element[0].value = 'موصل';
    search();


  }, []);
  return (
    <>
    <Header />
    <div className='container2'>
        <div className='top-bar'>
            <input type='text' className='cityInput' placeholder='Search' dir='ltr' />
            <div className='search-icon' onClick={()=>{search()}}>
                <img src={images.search}/>
            </div>
        </div>
        <div className="weather-image">
            <img src={wicon} alt='' />
        </div>
        <div className='weather-temp'>24 °C</div>
        <div className='weather-location'>London</div>
        <div className='data-container pb-5'>
            <div className='element'>
                <img src={images.humidity} alt='' className='icon' />
                <div className='data'>
                    <div  className='humidity-percent'>64%</div>
                    <div className='text font-sans'>الرطوبة</div>
                </div>
            </div>
              <div className='element'>
                <img src={images.wind} alt='' className='icon' />
                <div className='data'>
                    <div  className='wind-rate'>18 km/h</div>
                    <div className='text font-sans'>سرعة الرياح</div>
                </div>
            </div>
        </div>
    </div>
    <Footer />
    </>
  )
}

export default WeatherApp