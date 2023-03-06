import React, { useState, useEffect } from 'react'

export default function Home() {
  const [dogs, setDogs] = useState([])

  useEffect(() => {
    const fetchDogData = async () => {
      try {

        const res = await fetch("https://api.thedogapi.com/v1/breeds/")
        const data = await res.json()
        setDogs(data)
        console.log(data)

      } catch (error) {
        console.error(error)
      }
    }


    fetchDogData()
  }, [])

  return (
    <>
      {!dogs ? (
        <h1 className='flex items-center justify-center text-white
   text-center px-5 text-3xl h-screen font-bold uppercase'>
          Loading...
        </h1>
      ) : (
        <>
          <section className='p-8 max-w-6-xl mx-auto'>
            <div className='text-center'>
              <h1 className='flex items-center justify-center text-white
   text-center px-5 text-3xl  font-bold lg:text-5xl' >The Dog App</h1>

              <p className='my-8 text-white'>Deze applicatie maakt gebruik van{""}
                <a href='https://thedogapi.com' className='text-indigo-600 underline active:text-orange-400'>
                  The Dog Api</a>
              </p>
              <form className='max-w-xl mx-auto' autoComplete='off'>
                <input type='text' name='search' className='bg-white py-2 px-4 rounded shadow w-full' id='search' placeholder='Zoek een hond of ras' >
                </input>
              </form>
            </div>
          <div>
          {dogs.map((dog) =>
          <article key={dog.id}>
            <img src={dog.image.url} alt={dog.name} />
            <h3>{dog.name}</h3>
            <p> Ras voor: {dog.bred_for}</p>
          </article>)}

          </div>

          </section>

        </>
      )}
    </>
  )
}