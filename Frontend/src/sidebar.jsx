import "./SidebarStyle.css";


function Sidebar(){
    return (
      <section className="section">
        <button>
           <img  className="logo"src="/blacklogo.png" />
           <span><i class="fa-solid fa-pen-to-square"></i></span>
        </button>
         <ul className="history">
            <li>history1</li>
            <li>history2</li>
            <li>hostory3</li>

         </ul>

         <div className="sign">
            <p> By Yash Kofgirwar &hearts;</p>
         </div>

      </section>
  )
}

export default Sidebar;