import React, {useState, useEffect} from 'react';
import { Link, useParams } from 'react-router-dom';

export default function SingleDog() {
  const [dog, setDog] = useState(null)
  const {name} = useParams()

  useEffect (() => {
    const fetchSinleDog = async () => {
      try {
        const res = await fetch(`https://api.thedogapi.com/v1/breeds/search/g=${name}`)
        const data = await res.json()
        setDog(data)
      } catch (error) {
        console.error(error)
      }
    }


    fetchSinleDog()
  }, [name])

  return (
    <section className='max-w-5xl mx-auto flex items-center justify-center'>
      <h1 className='text-white text-3xl'>
        {name}
      </h1>
    </section>
  )
}
