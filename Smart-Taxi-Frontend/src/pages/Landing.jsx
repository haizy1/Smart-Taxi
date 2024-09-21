// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import taxiImage from "../assets/taxi1.png";
// import "../styles/Landing.css"; // Make sure Tailwind CSS is included in your project

// const Landing = () => {
//   const [dropdownVisible, setDropdownVisible] = useState(false);

//   const toggleDropdown = () => {
//     setDropdownVisible(!dropdownVisible);
//   };

//   return (
//     <div>
//       <header className="bg-white text-black body-font">
//         <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
//           <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
//             <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
//               <img className="w-10 h-10 mr-2" src={taxiImage} alt="Taxi Logo" />
//               <span className="text-black text-xl">STaxi</span>
//             </a>
//           </a>
//           <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
//             <a className="mr-5 hover:text-gray-900" href="services.html">
//               Get started
//             </a>
//             <a className="mr-5 hover:text-gray-900" href="passager.html">
//               Services
//             </a>
//             <a className="mr-5 hover:text-gray-900" href="chauffeur.html">
//               Safety
//             </a>
//             <a className="mr-5 hover:text-gray-900" href="contact.html">
//               About Us
//             </a>
//           </nav>
//           <div className="relative">
//             <button
//               onClick={toggleDropdown}
//               className="inline-flex items-center  border-0 py-1 px-3 focus:outline-none hover:bg-black  hover:text-white rounded text-base mt-4 md:mt-0 mr-4 font-bold"
//               style={{ backgroundColor: "#ffc107" }}
//             >
//               SignUp
//             </button>

//             {dropdownVisible && (
//               <div className="absolute mt-2 w-full bg-white rounded-md shadow-lg">
//                 <ul>
//                   <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
//                     <Link to="/register"> Client </Link>
//                   </li>
//                   <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
//                     <Link to="/registerdriver">Driver</Link>
//                   </li>
//                 </ul>
//               </div>
//             )}
//             <button className="inline-flex items-center bg-gray-100 border-0 py-1 px-5 focus:outline-none hover:bg-black hover:text-white rounded text-base mt-4 md:mt-0 font-bold">
//               <Link to="/login">Login </Link>
//             </button>
//           </div>
//         </div>
//       </header>

//       <section className="text-gray-600 body-font">
//         <div className="container px-5 py-24 mx-auto flex flex-wrap">
//           <h2 className="sm:text-3xl text-2xl text-gray-900 font-medium title-font mb-2 md:w-2/5">
//             La route la plus intelligente vers votre destination, avec STaxi!
//           </h2>
//           <div className="md:w-3/5 md:pl-6">
//             <p className="leading-relaxed text-base">
//               Bienvenue sur notre application de Smart Taxi innovante, où le
//               confort rencontre l'efficacité. Notre plateforme relie de manière
//               transparente les passagers à des services de taxi fiables tout en
//               offrant aux chauffeurs des outils avancés pour optimiser leurs
//               trajets et prédire les prix.
//               <br />
//               Pour les passagers, notre application offre une expérience sans
//               tracas. Il vous suffit de créer un compte, d'indiquer votre
//               destination, et notre système intelligent vous mettra en relation
//               avec le chauffeur disponible le plus proche.
//               <br />
//               Les chauffeurs bénéficient également de notre technologie de
//               pointe. En s'inscrivant sur notre plateforme, les chauffeurs ont
//               accès à des fonctionnalités d'optimisation de trajet alimentées
//               par l'intelligence artificielle. Cela réduit non seulement le
//               temps de déplacement, mais améliore également l'efficacité
//               globale, permettant aux chauffeurs de servir plus de passagers et
//               de maximiser leurs gains.
//               <br />
//               <br />
//             </p>
//             <div className="flex md:mt-4 mt-6">
//               <button className="inline-flex text-white bg-yellow-500 border-0 py-1 px-4 focus:outline-none hover:bg-yellow-600 rounded">
//                 <a href="services.html">Nos services</a>
//               </button>
//             </div>
//           </div>
//         </div>
//       </section>

//       <footer className="text-gray-600 body-font">
//         <div className="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
//           <a className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               stroke="currentColor"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               className="w-10 h-10 text-white p-2 bg-yellow-500 rounded-full"
//               viewBox="0 0 24 24"
//             >
//               <image x="0" y="0" width="23" height="22" xlinkHref={taxiImage} />
//             </svg>
//             <span className="ml-3 text-xl">STaxi</span>
//           </a>
//           <p className="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">
//             © 2024 STaxi —
//             <a
//               href="https://twitter.com/knyttneve"
//               className="text-gray-600 ml-1"
//               rel="noopener noreferrer"
//               target="_blank"
//             >
//               @GCDSTEGroup
//             </a>
//           </p>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default Landing;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import taxiImage from "../assets/taxi1.png";
import gemini from "../assets/gemini.jpg";
import "../styles/Landing.css"; // Import the CSS file

