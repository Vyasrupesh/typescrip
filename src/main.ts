import { vacancies } from "./createvacancy";
enum status{
  pendding='pendding',
  Rejecte='Rejecte',
  Success='Success'
}

interface CandidateData{
  ID:number,
  Name:string,
  Experience:number,
  Qualification:string,
  Cd_Skill:string
}
interface ApplyVacancyData{
  Id:number,
  vacancy:vacancies,
  candidate:CandidateData,
  status:status
}

function viewvacancies():void{
    
     const vacancydata=document.getElementById("vacancydata") as HTMLTableElement
    let data:vacancies[]= JSON.parse(localStorage.getItem('vacancydata')!)
      console.log(data)
      let row=''
      if(data != null) {
        data.forEach(item => {
            row +=`<tr style="font-size:15px;">
                 <td>${item.Id}</td>  
                 <td>${item.Name}</td>
                 <td>${item.Opening}</td>
                 <td>${item.Experience}</td>
                 <td>${item.Qualification}</td>
                 <td>${item.Basic_Skill}</td>
                 <td><button name="apply" id="${item.Id}" class="btn btn-primary">Apply</button></td>
              </tr>`
          });
        }else{
          row +=`
                  <tr>
                  <td colspan="6"> No Data Available</td>
                  </tr>
          `
        }
        
        vacancydata.innerHTML +=row
}
const dispalyform=document.getElementById("ApplyVacancyForm") as HTMLDivElement
function Apply(id:number){
  const vacancyid=document.getElementById("vacancyid") as HTMLInputElement
  const vacancyName=document.getElementById("vacancyName") as HTMLInputElement
  dispalyform.style.display='block';
   let data:vacancies[]= JSON.parse(localStorage.getItem('vacancydata')!)
    data.forEach(item=>{
      if(item.Id == id){  
        vacancyid.value=item.Id.toString()!;
        vacancyName.value=item.Name!; 
      }
    })
}

let application:Array<ApplyVacancyData> = []
let ids:number=0;
function save(e:Event):void{
  e.preventDefault()
  const vacancyid=document.getElementById("vacancyid") as HTMLInputElement
  const vacancyName=document.getElementById("vacancyName") as HTMLInputElement
  const candidatename=document.getElementById("candidateName") as HTMLInputElement
  const Experience=document.getElementById("Experience") as HTMLInputElement
  const Qualification=document.getElementById("Qualification") as HTMLInputElement
  const Skill=document.getElementById("Skill") as HTMLTextAreaElement;
  if(!localStorage.getItem('ApplicationData')){
    ids= 1
  } else {
    let data: Array<vacancies> = JSON.parse(localStorage.getItem('ApplicationData') as string);
    ids= data.length + 1;
  } 

  var vacanci: vacancies = {
         Id: parseInt(vacancyid.value),
         Name:vacancyName.value
  }
  var candidatevalue:CandidateData={
    ID:ids,
    Name:candidatename.value,
    Experience:parseInt(Experience.value),
    Qualification:Qualification.value,
    Cd_Skill:Skill.value   
  }
  let applicationdatas:ApplyVacancyData={
        Id:ids,
        vacancy:vacanci,
        candidate:candidatevalue,
        status:status.pendding     
  }
  console.log(applicationdatas)
}


window.addEventListener('DOMContentLoaded',()=>{
  viewvacancies()
  const form=document.getElementById("ApplyVacancy") as HTMLFormElement
  form.addEventListener('submit',save)
  dispalyform.style.display='none';
  document.querySelectorAll<HTMLButtonElement>('button[name="apply"]').forEach((btn) => {    
    btn.addEventListener("click",() => Apply(parseInt(btn.id)))
  })
})

