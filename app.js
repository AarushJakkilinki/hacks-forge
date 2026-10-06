const SAMPLE_RESPONSES={chat:[
'That\'s a great question. Think of it like a [relevant analogy]. The key point is that [core concept], which means [consequence or application].',
'Good thinking. Let me break this down: [part 1] works together with [part 2]. The reason this matters is [why it\'s important]. Can you see how that connects?',
'Exactly. What you\'re noticing is [observation]. This happens because [mechanism]. In practice, it means [real-world example].',
'I like how you\'re approaching this. Remember that [key principle] is fundamental here. That\'s why [consequence or connection].',
'Let\'s think about this step by step. First, [step 1]. Then, [step 2] leads to [step 3]. Does that help clarify it?'
],tutor:[
'What do you already know about this topic? Tell me your understanding.',
'Interesting start. Now, how would you explain that to someone who\'s never heard of it before?',
'Good effort. Here\'s a hint: think about [related concept]. How might that connect?',
'You\'re on the right track. What would happen if [edge case or variation]?',
'Nice work. So if that\'s true, what does it mean for [related situation]?',
'Exactly. And how would you apply that to [real-world scenario]?',
'Let me ask it differently. What\'s the relationship between [concept A] and [concept B]?'
],notes:{
'Cell Structures':'Cell membranes are made of lipids and proteins. The nucleus contains DNA. Mitochondria produce energy (ATP). The endoplasmic reticulum synthesizes proteins (rough ER) or lipids (smooth ER). Golgi apparatus packages and ships proteins. Lysosomes contain digestive enzymes. Ribosomes are protein factories.',
'Molecular Biology':'DNA stores genetic information in sequences of base pairs: A-T and G-C. Transcription copies DNA to RNA. Translation uses tRNA to build proteins from mRNA codons. DNA replication creates exact copies before cell division. Mutations are changes in DNA sequence that can affect protein function.',
'Cellular Energy':'Photosynthesis converts light energy into chemical energy (glucose). Cellular respiration breaks down glucose to produce ATP. Glycolysis occurs in the cytoplasm, producing 2 ATP per glucose. The Krebs cycle and electron transport chain occur in mitochondria, producing 30-32 ATP per glucose. Anaerobic respiration (fermentation) produces 2 ATP without oxygen.',
'Osmosis & Transport':'Osmosis is the movement of water across a semipermeable membrane. Diffusion is the movement of particles from high to low concentration. Active transport requires energy to move substances against the gradient. Facilitated diffusion uses proteins to help substances cross the membrane. Endocytosis and exocytosis move large particles in and out of cells.'
},quizzes:{
'Easy':[
{q:'What is the main function of mitochondria?',o:['Produce energy (ATP)','Store genetic information','Synthesize proteins','Digest waste'],c:0,e:'Mitochondria are the powerhouses of the cell, converting glucose into ATP through cellular respiration.'},
{q:'Which organelle contains the cell\'s genetic material?',o:['Nucleus','Mitochondria','Golgi apparatus','Ribosome'],c:0,e:'The nucleus is the control center of the cell, containing DNA and genetic instructions.'},
{q:'What is the primary structure of a cell membrane?',o:['Protein only','Lipid bilayer','Carbohydrate layer','DNA and RNA'],c:1,e:'The cell membrane is composed of a phospholipid bilayer with embedded proteins.'},
{q:'In photosynthesis, what is the main input?',o:['Oxygen','Light energy and water','Glucose','Carbon dioxide and light energy'],c:3,e:'Photosynthesis requires light energy, carbon dioxide from the air, and water from the soil.'},
{q:'What does ATP stand for?',o:['Adenosine triphosphate','Amino terminal protein','Active transport particle','Aerobic transport power'],c:0,e:'ATP (adenosine triphosphate) is the cell\'s primary energy currency.'}
],'Medium':[
{q:'During glycolysis, one glucose molecule is broken down into how many pyruvate molecules?',o:['1','2','3','4'],c:1,e:'Glycolysis produces 2 pyruvate molecules from 1 glucose, yielding a net of 2 ATP.'},
{q:'Which of these processes does NOT require oxygen?',o:['Krebs cycle','Electron transport chain','Glycolysis','Oxidative phosphorylation'],c:2,e:'Glycolysis occurs in the cytoplasm and does not require oxygen; the later stages of respiration do.'},
{q:'In DNA, adenine always pairs with?',o:['Guanine','Thymine','Cytosine','Uracil'],c:1,e:'Base pairing in DNA follows Chargaff\'s rules: A pairs with T, and G pairs with C.'},
{q:'What is the role of tRNA in protein synthesis?',o:['Carry amino acids to the ribosome','Carry genetic instructions from nucleus','Break down proteins','Store energy'],c:0,e:'tRNA (transfer RNA) brings amino acids to the ribosome, matching codons with the correct amino acid.'},
{q:'Which of the following increases the surface area of the inner mitochondrial membrane?',o:['Cristae','Matrix','Outer membrane','Intermembrane space'],c:0,e:'Cristae are folds in the inner mitochondrial membrane that increase surface area for electron transport chain reactions.'}
],'Hard':[
{q:'In the electron transport chain, electrons pass through a series of protein complexes. What is the final electron acceptor?',o:['NAD+','FAD','Oxygen','Carbon dioxide'],c:2,e:'Oxygen is the final electron acceptor in the electron transport chain, forming water when it accepts electrons and hydrogen ions.'},
{q:'What is the relationship between chemiosmotic theory and ATP synthesis?',o:['Protons pump across the membrane to create ATP','Proton gradient drives ATP synthase rotation','Light directly activates ATP synthase','Electrons directly phosphorylate ADP'],c:1,e:'The proton gradient across the inner mitochondrial membrane drives ATP synthase to phosphorylate ADP into ATP.'},
{q:'During transcription, which base in RNA replaces thymine from DNA?',o:['Adenine','Guanine','Cytosine','Uracil'],c:3,e:'During transcription, uracil (U) in RNA replaces thymine (T) from DNA. RNA contains U while DNA contains T.'},
{q:'What is the primary advantage of having a double-stranded DNA structure with base pairing?',o:['Increased storage capacity','Error detection and repair','Faster replication','Resistance to heat'],c:1,e:'Base pairing allows errors to be detected and repaired, as the complementary strand serves as a template for correction.'},
{q:'In active transport, what is the energy source that directly powers the transport?',o:['Light energy','Heat energy','ATP hydrolysis','Glucose metabolism'],c:2,e:'Active transport directly uses ATP hydrolysis (breaking ATP into ADP + phosphate) to power movement against the concentration gradient.'}
]
}};

function initSampleMode(){
 const opt=confirm('No API key detected. Use Sample Mode with mock AI responses?\n\nCancel to run offline without AI features.');
 return opt}

async function sampleChat(prompt,opts){
 opts=opts||{};const r=SAMPLE_RESPONSES.chat;
 return{text:r[Math.floor(Math.random()*r.length)]}
}

async function sampleQuiz(n,difficulty){
 const qs=SAMPLE_RESPONSES.quizzes[difficulty]||SAMPLE_RESPONSES.quizzes.Easy;
 return shuf(qs).slice(0,Math.min(n,qs.length)).map((q,i)=>({
  q:q.q,o:q.o,c:q.c,e:q.e,t:'Sample Question',id:i
 }))
}

async function sampleNotes(topic){
 return SAMPLE_RESPONSES.notes[topic]||SAMPLE_RESPONSES.notes['Molecular Biology']
}

function detectSampleMode(){
 if(typeof claude==='undefined'||!claude){
  console.warn('Claude not available. Activating Sample Mode.');
  return true}
 return false}


let SAMPLE_MODE=false,SAMPLE_INIT=false;


const $=s=>document.querySelector(s),esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const shuf=a=>[...a].sort(()=>Math.random()-.5);
const IC={home:'M3 11l9-8 9 8M5 10v10h5v-6h4v6h5V10',sets:'M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2z',plan:'M9 4L3 6v14l6-2 6 2 6-2V4l-6 2zM9 4v14M15 6v14',chat:'M21 12a8 8 0 01-11.6 7.1L4 20l1-4.6A8 8 0 1121 12z',tutor:'M2 9l10-5 10 5-10 5zM6 11.5V16c3 2.5 9 2.5 12 0v-4.5',flash:'M7 4h10a2 2 0 012 2v10a2 2 0 01-2 2H7a2 2 0 01-2-2V6a2 2 0 012-2zM9 20h8a2 2 0 002-2',quiz:'M12 21a9 9 0 100-18 9 9 0 000 18zM8 12l3 3 5-6',game:'M6 8h12a4 4 0 014 4v2a3 3 0 01-5.2 2L15 14H9l-1.8 2A3 3 0 012 14v-2a4 4 0 014-4zM8 10v3M6.5 11.5h3M16 11h.01M18 12.5h.01',up:'M12 16V4M7 9l5-5 5 5M4 20h16',book:'M4 5a2 2 0 012-2h12v16H6a2 2 0 00-2 2zM4 19a2 2 0 012-2h12',notes:'M6 3h9l4 4v14H6zM14 3v5h5M9 13h7M9 17h7',explain:'M3 5h18v12H3zM9 20h6M10 9l5 3-5 3z',essay:'M4 20h4L19 9l-4-4L4 16zM13 7l4 4',cal:'M7 3v4M17 3v4M4 9h16M5 5h14a1 1 0 011 1v13a1 1 0 01-1 1H5a1 1 0 01-1-1V6a1 1 0 011-1z',search:'M11 18a7 7 0 100-14 7 7 0 000 14zM20 20l-4-4',side:'M4 5h16v14H4zM9 5v14',mic:'M12 15a3 3 0 003-3V6a3 3 0 00-6 0v6a3 3 0 003 3zM6 11a6 6 0 0012 0M12 17v4',audio:'M4 12v0M8 8v8M12 5v14M16 8v8M20 11v2',apps:'M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z',play:'M8 5l11 7-11 7z',chev:'M6 9l6 6 6-6',swap:'M7 7h13l-3-3M17 17H4l3 3',plus:'M12 5v14M5 12h14'};
const ic=(n,s=18)=>`<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="${IC[n]}"/></svg>`;
const ava=(i,z)=>{const c=CHARS[i]||CHARS[0],gl=['<path d="M20 8c.9 6.3 3.7 9.1 10 10-6.3.9-9.1 3.7-10 10-.9-6.3-3.7-9.1-10-10 6.3-.9 9.1-3.7 10-10z" fill="C"/><path d="M30 26c.4 2.6 1.4 3.6 4 4-2.6.4-3.6 1.4-4 4-.4-2.6-1.4-3.6-4-4 2.6-.4 3.6-1.4 4-4z" fill="C" opacity=".5"/>','<path d="M23 7L11 23h8l-2 10 12-17h-8z" fill="C"/>','<path d="M20 10l13 6.5-13 6.5-13-6.5z" fill="C"/><path d="M13 21v5.5c3.5 3.2 10.5 3.2 14 0V21" stroke="C" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M33 16.5V25" stroke="C" stroke-width="2.4" stroke-linecap="round"/>','<circle cx="14.5" cy="17" r="2.3" fill="C"/><circle cx="25.5" cy="17" r="2.3" fill="C"/><path d="M12.5 24c2 5.5 13 5.5 15 0" stroke="C" stroke-width="2.6" fill="none" stroke-linecap="round"/>'][i]||'';return `<svg width="${z}" height="${z}" viewBox="0 0 40 40" style="flex:none"><circle cx="20" cy="20" r="19.4" fill="${c[6]}" stroke="${c[5]}" stroke-opacity=".28"/>${gl.replace(/"C"/g,`"${c[5]}"`)}</svg>`};
const aero=z=>ava(CHAR,z);
const tpick=()=>`<div class="tp">${CHARS.map((c,i)=>`<button class="tpb ${CHAR===i?'on':''}" onclick="setTeacher(${i})" title="${c[0]}: ${c[4]}">${ava(i,34)}<span>${c[0]}</span></button>`).join('')}</div>`;
function setTeacher(i){if(LOCK['send:chat']||LOCK['send:tutor']){toast('Wait for the answer to finish, then switch teachers.');return}CHAR=i;$('#dock').innerHTML=aero(40)+'<span>Chat</span>';if(pOpen)renderPanel();if(view==='tutor')go('tutor');save()}
const brand=z=>`<svg width="${z}" height="${z}" viewBox="0 0 40 40" style="flex:none"><rect width="40" height="40" rx="11" fill="#2f86d9"/><path d="M20 9c.9 6.3 3.7 9.1 10 10-6.3.9-9.1 3.7-10 10-.9-6.3-3.7-9.1-10-10 6.3-.9 9.1-3.7 10-10z" fill="#fff"/></svg>`;
const GOALS=[
{l:'College',d:'Intro courses, major requirements, finals',e:'🎓',c:'--lime',st:'university exam-style questions that test application',tp:['Intro Psychology','Microeconomics','Organic Chemistry','Calculus I','Statistics','US Government']},
{l:'Grad School',d:'Masters, PhD, dissertations',e:'📚',c:'--peach',st:'graduate-level conceptual, methodological and research-oriented questions',tp:['Research Methods','Advanced Statistics','Machine Learning','Literature Review Skills','Qualitative Analysis','Academic Writing']},
{l:'High School',d:'AP, IB, Honors, or regular classes',e:'🎒',c:'--sky',st:'AP/high-school exam style questions with clear, friendly wording',tp:['AP Biology','US History','Algebra II','Chemistry Basics','World Literature','Physics Fundamentals']},
{l:'Med School',d:'Pre-clinical, Step 1, Step 2, rotations',e:'🩺',c:'--mint',st:'USMLE-style clinical vignettes with mechanism-based reasoning',tp:['Cardiac Physiology','Autonomic Pharmacology','Renal Physiology','Microbiology','Inflammation and Repair','Metabolism Biochemistry']},
{l:'Nursing School',d:'Nursing programs, clinicals, licensure exams',e:'🏥',c:'--sky',st:'NCLEX-style priority, delegation and safety questions',tp:['Pharmacology Basics','Fluid and Electrolytes','Med-Surg: Cardiac','Maternal Newborn','Infection Control','Delegation and Prioritization']},
{l:'Professional Certification',d:'NCLEX, Bar Exam, CPA, PMP, AWS certs',e:'📜',c:'--peach',st:'scenario-based professional certification exam questions',tp:['AWS Cloud Practitioner','PMP: Risk Management','CPA: Financial Accounting','Bar: Contracts','Security+: Network Security','Agile Fundamentals']},
{l:'Standardized Tests',d:'SAT, ACT, MCAT, GRE, GMAT, LSAT',e:'📝',c:'--lime',st:'standardized-test style questions with realistic traps and distractors',tp:['SAT Math: Algebra','MCAT: Biochemistry','GRE Verbal Reasoning','LSAT Logical Reasoning','GMAT Data Sufficiency','ACT Science']},
{l:'Other',d:'Anything you want to learn',e:'✨',c:'--yel',st:'clear, general questions that build understanding',tp:['Personal Finance','Music Theory','Basic Spanish','World History','Nutrition','Public Speaking']}];
const DEF={name:'Cell Biology',icon:'🧬',demo:true,m:new Set(),
cards:[{q:'What does the plasma membrane control?',a:'What enters and leaves the cell (selective permeability).'},{q:'Why is the membrane called a fluid mosaic?',a:'Lipids and proteins move laterally, forming a mosaic of components.'},{q:'Main job of mitochondria?',a:'Make ATP through cellular respiration.'},{q:'Why does a cell need a nucleus?',a:'It protects DNA and regulates gene expression.'},{q:'Passive vs active transport?',a:'Passive moves down a gradient with no energy; active needs ATP.'},{q:'What does rough ER do?',a:'Ribosomes on it make proteins that are folded and sent onward.'}],
qs:[{q:'A cell in pure water gains water. What best explains this?',o:['Active transport pulls it in','Osmosis toward higher solute concentration','The nucleus signals it','Diffusion of ATP'],c:1,t:'Transport',e:'Water moves by osmosis toward the side with more dissolved solute.'},
{q:'Which damage would hurt ATP production most?',o:['Ribosomes','Inner mitochondrial membrane','Cell wall','Vacuole'],c:1,t:'Energy',e:'The electron transport chain sits on the inner mitochondrial membrane.'},
{q:'Why do protein-secreting cells have abundant rough ER?',o:['It stores lipids','It builds and folds secreted proteins','It makes ATP','It digests waste'],c:1,t:'Organelles',e:'Rough ER is where secreted proteins are made and folded.'},
{q:'Sodium is pumped out against its gradient. This requires…',o:['Nothing, it is passive','ATP','A larger nucleus','Osmosis'],c:1,t:'Transport',e:'Moving against a gradient is active transport and costs ATP.'}],
plan:[{t:'Chemical Foundations of Life',i:['Carbon and Functional Groups','Water Properties and Polarity','Biological Macromolecules']},{t:'Cellular Structure and Function',i:['Membrane Structure and Dynamics','Organelle Specialization','Transport Mechanisms']},{t:'Metabolic Energy Pathways',i:['Enzyme Catalysis and Inhibition','Cellular Respiration','Photosynthesis']}]};
DEF.goal=GOALS[2];
let G=GOALS[0],sets=[DEF],cur=0,view='home',ci=0,fl=false,sample=null,topic=0,xp=0,acts=0,exam='',pend=null,GM=null,fm='study',CHAR=0,snd=true,best={},EX={t:0,i:0,on:0},ES={t:'',r:''},qz={st:'setup',cfg:{d:'Medium',n:5,ins:''}},CH={chat:[],tutor:[]},TT={on:0,t:0};
const CHARS=[['Aero','friendly, clear and encouraging',"Hi there, I'm Aero",'Your study guide. Ask me anything about {s} and I will explain it clearly.','Friendly guide','#2f86d9','#e4f1fc'],['Coach','a high-energy coach who uses sports metaphors',"Let's go, I'm Coach!",'Time to train your brain on {s}. What are we working on today?','High-energy motivator','#d9780f','#fdf1e1'],['Professor','a rigorous, precise professor',"Welcome. I'm your Professor.",'Let us examine {s} carefully and precisely. Where shall we begin?','Rigorous and precise','#34506b','#e7edf3'],['Study Buddy','a relaxed friend who explains things simply',"Hey, I'm your Study Buddy!",'No stress. We will figure out {s} together, step by step.','Relaxed and simple','#16a394','#e3f6f3']];
const LOCK={},CTL={},Q={run:0,q:[],last:0,cool:0,off:0,inf:new Map()};let CUR=null;
async function getSample(){if(SAMPLE_MODE)return{json:async(p,o)=>sampleChat(p,o)};if(sample)return sample;try{sample=await claude.use('sample')}catch(e){}if(!sample&&!SAMPLE_INIT){SAMPLE_INIT=true;if(initSampleMode())SAMPLE_MODE=true;else Q.off=1}return sample}
const AIM={rate_limited:'Aero is getting a lot of requests. Wait a few seconds, then try again.',not_granted:'Claude access was not allowed for this view. Reload and allow it to use the AI features.',sampling_disabled:'Claude is not available for this account.',session_expired:'Your Claude session expired. Sign in again and reload.',invalid_json:'The answer came back malformed. Try again.',refused:'Claude declined that request. Try rewording it.',empty_completion:'No answer came back. Try again.',prompt_too_large:'That input is too long. Try a shorter excerpt.',upstream_error:'A temporary connection problem occurred. Try again.',unavailable:'AI is not available in this view. Open the artifact from claude.ai to use it.',cancelled:'Cancelled.'};
const aiMsg=e=>AIM[e&&e.code]||(e&&e.message)||'Something went wrong. Try again.';
const coolDown=()=>{Q.cool=Date.now()+15000;toast('Aero is getting a lot of requests. Cooling down for 15 seconds.')};
function J(p,o){o=o||{};const sig=o.signal||(CUR&&CUR.signal),key=p+'|'+(o.modelTier||'')+'|'+(o.cache===false?'f':'c');
 if(Q.inf.has(key))return Q.inf.get(key);
 const pr=new Promise((res,rej)=>{if(Q.off)return rej({code:'not_granted'});if(Date.now()<Q.cool)return rej({code:'rate_limited'});const op={...o};if(sig)op.signal=sig;else delete op.signal;Q.q.push({p,o:op,res,rej});pump()});
 Q.inf.set(key,pr);const dn=()=>Q.inf.delete(key);pr.then(dn,dn);return pr}
