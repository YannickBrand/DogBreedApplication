import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

export default function Home() {
  // State-variabelen
  const [dogs, setDogs] = useState([]); // Een array om alle honden op te slaan die vanuit de API zijn opgehaald
  const [text, setText] = useState(""); // Een string om de zoekopdracht van de gebruiker op te slaan
  const [searched, setSearched] = useState(false); // Een boolean om bij te houden of er op een zoekopdracht is gezocht of niet
  const [sorted, setSorted] = useState({ sorted: "name",reversed: true }); // Een object om de sortering van hondenrassen bij te houden. De standaardinstelling sorteert de hondenrassen op naam, in omgekeerde volgorde.

  // Sorteert de honden op naam
  const sortByName = () => {
    setSorted({ sorted: "name", reversed: !sorted.reversed });
    const dogCopy = [...dogs]
    dogCopy.sort((dogA, dogB) => {
      if (sorted.reversed) {   
        return dogA.name.localeCompare(dogB.name);
      }
      return dogB.name.localeCompare(dogA.name);
    });
    setDogs(dogCopy);  
  }

  // Sorteert de hondenrassen op een eigenschap (hoogte, gewicht of levensduur)
  const sortDogs = (property) => {
    const dogCopy = [...dogs];
    dogCopy.sort((dogA, dogB) => {
      const valueA = property === 'life_span' ? parseInt(dogA[property]) : parseInt(dogA[property].metric);
      const valueB = property === 'life_span' ? parseInt(dogB[property]) : parseInt(dogB[property].metric);
      return sorted.reversed ? valueA - valueB : valueB - valueA;
    });
    setDogs(dogCopy);
    setSorted({ sorted: property, reversed: !sorted.reversed });
  }

  // Sorteert de hondenrassen op hoogte
  const sortByHeight = () => {
    sortDogs('height');
  }

  // Sorteert de hondenrassen op gewicht
  const sortByWeight = () => {
    sortDogs('weight');
  }

  // Sorteert de hondenrassen op levensduur
  const sortByLifeSpan = () => {
    sortDogs('life_span');
  }

  // Geeft een pijl-icoon weer dat de sorteerrichting aangeeft
  const renderArrow = () => {
    if (sorted.reversed) {
      return <FaArrowUp className="ml-2 " />
    }
    return <FaArrowDown className="ml-2" />
  }

  // Haal hondengegevens op en stel deze in de staat met behulp van de `setDogs`-functie
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

  // Zoek naar een specifiek hondenras en stel de staat in met de zoekresultaten
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
  // Handelt het formulier af om te zoeken
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
              <button className="my-8 black inline-flex leading-4 bg-transparent hover:bg-white hover:text-gray-400 border-black active:border-black font-semibold  py-2 px-4 border border-white hover:border-transparent rounded	" onClick={sortByWeight}>    Weight  {sorted.sorted === "weight" ? renderArrow() : null} 	 </button>        
              <button className="my-8 black inline-flex leading-4 bg-transparent hover:bg-white hover:text-gray-400 border-black active:border-black font-semibold  py-2 px-4 border border-white hover:border-transparent rounded	" onClick={sortByLifeSpan}>    Life span  {sorted.sorted === "life_span" ? renderArrow() : null} 	 </button>              </div>
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