import myProjects from './list_works.js'

const myProjectsList = document.getElementById('my-projects-list')


function SuperElement (positioning, id, title, description, role, creationDate, linkToProject, coverImage, shadow) {

  if (positioning === 'right') {
    myProjectsList.innerHTML += `<div class="pro-cont" id="${id}" >
    <div class="pro-cont__descrioptio">
        <p class="title-2-style">${title}</p>
        <p class="paragraph-0-style">${description}</p> 
        <div class="role-date"> 
            <p class="role" >${role}</p> 
            <p class="role" >&#183;</p> 
            <p class="date" >${creationDate}</p>
         </div>
         <a class="position-button" href="${linkToProject}"><button class="button-resize-butoon" >Project view <img class="pictogram-24" src="icon/icon-24-right.webp" alt=""></button> </a>
    </div>
    <div class="pro-cont__imag">
      <section class="con_imag_right" style="aspect-ratio: ${coverImage.aspectRatio}";>
        <img class="imag_4" src="${coverImage.fourth}" id="${id}_4">
        <img class="imag_3" src="${coverImage.third}" id="${id}_3">
        <img class="imag_2" src="${coverImage.second}" id="${id}_2">
        <img class="imag_1" src="${coverImage.first}" id="${id}_1">
       </section>
        <div class="pro-cont__imag__shadow">
            <div class="${shadow}" ></div>
         </div>
    </div>
    </div>`
    setTimeout(() => {
      parallax (`${id}_1`, `${id}_2`, `${id}_3`,)
    }, 100);
  } else {
    myProjectsList.innerHTML += `<div class="pro-cont" >
    <div class="pro-cont__imag">
        <section class="con_imag_left" style="aspect-ratio: ${coverImage.aspectRatio};">
          <img class="imag_4" src="${coverImage.fourth}" id="${id}_4">
          <img class="imag_3" src="${coverImage.third}" id="${id}_3">
          <img class="imag_2" src="${coverImage.second}" id="${id}_2">
          <img class="imag_1" src="${coverImage.first}" id="${id}_1">
        </section>
        <div class="pro-cont__imag__shadow">
            <div class="${shadow}" ></div>
        </div>
     </div>
    <div class="pro-cont__descrioptio" id="${id}" >
        <p class="title-2-style">${title}</p>
        <p class="paragraph-0-style">${description}</p> 
        <div class="role-date"> 
            <p class="role" >${role}</p> 
            <p class="role" >&#183;</p> 
            <p class="date">${creationDate}</p> 
        </div>
          <a class="position-button" href="${linkToProject}"><button class="button-resize-butoon" >Project view <img class="pictogram-24" src="icon/icon-24-right.webp" alt=""></button> </a>
      </div>
    </div>`
    setTimeout(() => {
      parallax (`${id}_1`, `${id}_2`, `${id}_3`,)
    }, 100);
  }
  
}


for (let i = 0; i < myProjects.length; i++) {
  const myProject = new SuperElement(myProjects[i].positioning, myProjects[i].id, myProjects[i].title, myProjects[i].description, myProjects[i].role, myProjects[i].creationDate, myProjects[i].linkToProject, myProjects[i].coverImage, myProjects[i].shadowStyle)
}


// ================= Adaugara efectului de paralax =================

function parallax (imagFirst, imagSecond, imagThird,) {


  // Incarcam imaginile care le vom modifica
  let controlImagFirst = document.getElementById(imagFirst)
  let controlImagSecond = document.getElementById(imagSecond)
  let controlImagTertiary = document.getElementById(imagThird)

  console.log(controlImagFirst)
  console.log(controlImagSecond)
  console.log(controlImagTertiary)
  
  // Aflam cordonatele imaginilor pe pagina
  let rect = controlImagFirst.getBoundingClientRect()

  // Aflam dimensiunea ecranului de vizualizare
  let windowHeight = window.innerHeight

  // Modificam pozitia in timpul scrolului
  window.addEventListener('scroll', function() {
    let value = window.scrollY
    if(value > (rect.top - windowHeight)){
      let zero = value - (rect.top - windowHeight)
      controlImagFirst.style.top = ((windowHeight*0.85) * 0.8) - (zero * 0.8)  + 'px'
      controlImagSecond.style.top = ((windowHeight*0.85) * 0.3) - (zero * 0.3)  + 'px'
      controlImagTertiary.style.top = ((windowHeight*0.85) * 0.2) - (zero * 0.2)  + 'px'
    }
  })
  
}




