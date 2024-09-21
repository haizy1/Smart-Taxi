// import { useState } from "react";
// import taxi1 from "../../assets/taxi1.png";
// import controle from "../../assets/control.png";
// import notif from "../../assets/notif.png"; // Import the Folder image
// import map1 from "../../assets/map1.png"; // Import the Chart image
// import { IoNotificationsOutline } from "react-icons/io5";
// import { FaMapLocationDot } from "react-icons/fa6";
// const SideBare = () => {
//   const [open, setOpen] = useState(true);

//   const Menus = [
//     { title: "Map", icon: FaMapLocationDot, gap: true }, // Use the imported Folder image
//     { title: "Notification", icon: IoNotificationsOutline }, // Use the imported Chart image
//   ];

//   return (
//     <div
//       className={` ${
//         open ? "w-71" : "w-20 "
//       } bg-black h-screen p-5  pt-8 relative duration-300`}
//     >
//       <img
//         src={controle}
//         className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
//            border-2 rounded-full  ${!open && "rotate-180"}`}
//         onClick={() => setOpen(!open)}
//         alt="Control"
//       />
//       <div className="flex gap-x-4 items-center">
//         <img
//           src={taxi1}
//           className={`cursor-pointer duration-500 ${open && "rotate-[360deg]"}`}
//           alt="Logo"
//         />
//         <h1
//           className={`text-white origin-left font-bold text-xl duration-200 ${
//             !open && "scale-0"
//           }`}
//         >
//           Smart-Taxi
//         </h1>
//       </div>
//       <ul className="pt-6">
//         {Menus.map((Menu, index) => (
//           <li
//             key={index}
//             className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4
//               ${Menu.gap ? "mt-9" : "mt-2"} ${
//               index === 0 && "bg-light-white"
//             } `}
//           >
//             <Menu.icon size={20} /> {/* Use Menu.src */}
//             <span className={`${!open && "hidden"} origin-left duration-200`}>
//               {Menu.title}
//             </span>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default SideBare;

//------------------------------

import { useState } from "react";
import taxi1 from "../../assets/taxi1.png";
import controle from "../../assets/control.png";
import { IoNotificationsOutline } from "react-icons/io5";
import { FaMapLocationDot } from "react-icons/fa6";
import { useNavigate } from "react-router-dom"; // Import useNavigate if not already imported

const SideBare = () => {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate(); // Hook for navigation

  // Logout handler function
  const handleLogout = () => {
    localStorage.removeItem("auth"); // Remove authentication token
    setTimeout(() => {
      navigate("/"); // Redirect to home page after logout
    }, 200);
  };

  const Menus = [
    { title: "Map", icon: FaMapLocationDot, gap: true },
    { title: "Notification", icon: IoNotificationsOutline },
    { title: "Logout", icon: null, onClick: handleLogout }, // Add a logout menu item
  ];

  return (
    <div
      className={` ${
        open ? "w-71" : "w-20 "
      } bg-black h-[800px] p-5  pt-8 relative duration-300`}
    >
      <img
        src={controle}
        className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
           border-2 rounded-full  ${!open && "rotate-180"}`}
        onClick={() => setOpen(!open)}
        alt="Control"
      />
      <div className="flex gap-x-4 items-center">
        <img
          src={taxi1}
          className={`cursor-pointer duration-500 ${open && "rotate-[360deg]"}`}
          alt="Logo"
        />
        <h1
          className={`text-white origin-left font-bold text-xl duration-200 ${
            !open && "scale-0"
          }`}
        >
          Smart-Taxi
        </h1>
      </div>
      <ul className="pt-6">
        {Menus.map((Menu, index) => (
          <li
            key={index}
            className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
              ${Menu.gap ? "mt-9" : "mt-2"} ${
              index === 0 && "bg-light-white"
            } `}
            onClick={Menu.onClick} // Call onClick function on click
          >
            {Menu.icon && <Menu.icon size={20} />}{" "}
            {/* Render icon if available */}
            <span className={`${!open && "hidden"} origin-left duration-200`}>
              {Menu.title}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideBare;
