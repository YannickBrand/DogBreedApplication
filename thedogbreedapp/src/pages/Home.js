import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

export default function Home() {
  const [dogs, setDogs] = useState([]);
  const [text, setText] = useState("");
  const [searched, setSearched] = useState(false);
  const [sorted, setSorted] = useState({ sorted: "weight", reversed: false});

  const sortByWeight = () => {
    setSorted ({sorted: "weight", reversed: !sorted.reversed});
    const dogCopy = [...dogs]
    
    dogCopy.sort((dogA, dogB) => {
      if (sorted.reversed) {
        return parseInt(dogA.weight.metric) - parseInt(dogB.weight.metric);

      }
      // console.log(dogA.weight.metric.substring(0,2))
      return parseInt(dogB.weight.metric) - parseInt(dogA.weight.metric);
    });
    setDogs(dogCopy);
    
    
  }

  const sortByLifeSpan = () => {
    setSorted ({sorted: "life_span", reversed: !sorted.reversed});
    const dogCopy = [...dogs]
    
    dogCopy.sort((dogA, dogB) => {
      if (sorted.reversed) {
        return parseInt(dogA.life_span) - parseInt(dogB.life_span);

      }
      // console.log(dogA.weight.metric.substring(0,2))
      return parseInt(dogB.life_span) - parseInt(dogA.life_span);
    });
    setDogs(dogCopy);
    
    
  }

  const renderArrow = () => {
    if(sorted.reversed){
      return <FaArrowUp className="ml-2 "/>
    }
    return <FaArrowDown className="ml-2"/>
  }


  useEffect(() => {
    const fetchDogData = async () => {
      try {
        const res = await fetch("https://api.thedogapi.com/v1/breeds")
        const data = await res.json()
        setDogs(data)
      } catch (error) {
        console.error(error)
      }
    }

    setSearched(false)
    fetchDogData()
  }, [])

  const searchForDog = async () => {
    try {
      const res = await fetch(
        `https://api.thedogapi.com/v1/breeds/search?q=${text}`
      )
      const data = await res.json()
      setDogs(data)
    } catch (error) {
      console.error(error)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    searchForDog()
    setSearched(true)
  }

  return (
    <>
      {!dogs ? (
        <h1 className="flex items-center justify-center text-white text-center px-5 text-3xl h-screen font-bold uppercase">
          Loading...
        </h1>
      ) : (
        <>
          <section className="p-8 max-w-7xl mx-auto ">
            <div className="pt-10 text-center bg-white rounded">
              <h1 className="flex items-center justify-center text-center px-5 text-3xl font-bold lg:text-5xl ">
              <a href="/">  Dog breed application</a>
                
              </h1>
              <p className="my-8">
                This application uses the :{" "}
                <a
                  href="https://thedogapi.com"
                  className="text-gray-600 underline active:text-orange-400"
                >
                  The Dog Api
                </a>
              </p>

              <form
                onSubmit={handleSubmit}
                className="max-w-xl mx-auto"
                autoComplete="off"
              >
                <input
                  type="text"
                  name="search"
                  id="search"
                  placeholder="Search for a dog / breed"
                  className="py-2 px-4 rounded shadow w-full bg-slate-400 text-white placeholder-white"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />
              </form>
          <button className="my-8 black inline-flex leading-4 bg-transparent hover:bg-white hover:text-gray-400 border-black active:border-black font-semibold  py-2 px-4 border border-white hover:border-transparent rounded	" onClick={sortByWeight}>    Weight  {sorted.sorted === "weight" ? renderArrow() : null} 	 </button>
          <button className="my-8 ml-8 black inline-flex leading-4 bg-transparent hover:bg-white hover:text-gray-400 border-black active:border-black font-semibold  py-2 px-4 border border-white hover:border-transparent rounded	" onClick={sortByLifeSpan}>    Life expectation  {sorted.sorted === "life_span" ? renderArrow() : null} 	 </button>

            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3 my-10 lg:my-20">
              {!searched ? (
                dogs.map((dog) => (
                  <Link
                    to={`/${dog.name}`}
                    key={dog.id}
                    className="bg-white p-4 rounded hover:bg-grat transition-all duration-200"
                  >
                    <article>
                      <img
                        src={dog.image.url}
                        alt={dog.name}
                        loading="lazy"
                        className="rounded md:h-72 w-full object-cover"
                      />
                      <h3 className="text-black text-lg font-bold mt-4">
                        {dog.name}
                      </h3>
                      <p className="text-black">Bred For: {dog.bred_for}</p>
                      <p className="text-black">Weight: {dog.weight.metric} KG</p>
                      <p className="text-black">Life expectation: {dog.life_span}</p>
                    </article>
                  </Link>
                ))
              ) : (
                <>
                  {dogs.map((dog) => (
                    <Link
                      to={`/${dog.name}`}
                      key={dog.id}
                      className="bg-slate-700 p-4 rounded hover:bg-slate-600 transition-all duration-200"
                    >
                      <article>
                        <img
                          src={`https://cdn2.thedogapi.com/images/${dog.reference_image_id}.jpg`}
                          alt={dog.name}
                          className="rounded md:h-72 w-full object-cover"
                        />
                        <h3 className="text-white text-lg font-bold mt-4">
                          {dog.name}
                        </h3>
                        <p className="text-slate-400">
                          Bred For: {dog.bred_for}
                        </p>
                      </article>
                    </Link>
                  ))}
                </>
              )}
            </div>
          </section>
        </>
      )}
    </>
  )
}