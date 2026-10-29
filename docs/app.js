const $ = s => document.querySelector(s);
const escapeHTML = v => String(v).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let lang = 'en';
try { lang = localStorage.getItem('jg-language') === 'zh' ? 'zh' : 'en'; } catch {}
let filter = 'selected';
const cv = new URLSearchParams(location.search).get('view') === 'cv';
if (cv) { document.body.classList.add('cv'); filter = 'all'; document.title = 'Jie Gao | Academic CV'; document.querySelectorAll('details').forEach(el => el.open = true); }
const tr = (en,zh) => lang === 'zh' ? zh : en;
function pubs() {
  const query = $('#search').value.trim().toLowerCase();
  const visible = profile.publications.filter(p => (filter === 'all' || p.selected) && `${p.title} ${p.journal} ${p.year} ${p.authors} ${p.tag}`.toLowerCase().includes(query));
  $('#publication-list').innerHTML = visible.length ? visible.map((p,i) => `<article class="publication"><span class="pub-index">${String(i+1).padStart(2,'0')}</span><div><div class="pub-meta"><span>${escapeHTML(p.journal)}</span><span>${p.year}</span>${p.selected ? '<span class="pub-star">✳</span>' : ''}</div><h3><a href="https://doi.org/${p.doi}" target="_blank" rel="noopener">${escapeHTML(p.title)} <span class="pub-arrow">↗</span></a></h3><p class="authors">${escapeHTML(p.authors).replace(/Gao, J\./g,'<strong>Gao, J.</strong>')}</p><p class="pub-detail">${escapeHTML(p.volume)} <span>${escapeHTML(p.tag)}</span></p><a class="doi" href="https://doi.org/${p.doi}" target="_blank" rel="noopener">DOI: ${p.doi} ↗</a></div></article>`).join('') : `<p class="empty">${tr('No matching papers. Try another title, journal, or year.','未找到匹配论文，请尝试其他题目、期刊或年份。')}</p>`;
  document.querySelectorAll('[data-filter]').forEach(el => { const active = el.dataset.filter === filter; el.classList.toggle('active',active); el.setAttribute('aria-pressed',String(active)); });
}
function render() {
  document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
  document.querySelectorAll('[data-en]').forEach(el => {
    const lines = el.dataset[lang].split(/<br\s*\/?>/i);
    el.replaceChildren(...lines.flatMap((line,i) => i ? [document.createElement('br'),document.createTextNode(line)] : [document.createTextNode(line)]));
  });
  $('#language').textContent = lang === 'en' ? '中文' : 'EN';
  $('#language').setAttribute('aria-label',tr('Switch to Chinese','切换为英文'));
  $('#search').placeholder = tr('Search title, journal, year…','搜索题目、期刊、年份…');
  $('#education-list').innerHTML = profile.education.map(e => `<article><p class="mono">${e.date}</p><h3>${escapeHTML(tr(e.en,e.zh))}</h3><p class="institution">${escapeHTML(tr(e.place,e.placeZh))}</p><p class="fine">${escapeHTML(tr(e.detail,e.detailZh))}</p></article>`).join('');
  $('#grants').innerHTML = profile.grants.map(g => `<article class="grant"><div><span class="mono">${g.date}</span><span class="grant-role">${escapeHTML(tr(g.role,g.roleZh))}</span></div><h3>${escapeHTML(tr(g.en,g.zh))}</h3><p>${escapeHTML(tr(g.desc,g.descZh))}</p><span class="amount">${g.amount}</span></article>`).join('');
  $('#team-project-list').innerHTML = profile.teamProjects.map(g => `<article class="detail-row"><span class="mono">${g[0]}</span><div><h4>${escapeHTML(tr(g[1],g[2]))}</h4><p>${escapeHTML(tr(g[3],g[4]))}</p></div></article>`).join('');
  $('#awards').innerHTML = profile.awards.map(a => `<article class="award"><span class="mono">${a[0]}</span><div><h3>${escapeHTML(tr(a[1],a[2]))}</h3><p>${escapeHTML(tr(a[3],a[4]))}</p></div><span aria-hidden="true">↗</span></article>`).join('');
  $('#talks').innerHTML = profile.talks.map(t => `<article class="detail-row"><span class="mono">${t[0]}</span><div><h4>${escapeHTML(tr(t[1],t[2]))}</h4><p>${escapeHTML(tr(t[3],t[4]))}</p></div></article>`).join('');
  $('#software').innerHTML = profile.software.map(s => `<article class="detail-row"><span class="mono">${s[0]}</span><div><h4>${escapeHTML(tr(s[1],s[2]))}</h4><p>${escapeHTML(s[4])}</p><p class="fine">${tr('Registered software copyright','软件著作权登记号')} · ${s[3]}</p></div></article>`).join('');
  pubs();
}
$('#language').addEventListener('click',() => { lang = lang === 'en' ? 'zh' : 'en'; try { localStorage.setItem('jg-language',lang); } catch {} render(); });
document.querySelectorAll('[data-filter]').forEach(el => el.addEventListener('click',() => { filter = el.dataset.filter; pubs(); }));
$('#search').addEventListener('input',pubs);
$('#menu').addEventListener('click',() => { const open = document.body.classList.toggle('menu-open'); $('#menu').setAttribute('aria-expanded',String(open)); $('#menu').setAttribute('aria-label',open ? 'Close menu' : 'Open menu'); $('#menu').textContent = open ? '×' : '☰'; });
document.querySelectorAll('nav a').forEach(el => el.addEventListener('click',() => { document.body.classList.remove('menu-open'); $('#menu').setAttribute('aria-expanded','false'); $('#menu').textContent = '☰'; }));
document.addEventListener('keydown',e => { if(e.key === 'Escape' && document.body.classList.contains('menu-open')) $('#menu').click(); });
$('#copy-email').addEventListener('click',async () => { try { await navigator.clipboard.writeText('jiegao@tjnu.edu.cn'); $('#copy-status').textContent = tr('Email copied.','邮箱已复制。'); } catch { $('#copy-status').textContent = tr('Email: jiegao@tjnu.edu.cn — select and copy the address above.','邮箱：jiegao@tjnu.edu.cn，请选中上方地址复制。'); } });
$('#print-cv').addEventListener('click',() => window.print());
render();

