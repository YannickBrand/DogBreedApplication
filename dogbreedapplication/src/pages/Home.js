import React, {useState, useEffect} from 'react'

export default function Home() {
    const [dogs, setDogs] = useState([])

    useEffect(() =>
    {
const fetchDogData = async() => {
  try {
    
    const res = await fetch("https://api.thedogapi.com/v1/breeds/")
    const data = await res.json()
    setDogs(data)
    console.log(data)
    
  } catch(error) {
    console.error(error)
  } 
}


fetchDogData()
},[])

  return ( 
  <>
  {!dogs ? (
  <h1 className='flex items-center justify-center text-slate-800
   text-center px-5 text-3xl h-screen font-bold uppercase'>
    Loading...
    </h1> 
    ) : (
    <>
  <section className='p-8 max-w-6-xl mx-auto'>
    <h1 className='flex items-center justify-center text-slate-100
   text-center px-5 text-3xl h-screen font-bold ' >The Dog App</h1>
    {dogs.length} dogs    </section>
    </>
    )}
    </>
    )
}