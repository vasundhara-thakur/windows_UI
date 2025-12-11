const body = document.body;
const clickMenu = document.getElementById("clickMenu");

body.addEventListener("contextmenu",(e) => {
    e.preventDefault();  

    const menuHeight = clickMenu.offsetHeight;
    const menuWidth = clickMenu.offsetWidth;

    const taskbarHeight = 45;  
    const extraGap = 10;
    let top = e.pageY;
    let left = e.pageX;

    const maxAllowedY = window.innerHeight - taskbarHeight - menuHeight - extraGap;

     if (e.pageY >= maxAllowedY) {
        top = maxAllowedY;
    } else {
        top = e.pageY;
    }

   
    if (e.pageX + menuWidth > window.innerWidth) {
        left = e.pageX - menuWidth;
    }

    clickMenu.style.top = `${top}px`;
    clickMenu.style.left = `${left}px`;

    clickMenu.style.display = "block";
  
});

document.addEventListener("click", (e) => {
    
    if (clickMenu.contains(e.target)) return;

    clickMenu.style.display = "none";
});


const desktopItems = [
  {
    name: "This PC",
    icon: "./desktop-icons/thispc.png"
  },
  {
    name: "Recycle Bin",
    icon: "./desktop-icons/recycle-bin.png"
  },
  {
    name: "Documents",
    icon: "./desktop-icons/documents.png"
  },
  {
    name: "Pictures",
    icon: "./desktop-icons/pictures.png"
  },
  {
    name: "Videos",
    icon: "./desktop-icons/videos.png"
  },
  {
    name: "Music",
    icon: "./desktop-icons/music.png"
  },
  {
    name: "Notepad",
    icon: "./desktop-icons/notepad.png"
  },
  {
    name: "Chrome",
    icon: "./desktop-icons/chrome.png"
  },
  {
    name: "Edge",
    icon: "./desktop-icons/edge.png"
  },
  {
    name: "Control Panel",
    icon: "./desktop-icons/control-panel.png"
  },
  {
    name: "Clock",
    icon: "./desktop-icons/clock.png"
  },
  {
    name: "Setting",
    icon: "./desktop-icons/settings.png"
  }
];


const desktop = document.querySelector(".desktop");
let sum = "";
desktopItems.forEach(item => {
   sum +=  `
      <div class="icon">
        <img src="${item.icon}" />
        <p>${item.name}</p>
      </div>
  `;
});

desktop.innerHTML = sum;


const startMenu = document.getElementById("startMenu");
let menuVisible = false;
let menu;

startMenu.addEventListener("click", (e) => {
  e.stopPropagation(); 

  if (!menuVisible) {
    menu = document.createElement("div");
    menu.classList.add("start-menu");
    menu.style.display = "block";

    let menuIcons = "";
    desktopItems.forEach(item => {
  menuIcons += `
    <div class="menu-app">
      <img src="${item.icon}" alt="${item.name}">
      <p>${item.name}</p>
    </div>
  `;
});


    menu.innerHTML = `
      <div class="search-bar">
          <i class="ri-search-line"></i>
          <input type="text" placeholder="Search for apps, settings and documents">
      </div>

      <div class="menu-item">
          ${menuIcons}
      </div>

      <div class="menu-bottom">
         <div class="bottom-left">
           <i class="ri-account-circle-fill"></i>
           <h4>Admin</h4>
         </div>

         <div class="bottom-right">
           <i class="ri-shut-down-line"></i>
         </div>
      </div>
    `;

    document.body.appendChild(menu);
    menuVisible = true;

  } else {
    menu.remove();
    menuVisible = false;
  }
});

document.addEventListener("click", (e) => {
  if (menuVisible && menu && !menu.contains(e.target)) {
    menu.remove();
    menuVisible = false;
  }
});