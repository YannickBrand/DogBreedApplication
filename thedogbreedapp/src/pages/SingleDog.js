import React, {useState, useEffect} from 'react';
import { Link, useParams } from 'react-router-dom';

export default function SingleDog() {
  const [dog, setDog] = useState([])
  const {name} = useParams()

  useEffect (() => {
    const fetchSinleDog = async () => {
      try {
        const res = await fetch(`https://api.thedogapi.com/v1/breeds/search?q=${name}`)
        const data = await res.json()
        setDog(data)
      } catch (error) {
        console.error(error)
      }
    }


    fetchSinleDog()
  }, [name])

  return (
    <section className='max-w-5xl mx-auto flex items-center justify-center h-screen'>
      {dog.map((item) => (
        <div key={item.id} className='grid grid-cols-1 gap-8 p-8 md:grid-cols-2 md:place-items-center'>
          <article>
            <img src={`https://cdn2.thedogapi.com/images/${item.reference_image_id}.jpg`}
            alt={item.name}/>
          </article>
          <article>
            <h1 className='text-white text-3xl'>{item.name}</h1>
            {item.description && <p>{item.description}</p>}
            <ul>
              <li>Ras voor: {item.bred_for}</li>
              <li>Hoogte: {item.height.metric} cm</li>
              <li>Gewicht : {item.weight.metric} kgs</li>
              <li>Ras groep : {item.breed_group}</li>
              <li>Levensverwachting : {item.lifespan}</li>
              <li>Temprament: {item.temprament}</li>
            </ul>
          </article>
        </div>
      ))}
    </section>
  )
}
