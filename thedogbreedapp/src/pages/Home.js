import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

export default function Home() {
  
  const [dogs, setDogs] = useState([]);
  const [text, setText] = useState("");
  const [searched, setSearched] = useState(false);
  const [sorted, setSorted] = useState({ sorted: "name",reversed: true });
  const searchVariable = "height.metric"; 

  const sortByName = () => {
    setSorted({ sorted: "name", reversed: !sorted.reversed });
    const dogCopy = [...dogs]
    dogCopy.sort((dogA, dogB) => {
      if (sorted.reversed) {   
        return dogA.name.localeCompare(dogB.name);
      }
      console.log(dogA.name.localeCompare(dogB.name))
      return dogB.name.localeCompare(dogA.name);
    });
    setDogs(dogCopy);  
  }

  const sortByHeight =  () => {
    const dogCopy = [...dogs]
    dogCopy.sort((dogA, dogB) => {
      if (sorted.reversed) {
       
        return parseInt(dogA.height.metric) - parseInt(dogB.height.metric);
      }
      return parseInt(dogB.height.metric) - parseInt(dogA.height.metric);
    });
    setDogs(dogCopy);
    setSorted({ sorted: "height.metric", reversed: !sorted.reversed });
  }

  const sortByWeight = () => {
    const dogCopy = [...dogs]
    dogCopy.sort((dogA, dogB) => {
      if (sorted.reversed) {
        return parseInt(dogA.weight.metric) - parseInt(dogB.weight.metric);
      }
      return parseInt(dogB.weight.metric) - parseInt(dogA.weight.metric);
    });
    setDogs(dogCopy);
    setSorted({ sorted: "weight", reversed: !sorted.reversed });
  }


  const sortByLifeSpan = () => {
    const dogCopy = [...dogs]
    dogCopy.sort((dogA, dogB) => {
      if (sorted.reversed) {
        return parseInt(dogA.life_span) - parseInt(dogB.life_span);
      }
      return parseInt(dogB.life_span) - parseInt(dogA.life_span);
    });
    setDogs(dogCopy);
    setSorted({ sorted: "life_span", reversed: !sorted.reversed });
  }


  const renderArrow = () => {
    if (sorted.reversed) {
      return <FaArrowUp className="ml-2 " />
    }
    return <FaArrowDown className="ml-2" />
  }


  useEffect(() => {
    const fetchDogData = async () => {
      try {
        const res = await fetch("https://api.thedogapi.com/v1/breeds")
        const data = await res.json()
        setDogs(data)
        console.log(data);
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
              <div className="grid grid-cols-2 gap-8 md:grid-cols-4 xl:grid-cols-4 my-10 lg:my-20 items-center content-center">
              <button className="my-8 black inline-flex leading-4 bg-transparent hover:bg-white hover:text-gray-400 border-black active:border-black font-semibold  py-2 px-4 border border-white hover:border-transparent rounded	" onClick={sortByName}>    Name  {sorted.sorted === "name" ? renderArrow() : null} 	 </button>
              <button className="my-8 black inline-flex leading-4 bg-transparent hover:bg-white hover:text-gray-400 border-black active:border-black font-semibold  py-2 px-4 border border-white hover:border-transparent rounded	" onClick={sortByHeight}>    Height  {sorted.sorted === "height" ? renderArrow() : null} 	 </button>
              <button className="my-8 black inline-flex leading-4 bg-transparent hover:bg-white hover:text-gray-400 border-black active:border-black font-semibold  py-2 px-4 border border-white hover:border-transparent rounded	" >    Weight  {sorted.sorted === "weight" ? renderArrow() : null} 	 </button>        
              <button className="my-8 black inline-flex leading-4 bg-transparent hover:bg-white hover:text-gray-400 border-black active:border-black font-semibold  py-2 px-4 border border-white hover:border-transparent rounded	" >    Life span  {sorted.sorted === "life_span" ? renderArrow() : null} 	 </button>              </div>
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
                     
              <ul className="text-sm text-black leading-loose lg:text-base lg:leading-relaxed">
                
                <li>
                  <span className="font-bold text-black ">Height:</span>{" "}
                  {dog.height.metric} cm
                </li>
                <li>
                  <span className="font-bold text-black ">Weight:</span>{" "}
                  {dog.weight.metric} kgs
                </li>
                <li>
                  <span className="font-bold text-black ">Breed Group:</span>{" "}
                  {dog.breed_group}
                </li>
                <li>
                  <span className="font-bold text-black ">Lifespan:</span>{" "}
                  {dog.life_span}
                </li>
                <li>
                  <span className="font-bold ">Temperament:</span>{" "}
                  {dog.temperament}
                </li>
                <li>
                  <span className="font-bold text-black ">Bred For:</span>{" "}
                  {dog.bred_for}
                </li>
              </ul>
                    </article>
                  </Link>
                ))
              ) : (
                <>
                  {dogs.map((dog) => (
                    <Link
                      to={`/${dog.name}`}
                      key={dog.id}
                      className="bg-white p-4 rounded hover:bg-gray transition-all duration-200"
                    >
                      <article>
                        <img
                          src={`https://cdn2.thedogapi.com/images/${dog.reference_image_id}.jpg`}
                          alt={dog.name}
                          className="rounded md:h-72 w-full object-cover"
                        />
                        <h3 className="text-black text-lg font-bold mt-4">
                          {dog.name}
                        </h3>
                        <ul className="text-sm text-black leading-loose lg:text-base lg:leading-relaxed">
                
                <li>
                  <span className="font-bold text-black ">Height:</span>{" "}
                  {dog.height.metric} cm
                </li>
                <li>
                  <span className="font-bold text-black ">Weight:</span>{" "}
                  {dog.weight.metric} kgs
                </li>
                <li>
                  <span className="font-bold text-black ">Breed Group:</span>{" "}
                  {dog.breed_group}
                </li>
                <li>
                  <span className="font-bold text-black ">Lifespan:</span>{" "}
                  {dog.life_span}
                </li>
                <li>
                  <span className="font-bold ">Temperament:</span>{" "}
                  {dog.temperament}
                </li>
                <li>
                  <span className="font-bold text-black ">Bred For:</span>{" "}
                  {dog.bred_for}
                </li>
              </ul>
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