const Landing = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <div>
      <header className="bg-white text-black body-font">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
            <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
              <img className="w-10 h-10 mr-2" src={taxiImage} alt="Taxi Logo" />
              <span className="text-black text-xl">STaxi</span>
            </a>
          </a>
          <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
            <a className="mr-5 hover:text-gray-900" href="#get-started">
              Get started
            </a>
            <a className="mr-5 hover:text-gray-900" href="#services">
              Services
            </a>
            <a className="mr-5 hover:text-gray-900" href="#safety">
              Safety
            </a>
            <a className="mr-5 hover:text-gray-900" href="#about-us">
              About Us
            </a>
          </nav>
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="inline-flex items-center  border-0 py-1 px-3 focus:outline-none hover:bg-black  hover:text-white rounded text-base mt-4 md:mt-0 mr-4 font-bold"
              style={{ backgroundColor: "#ffc107" }}
            >
              SignUp
            </button>

            {dropdownVisible && (
              <div className="absolute mt-2 w-full bg-white rounded-md shadow-lg">
                <ul>
                  <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                    <Link to="/register"> Client </Link>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                    <Link to="/registerdriver">Driver</Link>
                  </li>
                </ul>
              </div>
            )}
            <button className="inline-flex items-center bg-gray-100 border-0 py-1 px-5 focus:outline-none hover:bg-black hover:text-white rounded text-base mt-4 md:mt-0 font-bold">
              <Link to="/login">Login </Link>
            </button>
          </div>
        </div>
      </header>

      <section href="#get-started" class="text-gray-600 body-font">
        <div class="container  mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
          <div class="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
            <h1 class="title-font sm:text-4xl text-3xl mb-4 font-bold text-gray-900">
              Smart Taxi
              <br class="hidden lg:inline-block font-bold" />
              Revolutionizing Urban Transportation
            </h1>
            <p class="mb-8 leading-relaxed">
              Experience seamless taxi reservations, real-time tracking, and the
              fastest routes with our innovative Smart Taxi system, enhancing
              convenience, efficiency, and comfort for all users.
            </p>
          </div>
          <div class="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
            <img
              class="object-cover object-center rounded"
              alt="hero"
              src={gemini}
            />
          </div>
        </div>
      </section>

      <section href="#services" class="text-gray-600 body-font">
        <div class="container  text-center px-5 py-24 mx-auto">
          <h1 class="sm:text-3xl text-2xl font-medium title-font text-gray-900 mb-4">
            Services
          </h1>

          <div class="flex mt-6  justify-center">
            <div class="w-16 h-1 rounded-full bg-yellow-500 inline-flex"></div>
          </div>
          <div class="flex flex-wrap -m-4">
            <div class="p-4 lg:w-1/3">
              <div class="h-full bg-gray-100 bg-opacity-75 px-8 pt-16 pb-24 rounded-lg overflow-hidden text-center relative">
                <h2 class="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                  Service 1
                </h2>
                <h1 class="title-font sm:text-2xl text-xl font-medium text-gray-900 mb-3">
                  Find The Closest Taxi
                </h1>
                <p class="leading-relaxed mb-3">
                  this feature allows you to swiftly locate the nearest
                  available taxi with just a few . Leveraging cutting-edge
                  geolocation technology, our platform intelligently matches you
                  with the closest taxi in your vicinity, ensuring prompt and
                  efficient transportation
                </p>
                <a class=" text-[#ffc107] inline-flex items-center">
                  Learn More
                  <svg
                    class="w-4 h-4 ml-2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M5 12h14"></path>
                    <path d="M12 5l7 7-7 7"></path>
                  </svg>
                </a>
                <div class="text-center mt-2 leading-none flex justify-center absolute bottom-0 left-0 w-full py-4"></div>
              </div>
            </div>
            <div class="p-4 lg:w-1/3">
              <div class="h-full bg-gray-100 bg-opacity-75 px-8 pt-16 pb-24 rounded-lg overflow-hidden text-center relative">
                <h2 class="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                  Service 2
                </h2>
                <h1 class="title-font sm:text-2xl text-xl font-medium text-gray-900 mb-3">
                  Find The Fastest Route To Destination
                </h1>
                <p class="leading-relaxed mb-3">
                  Navigate your journeys with ease and efficiency using
                  STaxi.Powered by advanced routing algorithms and google maps
                  APIs.our platform ensures reaching your destination swiftly
                  and seamlessly.
                </p>
                <a class=" text-[#ffc107] inline-flex items-center">
                  Learn More
                  <svg
                    class="w-4 h-4 ml-2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M5 12h14"></path>
                    <path d="M12 5l7 7-7 7"></path>
                  </svg>
                </a>
                <div class="text-center mt-2 leading-none flex justify-center absolute bottom-0 left-0 w-full py-4"></div>
              </div>
            </div>
            <div class="p-4 lg:w-1/3">
              <div class="h-full bg-gray-100 bg-opacity-75 px-8 pt-16 pb-24 rounded-lg overflow-hidden text-center relative">
                <h2 class="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                  Service 3
                </h2>
                <h1 class="title-font sm:text-2xl text-xl font-medium text-gray-900 mb-3">
                  Find Clients nearby
                </h1>
                <p class="leading-relaxed mb-3">
                  Empower your taxi business with our service, designed to
                  connect drivers with potential passengers in their vicinity
                  seamlessly. Through our intuitive platform, drivers can
                  effortlessly locate nearby clients seeking transportation
                  services
                </p>
                <a class=" text-[#ffc107] inline-flex items-center">
                  Learn More
                  <svg
                    class="w-4 h-4 ml-2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M5 12h14"></path>
                    <path d="M12 5l7 7-7 7"></path>
                  </svg>
                </a>
                <div class="text-center mt-2 leading-none flex justify-center absolute bottom-0 left-0 w-full py-4"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* -----------------------------------------------------------------------------
      ---------------------------------------------------------------------------- */}
      <section href="#safety" class="text-gray-600 body-font">
        <div class="container px-5 py-24 mx-auto">
          <div class="text-center mb-20">
            <h1 class="sm:text-3xl text-2xl font-medium title-font text-gray-900 mb-4">
              Safety
            </h1>

            <div class="flex mt-6 justify-center">
              <div class="w-16 h-1 rounded-full bg-[#ffc107] inline-flex"></div>
            </div>
          </div>
          <div class="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4 md:space-y-0 space-y-6">
            <div class="p-4 md:w-1/3 flex flex-col text-center items-center">
              <div class="w-20 h-20 inline-flex items-center justify-center rounded-full bg-[#ffc107] bg-opacity-20 text-[#ffc107] mb-5 flex-shrink-0">
                <svg
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  class="w-10 h-10"
                  viewBox="0 0 24 24"
                >
                  <path d="M3 6h18M3 12h18M3 18h18"></path>
                </svg>
              </div>
              <div class="flex-grow">
                <h2 class="text-gray-900 text-lg title-font font-medium mb-3">
                  Choose Your Driver
                </h2>
                <p class="leading-relaxed text-base">
                  Select from a list of verified drivers to ensure a safe and
                  pleasant ride to your destination.
                </p>
                <a class="mt-3 text-[#ffc107] inline-flex items-center">
                  Learn More
                  <svg
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    class="w-4 h-4 ml-2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                  </svg>
                </a>
              </div>
            </div>
            <div class="p-4 md:w-1/3 flex flex-col text-center items-center">
              <div class="w-20 h-20 inline-flex items-center justify-center rounded-full bg-[#ffc107] bg-opacity-20 text-[#ffc107] mb-5 flex-shrink-0">
                <svg
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  class="w-10 h-10"
                  viewBox="0 0 24 24"
                >
                  <circle cx="12" cy="12" r="3"></circle>
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                </svg>
              </div>
              <div class="flex-grow">
                <h2 class="text-gray-900 text-lg title-font font-medium mb-3">
                  Driver Verification
                </h2>
                <p class="leading-relaxed text-base">
                  Our platform ensures all drivers are verified for safety and
                  reliability, giving you peace of mind on your journey.
                </p>
                <a class="mt-3 text-[#ffc107] inline-flex items-center">
                  Learn More
                  <svg
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    class="w-4 h-4 ml-2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                  </svg>
                </a>
              </div>
            </div>
            <div class="p-4 md:w-1/3 flex flex-col text-center items-center">
              <div class="w-20 h-20 inline-flex items-center justify-center rounded-full bg-[#ffc107] bg-opacity-20 text-[#ffc107] mb-5 flex-shrink-0">
                <svg
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  class="w-10 h-10"
                  viewBox="0 0 24 24"
                >
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
              <div class="flex-grow">
                <h2 class="text-gray-900 text-lg title-font font-medium mb-3">
                  Safety Button
                </h2>
                <p class="leading-relaxed text-base">
                  Quickly access emergency services or notify our support team
                  with a single touch for immediate assistance.
                </p>
                <a class="mt-3 text-[#ffc107] inline-flex items-center">
                  Learn More
                  <svg
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    class="w-4 h-4 ml-2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
              
      </section>

      <footer className="text-gray-600 body-font">
        <div className="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
          <a className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-10 h-10 text-white p-2 bg-yellow-500 rounded-full"
              viewBox="0 0 24 24"
            >
              <image x="0" y="0" width="23" height="22" xlinkHref={taxiImage} />
            </svg>
            <span className="ml-3 text-xl">STaxi</span>
          </a>
          <p className="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">
            © 2024 STaxi —
            <a
              href="https://twitter.com/knyttneve"
              className="text-gray-600 ml-1"
              rel="noopener noreferrer"
              target="_blank"
            >
              @GCDSTEGroup
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
