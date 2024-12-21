 enum vacanciesTital {
  Dotnet = "Dotnet Developer",
  Python = "Python Developer",
  Php = "Php Developer",
  Testing = "Automation Tester"
}

 enum Qualification {
  MCA = "MCA",
  MTech = "M.Tech",
  BCA= "BCA",
   IT = "Infromation Technology"
}

export interface vacancies {
  Id: number,
  Name: string,
  Opening?:number,
  Experience?: string,
  Qualification?: string,
  Basic_Skill?: string
}

let vacancy:Array<vacancies> = []
let ids:number=0;


function Add(e:Event):void{
  e.preventDefault()
  console.log("afsfasf")
  const vacancyname=document.getElementById("sel2") as HTMLSelectElement;
  const numberOfOpening=document.getElementById("opening") as HTMLInputElement;
  const Experience=document.getElementById("Experience") as HTMLInputElement;
  const selectqlt=document.getElementById("select-qlt") as HTMLInputElement;
  const Skill=document.getElementById("Skill") as HTMLTextAreaElement;
  if(!localStorage.getItem('vacancydata')){
    ids = 1
  } else {
    let data: Array<vacancies> = JSON.parse(localStorage.getItem('vacancydata') as string);
    ids = data.length + 1;
  } 
   
  console.log(ids)
  let data:vacancies={
     'Id':ids,
     'Name':vacancyname.value,
     'Opening': parseInt(numberOfOpening.value),
     'Experience':Experience.value,
     'Qualification':selectqlt.value,
     'Basic_Skill': Skill.value

  }
  console.log(data,"hello data is this");
    if(!localStorage.getItem('vacancydata')){
      vacancy.push(data)
      localStorage.setItem('vacancydata',JSON.stringify(vacancy))
    } else {
      let oldVacancy: Array<vacancies> = JSON.parse(localStorage.getItem('vacancydata') as string);
      oldVacancy.push(data)
      localStorage.setItem('vacancydata',JSON.stringify(oldVacancy))
    }
    alert("insert Vacancy successfully")
    vacancyname.value="";
    Experience.value="";
    selectqlt.value="";
    Skill.value="";
   
}


function enumdata():void {
  const selectitel = document.getElementById("sel2") as HTMLSelectElement;
  Object.values(vacanciesTital).forEach(item => {
    let opetion = document.createElement("option")
    opetion.value = item;
    opetion.textContent = item;
    selectitel.appendChild(opetion)
  })
  
}
window.addEventListener('DOMContentLoaded',()=>{
  enumdata()
  const selecQualification = document.getElementById("select-qlt") as HTMLSelectElement;
  Object.values(Qualification).forEach(item => {
    let opetion = document.createElement("option")
    opetion.value = item;
    opetion.textContent = item;
    selecQualification.appendChild(opetion)
  })

})