function pump(){while(Q.run<2&&Q.q.length){const t=Q.q.shift();Q.run++;(async()=>{try{
 const ab=()=>{if(t.o.signal&&t.o.signal.aborted)throw{code:'cancelled'}};ab();
 const at=Math.max(Date.now(),Q.last+600);Q.last=at;const w=at-Date.now();if(w>0)await new Promise(r=>setTimeout(r,w));ab();
 if(Date.now()<Q.cool)throw{code:'rate_limited'};const sm=await getSample();if(!sm)throw{code:'unavailable'};t.res(await sm.json(t.p,t.o))}
 catch(e){const c=e&&e.code;if(c==='rate_limited'){coolDown();Q.q.splice(0).forEach(x=>x.rej(e))}if(c==='not_granted'||c==='sampling_disabled')Q.off=1;t.rej(e)}
 finally{Q.run--;pump()}})()}}
async function guard(k,fn){if(LOCK[k])return;const w=Q.cool-Date.now();if(w>0){toast(`Aero is cooling down. Try again in ${Math.ceil(w/1000)}s.`);return}
 LOCK[k]=1;const c=new AbortController();CTL[k]=c;CUR=c;let p;try{p=fn()}finally{CUR=null}try{return await p}finally{LOCK[k]=0;delete CTL[k]}}
function cancelAI(){Object.keys(CTL).forEach(k=>{if(!k.startsWith('send:'))CTL[k].abort()})}
getSample();

let calM='week',calD=new Date(),EV=[],REC={on:0,t:'',i:''},MA={t:0,left:1500,mode:'focus',run:0,gc:[{n:'Assignments',g:90,w:20},{n:'Midterm',g:82,w:30}],tg:90},pgo=true,sbc=false,pOpen=false;
const S=()=>sets[cur],pool=()=>S().qs.length?S().qs:DEF.qs,flat=()=>S().plan.flatMap(p=>p.i);

/* ---------- onboarding (adapts to the chosen path) ---------- */
let SUBJ='',BACK='onb1()',LAST=null,inApp=false;
function ovShow(t,s){$('#ovl').innerHTML=aero(56);$('#ovt').textContent=t;$('#ovs').textContent=s||'';$('#ov').classList.remove('hide')}
function ovHide(){$('#ov').classList.add('hide')}
function onb1(){$('#onb').innerHTML='<h1>Set your study goal</h1><p class="sub">Your roadmap, materials and questions adapt to your path.</p>'+GOALS.map((g,i)=>`<button class="opt card" onclick="G=GOALS[${i}];onb2()"><span class="tile">${g.e}</span><div><b>${g.l}</b><span>${g.d}</span></div></button>`).join('')}
function onb2(mode){
 const b=mode==='paste'?'<textarea id="src" rows="8" placeholder="Paste your notes or lecture text…"></textarea><div class="row"><button class="pill" onclick="build($(\'#src\').value,0)">Generate study set</button></div>':mode==='topic'?`<input id="src" placeholder="Type a subject, e.g. ${esc(G.tp[0])}" onkeydown="if(event.key==='Enter')topicGo()"><div class="row"><button class="pill" onclick="topicGo()">Continue</button></div>`:'';
 $('#onb').innerHTML=`<div style="width:100%;max-width:640px"><button class="ghost" onclick="${inApp?'enter()':'onb1()'}">← Back</button></div><h1 style="margin-top:26px">Learn anything, your way.</h1><p class="sub">Tailored for ${G.l}: ${G.d.toLowerCase()}</p>
 <div class="box card"><div class="drop"><div style="color:var(--gold)">${ic('up',44)}</div><h3>Drop in notes, slides or lecture recordings</h3><small class="mut">TXT and MD are read in the browser. For other formats, paste the text.</small><div style="margin-top:12px"><label class="chip" style="display:inline-block;cursor:pointer">Browse files<input type="file" accept=".txt,.md" onchange="rd(this)" style="display:none"></label></div></div>
 <div class="row"><button class="chip" onclick="onb2('paste')">Paste Notes</button><button class="chip" onclick="onb2('topic')">Type in a subject</button><button class="chip" style="background:var(--gray)" onclick="scratch()">I don't have materials yet</button></div>${b}</div>`;
 const s=$('#src');if(s)s.focus()}
function rd(i){const f=i.files[0];if(!f)return;f.text().then(t=>{onb2('paste');$('#src').value=t})}
function scratch(){$('#onb').innerHTML=`<div style="width:100%;max-width:620px"><button class="ghost" onclick="onb2()">← Back</button></div><h1 style="margin-top:50px">No materials? Pick a subject</h1><p class="sub">Pick a ${G.l} subject for your first study set</p><div class="topics">${G.tp.map((t,i)=>`<button class="chip card" onclick="SUBJ=G.tp[${i}];BACK='scratch()';askUnit()">${esc(t)}</button>`).join('')}</div><div class="row"><button class="chip" onclick="onb2('topic')">Type in my own</button></div>`}
function topicGo(){const v=$('#src').value.trim();if(!v)return;SUBJ=v;BACK="onb2('topic')";askUnit()}
function goUnit(){const u=$('#un').value.trim();if(!u){$('#un').focus();return}build(SUBJ,1,u)}
function askUnit(){
 $('#onb').innerHTML=`<div style="width:100%;max-width:620px"><button class="ghost" onclick="${BACK}">← Back</button></div><h1 style="margin-top:44px">Which unit of ${esc(SUBJ)}?</h1><p class="sub">Tell me the unit or chapter you're on so your study set is specific.</p><div class="box card"><input id="un" placeholder="e.g. Unit 3, a chapter title, or a specific topic" onkeydown="if(event.key==='Enter')goUnit()"><div class="sg" id="uc" style="margin-top:14px"><span class="mut">Finding common units…</span></div><div class="row"><button class="pill" onclick="goUnit()">Build my study set</button><button class="chip" onclick="build(SUBJ,1)">Skip, cover the whole subject</button></div></div>`;
 $('#un').focus();const sub=SUBJ;
 J(`List 8 typical units or chapters of "${sub}" for a ${G.l} learner, in teaching order. Return ONLY a JSON array of short strings.`,{modelTier:'quick'}).then(a=>{const u=$('#uc');if(!u||sub!==SUBJ)return;u.innerHTML=(Array.isArray(a)?a:(a&&a.units)||[]).slice(0,8).map(x=>`<button class="chip" data-u="${esc(x)}">${esc(x)}</button>`).join('');u.onclick=e=>{const b=e.target.closest('[data-u]');if(b)$('#un').value=b.dataset.u}}).catch(()=>{const u=$('#uc');if(u)u.innerHTML=''})}
function resetAI(){CH={chat:[],tutor:[]};TT={on:0,t:0};qz={st:'setup',cfg:qz.cfg};ci=0;topic=0;fm='study'}
function build(...a){return guard('build',()=>build0(...a))}
async function build0(src,isTopic,unit){
 src=(src||'').trim();if(!src)return;LAST=[src,isTopic,unit];
 ovShow('Building your study set…',isTopic?'Tailoring '+src+(unit?' · '+unit:'')+' for '+G.l:'Reading your material');
 const who=`a ${G.l} learner (${G.st})`,base=isTopic?`Subject: ${src}.${unit?' Unit: '+unit+'.':''}`:`Source material:\n"""${src.slice(0,6000)}"""`;
 const jp=t=>J(`You are building study materials for ${who}. ${base}\n${t}`);
 const [a,b,c]=await Promise.allSettled([
  jp('Return ONLY JSON {"name":"short set title","icon":"one emoji","plan":[4 x {"t":"section title","i":["3 specific subtopics"]}]}. Order the plan like a syllabus for that audience.'),
  jp('Return ONLY a JSON array of 20 flashcards {"q":"term or question","a":"clear concise answer"}. Cover the whole scope and be specific to the subject'+(unit?' and unit':'')+'.'),
  jp('Return ONLY a JSON array of 8 multiple-choice questions {"q":"","o":[4 options],"c":correctIndex,"e":"1-2 sentence explanation","t":"2-3 word concept tag"}. Distractors must reflect real misconceptions.')]);
 const pv=a.status==='fulfilled'?a.value:null,plan=pv&&Array.isArray(pv.plan)?pv.plan.filter(p=>p&&p.t&&Array.isArray(p.i)):[],
  cv=b.status==='fulfilled'?(Array.isArray(b.value)?b.value:(b.value&&b.value.cards)||[]):[],cards=cv.filter(x=>x&&x.q&&x.a),
  qv=c.status==='fulfilled'?(Array.isArray(c.value)?c.value:(c.value&&c.value.questions)||[]):[],qs=qv.filter(q=>q&&q.q&&Array.isArray(q.o)&&q.o.length>=2&&typeof q.c==='number');
 if(!plan.length||cards.length<3){const r=[a,b,c].find(x=>x.status==='rejected');if(r&&r.reason&&r.reason.code==='cancelled'){ovHide();return}return fail(r&&r.reason?aiMsg(r.reason):'The response came back incomplete.')}
 sets.unshift({name:pv.name||unit||src.slice(0,40),icon:pv.icon||'📘',cards,qs,plan,m:new Set(),goal:G,unit});cur=0;resetAI();ovHide();if($('#onb').classList.contains('hide')){go('home');toast('Study set created')}else onb3()}
function fail(msg){ovHide();if($('#onb').classList.contains('hide')){toast(msg);return}$('#onb').innerHTML=`${aero(56)}<h1 style="margin-top:14px">Couldn't build that set</h1><p class="sub" style="max-width:480px">${esc(msg)}</p><div class="row"><button class="pill" onclick="build(...LAST)">Try again</button>${inApp?'<button class="ghost" onclick="enter()">Back to my sets</button>':'<button class="ghost" onclick="onb3()">Use the sample set</button>'}</div>`}
function onb3(){const s=S();$('#onb').innerHTML=`${aero(64)}<h1 style="margin:14px 0 6px">Your study space is ready</h1><p class="sub">Built for ${gs().l}${s.unit?' · '+esc(s.unit):''}</p><div class="tri">
 <div class="col card"><h3>Learning Material<span class="ck">✓</span></h3>${s.plan.map(p=>`<div class="li">${esc(p.t)}</div>`).join('')}</div>
 <div class="col card"><h3>Roadmap<span class="ck">✓</span></h3>${flat().slice(0,8).map((x,i)=>`<div class="li"><b class="mut">0${i+1}</b>&nbsp; ${esc(x)}</div>`).join('')}</div>
 <div class="col card"><h3>Study Materials<span class="ck">✓</span></h3><div class="li">${s.cards.length} flashcards</div><div class="li">Custom Quiz Lab quizzes</div><div class="li">Notes, explainers, essay grader</div><div class="li">4 arcade games</div><div class="li">Chat and guided tutoring</div></div></div>
 <div class="row" style="margin-top:34px"><button class="pill" onclick="enter()">Continue</button></div>`}
