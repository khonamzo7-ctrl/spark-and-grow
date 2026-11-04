// Website configuration: add business contact details when available.
// Example: whatsappNumber: '27712345678' (country code, no '+' or spaces)
const SITE_CONFIG = { whatsappNumber: '', businessEmail: '' };
const services = [
  { icon:'▤', title:'Business Plan Development', description:'Practical plans to explain your business idea, goals and financial needs.', price:'From R750' },
  { icon:'◈', title:'Company Profile Design', description:'Professional company profiles that introduce your business with confidence.', price:'From R400' },
  { icon:'◇', title:'Funding Proposal Preparation', description:'Well-structured proposals and supporting business documents for applications.', price:'From R500' },
  { icon:'≡', title:'Professional Quotations', description:'Clear, branded quotations that help you present prices to customers.', price:'From R100' },
  { icon:'▣', title:'Invoice Preparation', description:'Simple and organised invoices for your products or services.', price:'From R50' },
  { icon:'◉', title:'CV & Cover Letter', description:'Professionally structured application documents for jobseekers.', price:'From R150' },
  { icon:'✎', title:'Document Formatting', description:'Neat business documents, reports and presentation formatting.', price:'From R100' },
  { icon:'⌘', title:'Website Design', description:'Simple websites that help small businesses build an online presence.', price:'From R1,000' }
];
const grid = document.getElementById('service-grid');
const select = document.getElementById('service-select');
services.forEach(s => {
  const article=document.createElement('article');article.className='service-card';
  article.innerHTML=`<div class="service-icon" aria-hidden="true">${s.icon}</div><h3>${s.title}</h3><p>${s.description}</p><div class="service-bottom"><strong>${s.price}</strong><button type="button">Enquire ↗</button></div>`;
  article.querySelector('button').addEventListener('click',()=>{select.value=s.title;document.getElementById('quote').scrollIntoView({behavior:'smooth'});});
  grid.appendChild(article);
  const option=document.createElement('option');option.value=s.title;option.textContent=s.title;select.appendChild(option);
});
const toggle=document.querySelector('.menu-toggle');const nav=document.getElementById('primary-nav');
toggle.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Close navigation menu':'Open navigation menu');});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');toggle.setAttribute('aria-expanded','false');}));
document.getElementById('year').textContent=new Date().getFullYear();
let preparedMessage='';
document.getElementById('quote-form').addEventListener('submit',e=>{
  e.preventDefault();const f=e.currentTarget;if(!f.reportValidity())return;const d=new FormData(f);
  preparedMessage=`Hello Spark & Grow,\n\nI would like to request a quotation.\n\nName: ${d.get('name')}\nPhone: ${d.get('phone')}\nEmail: ${d.get('email')||'Not provided'}\nService: ${d.get('service')}\nTimeframe: ${d.get('timeframe')}\nBudget: ${d.get('budget')}\n\nProject details:\n${d.get('details')}\n\nPlease let me know the next steps.`;
  const result=document.getElementById('enquiry-result');result.hidden=false;
  const subject=encodeURIComponent(`Spark & Grow enquiry: ${d.get('service')}`);
  const body=encodeURIComponent(preparedMessage);
  const email=document.getElementById('email-enquiry');
  if(SITE_CONFIG.businessEmail){email.href=`mailto:${SITE_CONFIG.businessEmail}?subject=${subject}&body=${body}`;email.hidden=false;}else{email.hidden=true;}
  const wa=document.getElementById('wa-enquiry');
  if(SITE_CONFIG.whatsappNumber){wa.href=`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${body}`;wa.hidden=false;}else{wa.hidden=true;}
  result.scrollIntoView({behavior:'smooth',block:'nearest'});
});
document.getElementById('copy-enquiry').addEventListener('click',async e=>{
  try{await navigator.clipboard.writeText(preparedMessage);e.currentTarget.textContent='Copied ✓';setTimeout(()=>e.currentTarget.textContent='Copy message',2500);}catch{window.prompt('Copy your enquiry message:',preparedMessage);}
});