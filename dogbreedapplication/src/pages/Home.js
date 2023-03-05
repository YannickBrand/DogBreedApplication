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

  return <div>Home</div>
}