function enter(){inApp=true;$('#onb').classList.add('hide');$('#app').classList.remove('hide');$('#lg').innerHTML=brand(30)+'<b>StudyParadise</b>';$('#bs1').innerHTML=ic('search',17);$('#bs2').innerHTML=ic('side',17);$('#dock').innerHTML=aero(40)+'<span>Chat</span>';$('#dock').classList.toggle('hide',pOpen);$('#cp').classList.toggle('hide',!pOpen);drawNav();go('home')}
function onb(){$('#app').classList.add('hide');$('#dock').classList.add('hide');$('#cp').classList.add('hide');$('#onb').classList.remove('hide');onb2()}

/* ---------- shell ---------- */
const FEATS=[['home','Home'],['sets','Study Sets'],['cal','Calendar'],['plan','Roadmap'],['tutor','Guided Tutor'],['record','Lecture Capture'],['quiz','Quiz Lab'],['flash','Flashcards'],['notes','Study Notes'],['arcade','Play Zone'],['essay','Writing Coach'],['explain','Mini Lessons'],['apps','Toolbox'],['audio','Audio Brief']];
const NI={home:'home',sets:'sets',cal:'cal',plan:'plan',tutor:'tutor',record:'mic',quiz:'quiz',flash:'flash',notes:'notes',arcade:'game',essay:'essay',explain:'explain',apps:'apps',audio:'audio'};
const FC={home:'#2f86d9',sets:'#6b7686',cal:'#e5484d',plan:'#2f86d9',tutor:'#16a394',record:'#e5484d',quiz:'#2f86d9',flash:'#16a394',notes:'#d9780f',arcade:'#d9780f',essay:'#d9780f',explain:'#2f86d9',apps:'#6b7686',audio:'#16a394'};
const GN={city:'City Run',rocket:'Rocket Defender',match:'Match Game',blitz:'Flash Blitz'};
const AFTER={cal(){const w=$('#wkb');if(w)w.scrollTop=88}};
const TOUR=[['Welcome to StudyParadise','Upload notes or pick a subject and Aero builds a study plan, flashcards and quizzes for you.'],['Study your way','Chat with Aero from the side dock, run a guided tutoring session, read AI notes, or watch narrated explainers.'],['Practice and play','Quiz Lab adapts to your difficulty and the Play Zone turns your set into four games.'],['Plan ahead','Add exams and projects to the Calendar and Aero will build a day-by-day study plan with reminders.']];
function drawNav(){const s=S(),on=v=>view===v||(v==='arcade'&&GN[view])?'on':'',
 B=(v,l,c='')=>`<button class="${c} ${on(v)}" title="${l}" style="--ac:${FC[v]||'#6b7686'}" onclick="go('${v}')">${ic(NI[v])}<span class="l">${l}</span></button>`,
 pr=[['quiz','Quiz Lab'],['flash','Flashcards'],['notes','Study Notes'],['arcade','Play Zone'],['essay','Writing Coach'],['explain','Mini Lessons'],['apps','Toolbox'],['audio','Audio Brief']];
 $('#nav').innerHTML=B('home','Home')+B('sets','Study Sets')+B('cal','Calendar')+
 `<button class="sw" onclick="go('sets')" title="Switch study set"><span class="tile">${s.icon}</span><span class="swn">${esc(s.name)}</span><span class="chev">${ic('swap',15)}</span></button>`+
 B('plan','Roadmap')+`<button class="${pOpen?'on':''}" onclick="togglePanel()" title="Chat with Aero">${ic('chat')}<span class="l">Chat</span></button>`+B('tutor','Guided Tutor')+B('record','Lecture Capture')+
 `<button class="gh" onclick="pgo=!pgo;drawNav()" title="Practice Hub">${ic('quiz')}<span class="l">Practice Hub</span><span class="chev">${ic('chev',15)}</span></button>`+(pgo?pr.map(x=>B(x[0],x[1],'si')).join(''):'')+
 `<button class="nb" onclick="onb()" title="Upload">${ic('plus')}<span class="l">Upload</span></button>`+
 `<div class="mh"><span>Library</span><button onclick="go('notes')">See all</button></div>`+s.plan.slice(0,5).map(p=>`<button class="mt" onclick="go('notes')" title="${esc(p.t)}">${ic('notes',16)}<span class="l">${esc(p.t)}</span></button>`).join('')+
 `<button class="tut" onclick="tour(0)">${ic('play',14)}<span class="l">Quick Tour</span></button>`}
function sbToggle(){sbc=!sbc;$('#app').classList.toggle('sbc',sbc)}
function stopG(){if(GM)GM();GM=null}
function toast(t){let e=$('#toast');if(!e){e=document.createElement('div');e.id='toast';e.className='toast';document.body.appendChild(e)}e.textContent=t;e.style.display='block';clearTimeout(e._t);e._t=setTimeout(()=>e.style.display='none',4200)}
function openM(h){const m=$('#md');m.innerHTML=h;m.classList.remove('hide')}
function closeM(){const m=$('#md');m.classList.add('hide');m.innerHTML=''}
function tour(i){const t=TOUR[i];openM(`<div class="mdc card" style="text-align:center">${brand(52)}<h2 style="margin:14px 0 8px">${t[0]}</h2><p class="mut">${t[1]}</p><div class="dots" style="justify-content:center;margin:18px 0">${TOUR.map((_,k)=>`<span class="dot ${k===i?'cur':''}">${k+1}</span>`).join('')}</div><div class="row" style="margin:0">${i?`<button class="ghost" onclick="tour(${i-1})">Back</button>`:''}<button class="pill" onclick="${i<TOUR.length-1?`tour(${i+1})`:'closeM()'}">${i<TOUR.length-1?'Next':'Got it'}</button></div></div>`)}
function openSearch(){openM(`<div class="mdc card"><input class="sqi" id="sq" placeholder="Search features, sets, flashcards, events…" oninput="srch(this.value)"><div id="sr" style="margin-top:10px"></div></div>`);$('#sq').focus();srch('')}
function srch(q){q=q.toLowerCase().trim();const R=[];FEATS.filter(f=>f[1].toLowerCase().includes(q)).forEach(f=>R.push([f[1],'Open',`go('${f[0]}')`]));
 sets.forEach((s,i)=>{if(s.name.toLowerCase().includes(q))R.push([s.name,'Study set',`cur=${i};resetAI();go('home')`])});
 if(q.length>1){S().cards.forEach(c=>{if((c.q+' '+c.a).toLowerCase().includes(q))R.push([c.q,'Flashcard',"fm='list';go('flash')"])});EV.forEach(e=>{if(e.t.toLowerCase().includes(q))R.push([e.t,TY[e.type][0],`go('cal');evOpen(${e.id})`])})}
 $('#sr').innerHTML=R.slice(0,12).map(r=>`<div class="sri" onclick="closeM();${r[2]}"><span>${esc(r[0])}</span><span class="mut">${r[1]}</span></div>`).join('')||'<p class="mut">No matches</p>'}
document.addEventListener('keydown',e=>{if((e.metaKey||e.ctrlKey)&&e.key==='k'&&!$('#app').classList.contains('hide')){e.preventDefault();openSearch()}if(e.key==='Escape')closeM()});

/* side chat */
function togglePanel(){pOpen?closePanel():openPanel()}
function openPanel(){pOpen=true;$('#app').classList.add('pc');$('#cp').classList.remove('hide');$('#dock').classList.add('hide');renderPanel();drawNav()}
function closePanel(){pOpen=false;$('#app').classList.remove('pc');$('#cp').classList.add('hide');$('#dock').classList.remove('hide');drawNav()}
const msgH=x=>x.role==='user'?`<div class="m u">${esc(x.content)}</div>`:`<div class="mr">${ava(x.ch||0,28)}<div class="m a">${esc(x.content)}</div></div>`;
function renderPanel(){const H=CH.chat,T=CHARS[CHAR],s=S();
 $('#cp').innerHTML=`<div class="cph"><span class="cpt">${aero(32)}<span><b>${T[0]}</b><small class="mut">${T[4]}</small></span></span><span class="sg"><button class="ib" title="New chat" onclick="CH.chat=[];renderPanel()">＋</button><button class="ib" title="Close" onclick="closePanel()">✕</button></span></div>
 <div class="tpw">${tpick()}</div>
 <div class="cpb" id="pm">${H.length?H.filter(x=>!x.h).map(msgH).join(''):`<div class="wel">${aero(64)}<h2>${esc(T[2])}</h2><p class="mut" style="margin:0 0 16px">${esc(T[3].replace('{s}',s.name))}</p><div class="chips"><button class="chip" onclick="send('chat','What is this study set about?')">What is this study set about?</button><button class="chip" onclick="send('chat','How do these topics connect?')">How do these topics connect?</button><button class="chip" onclick="closePanel();evOpen(null,null,null,'exam')">Create a study plan for me</button><button class="chip" onclick="moreCards()">Generate flashcards for this set</button></div></div>`}</div>
 <div class="cpf"><div class="cin"><input id="pci" placeholder="Ask ${T[0]} anything…" onkeydown="if(event.key==='Enter')send('chat')"><button class="pill" onclick="send('chat')">↑</button></div></div>`;const m=$('#pm');m.scrollTop=m.scrollHeight}

function go(v){stopG();if(v!==view){try{speechSynthesis.cancel()}catch(e){}EX.on=0;if(REC.on){REC.on=0;try{REC.sr.stop()}catch(e){}}}view=v;const s=S(),nm=GN[v]||(FEATS.find(n=>n[0]===v)||[,''])[1];
 $('#main').className='in'+(v==='cal'?' wide':'');
 $('#main').innerHTML=`<div class="top"><span>${esc(s.name)}${v==='home'?'':' › '+nm}</span><span class="xp">${SAMPLE_MODE?'📦 Sample | ':''}⚡ ${xp} XP</span></div>`+V[v]();
 drawNav();const a=AFTER[v];if(a)a();$('.mn').scrollTop=0;const m=$('#msgs');if(m)m.scrollTop=m.scrollHeight}
const pct=s=>Math.round(s.m.size/s.cards.length*100),gs=()=>(S().goal||G);
function fS(q){q=q.toLowerCase();document.querySelectorAll('.sets [data-n]').forEach(e=>e.style.display=e.dataset.n.includes(q)?'':'none')}

