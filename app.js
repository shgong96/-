function pad(n){return String(n).padStart(3,'0')}
function today(){const d=new Date();return d.toISOString().slice(0,10)}
const dateEl=document.getElementById('reqDate')
const noEl=document.getElementById('reqNo')
dateEl.value=today()
function issue(){
 const ymd=dateEl.value.replaceAll('-','')
 const k='ir_'+ymd
 const c=(+localStorage.getItem(k)||0)+1
 localStorage.setItem(k,c)
 noEl.value=`IR-${ymd}-${pad(c)}`
 render()
}
function render(){
 document.querySelectorAll('[data-bind]').forEach(el=>{
  const id=el.dataset.bind
  if(id==='reqDateFmt') el.textContent=dateEl.value
  else el.textContent=document.getElementById(id)?.value||''
 })
}
document.getElementById('btnNewNo').onclick=issue
document.getElementById('btnPrint').onclick=()=>window.print()
document.querySelectorAll('input,textarea').forEach(e=>e.oninput=render)
issue()