const V={
home(){const s=S(),t=topic%s.plan.length,p=s.plan[t],n=flat().length,td=ymd(new Date()),nx=EV.filter(e=>e.date>=td&&e.type!=='study').sort((a,b)=>a.date.localeCompare(b.date)).slice(0,3),ts=EV.filter(e=>e.date===td&&e.type==='study'),
 dl=e=>{const d=Math.round((parse(e.date)-parse(td))/864e5);return d===0?'Today':d===1?'Tomorrow':'In '+d+' days'};
 return `<div class="hd"><span class="tile">${s.icon}</span><div><h1>${esc(s.name)}</h1><div class="st"><span>${gs().e} ${gs().l}${s.unit?' · '+esc(s.unit):''}</span><span>${n} topics</span><span>${s.m.size}/${s.cards.length} mastered</span><div class="bar"><i style="width:${pct(s)}%"></i></div></div></div></div>
 ${ts.length?`<div class="card pad" style="margin-bottom:22px;background:var(--goldl)"><h3 style="margin-top:0">Today's study plan</h3>${ts.map(e=>`<div class="sr" style="cursor:pointer" onclick="evOpen(${e.id})"><span><b>${esc(e.t)}</b> <span class="mut">${e.time?fmt12(e.time):''} · ${e.dur} min</span></span><span class="chip">Open</span></div>`).join('')}</div>`:''}
 <div class="pan card"><h2>Next up on your Roadmap</h2><div class="tabs">${s.plan.map((x,i)=>`<button class="${i===t?'on':''}" onclick="topic=${i};go('home')">0${i+1} &nbsp;${esc(x.t)}</button>`).join('')}</div>
 <p class="mut" style="margin:0 0 2px">Up next in ${esc(p.t)}</p><h3 style="margin:0 0 12px">${esc(p.i[0])}</h3>
 <div class="g3"><button class="fc" onclick="TT.t=${flat().indexOf(p.i[0])};go('tutor')"><div class="im" style="background:#e3f6f3;color:#16a394">${ic('tutor',34)}</div><b>Guided Tutoring</b><small>Recommended</small></button><button class="fc" onclick="go('notes')"><div class="im" style="background:#fdf1e1;color:#d9780f">${ic('notes',34)}</div><b>Study Notes</b><small>Catch up quickly</small></button><button class="fc" onclick="go('quiz')"><div class="im" style="background:#e8f3fd;color:#2f86d9">${ic('quiz',34)}</div><b>Quiz Lab</b><small>Most popular</small></button></div></div>
 <div class="g2"><div class="card pad"><h3 style="margin-top:0">Upcoming</h3>${nx.length?nx.map(e=>`<div class="sr" style="cursor:pointer" onclick="evOpen(${e.id})"><span><i class="dotc" style="background:${TY[e.type][1]}"></i> <b>${esc(e.t)}</b></span><span class="mut">${dl(e)}</span></div>`).join(''):'<p class="mut" style="margin:0 0 4px">No exams or projects yet. Add one and Aero will plan your prep.</p>'}<div style="margin-top:12px"><button class="chip" onclick="go('cal')">Open calendar</button></div></div>
 <div class="card pad"><h3 style="margin-top:0">Today</h3><span class="bigs">${acts}</span> activities completed<p class="hint">${xp} XP earned. Finish quizzes and games to climb.</p></div></div>
 <h3>Recent materials</h3><div class="g4m">${s.plan.map(x=>`<button class="mat card" onclick="go('notes')"><span class="tile">${ic('book')}</span><b>${esc(x.t)}</b><span class="mut">${x.i.length} subtopics</span></button>`).join('')}</div>
 <div class="pan card"><h2>Jump into any activity</h2><div class="g3">
 <button class="wb" onclick="onb()">${ic('up')} Add Materials</button><button class="wb" onclick="go('quiz')">${ic('quiz')} Take a Quiz</button><button class="wb" onclick="go('flash')">${ic('flash')} Flashcards</button>
 <button class="wb" onclick="openPanel()">${ic('chat')} Ask Aero</button><button class="wb" onclick="go('explain')">${ic('explain')} Mini Lessons</button><button class="wb" onclick="go('arcade')">${ic('game')} Play Zone</button>
 <button class="wb" onclick="go('record')">${ic('mic')} Lecture Capture</button><button class="wb" onclick="go('cal')">${ic('cal')} Calendar</button><button class="wb" onclick="go('essay')">${ic('essay')} Writing Coach</button></div></div>`},
sets(){return `<h1 style="margin-bottom:18px">My Study Sets</h1><input class="srch" placeholder="Search study sets…" oninput="fS(this.value)"><div class="sets"><button class="card new" onclick="onb()"><div><div style="font-size:30px">＋</div><b style="color:var(--ink)">Create Study Set</b><br>From notes, files or a subject</div></button>`+sets.map((s,i)=>`<button class="card" data-n="${esc(s.name.toLowerCase())}" onclick="cur=${i};resetAI();go('home')"><div style="display:flex;gap:12px;align-items:center"><span class="tile">${s.icon}</span><div><b>${esc(s.name)}</b><br><span class="mut">${(s.goal||G).l}${s.unit?' · '+esc(s.unit):''}${s.demo?' · Sample set':''}</span></div></div><div style="display:flex;gap:10px;align-items:center;margin:14px 0 8px"><div class="bar" style="flex:1;width:auto"><i style="width:${pct(s)}%"></i></div>${pct(s)}%</div><span class="mut">${s.cards.length} cards · ${s.qs.length} questions</span></button>`).join('')+'</div>'},
plan(){const s=S();return `<h1>Your Roadmap</h1><p class="mut" style="margin:6px 0 22px">Built for ${gs().l}: what to learn and when to learn it.</p>`+s.plan.map((p,k)=>`<div class="card un"><span class="nm">${k+1}</span><div style="flex:1"><small class="mut" style="text-transform:uppercase;letter-spacing:.08em">Unit ${k+1}</small><h3>${esc(p.t)}</h3>${p.i.map(x=>`<div class="sr"><span>${esc(x)}</span><span class="sg"><button class="chip" style="padding:3px 12px" onclick="TT.t=${flat().indexOf(x)};go('tutor')">Tutor</button><button class="chip" style="padding:3px 12px" onclick="go('quiz')">Quiz</button></span></div>`).join('')}</div></div>`).join('')+`<div class="row" style="justify-content:flex-start"><button class="pill" onclick="evOpen(null,null,null,'exam')">Turn this plan into a schedule</button></div>`},
tutor(){return pane()},
quiz(){return qz.st==='setup'?qSetup():qz.st==='load'?`<div class="card pad" style="text-align:center;padding:70px">${aero(56)}<h2 style="margin-top:14px">Writing your quiz…</h2><p class="mut">${qz.cfg.n} ${qz.cfg.d.toLowerCase()} questions on ${esc(S().name)}</p><button class="ghost" style="margin-top:16px" onclick="cancelAI()">Cancel</button></div>`:qz.st==='play'?qPlay():qDone()},
arcade(){return `<h1 style="margin-bottom:6px">Turn your notes into <i style="color:var(--goldd)">games</i></h1><p class="mut" style="margin:0 0 20px">Every game is built from your study set.</p><div class="g4">${Object.keys(GI).map(k=>`<button class="gm card" onclick="go('${k}')"><div class="im">${LG(k,76)}</div><div class="t"><b>${GI[k].t}</b><p>${GI[k].d}</p>${best[k]?`<p style="color:var(--goldd)">Best: ${best[k]}</p>`:''}</div></button>`).join('')}</div>`},
city(){return gsh('city')},rocket(){return gsh('rocket')},match(){return gsh('match')},blitz(){return gsh('blitz')}};

/* ---------- tutor session + chat engine ---------- */
function pane(){const H=CH.tutor,f=flat();
 if(!TT.on)return `<h1>Guided Tutor</h1><p class="mut" style="margin:6px 0 18px">A guided session: Aero asks one question at a time, gives hints instead of answers, and wraps up with a recap.</p>${persona('tutor')}<div class="card pad"><h3 style="margin-top:0">Pick a topic</h3><div class="sg">${f.map((x,i)=>`<button class="chip ${TT.t===i?'on':''}" onclick="TT.t=${i};go('tutor')">${esc(x)}</button>`).join('')}</div><div style="margin-top:20px"><button class="pill" onclick="beginT()">Begin session</button></div></div>`;
 const steps=H.filter(x=>x.role==='user'&&!x.h).length;
 return `<div class="chat"><div class="card sess"><span><b>${esc(f[TT.t]||S().name)}</b> <span class="mut">· Step ${steps}</span></span><span class="sg"><button class="chip" onclick="send('tutor','Wrap up now with a short recap of what I mastered and what to review.')">End and recap</button><button class="chip" onclick="TT.on=0;CH.tutor=[];go('tutor')">New topic</button></span></div>${persona('tutor')}<div class="msgs" id="msgs">${H.filter(x=>!x.h).map(msgH).join('')}</div>
 <div class="sg" style="margin-top:10px">${['Give me a hint',"I'm stuck",'Can you rephrase?'].map(x=>`<button class="chip" onclick="send('tutor','${x.replace("'","\\'")}')">${x}</button>`).join('')}</div>
 <div class="cin"><input id="ci" placeholder="Your answer or thinking…" onkeydown="if(event.key==='Enter')send('tutor')"><button class="pill" onclick="send('tutor')">Send</button></div></div>`}
function beginT(){TT.on=1;CH.tutor=[];go('tutor');send('tutor','Begin the session.',1)}
const evCtx=()=>{const td=ymd(new Date()),L=EV.filter(e=>e.date>=td).sort((a,b)=>a.date.localeCompare(b.date)).slice(0,6);return L.length?' Upcoming on the learner\'s calendar: '+L.map(e=>e.type+' "'+e.t+'" on '+e.date).join('; ')+'.':''};
function lockUI(m,on){const i=$(m==='chat'?'#pci':'#ci'),b=document.querySelector(m==='chat'?'#cp .cin button':'.chat .cin button');if(i)i.disabled=!!on;if(b){b.textContent=on?'Stop':(m==='chat'?'↑':'Send');b.onclick=on?()=>{const c=CTL['send:'+m];if(c)c.abort()}:()=>send(m)}}
async function send(m,t,h){if(m==='chat'&&!pOpen)openPanel();
 if(LOCK['send:'+m]){toast('Aero is still answering. One moment.');return}
 const w=Q.cool-Date.now();if(w>0){toast(`Aero is cooling down. Try again in ${Math.ceil(w/1000)}s.`);return}
 const inp=$(m==='chat'?'#pci':'#ci');if(t===undefined){t=inp?inp.value.trim():'';if(inp)inp.value=''}if(!t)return;
 const H=CH[m],ms=$(m==='chat'?'#pm':'#msgs');if(!ms)return;if(m==='chat'&&!H.length)ms.innerHTML='';
 LOCK['send:'+m]=1;const ctl=new AbortController();CTL['send:'+m]=ctl;lockUI(m,1);
 H.push({role:'user',content:t,h});ms.insertAdjacentHTML('beforeend',(h?'':`<div class="m u">${esc(t)}</div>`)+`<div class="mr">${aero(28)}<div class="m a" id="live">…</div></div>`);ms.scrollTop=ms.scrollHeight;
 try{const sm=Q.off?null:await getSample();if(!sm)throw{code:Q.off?'not_granted':'unavailable'};
  const s=S(),k=s.cards.slice(0,30).map(c=>c.q+' = '+c.a).join(' | '),P=`${CHARS[CHAR][0]}: ${CHARS[CHAR][1]}`;
  const ctx=m==='chat'?`You are Aero (${P}), a friendly study assistant for a ${gs().l} learner. Answer directly and clearly in under 120 words with an example or analogy, then offer one optional follow-up. Study set "${s.name}": ${k}.${evCtx()}\n\n`:`You are Aero (${P}) running a guided Socratic tutoring session on "${flat()[TT.t]}" for a ${gs().l} learner (set "${s.name}": ${k}). Ask ONE question at a time. Never give the final answer outright: give hints and stepping stones. After each reply give brief feedback, then a slightly harder question. After about 5 exchanges give a short recap. Under 90 words per turn.\n\n`;
  const r=await sm(H.map((x,j)=>({role:x.role,content:j===0?ctx+x.content:x.content})),{cache:false,signal:ctl.signal,onText:({text})=>{const l=$('#live');if(l)l.textContent=text;ms.scrollTop=ms.scrollHeight}});
  H.push({role:'assistant',content:r.text,ch:CHAR});const l=$('#live');if(l)l.removeAttribute('id')}
 catch(e){const c=e&&e.code,l=$('#live');if(c==='rate_limited')coolDown();if(c==='not_granted'||c==='sampling_disabled')Q.off=1;
  if(e&&e.text&&c!=='refused'){const tx=e.text+' …(interrupted)';H.push({role:'assistant',content:tx,ch:CHAR});if(l){l.textContent=tx;l.removeAttribute('id')}}
  else{H.pop();if(l)l.textContent=c==='cancelled'?'Stopped.':aiMsg(e)}}
 finally{LOCK['send:'+m]=0;delete CTL['send:'+m];lockUI(m,0)}}

/* ---------- flashcards ---------- */
V.flash=()=>{const s=S();ci=Math.min(ci,s.cards.length-1);const c=s.cards[ci];
 const head=`<div class="fh"><h1>Flashcards</h1><div class="sg"><div class="seg"><button class="${fm==='study'?'on':''}" onclick="fm='study';go('flash')">Study</button><button class="${fm==='list'?'on':''}" onclick="fm='list';go('flash')">All cards (${s.cards.length})</button></div><button class="chip" id="mcb" onclick="moreCards()">＋ Generate 10 more</button></div></div>`;
 if(fm==='list')return head+`<input class="srch" placeholder="Search cards…" oninput="fC(this.value)">`+s.cards.map((x,i)=>`<div class="card cl" data-n="${esc((x.q+' '+x.a).toLowerCase())}"><b>${s.m.has(i)?'✓ ':''}${esc(x.q)}</b><span class="mut">${esc(x.a)}</span></div>`).join('');
 return head+`<div class="flip card" onclick="fl=!fl;go('flash')"><div><small>${fl?'Answer':'Question'}</small><h2>${esc(fl?c.a:c.q)}</h2><p class="mut" style="margin-top:22px">Tap to flip</p></div></div>
 <div class="nv"><button class="ghost" onclick="mv(-1)">← Prev</button><span class="mut">${ci+1} / ${s.cards.length} · ${s.m.size} mastered</span><span class="sg"><button class="chip" onclick="mark(0)">Still learning</button><button class="pill" onclick="mark(1)">Got it ✓</button></span></div>`};
function fC(q){q=q.toLowerCase();document.querySelectorAll('.cl').forEach(e=>e.style.display=e.dataset.n.includes(q)?'':'none')}
function mv(d){const n=S().cards.length;ci=(ci+d+n)%n;fl=false;go('flash')}
function mark(k){const s=S();k?s.m.add(ci):s.m.delete(ci);if(s.m.size===s.cards.length)toast('All cards mastered!');mv(1)}
function moreCards(){return guard('cards',moreCards0)}
async function moreCards0(){const s=S(),b=$('#mcb');if(!b)toast('Generating 10 more cards…');if(b){b.textContent='Generating…';b.disabled=true}
 try{const a=await J(`Create 10 NEW flashcards for a ${gs().l} learner studying "${s.name}"${s.unit?' (unit: '+s.unit+')':''}. Do not repeat any of these: ${s.cards.map(x=>x.q).join(' | ')}. Return ONLY a JSON array of {"q":"","a":""}.`,{cache:false});const arr=(Array.isArray(a)?a:(a&&a.cards)||[]).filter(x=>x&&x.q&&x.a);arr.forEach(x=>s.cards.push(x));toast(arr.length?`Added ${arr.length} cards`:'No cards came back. Try again.')}
 catch(e){toast(aiMsg(e))}go('flash')}

/* ---------- Quiz Lab ---------- */
function qSet(k,v){qz.cfg[k]=v;go('quiz')}
function qSetup(){const c=qz.cfg,seg=(k,a)=>`<div class="seg">${a.map(x=>`<button class="${c[k]===x?'on':''}" onclick="qSet('${k}',${typeof x==='number'?x:`'${x}'`})">${x}</button>`).join('')}</div>`;
 return `<h1>Quiz Lab</h1><p class="mut" style="margin:6px 0 18px">Build a quiz from ${esc(S().name)} for ${gs().l}.</p><div class="card pad"><h3 style="margin-top:0">Difficulty</h3>${seg('d',['Easy','Medium','Hard'])}<p class="hint">${{Easy:'Definitions and direct recall',Medium:'Applying concepts to new situations',Hard:'Multi-step reasoning with tricky distractors'}[c.d]}</p>
 <h3>Number of questions</h3>${seg('n',[5,10,15])}<h3>Instructions <span class="mut" style="font-size:13px;font-family:Inter">(optional)</span></h3><textarea oninput="qz.cfg.ins=this.value" placeholder="${esc(ph())}">${esc(c.ins)}</textarea><div class="sg" style="margin-top:10px">${hints().map((x,i)=>`<button class="chip" onclick="qAdd(${i})">+ ${esc(x)}</button>`).join('')}</div><div style="margin-top:18px"><button class="pill" onclick="startQuiz()">Start quiz</button></div></div>`}
function dots(){return `<div class="dots">${qz.qs.map((_,i)=>i<qz.res.length?`<span class="dot ${qz.res[i]?'ok':'no'}">${qz.res[i]?'✓':'✕'}</span>`:`<span class="dot ${i===qz.i?'cur':''}">${i+1}</span>`).join('')}</div>`}
function qPlay(){const q=qz.qs[qz.i],n=qz.qs.length,a=qz.p!==null;
 return `<h1 style="margin-bottom:16px">Quiz Lab <span class="mut" style="font-size:16px;font-family:Inter">· ${qz.cfg.d}</span></h1>${dots()}<div class="card pad"><p class="mut" style="margin:0 0 6px">Question ${qz.i+1} of ${n}${q.t?' · '+esc(q.t):''}</p><h2 style="font-size:23px;margin-bottom:18px">${esc(q.q)}</h2>
 ${q.o.map((o,k)=>`<button class="qo ${a?k===q.c?'ok':k===qz.p?'no':'':''}" onclick="pick(${k})">${esc(o)}</button>`).join('')}
 ${a?`<div class="ex"><b>${qz.p===q.c?'Correct.':'Not quite.'}</b> ${esc(q.e||'')}</div><button class="pill" onclick="qNext()">${qz.i+1<n?'Next question':'See results'}</button>`:''}</div>`}
function pick(k){if(qz.p!==null)return;const q=qz.qs[qz.i];qz.p=k;qz.picks.push(k);qz.res.push(k===q.c);go('quiz')}
function qNext(){if(qz.i+1>=qz.qs.length){xp+=qz.res.filter(Boolean).length*10;bump();qz.st='done';qz.secs=Math.round((Date.now()-qz.t0)/1000)}else{qz.i++;qz.p=null}go('quiz')}
function qDone(){const n=qz.qs.length,ok=qz.res.filter(Boolean).length,pc=Math.round(ok/n*100),tg={};
 qz.qs.forEach((q,i)=>{const t=q.t||'General';(tg[t]=tg[t]||[0,0])[1]++;if(qz.res[i])tg[t][0]++});
 const weak=Object.entries(tg).filter(([,v])=>v[0]<v[1]).map(([k])=>k),msg=pc>=90?'Outstanding work':pc>=70?'Solid understanding':pc>=50?'Getting there':'Time to review';
 return `<h1 style="margin-bottom:16px">Quiz results</h1>${dots()}
 <div class="card pad sc"><div class="ring" style="--p:${pc}"><i>${pc}%</i></div><div style="flex:1;min-width:220px"><h2>${msg}</h2><p class="mut" style="margin:4px 0 14px">${ok} of ${n} correct on ${qz.cfg.d} difficulty.</p><div class="stats"><div><b>${ok}</b>Correct</div><div><b>${n-ok}</b>Incorrect</div><div><b>${Math.floor(qz.secs/60)}:${String(qz.secs%60).padStart(2,'0')}</b>Time</div><div><b>+${ok*10}</b>XP earned</div></div></div></div>
 <div class="card pad" style="margin-top:16px"><h3 style="margin-top:0">Performance by concept</h3>${Object.entries(tg).map(([k,v])=>`<div class="cb"><span>${esc(k)}</span><div class="bar g"><i style="width:${v[0]/v[1]*100}%"></i></div><span>${v[0]}/${v[1]}</span></div>`).join('')}
 ${weak.length?`<p class="hint" style="margin-top:14px"><b>Focus next on:</b> ${weak.map(esc).join(', ')}.</p>`:'<p class="hint" style="margin-top:14px">No weak spots this round. Try a harder difficulty.</p>'}</div>
 <h3>Question review</h3>${qz.qs.map((q,i)=>{const g=qz.res[i];return `<div class="rv ${g?'':'no'}"><b>${g?'✓':'✕'} ${i+1}. ${esc(q.q)}</b><small>${g?'':`<span style="color:var(--bad)">Your answer: ${esc(q.o[qz.picks[i]])}</span><br>`}<span style="color:var(--ok)">Correct answer: ${esc(q.o[q.c])}</span></small><small class="mut">${g?esc(q.e||''):esc((q.w&&q.w[qz.picks[i]])||'')+' '+esc(q.e||'')}</small></div>`}).join('')}
 <div class="row" style="justify-content:flex-start"><button class="pill" onclick="qz.st='setup';go('quiz')">New quiz</button>${ok<n?'<button class="ghost" onclick="reviewMisses()">Walk through my misses with Aero</button>':''}</div>`}
function reviewMisses(){const m=qz.qs.map((q,i)=>qz.res[i]?null:`"${q.q}" (I chose "${q.o[qz.picks[i]]}"; correct was "${q.o[q.c]}")`).filter(Boolean);openPanel();send('chat','I missed these quiz questions. Help me understand what I got wrong, starting with the first:\n'+m.join('\n'))}

/* ---------- extra features ---------- */
const bump=()=>{acts++;save()};
const hints=()=>[...flat().slice(0,3).map(x=>'Focus on '+x),'Use real-world scenarios','Explain the reasoning behind each answer'];
const ph=()=>{const f=flat();return 'e.g. Focus on '+(f[0]||S().name)+(f[1]?' and '+f[1]:'')+', use realistic scenarios'};
function qAdd(i){const h=hints()[i];qz.cfg.ins=(qz.cfg.ins?qz.cfg.ins.trim()+'. ':'')+h;go('quiz')}
const persona=m=>`<p class="mut" style="margin:0 0 6px">Your tutor</p><div style="margin-bottom:14px">${tpick()}</div>`;
function startQuiz(){return guard('quiz',startQuiz0)}
async function startQuiz0(){const s=S(),c=qz.cfg;qz.st='load';go('quiz');let qs=[];
 const parts=[];for(let n=c.n;n>0;n-=5)parts.push(Math.min(5,n));
 const one=(k,i)=>J(`Create ${k} multiple-choice questions for a ${gs().l} learner (${gs().st}) on "${s.name}"${s.unit?' (unit: '+s.unit+')':''}. Core concepts: ${s.cards.slice(0,24).map(x=>x.q+' = '+x.a).join(' | ')}. Difficulty: ${c.d} (Easy = recall and definitions, Medium = applying concepts, Hard = multi-step reasoning with plausible distractors). ${c.ins?'Learner instructions: '+c.ins+'.':''} This is batch ${i+1} of ${parts.length}; cover different concepts from the other batches. Return ONLY a JSON array of {"q":"","o":[4 options],"c":correctIndex,"e":"1-2 sentence explanation","t":"2-3 word concept tag","w":[4 strings: for each WRONG option one sentence on why it is wrong yet tempting, empty string for the correct one]}.`,{cache:false});
 const rs=await Promise.allSettled(parts.map(one));
 rs.forEach(r=>{if(r.status==='fulfilled'){const a=Array.isArray(r.value)?r.value:(r.value&&r.value.questions)||[];a.forEach(q=>{if(q&&q.q&&Array.isArray(q.o)&&q.o.length>=2&&typeof q.c==='number')qs.push(q)})}});
 {const bad=rs.find(r=>r.status==='rejected');if(!qs.length){if(bad&&bad.reason&&bad.reason.code==='cancelled'){qz.st='setup';go('quiz');return}toast(aiMsg(bad&&bad.reason)+' Using built-in questions.');qs=shuf(pool()).slice(0,c.n)}else if(qs.length<c.n&&bad)toast(`Generated ${qs.length} of ${c.n} questions. ${aiMsg(bad.reason)}`)}
 qz={...qz,st:'play',qs,i:0,p:null,res:[],picks:[],t0:Date.now()};go('quiz')}

const AIC={},ak=k=>k+'|'+cur+'|'+S().name,LOAD={toString(){return `<div class="card pad" style="text-align:center;padding:60px">${aero(52)}<h2 style="margin-top:14px">${CHARS[CHAR][0]} is working…</h2><p class="mut">This usually takes 10 to 30 seconds.</p><button class="ghost" style="margin-top:16px" onclick="cancelAI()">Cancel</button></div>`}};
function aiGen(v,sfx,p){return guard('ai:'+v+sfx,async()=>{const key=ak(v+sfx);AIC[key]='load';go(v);try{AIC[key]=await J(p,{cache:false});bump()}catch(e){AIC[key]=e&&e.code==='cancelled'?null:{err:aiMsg(e)}}if(view===v)go(v)})}
const speak=t=>{try{speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(t);speechSynthesis.speak(u)}catch(e){toast('Narration is not supported here')}};
const errBox=r=>r&&r.err?`<p style="color:var(--bad)">${esc(r.err)}</p>`:'';

V.notes=()=>{const s=S(),r=AIC[ak('notes')],head=`<h1>Study Notes</h1><p class="mut" style="margin:6px 0 18px">AI-written notes for ${esc(s.name)}, pitched at ${gs().l} level.</p>`;
 if(r==='load')return head+LOAD;
 if(!r||r.err||!Array.isArray(r.sections))return head+`<div class="card pad">${errBox(r)}<button class="pill" onclick="genNotes()">Generate notes</button></div>`;
 return head+`<div class="sg" style="margin-bottom:14px"><button class="chip" onclick="speak(AIC[ak('notes')].sections.map(x=>x.h+'. '+x.b.join('. ')).join(' '))">🔊 Listen</button><button class="chip" onclick="speechSynthesis.cancel()">Stop</button><button class="chip" onclick="genNotes()">Regenerate</button></div>`+r.sections.map(x=>`<div class="card pad nt"><h3 style="margin-top:0">${esc(x.h)}</h3><ul>${(x.b||[]).map(b=>`<li>${esc(b)}</li>`).join('')}</ul></div>`).join('')+`<div class="card pad" style="background:var(--goldl)"><h3 style="margin-top:0">Key takeaways</h3><ul class="nt">${(r.key||[]).map(b=>`<li>${esc(b)}</li>`).join('')}</ul></div>`};
function genNotes(){const s=S();aiGen('notes','',`Write concise study notes for a ${gs().l} learner on "${s.name}"${s.unit?' (unit: '+s.unit+')':''}. Syllabus: ${s.plan.map(p=>p.t+': '+p.i.join(', ')).join(' | ')}. Key cards: ${s.cards.slice(0,16).map(x=>x.q+' = '+x.a).join(' | ')}. Return ONLY JSON {"sections":[5 x {"h":"heading","b":[3 to 5 clear bullets]}],"key":[5 short takeaways]}.`)}

V.explain=()=>{const s=S(),f=flat(),r=AIC[ak('explain'+EX.t)];
 const head=`<h1>Mini Lessons</h1><p class="mut" style="margin:6px 0 16px">Short narrated lessons on any subtopic in your plan.</p><div class="sg" style="margin-bottom:16px">${f.map((x,i)=>`<button class="chip ${EX.t===i?'on':''}" onclick="EX.t=${i};EX.i=0;go('explain')">${esc(x)}</button>`).join('')}</div>`;
 if(r==='load')return head+LOAD;
 if(!r||r.err||!Array.isArray(r.slides)||!r.slides.length)return head+`<div class="card pad">${errBox(r)}<button class="pill" onclick="genEx()">Create explainer: ${esc(f[EX.t]||s.name)}</button></div>`;
 const sl=r.slides,i=Math.min(EX.i,sl.length-1),x=sl[i];
 return head+`<div class="card slide"><span class="mut">Slide ${i+1} of ${sl.length}</span><h2>${esc(x.h)}</h2><p>${esc(x.t)}</p>${x.k?`<span class="chip on">${esc(x.k)}</span>`:''}</div><div class="nv"><button class="ghost" onclick="EX.i=Math.max(0,EX.i-1);go('explain')">← Prev</button><span class="sg"><button class="chip" onclick="playEx()">🔊 Play narration</button><button class="chip" onclick="speechSynthesis.cancel();EX.on=0">Stop</button></span><button class="pill" onclick="EX.i=Math.min(${sl.length-1},EX.i+1);go('explain')">Next →</button></div>`};
function genEx(){const s=S(),t=flat()[EX.t]||s.name;aiGen('explain',EX.t,`Create a 6-slide mini explainer lesson on "${t}" (part of "${s.name}") for a ${gs().l} learner. Return ONLY JSON {"title":"","slides":[6 x {"h":"slide heading","t":"2-3 sentence narration in plain language","k":"one key term"}]}.`)}
function playEx(){const r=AIC[ak('explain'+EX.t)];if(!r||!r.slides)return;EX.on=1;const sp=i=>{EX.i=i;go('explain');speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(r.slides[i].h+'. '+r.slides[i].t);u.onend=()=>{if(EX.on&&i+1<r.slides.length)sp(i+1);else EX.on=0};speechSynthesis.speak(u)};try{sp(0)}catch(e){toast('Narration is not supported here')}}

V.essay=()=>{const r=AIC[ak('essay')],head=`<h1>Writing Coach</h1><p class="mut" style="margin:6px 0 18px">Paste an essay or written answer for instant, rubric-based feedback.</p>`;
 const form=`<div class="card pad"><h3 style="margin-top:0">Your writing</h3><textarea class="ta" style="min-height:180px" oninput="ES.t=this.value" placeholder="Paste your essay here…">${esc(ES.t)}</textarea><h3>Rubric <span class="mut" style="font-size:13px;font-family:Inter">(optional)</span></h3><textarea class="ta" oninput="ES.r=this.value" placeholder="e.g. Thesis 25, evidence 25, analysis 30, clarity 20">${esc(ES.r)}</textarea><div style="margin-top:16px"><button class="pill" onclick="gradeEssay()">Grade my essay</button></div></div>`;
 if(r==='load')return head+LOAD;
 if(!r||r.err||typeof r.score!=='number')return head+form+(r&&r.err?`<div class="card pad" style="margin-top:14px">${errBox(r)}</div>`:'');
 const li=(a,c)=>(a||[]).map(x=>`<li style="color:${c}"><span style="color:var(--ink)">${esc(x)}</span></li>`).join('');
 return head+`<div class="card pad sc"><div class="ring" style="--p:${r.score}"><i>${r.score}</i></div><div style="flex:1;min-width:220px"><h2>Grade: ${esc(r.grade||'')}</h2><p class="mut">${esc(r.summary||'')}</p></div></div>
 <div class="card pad" style="margin-top:16px"><h3 style="margin-top:0">Rubric breakdown</h3>${(r.rubric||[]).map(x=>`<div style="margin:12px 0"><div style="display:flex;justify-content:space-between"><b>${esc(x.c)}</b><span>${x.s}/${x.m}</span></div><div class="bar g" style="width:100%;margin:6px 0"><i style="width:${Math.min(100,x.s/Math.max(x.m,1)*100)}%"></i></div><span class="mut">${esc(x.n||'')}</span></div>`).join('')}</div>
 <div class="g2" style="margin-top:16px"><div class="card pad"><h3 style="margin-top:0">Strengths</h3><ul class="nt">${li(r.strengths,'var(--ok)')}</ul></div><div class="card pad"><h3 style="margin-top:0">To improve</h3><ul class="nt">${li(r.improve,'var(--bad)')}</ul></div></div><div style="margin-top:14px"><button class="ghost" onclick="AIC[ak('essay')]=null;go('essay')">Grade another</button></div>`};
function gradeEssay(){if(ES.t.trim().length<60){toast('Paste a longer piece of writing first');return}const s=S();aiGen('essay','',`Grade this ${gs().l}-level piece of writing for the course "${s.name}" ${ES.r.trim()?'using this rubric: '+ES.r:'using a standard rubric (thesis, evidence, analysis, organization, clarity)'}. Be honest and specific. Return ONLY JSON {"score":0-100,"grade":"letter grade","summary":"2 sentences","rubric":[{"c":"criterion","s":points earned,"m":max points,"n":"one sentence comment"}],"strengths":["..."],"improve":["..."]}. Writing: """${ES.t.slice(0,8000)}"""`)}

/* ---------- persistence ---------- */
function save(){try{localStorage.setItem('sp2',JSON.stringify({ob:inApp,gl:G.l,cur,xp,acts,best,EV,ch:CHAR,sets:sets.map(s=>({...s,m:[...s.m],goal:undefined,gl:(s.goal||G).l}))}))}catch(e){}}
function load(){try{const d=JSON.parse(localStorage.getItem('sp2')||'null');if(!d||!Array.isArray(d.sets)||!d.sets.length)return false;G=GOALS.find(g=>g.l===d.gl)||G;sets=d.sets.map(s=>({...s,m:new Set(s.m||[]),goal:GOALS.find(g=>g.l===s.gl)||G}));cur=Math.min(d.cur||0,sets.length-1);xp=d.xp||0;acts=d.acts||0;best=d.best||{};EV=d.EV||[];CHAR=d.ch||0;return !!d.ob}catch(e){return false}}
setInterval(save,4000);window.addEventListener('beforeunload',save);

/* ---------- calendar ---------- */
const TY={exam:['Exam','#e5484d','#fdecec','#9b1c1f'],project:['Project','#e8912d','#fdf1e1','#8a4f08'],study:['Study session','#2f86d9','#e8f3fd','#174f85'],other:['Other','#6b7686','#eef2f7','#3f4a5a']};
const TV={flashcards:'flash',quiz:'quiz',notes:'notes',tutor:'tutor',arcade:'arcade'};
const tv=t=>{const x=TY[t]||TY.other;return `--c:${x[1]};--cb:${x[2]};--cd:${x[3]}`};
const ymd=d=>d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');
const parse=s=>{const[y,m,d]=s.split('-').map(Number);return new Date(y,m-1,d)};
const addD=(d,n)=>{const x=new Date(d);x.setDate(x.getDate()+n);return x};
const wk=d=>addD(d,-d.getDay()),DW=['SUN','MON','TUE','WED','THU','FRI','SAT'];
const fmt12=t=>{const[h,m]=t.split(':').map(Number);return(h%12||12)+(m?':'+String(m).padStart(2,'0'):'')+(h<12?'a':'p')};
const evOn=d=>EV.filter(e=>e.date===d).sort((a,b)=>(a.time||'').localeCompare(b.time||''));
const MS=d=>d.toLocaleString('en',{month:'short'});
const ev0=e=>{const d=parse(e.date);if(e.time){const[h,m]=e.time.split(':').map(Number);d.setHours(h,m,0,0)}else d.setHours(9,0,0,0);return d};
const rel=ms=>{const m=Math.round(ms/6e4);return m<60?`in ${m} min`:m<1440?`in ${Math.round(m/60)} h`:`in ${Math.round(m/1440)} d`};
function chkRem(){const now=Date.now();EV.forEach(e=>{if(!e.rem||e.fired)return;const st=ev0(e).getTime();if(now>=st-e.rem*6e4&&now<st+36e5){e.fired=1;const msg=`⏰ ${e.t} ${st>now?'starts '+rel(st-now):'is happening now'}`;toast(msg);try{if(window.Notification&&Notification.permission==='granted')new Notification('StudyParadise',{body:msg})}catch(x){}}})}
async function enRem(){try{const p=await Notification.requestPermission();toast(p==='granted'?'Reminders enabled':'Notifications blocked. In-app alerts still work.')}catch(e){toast('Notifications are not available here. In-app alerts still work.')}go('cal')}
const remBanner=()=>(window.Notification&&Notification.permission==='default')?`<div class="card rb"><div><b>Never miss a deadline</b><br><span class="mut">Get reminders for exams, projects and study sessions.</span></div><button class="pill" onclick="enRem()">Enable reminders</button></div>`:'';
function calGo(n){calD=calM==='week'?addD(calD,7*n):new Date(calD.getFullYear(),calD.getMonth()+n,1);go('cal')}
function calSet(k){calD=parse(k);go('cal')}
function mini(){const D=calD,f=new Date(D.getFullYear(),D.getMonth(),1),st=addD(f,-f.getDay()),t=ymd(new Date()),ws=ymd(wk(D)),we=ymd(addD(wk(D),6));let h='';
 for(let i=0;i<42;i++){const d=addD(st,i),k=ymd(d);h+=`<div class="md1 ${d.getMonth()!==D.getMonth()?'o':''} ${k===t?'td':calM==='week'&&k>=ws&&k<=we?'sel':''} ${EV.some(e=>e.date===k)?'has':''}" onclick="calSet('${k}')">${d.getDate()}</div>`}
 return `<div class="card mini"><div class="mh2"><span>${D.toLocaleString('en',{month:'long',year:'numeric'})}</span><span class="sg"><button class="ib" onclick="calMo(-1)">‹</button><button class="ib" onclick="calMo(1)">›</button></span></div><div class="mg7">${['S','M','T','W','T','F','S'].map(x=>`<b>${x}</b>`).join('')}${h}</div></div>`}
function calMo(n){calD=new Date(calD.getFullYear(),calD.getMonth()+n,1);go('cal')}
function upc(){const t=ymd(new Date()),L=EV.filter(e=>e.date>=t&&e.type!=='study').sort((a,b)=>a.date.localeCompare(b.date)).slice(0,5);
 return `<div class="card upc"><h3>Coming up</h3>${L.length?L.map(e=>{const d=Math.round((parse(e.date)-parse(t))/864e5);return `<div class="ui" onclick="evOpen(${e.id})"><i style="background:${TY[e.type][1]}"></i><div style="flex:1"><b>${esc(e.t)}</b><br><span class="mut">${d===0?'Today':d===1?'Tomorrow':'In '+d+' days'}${e.planned?' · '+e.planned+' sessions planned':''}</span></div></div>`}).join(''):'<p class="mut" style="margin:0">Add an exam or project and Aero will plan your study sessions.</p>'}<button class="pill" style="width:100%;margin-top:12px" onclick="evOpen(null,'${t}',null,'exam')">Add exam or project</button></div>`}
function weekG(){const ws=wk(calD),days=[...Array(7)].map((_,i)=>addD(ws,i)),t=ymd(new Date()),now=new Date();
 const head=`<div class="wkh"><div></div>${days.map(d=>`<div class="${ymd(d)===t?'tdy':''}"><small>${DW[d.getDay()]}</small><b>${d.getDate()}</b></div>`).join('')}</div>`;
 const ad=`<div class="wad"><div>all-day</div>${days.map(d=>`<div onclick="evOpen(null,'${ymd(d)}')">${evOn(ymd(d)).filter(e=>!e.time).map(e=>`<span class="pl" style="${tv(e.type)}" onclick="event.stopPropagation();evOpen(${e.id})">${esc(e.t)}</span>`).join('')}</div>`).join('')}</div>`;
 const hrs=`<div class="hrs">${Array.from({length:18},(_,i)=>`<div>${(i+6)%12||12} ${i+6<12?'AM':'PM'}</div>`).join('')}</div>`;
 const cols=days.map(d=>{const k=ymd(d);return `<div class="dc" onclick="dcClick(event,'${k}')">${evOn(k).filter(e=>e.time).map(e=>{const[h,m]=e.time.split(':').map(Number),top=Math.max(0,(h-6+m/60)*44),hh=Math.max(24,(e.dur||60)/60*44);return `<div class="ev" style="${tv(e.type)};top:${top}px;height:${hh}px" onclick="event.stopPropagation();evOpen(${e.id})"><b>${esc(e.t)}</b><br>${fmt12(e.time)}</div>`}).join('')}${k===t?`<div class="now" style="top:${Math.max(0,(now.getHours()-6+now.getMinutes()/60)*44)}px"></div>`:''}</div>`}).join('');
 return `<div class="card cal">${head}${ad}<div class="wkb" id="wkb">${hrs}${cols}</div></div>`}
function dcClick(e,k){const r=e.currentTarget.getBoundingClientRect(),h=Math.min(22,6+Math.floor((e.clientY-r.top)/44));evOpen(null,k,String(h).padStart(2,'0')+':00')}
function monthG(){const D=calD,f=new Date(D.getFullYear(),D.getMonth(),1),st=addD(f,-f.getDay()),t=ymd(new Date());let h=DW.map(x=>`<div class="mgh">${x}</div>`).join('');
 for(let i=0;i<42;i++){const d=addD(st,i),k=ymd(d),es=evOn(k);if(i===35&&d.getMonth()!==D.getMonth())break;
  h+=`<div class="${d.getMonth()!==D.getMonth()?'o':''}" onclick="evOpen(null,'${k}')"><span class="dn ${k===t?'td':''}">${d.getDate()}</span>${es.slice(0,3).map(e=>`<span class="pl" style="${tv(e.type)}" onclick="event.stopPropagation();evOpen(${e.id})">${e.time?fmt12(e.time)+' ':''}${esc(e.t)}</span>`).join('')}${es.length>3?`<small class="mut">+${es.length-3} more</small>`:''}</div>`}
 return `<div class="card cal"><div class="mgr">${h}</div></div>`}
V.cal=()=>{const D=calD,ws=wk(D),we=addD(ws,6),title=calM==='week'?(ws.getMonth()===we.getMonth()?`${MS(ws)} ${ws.getDate()} – ${we.getDate()}, ${we.getFullYear()}`:`${MS(ws)} ${ws.getDate()} – ${MS(we)} ${we.getDate()}, ${we.getFullYear()}`):D.toLocaleString('en',{month:'long',year:'numeric'});
 return `<div class="calh"><button class="chip" onclick="calD=new Date();go('cal')">Today</button><span class="sg"><button class="ib" onclick="calGo(-1)">‹</button><button class="ib" onclick="calGo(1)">›</button></span><h2>${title}</h2><div class="seg"><button class="${calM==='week'?'on':''}" onclick="calM='week';go('cal')">Week</button><button class="${calM==='month'?'on':''}" onclick="calM='month';go('cal')">Month</button></div><button class="pill" onclick="evOpen()">＋ Add</button></div>${remBanner()}<div class="calw"><div>${mini()}${upc()}</div><div>${calM==='week'?weekG():monthG()}</div></div>`};
function evOpen(id,date,time,type){const e=id?EV.find(x=>x.id===id):{type:type||'exam',t:'',date:date||ymd(new Date()),time:time||'',dur:60,note:'',rem:60};if(!e)return;
 const f=flat(),opt=(a,v)=>a.map(x=>`<option value="${x[0]}" ${String(x[0])===String(v)?'selected':''}>${x[1]}</option>`).join('');
 openM(`<div class="mdc card"><div class="fh"><h2>${id?'Edit event':'Add to calendar'}</h2><button class="ib" onclick="closeM()">✕</button></div>
 <div class="seg" id="ets">${Object.keys(TY).map(k=>`<button class="${e.type===k?'on':''}" onclick="evT('${k}',this)">${TY[k][0]}</button>`).join('')}</div><input type="hidden" id="ef_type" value="${e.type}">
 <label class="fl">Title</label><input class="fi" id="ef_t" value="${esc(e.t)}" placeholder="e.g. ${esc(S().name)} midterm">
 <div class="fr"><div><label class="fl">Date</label><input class="fi" type="date" id="ef_d" value="${e.date}"></div><div><label class="fl">Time (optional)</label><input class="fi" type="time" id="ef_tm" value="${e.time||''}"></div></div>
 <div class="fr"><div><label class="fl">Duration</label><select class="fi" id="ef_du">${opt([[30,'30 min'],[45,'45 min'],[60,'1 hour'],[90,'1.5 hours'],[120,'2 hours'],[180,'3 hours']],e.dur||60)}</select></div><div><label class="fl">Reminder</label><select class="fi" id="ef_r">${opt([[0,'None'],[10,'10 minutes before'],[60,'1 hour before'],[1440,'1 day before'],[4320,'3 days before']],e.rem||0)}</select></div></div>
 <label class="fl">What it covers</label><textarea class="fi" id="ef_n" rows="3" placeholder="e.g. ${esc(f[0]||'Chapters 1 to 4')}${f[1]?', '+esc(f[1]):''}">${esc(e.note||'')}</textarea>
 <div class="row" style="justify-content:flex-start"><button class="pill" onclick="evSave(${id||0})">${id?'Save changes':'Add event'}</button>${id?`<button class="ghost" style="color:var(--bad)" onclick="evDel(${id})">Delete</button>`:''}</div>
 ${id&&(e.type==='exam'||e.type==='project')?`<div class="plb"><b>Study plan</b><p class="mut" style="margin:4px 0 10px">${e.planned?e.planned+' sessions are on your calendar.':'Let Aero build a day-by-day plan up to this date.'}</p><div class="sg"><select class="fi" id="ef_h" style="width:auto;margin:0"><option value="1">1 hour a day</option><option value="2">2 hours a day</option><option value="3">3 hours a day</option></select><button class="pill" onclick="planFor(${id})">${e.planned?'Rebuild plan':'Create study plan'}</button></div></div>`:''}
 ${id&&e.type==='study'&&e.tool?`<div class="plb"><b>Focus</b><p class="mut" style="margin:4px 0 10px">${esc(e.note||'')}</p><button class="pill" onclick="closeM();go('${TV[e.tool]||'flash'}')">Start session</button></div>`:''}</div>`)}
function evT(k,b){$('#ef_type').value=k;document.querySelectorAll('#ets button').forEach(x=>x.classList.toggle('on',x===b))}
function evSave(id){const g=k=>$('#ef_'+k).value;if(!g('t').trim()){toast('Add a title');return}if(!g('d')){toast('Pick a date');return}
 const o={t:g('t').trim(),type:g('type'),date:g('d'),time:g('tm'),dur:+g('du'),note:g('n'),rem:+g('r')};let nid=id;
 if(id){Object.assign(EV.find(x=>x.id===id),o,{fired:0})}else{nid=Date.now();EV.push({id:nid,...o})}
 calD=parse(o.date);save();closeM();go('cal');if(!id&&(o.type==='exam'||o.type==='project')){evOpen(nid);toast('Saved. Build a study plan below.')}else toast('Saved')}
function evDel(id){EV=EV.filter(e=>e.id!==id&&e.pid!==id);save();closeM();go('cal')}
function planFor(id){return guard('plan',()=>planFor0(id))}
async function planFor0(id){const e=EV.find(x=>x.id===id),h=+$('#ef_h').value||1,s=S(),today=ymd(new Date());closeM();
 if(e.date<=today){toast('Pick an exam date in the future first');return}
 ovShow('Building your study plan…',`${e.t} · ${e.date}`);
 try{const a=await J(`Today is ${today}. Build a detailed day-by-day study plan for a ${gs().l} learner preparing for "${e.t}" (${e.type}) on ${e.date}. It covers: ${e.note||s.name}. Syllabus: ${s.plan.map(p=>p.t+': '+p.i.join(', ')).join(' | ')}. About ${h} hour(s) of study per day. Return ONLY a JSON array of {"date":"YYYY-MM-DD","min":minutes,"title":"short session title","focus":"one sentence on exactly what to do","tool":"flashcards|quiz|notes|tutor|arcade"}. Use only dates from ${today} to ${ymd(addD(parse(e.date),-1))}. Mix the tools and end with a light review the day before. At most 28 items.`,{cache:false});
  const arr=(Array.isArray(a)?a:(a&&a.plan)||[]).filter(x=>x&&x.title&&x.date>=today&&x.date<e.date);
  if(!arr.length)throw{message:'No sessions came back. Try again.'};
  EV=EV.filter(x=>x.pid!==id);arr.slice(0,28).forEach((x,i)=>EV.push({id:Date.now()+i+1,pid:id,type:'study',t:x.title,date:x.date,time:'18:00',dur:Math.min(180,Math.max(15,+x.min||60)),note:x.focus||'',tool:x.tool,rem:10}));
  e.planned=Math.min(arr.length,28);calD=parse(arr[0].date);toast(`Added ${e.planned} study sessions to your calendar`);bump()}catch(x){toast(x&&x.code==='cancelled'?'Cancelled':x&&x.code?aiMsg(x):(x&&x.message)||'Could not build a plan')}
 ovHide();save();go('cal')}

/* ---------- record lecture ---------- */
const SRC=window.SpeechRecognition||window.webkitSpeechRecognition;
V.record=()=>`<h1>Lecture Capture</h1><p class="mut" style="margin:6px 0 18px">Capture a live lecture as text, then turn it into a study set.</p><div class="card pad" style="text-align:center">${SRC?`<button class="mic ${REC.on?'on':''}" onclick="recT()">${ic('mic',36)}</button><p class="mut" style="margin:0 0 14px">${REC.on?'Listening… tap to stop':'Tap to start recording'}</p>`:'<p class="mut">Live transcription is not supported in this browser. Paste your transcript below instead.</p>'}<textarea class="ta" id="rt" style="min-height:200px;text-align:left" oninput="REC.t=this.value" placeholder="Your transcript appears here. You can edit it.">${esc(REC.t)}</textarea><div class="row"><button class="pill" onclick="recMk()">Create study set from this</button><button class="chip" onclick="REC.t='';go('record')">Clear</button></div></div>`;
function recT(){if(REC.on){REC.on=0;try{REC.sr.stop()}catch(e){}return go('record')}
 try{const R=new SRC();R.continuous=true;R.interimResults=true;R.lang='en-US';R.onresult=e=>{for(let k=e.resultIndex;k<e.results.length;k++)if(e.results[k].isFinal)REC.t+=e.results[k][0].transcript+' ';const t=$('#rt');if(t){t.value=REC.t;t.scrollTop=t.scrollHeight}};R.onend=()=>{if(REC.on)try{R.start()}catch(e){}};R.onerror=e=>{if(e.error!=='no-speech'){REC.on=0;toast('Microphone: '+e.error);if(view==='record')go('record')}};R.start();REC.sr=R;REC.on=1;go('record')}catch(e){toast('Could not start recording')}}
function recMk(){if(REC.t.trim().length<80){toast('Record or paste a bit more first');return}build(REC.t,0)}

/* ---------- audio recap ---------- */
V.audio=()=>{const r=AIC[ak('audio')],head=`<h1>Audio Brief</h1><p class="mut" style="margin:6px 0 18px">A short spoken recap of ${esc(S().name)} you can listen to anywhere.</p>`;
 if(r==='load')return head+LOAD;
 if(!r||r.err||!r.script)return head+`<div class="card pad">${errBox(r)}<button class="pill" onclick="genAudio()">Generate recap</button></div>`;
 return head+`<div class="card pad"><div class="sg" style="margin-bottom:16px"><button class="pill" onclick="speak(AIC[ak('audio')].script)">▶ Play</button><button class="chip" onclick="speechSynthesis.pause()">Pause</button><button class="chip" onclick="speechSynthesis.resume()">Resume</button><button class="chip" onclick="speechSynthesis.cancel()">Stop</button><button class="chip" onclick="genAudio()">Regenerate</button></div><p style="font-size:16px;line-height:1.7;margin:0">${esc(r.script)}</p></div>`};
function genAudio(){const s=S();aiGen('audio','',`Write a 150 to 200 word spoken audio recap script (no headings or bullets, natural spoken language) of "${s.name}" for a ${gs().l} learner. Syllabus: ${s.plan.map(p=>p.t+': '+p.i.join(', ')).join(' | ')}. Key cards: ${s.cards.slice(0,14).map(x=>x.q+' = '+x.a).join(' | ')}. Return ONLY JSON {"script":"..."}.`)}

/* ---------- mini apps ---------- */
V.apps=()=>`<h1 style="margin-bottom:6px">Toolbox</h1><p class="mut" style="margin:0 0 16px">Small tools that make studying easier.</p><div class="seg" style="margin-bottom:16px">${['Focus timer','Grade calculator'].map((x,i)=>`<button class="${MA.t===i?'on':''}" onclick="MA.t=${i};go('apps')">${x}</button>`).join('')}</div>`+(MA.t?gcHTML():tmHTML());
const tmF=()=>String(Math.floor(MA.left/60)).padStart(2,'0')+':'+String(MA.left%60).padStart(2,'0');
const tmHTML=()=>`<div class="card pad" style="text-align:center"><div class="seg">${[['focus','Focus 25'],['break','Break 5']].map(x=>`<button class="${MA.mode===x[0]?'on':''}" onclick="tmMode('${x[0]}')">${x[1]}</button>`).join('')}</div><div class="tm" id="tmd">${tmF()}</div><div class="row"><button class="pill" onclick="tmGo()">${MA.run?'Pause':'Start'}</button><button class="chip" onclick="tmMode(MA.mode)">Reset</button></div></div>`;
function tmMode(m){stopG();MA.mode=m;MA.left=m==='focus'?1500:300;MA.run=0;go('apps')}
function tmGo(){if(MA.run){stopG();MA.run=0;go('apps');return}MA.run=1;go('apps');const iv=setInterval(()=>{MA.left--;const e=$('#tmd');if(e)e.textContent=tmF();if(MA.left<=0){good();toast(MA.mode==='focus'?'Focus session complete. Take a break!':'Break over. Back to it!');if(MA.mode==='focus'){xp+=15;bump()}tmMode(MA.mode==='focus'?'break':'focus')}},1000);GM=()=>{clearInterval(iv);MA.run=0}}
const gcOut=()=>{const w=MA.gc.reduce((a,r)=>a+(r.w||0),0),sw=MA.gc.reduce((a,r)=>a+(r.g||0)*(r.w||0),0),avg=w?sw/w:0,rem=100-w,need=rem>0?(MA.tg*100-sw)/rem:null;return `<div><b>${avg.toFixed(1)}%</b>Current average</div><div><b>${w}%</b>Weight graded</div><div style="grid-column:1/-1"><b>${need===null?'—':need.toFixed(1)+'%'}</b>${need===null?'No weight left':'Needed on the remaining '+rem+'% to reach '+MA.tg+'%'}</div>`};
function gcR(){const e=$('#gcr');if(e)e.innerHTML=gcOut()}
const gcHTML=()=>`<div class="card pad"><div class="gcr mut"><span>Item</span><span>Grade %</span><span>Weight %</span></div>${MA.gc.map((r,i)=>`<div class="gcr"><input class="fi" value="${esc(r.n)}" oninput="MA.gc[${i}].n=this.value"><input class="fi" type="number" value="${r.g}" oninput="MA.gc[${i}].g=+this.value;gcR()"><input class="fi" type="number" value="${r.w}" oninput="MA.gc[${i}].w=+this.value;gcR()"></div>`).join('')}<div class="sg" style="margin:10px 0 16px"><button class="chip" onclick="MA.gc.push({n:'New item',g:85,w:10});go('apps')">＋ Add item</button><button class="chip" onclick="MA.gc.pop();go('apps')">Remove last</button></div><div class="stats" id="gcr">${gcOut()}</div><label class="fl">Target overall grade %</label><input class="fi" type="number" value="${MA.tg}" oninput="MA.tg=+this.value;gcR()" style="max-width:140px"></div>`;

function boot(){if(load())enter();else onb1();setInterval(chkRem,30000);setTimeout(chkRem,2500)}
/* ---------- games ---------- */
const GI={
city:{t:'City Run',d:'Sprint down the avenue and run through the gate with the right answer.',how:['← → or tap a lane to switch lanes','Grab coins along the way','Three lives, ten gates. Streaks multiply points']},
rocket:{t:'Rocket Defender',d:'Shoot down the correct answer before it crashes into your shield.',how:['Move with mouse, touch or ← →','Click, tap or press Space to fire','Only hit the right answer: wrong hits cost a shield']},
match:{t:'Match Game',d:'Pair every term with its definition against the clock.',how:['Tap a term, then its definition','Chain matches for combo bonuses','Each wrong pair adds 2 seconds']},
blitz:{t:'Flash Blitz',d:'Rapid-fire true or false. Keep the streak alive.',how:['← False, → True (or tap)','Every card has a 5-second fuse','Streaks raise your multiplier']}};
const LG=(k,z)=>{const P={city:'<path d="M10 50V32h8v18M20 50V22h9v28M31 50V28h8v22M41 50V36h8v14" fill="#3b3b40"/><path d="M8 52h48" stroke="#5eb3f5" stroke-width="3" stroke-linecap="round"/><path d="M14 44l10-6 8 4 14-14" stroke="#fff" stroke-width="2.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/><circle cx="47" cy="15" r="4.5" fill="#5eb3f5"/>',
rocket:'<path d="M32 8c8 6 12 16 10 28H22c-2-12 2-22 10-28z" fill="#fff"/><circle cx="32" cy="24" r="4.5" fill="#5eb3f5"/><path d="M22 36l-8 9 10-3zM42 36l8 9-10-3z" fill="#5eb3f5"/><path d="M28 40h8l-4 12z" fill="#5eb3f5"/>',
match:'<rect x="9" y="16" width="26" height="34" rx="5" fill="#fff" transform="rotate(-8 22 33)"/><rect x="29" y="14" width="26" height="34" rx="5" fill="#5eb3f5" transform="rotate(8 42 31)"/><path d="M37 29l4 4 8-9" stroke="#26262a" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
blitz:'<path d="M37 8L18 36h12l-4 20 20-30H34z" fill="#5eb3f5"/>'}[k];return `<svg width="${z}" height="${z}" viewBox="0 0 64 64" style="flex:none"><rect width="64" height="64" rx="16" fill="#26262a"/>${P}</svg>`};
const gsh=k=>{const g=GI[k];return `<div class="card gz" id="gz"><div class="gs">${LG(k,92)}<h1>${g.t}</h1><p class="mut">${g.d}</p><ul>${g.how.map(x=>`<li>${x}</li>`).join('')}</ul>${best[k]?`<p class="bestl">Best score: <b>${best[k]}</b></p>`:''}<div class="row"><button class="pill" onclick="cd('${k}')">Play</button><button class="chip" onclick="snd=!snd;go('${k}')">Sound ${snd?'on':'off'}</button></div></div></div>`};
const GAMES={};let AC=null,PT=[],TX=[];
const beep=(f,d=.1,ty='sine',v=.05)=>{if(!snd)return;try{AC=AC||new(window.AudioContext||window.webkitAudioContext)();const o=AC.createOscillator(),g=AC.createGain();o.type=ty;o.frequency.value=f;g.gain.value=v;o.connect(g);g.connect(AC.destination);o.start();g.gain.exponentialRampToValueAtTime(.0001,AC.currentTime+d);o.stop(AC.currentTime+d)}catch(e){}};
const good=()=>{beep(660,.08);setTimeout(()=>beep(880,.12),70)},bad=()=>beep(150,.25,'sawtooth');
function cd(k){const z=$('#gz');let n=3,tm;const t=()=>{z.innerHTML=`<div class="gs"><div class="cdn">${n>0?n:'Go!'}</div></div>`;beep(n>0?440:880,.12);if(n--<0){GM=null;GAMES[k]();return}tm=setTimeout(t,650)};GM=()=>clearTimeout(tm);t()}
function over(k,sc,ls,mx){stopG();xp+=sc;bump();const b=best[k]||0,nb=sc>b;if(nb)best[k]=sc;const s=sc>=mx*.7?3:sc>=mx*.4?2:1;
 $('#gz').innerHTML=`<div class="gs">${LG(k,72)}<p class="mut" style="margin:10px 0 0">${GI[k].t}</p><div class="stars">${[1,2,3].map(i=>`<span class="${i<=s?'on':''}">★</span>`).join('')}</div><div class="big">${sc}</div><p style="color:var(--goldd);font-weight:600">${nb?'New best score!':'Best: '+b}</p><p class="mut">${ls.join(' · ')}</p><div class="row"><button class="pill" onclick="cd('${k}')">Play again</button><button class="ghost" onclick="go('arcade')">Back to Play Zone</button></div></div>`;if(s===3)good()}
const cv=()=>{const z=$('#gz');z.innerHTML='<canvas id="cv" width="720" height="440"></canvas>';const k=$('#cv');return[k,k.getContext('2d')]};
const cvp=(k,e)=>{const r=k.getBoundingClientRect();return(e.clientX-r.left)/r.width*720};
const rr=(c,x,y,w,h,r)=>{c.beginPath();c.moveTo(x+r,y);c.arcTo(x+w,y,x+w,y+h,r);c.arcTo(x+w,y+h,x,y+h,r);c.arcTo(x,y+h,x,y,r);c.arcTo(x,y,x+w,y,r);c.closePath()};
function wr(c,t,x,y,w,lh,max){const ws=String(t).split(' ');let l='',ls=[];ws.forEach(d=>{const tt=l?l+' '+d:d;if(c.measureText(tt).width>w&&l){ls.push(l);l=d}else l=tt});ls.push(l);ls=ls.slice(0,max||3);const y0=y-(ls.length-1)*lh/2;ls.forEach((s,i)=>c.fillText(s,x,y0+i*lh))}
const burst=(x,y,col,n=16)=>{for(let i=0;i<n;i++){const a=Math.random()*6.28,s=60+Math.random()*200;PT.push({x,y,vx:Math.cos(a)*s,vy:Math.sin(a)*s,l:.7,c:col})}},pop=(x,y,t,col='#5eb3f5')=>TX.push({x,y,t,c:col,l:1});
function fxr(c,dt){PT=PT.filter(p=>(p.l-=dt)>0);PT.forEach(p=>{p.x+=p.vx*dt;p.y+=p.vy*dt;c.globalAlpha=Math.max(0,p.l/.7);c.fillStyle=p.c;c.fillRect(p.x,p.y,5,5)});c.globalAlpha=1;TX=TX.filter(t=>(t.l-=dt)>0);c.font='700 22px Inter,sans-serif';c.textAlign='center';TX.forEach(t=>{t.y-=40*dt;c.globalAlpha=Math.min(1,t.l*2);c.fillStyle=t.c;c.fillText(t.t,t.x,t.y)});c.globalAlpha=1}
function hudc(c,sc,lv,r,dark){c.textBaseline='middle';c.font='700 16px Inter,sans-serif';c.textAlign='left';c.fillStyle=dark?'#fff':'#1d1d1b';c.fillText('Score '+sc,16,22);c.textAlign='center';c.fillStyle='#5eb3f5';c.fillText('♥'.repeat(Math.max(lv,0))+'♡'.repeat(Math.max(3-lv,0)),360,22);c.textAlign='right';c.fillStyle=dark?'#fff':'#1d1d1b';c.fillText(r,704,22)}
function av(c,x,y,z){c.save();c.translate(x-z/2,y-z/2);c.scale(z/40,z/40);c.fillStyle='#e4f1fc';c.beginPath();c.arc(20,20,20,0,6.3);c.fill();c.fillStyle='#2f86d9';c.fill(new Path2D('M20 8c.9 6.3 3.7 9.1 10 10-6.3.9-9.1 3.7-10 10-.9-6.3-3.7-9.1-10-10 6.3-.9 9.1-3.7 10-10z'));c.restore()}

GAMES.city=()=>{const[k,c]=cv();PT=[];TX=[];
 const qs=shuf(pool()),N=10,HZ=150,W0=70,W1=620,BH=[70,110,60,95,130,80,100,65];
 let sc=0,lv=3,qi=0,L=1,px=1,st=0,ok=0,phase='run',pt=0,cur,coins=[],sh=0,t=0,done=0,last=performance.now(),raf;
 const U=d=>Math.pow(d,1.8),wd=u=>W0+(W1-W0)*u,yy=u=>HZ+(440-HZ)*u,lx=(l,u)=>360+(l-1)*wd(u)/3;
 function nq(){if(qi>=N||lv<=0){done=1;return over('city',sc,[`${ok}/${N} gates cleared`],N*16)}
  const q=qs[qi%qs.length],w=shuf(q.o.map((_,i)=>i).filter(i=>i!==q.c)).slice(0,2),o=shuf([q.c,...w]);
  cur={q,o,cl:o.indexOf(q.c),d:0,T:Math.max(4.6,8-qi*.4)};coins=[];for(let i=0;i<6;i++)coins.push({l:Math.floor(Math.random()*3),d:.12+i*.13,got:0});phase='run'}
 function road(){c.fillStyle='#e6eef8';c.fillRect(0,0,720,HZ);c.fillStyle='#d5dfeb';c.fillRect(0,HZ,720,290);
  const bs=[];for(let i=0;i<8;i++)bs.push([(i/8+t*.3)%1,i]);bs.sort((a,b)=>a[0]-b[0]);
  bs.forEach(([d,i])=>{const u=U(d),s=.1+.9*u,y=yy(u),w=40+90*u;[[-1,i],[1,(i+3)%8]].forEach(([sd,ix])=>{const ex=360+sd*wd(u)/2,x=sd<0?ex-w-8*s:ex+8*s,h=BH[ix]*s*1.6;c.fillStyle=ix%2?'#c3cfde':'#b5c3d5';c.fillRect(x,y-h,w,h);c.fillStyle='#dbe4ef';for(let r=1;r<4;r++)c.fillRect(x+w*.15,y-h+r*h*.25,w*.7,2*s+1)})});
  c.fillStyle='#2b2b2e';c.beginPath();c.moveTo(360-W0/2,HZ);c.lineTo(360+W0/2,HZ);c.lineTo(360+W1/2,440);c.lineTo(360-W1/2,440);c.fill();
  c.strokeStyle='#5eb3f5';c.lineWidth=3;c.beginPath();c.moveTo(360-W0/2,HZ);c.lineTo(360-W1/2,440);c.moveTo(360+W0/2,HZ);c.lineTo(360+W1/2,440);c.stroke();
  c.strokeStyle='rgba(255,255,255,.6)';for(const j of[-1,1])for(let i=0;i<12;i++){const d0=(i/12+t*.5)%1,u0=U(d0),u1=U(Math.min(d0+.035,1));c.lineWidth=1+3*u0;c.beginPath();c.moveTo(360+j*wd(u0)/6,yy(u0));c.lineTo(360+j*wd(u1)/6,yy(u1));c.stroke()}}
 function gate(){const u=U(cur.d),s=.1+.9*u,y=yy(u),w=wd(u)/3*.9,h=110*s+10;
  for(let i=0;i<3;i++){const x=lx(i,u),res=phase==='res'?(i===cur.cl?'ok':(i===L?'no':'')):'';c.fillStyle=res==='ok'?'#2f9e5b':res==='no'?'#d64545':'#fff';rr(c,x-w/2,y-h,w,h,10*s+2);c.fill();c.strokeStyle='#5eb3f5';c.lineWidth=3*s+1;c.stroke();
   if(s>.3){c.fillStyle=res?'#fff':'#1d1d1b';c.font=`600 ${Math.max(10,15*s+3)}px Inter,sans-serif`;c.textAlign='center';c.textBaseline='middle';wr(c,cur.q.o[cur.o[i]],x,y-h/2,w-12,Math.max(12,17*s),4)}}}
 function loop(now){if(done)return;const dt=Math.min(.05,(now-last)/1e3);last=now;t+=dt;px+=(L-px)*Math.min(1,dt*12);if(sh>0)sh-=dt;
  if(phase==='run'){cur.d+=dt/cur.T;coins.forEach(o=>{o.d+=dt/cur.T;if(!o.got&&o.d>.88&&o.d<1&&Math.abs(px-o.l)<.55){o.got=1;sc+=2;pop(lx(o.l,U(.9)),350,'+2');beep(990,.05)}});
   if(cur.d>=.93){cur.d=.93;phase='res';pt=0;coins=[];const X=lx(L,U(.93));if(L===cur.cl){const b=10+Math.min(st,5)*2;sc+=b;st++;ok++;burst(X,380,'#5eb3f5',24);pop(X,320,'+'+b);good()}else{lv--;st=0;sh=.4;burst(X,380,'#d64545',18);pop(X,320,'Wrong lane','#d64545');bad()}}}
  else{pt+=dt;if(pt>1){qi++;nq();if(done)return}}
  c.save();if(sh>0)c.translate((Math.random()-.5)*12,(Math.random()-.5)*8);
  road();gate();coins.forEach(o=>{if(o.got||o.d<=0||o.d>.97)return;const u=U(o.d),s=.1+.9*u,r=14*s+2;c.fillStyle='#5eb3f5';c.beginPath();c.arc(lx(o.l,u),yy(u)-r-4*s,r,0,6.3);c.fill();c.strokeStyle='#1b5f9e';c.lineWidth=2;c.stroke()});
  const pu=U(.93),X=lx(px,pu);c.fillStyle='rgba(0,0,0,.35)';c.beginPath();c.ellipse(X,418,22,6,0,0,6.3);c.fill();av(c,X,392-Math.abs(Math.sin(t*14))*7,40);
  c.restore();fxr(c,dt);
  c.fillStyle='#fff';rr(c,12,38,696,56,12);c.fill();c.strokeStyle='#5eb3f5';c.lineWidth=2;c.stroke();c.fillStyle='#1d1d1b';c.font='600 15px Inter,sans-serif';c.textAlign='center';c.textBaseline='middle';wr(c,cur.q.q,360,66,670,19,2);
  hudc(c,sc,lv,`Gate ${Math.min(qi+1,N)}/${N}`);raf=requestAnimationFrame(loop)}
 const kd=e=>{if(e.key==='ArrowLeft'||e.key==='a'){L=Math.max(0,L-1);e.preventDefault()}if(e.key==='ArrowRight'||e.key==='d'){L=Math.min(2,L+1);e.preventDefault()}};
 const pd=e=>{L=Math.max(0,Math.min(2,Math.floor(cvp(k,e)/240)))};
 document.addEventListener('keydown',kd);k.addEventListener('pointerdown',pd);k.addEventListener('pointermove',e=>{if(e.buttons)pd(e)});
 GM=()=>{done=1;cancelAnimationFrame(raf);document.removeEventListener('keydown',kd)};nq();raf=requestAnimationFrame(loop)};

GAMES.rocket=()=>{const[k,c]=cv();PT=[];TX=[];
 const qs=shuf(pool()),W=8,SR=Array.from({length:70},()=>({x:Math.random()*720,y:Math.random()*440,s:Math.random()*1.6+.4}));
 let sc=0,lv=3,w=0,sx=360,tx=360,bl=[],as=[],cur,phase='play',pt=0,cool=0,down=0,keys={},hits=0,shots=0,t=0,done=0,last=performance.now(),raf;
 function wave(){if(w>=W||lv<=0){done=1;return over('rocket',sc,[`${hits}/${W} waves cleared`,shots?Math.round(hits/shots*100)+'% accuracy':''],140)}
  cur=qs[w%qs.length];as=shuf([0,1,2,3]).map((oi,i)=>({x:90+i*180,y:-70-Math.random()*130,h:66,wd:158,t:cur.o[oi],ok:oi===cur.c,v:34+w*5+Math.random()*10,dead:0}));bl=[];phase='play'}
 function shoot(){if(phase!=='play'||cool>0)return;bl.push({x:sx,y:386});cool=.26;shots++;beep(520,.05,'square',.03)}
 function loop(now){if(done)return;const dt=Math.min(.05,(now-last)/1e3);last=now;t+=dt;cool-=dt;
  if(keys.ArrowLeft)tx-=460*dt;if(keys.ArrowRight)tx+=460*dt;tx=Math.max(30,Math.min(690,tx));sx+=(tx-sx)*Math.min(1,dt*14);if(down)shoot();
  bl.forEach(b=>b.y-=640*dt);bl=bl.filter(b=>b.y>-10&&!b.dead);
  if(phase==='play'){as.forEach(a=>{if(a.dead)return;a.y+=a.v*dt;if(a.y+a.h>=396){if(a.ok){lv--;phase='res';pt=0;pop(a.x,380,'Crashed!','#d64545');burst(a.x,396,'#d64545',18);bad()}else{a.dead=1;burst(a.x,396,'#8a8a85',8)}}});
   bl.forEach(b=>{as.forEach(a=>{if(a.dead||b.dead||phase!=='play')return;if(b.x>a.x-a.wd/2&&b.x<a.x+a.wd/2&&b.y<a.y+a.h&&b.y>a.y){b.dead=1;a.dead=1;if(a.ok){const p=10+w*2;sc+=p;hits++;burst(a.x,a.y+a.h/2,'#5eb3f5',28);pop(a.x,a.y,'+'+p);good();phase='res';pt=0;as.forEach(z=>{if(!z.dead){z.dead=1;burst(z.x,z.y+z.h/2,'#8a8a85',8)}})}else{lv--;burst(a.x,a.y+a.h/2,'#d64545',16);pop(a.x,a.y,'-1 shield','#d64545');bad();if(lv<=0){phase='res';pt=0}}}})})}
  else{pt+=dt;if(pt>.9){w++;wave();if(done)return}}
  c.fillStyle='#18181b';c.fillRect(0,0,720,440);SR.forEach(s=>{s.y=(s.y+s.s*12*dt)%440;c.fillStyle=`rgba(255,255,255,${.35+.3*Math.sin(t*3+s.x)})`;c.fillRect(s.x,s.y,s.s,s.s)});
  as.forEach(a=>{if(a.dead)return;c.fillStyle='#34343a';rr(c,a.x-a.wd/2,a.y,a.wd,a.h,12);c.fill();c.strokeStyle=phase==='res'&&a.ok?'#2f9e5b':'#5eb3f5';c.lineWidth=2.5;c.stroke();c.fillStyle='#fff';c.font='500 13px Inter,sans-serif';c.textAlign='center';c.textBaseline='middle';wr(c,a.t,a.x,a.y+a.h/2,a.wd-18,16,3)});
  c.fillStyle='#5eb3f5';bl.forEach(b=>c.fillRect(b.x-2,b.y,4,14));
  c.fillStyle='#26262a';c.fillRect(0,402,720,38);c.fillStyle='#5eb3f5';c.fillRect(0,402,720,2);c.fillStyle='#9a9a95';c.font='600 12px Inter,sans-serif';c.textAlign='center';c.fillText('SHIELD LINE',360,424);
  c.save();c.translate(sx,392);c.fillStyle='#fff';c.beginPath();c.moveTo(0,-26);c.lineTo(18,14);c.lineTo(0,6);c.lineTo(-18,14);c.closePath();c.fill();c.fillStyle='#5eb3f5';c.beginPath();c.moveTo(0,-14);c.lineTo(6,2);c.lineTo(-6,2);c.closePath();c.fill();c.fillRect(-3,12,6,5+Math.random()*9);c.restore();
  fxr(c,dt);c.fillStyle='#fff';rr(c,12,38,696,50,12);c.fill();c.fillStyle='#1d1d1b';c.font='600 15px Inter,sans-serif';c.textAlign='center';c.textBaseline='middle';wr(c,cur.q,360,63,670,19,2);
  hudc(c,sc,lv,`Wave ${Math.min(w+1,W)}/${W}`,1);raf=requestAnimationFrame(loop)}
 const kd=e=>{if(e.key==='ArrowLeft'||e.key==='ArrowRight'){keys[e.key]=1;e.preventDefault()}if(e.key===' '){shoot();e.preventDefault()}},ku=e=>{keys[e.key]=0};
 document.addEventListener('keydown',kd);document.addEventListener('keyup',ku);
 k.addEventListener('pointermove',e=>{tx=cvp(k,e)});k.addEventListener('pointerdown',e=>{tx=cvp(k,e);down=1;shoot()});k.addEventListener('pointerup',()=>down=0);k.addEventListener('pointerleave',()=>down=0);
 GM=()=>{done=1;cancelAnimationFrame(raf);document.removeEventListener('keydown',kd);document.removeEventListener('keyup',ku)};wave();if(!done)raf=requestAnimationFrame(loop)};

GAMES.match=()=>{const z=$('#gz'),cs=shuf(S().cards).slice(0,6),tl=shuf(cs.flatMap((c,i)=>[{i,t:c.q,k:0},{i,t:c.a,k:1}]));let sel=-1,lock=0,done=0,mv=0,pen=0,cb=0,sc=0,t0=Date.now(),iv;
 z.innerHTML=`<div class="hud2"><span id="mt">0.0s</span><span id="ms">0 pts</span><span id="mc">${cs.length} pairs</span></div><div class="tg">${tl.map((x,j)=>`<button class="tl ${x.k?'':'trm'}" data-j="${j}">${esc(x.t)}</button>`).join('')}</div>`;
 iv=setInterval(()=>{const e=$('#mt');if(e)e.textContent=((Date.now()-t0+pen)/1000).toFixed(1)+'s'},100);GM=()=>clearInterval(iv);
 z.onclick=e=>{const b=e.target.closest('.tl');if(!b||lock||b.classList.contains('done'))return;const j=+b.dataset.j;if(j===sel){b.classList.remove('on');sel=-1;return}b.classList.add('on');beep(500,.04);
  if(sel<0){sel=j;return}const a=tl[sel],B=tl[j],A=z.querySelector(`[data-j="${sel}"]`);mv++;
  if(a.i===B.i&&a.k!==B.k){cb++;sc+=50+Math.min(cb,5)*10;A.className=b.className='tl done';sel=-1;good();$('#mc').textContent=cb>1?`🔥 Combo x${cb}`:`${cs.length-done-1} pairs left`;
   if(++done===cs.length){const s=(Date.now()-t0+pen)/1000,f=sc+Math.max(0,Math.round(300-s*3));over('match',f,[`${mv} moves`,s.toFixed(1)+'s'],cs.length*100+300)}}
  else{cb=0;pen+=2000;lock=1;bad();A.classList.add('no');b.classList.add('no');$('#mc').textContent='+2s penalty';setTimeout(()=>{A.className='tl '+(a.k?'':'trm');b.className='tl '+(B.k?'':'trm');sel=-1;lock=0},600)}
  const ms=$('#ms');if(ms)ms.textContent=sc+' pts'}};

GAMES.blitz=()=>{const z=$('#gz'),cs=S().cards;let sc=0,st=0,ok=0,tot=0,tl=60,cur,iv,fuse=0,lock=0,last=performance.now(),raf,prev=-1;const FU=5;
 z.innerHTML=`<div class="hud2"><span id="bs">0 pts</span><span id="bt">60s</span><span id="bk">Streak 0</span></div><div class="fz"><i id="fu" style="width:100%"></i></div><div class="bq" id="bq"></div><div class="ctl"><button class="fb f" onclick="bA(false)">✕ False</button><button class="fb t" onclick="bA(true)">✓ True</button></div>`;
 const U=()=>{$('#bs').textContent=sc+' pts';$('#bt').textContent=Math.max(tl,0)+'s';$('#bk').textContent=st>1?`🔥 Streak ${st} · x${Math.min(4,1+Math.floor(st/3))}`:'Streak '+st};
 function nx(){let i;do{i=Math.floor(Math.random()*cs.length)}while(i===prev&&cs.length>1);prev=i;const c=cs[i];let d=c.a;if(cs.length>1&&Math.random()<.5){let o;do{o=cs[Math.floor(Math.random()*cs.length)]}while(o===c);d=o.a}cur={t:d===c.a};fuse=0;lock=0;const q=$('#bq');q.className='bq';q.innerHTML=`<small class="mut">TERM</small><h2>${esc(c.q)}</h2><div class="d">${esc(d)}</div>`}
 window.bA=v=>{if(tl<=0||lock)return;lock=1;tot++;const q=$('#bq');if(v===cur.t){sc+=10*Math.min(4,1+Math.floor(st/3));st++;ok++;good();q.classList.add('ok')}else{st=0;tl=Math.max(1,tl-3);bad();q.classList.add('no')}U();setTimeout(nx,220)};
 const kd=e=>{if(e.key==='ArrowLeft'){bA(false);e.preventDefault()}if(e.key==='ArrowRight'){bA(true);e.preventDefault()}};document.addEventListener('keydown',kd);
 iv=setInterval(()=>{tl--;U();if(tl<=0)over('blitz',sc,[`${ok}/${tot} correct`],500)},1000);
 const lp=n=>{const dt=(n-last)/1e3;last=n;if(!lock){fuse+=dt;if(fuse>=FU)bA(!cur.t?false:false)||0}const f=$('#fu');if(f)f.style.width=Math.max(0,100-fuse/FU*100)+'%';raf=requestAnimationFrame(lp)};
 GM=()=>{clearInterval(iv);cancelAnimationFrame(raf);document.removeEventListener('keydown',kd)};nx();raf=requestAnimationFrame(lp)};
boot();
