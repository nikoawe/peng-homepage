/* ===== Particle Background ===== */
(function(){
    var c=document.getElementById('bgCanvas')||function(){var x=document.createElement('canvas');x.id='bgCanvas';document.body.prepend(x);return x}();
    var ctx=c.getContext('2d'),w,h,pts=[];
    function resize(){w=c.width=window.innerWidth;h=c.height=window.innerHeight}
    resize();window.addEventListener('resize',resize);
    for(var i=0;i<80;i++)pts.push({x:Math.random()*w,y:Math.random()*h,r:Math.random()*1.8+.4,vx:(Math.random()-.5)*.35,vy:(Math.random()-.5)*.35,a:Math.random()*.4+.1});
    function draw(){
        ctx.clearRect(0,0,w,h);
        for(var i=0;i<pts.length;i++){
            var p=pts[i];
            ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
            ctx.fillStyle='rgba(0,230,118,'+p.a+')';ctx.fill();
            p.x+=p.vx;p.y+=p.vy;
            if(p.x<0||p.x>w)p.vx*=-1;if(p.y<0||p.y>h)p.vy*=-1;
            for(var j=i+1;j<pts.length;j++){
                var dx=pts[i].x-pts[j].x,dy=pts[i].y-pts[j].y,dist=Math.sqrt(dx*dx+dy*dy);
                if(dist<140){ctx.beginPath();ctx.moveTo(pts[i].x,pts[i].y);ctx.lineTo(pts[j].x,pts[j].y);ctx.strokeStyle='rgba(0,230,118,'+(.03*(1-dist/140))+')';ctx.stroke()}
            }
        }
        requestAnimationFrame(draw)
    }
    draw()
})();

/* ===== Mouse Glow ===== */
(function(){
    var glow=document.createElement('div');glow.className='mouse-glow';document.body.appendChild(glow);
    var t;document.addEventListener('mousemove',function(e){glow.style.left=e.clientX+'px';glow.style.top=e.clientY+'px';glow.style.opacity='1';clearTimeout(t);t=setTimeout(function(){glow.style.opacity='0'},2000)})
})();

/* ===== 3D Tilt on Cards ===== */
document.addEventListener('mousemove',function(e){
    document.querySelectorAll('.card:hover,.uni-card:hover').forEach(function(el){
        var rect=el.getBoundingClientRect(),x=e.clientX-rect.left,y=e.clientY-rect.top;
        var rx=(y-rect.height/2)/rect.height*8,ry=-(x-rect.width/2)/rect.width*8;
        el.style.transform='translateY(-6px) scale(1.02) rotateX('+rx+'deg) rotateY('+ry+'deg)';
    })
});

/* ===== Scroll Reveal ===== */
(function(){
    var obs=new IntersectionObserver(function(entries){entries.forEach(function(e){if(e.isIntersecting){e.target.classList.add('visible');obs.unobserve(e.target)}})},{threshold:0.15});
    document.querySelectorAll('.reveal').forEach(function(el){obs.observe(el)})
})();

/* ===== Skill Bar Animation ===== */
(function(){
    var obs=new IntersectionObserver(function(entries){entries.forEach(function(en){if(en.isIntersecting){en.target.style.width=en.target.dataset.w;obs.unobserve(en.target)}})},{threshold:0.3});
    document.querySelectorAll('.bar-fill').forEach(function(b){obs.observe(b)})
})();

/* ===== Ripple on Click ===== */
document.addEventListener('click',function(e){
    var ripple=document.createElement('div');
    ripple.style.cssText='position:fixed;width:10px;height:10px;border-radius:50%;background:rgba(0,230,118,.2);pointer-events:none;z-index:9999;left:'+(e.clientX-5)+'px;top:'+(e.clientY-5)+'px;animation:rippleOut .6s ease forwards';
    document.body.appendChild(ripple);
    setTimeout(function(){ripple.remove()},600)
});
var rippleStyle=document.createElement('style');
rippleStyle.textContent='@keyframes rippleOut{to{width:100px;height:100px;margin-left:-45px;margin-top:-45px;opacity:0}}';
document.head.appendChild(rippleStyle);

/* ===== Accordion ===== */
function toggleAcc(h){var b=h.nextElementSibling,o=b.classList.contains('expanded');document.querySelectorAll('.acc-body.expanded').forEach(function(x){x.classList.remove('expanded')});document.querySelectorAll('.acc-header.open').forEach(function(x){x.classList.remove('open')});if(!o){b.classList.add('expanded');h.classList.add('open')}}

/* ===== Card Toggle ===== */
function toggleCard(c){var e=c.querySelector('.card-extra'),h=c.querySelector('.card-hint');e.classList.toggle('show');if(h)h.textContent=e.classList.contains('show')?'点击收起 ▲':'点击展开 ▼'}

/* ===== Uni Card Toggle ===== */
function toggleUni(c){var e=c.querySelector('.uni-extra'),h=c.querySelector('.uni-body div[style]');e.classList.toggle('show');if(h)h.textContent=e.classList.contains('show')?'点击收起 ▲':'点击展开详细介绍 ▼'}

/* ===== Modal ===== */
var M={
    ICPC:{t:'ICPC 国际大学生程序设计竞赛',a:'贵州省赛中学组 · 铜奖',c:'bronze',y:'2024',b:'<p><strong>ICPC</strong>（International Collegiate Programming Contest）是全球规模最大、最具影响力的大学生程序设计竞赛，被誉为"程序设计界的奥林匹克"。中学组面向高中生开放，竞争同样激烈。</p><p style="margin-top:14px;">比赛形式为团队赛（3 人一队），在 5 小时内使用 C/C++/Java/Python 解决 8~12 道算法题目。不仅考察算法实现能力，更考验团队协作、问题分析与抗压能力。</p><p style="margin-top:14px;">🔗 全球官网：<a href="https://icpc.global" target="_blank">icpc.global</a> ｜ 中国区：<a href="https://icpc.pku.edu.cn" target="_blank">icpc.pku.edu.cn</a></p>'},
    CSP:{t:'CSP 非专业级软件能力认证',a:'初赛二等奖 / 三等奖',c:'silver',y:'2025',b:'<p><strong>CSP-J/S</strong> 由中国计算机学会（CCF）主办，是全国信息学奥林匹克竞赛（NOI）体系的核心入口。分为 CSP-J（入门组，Junior）和 CSP-S（提高组，Senior）两个级别。</p><p style="margin-top:14px;"><strong>第一轮（初赛）</strong>为笔试形式，考察通用计算机科学知识、算法理论基础、程序阅读与填空。通过初赛后方可晋级第二轮复赛。</p><p style="margin-top:14px;">🔗 官网：<a href="https://www.noi.cn" target="_blank">noi.cn</a> ｜ 报名：<a href="https://cspsjtest.noi.cn" target="_blank">cspsjtest.noi.cn</a></p>'},
    CSPJ:{t:'CSP-J（入门组）',a:'初赛三等奖 · 复赛二等奖(2024) → 一等奖(2025)',c:'gold',y:'2024 / 2025',b:'<p><strong>CSP-J</strong>（入门组，Junior）面向初中及以下学段，考察基础编程能力和基础算法。虽然名为"入门"，但竞赛难度已然不低——初赛筛选后，复赛是真正的硬仗。</p><p style="margin-top:14px;"><strong>复赛</strong>为现场上机编程，4 道题目，限时 3.5 小时。题目涵盖模拟、枚举、基础搜索、贪心策略和简单动态规划——每道题都需要清晰的思路和扎扎实实的代码实现。</p><p style="margin-top:14px;">2024 年初赛<strong>三等奖</strong> → 晋级复赛 → 复赛<strong style="color:#b0bec5;">二等奖</strong>；2025 年更进一步，复赛<strong style="color:#ffd700;">一等奖</strong>！从二等奖到一等奖的跨越，是一年努力的最好回报。</p><p style="margin-top:14px;">🔗 官网：<a href="https://www.noi.cn" target="_blank">noi.cn</a></p>'},
    CSPS:{t:'CSP-S（提高组）',a:'初赛三等奖 · 复赛二等奖(2024&2025)',c:'silver',y:'2024 / 2025',b:'<p><strong>CSP-S</strong>（提高组，Senior）面向高中生，难度显著高于 J 组，是通向 NOIP（省级联赛）和 NOI（全国赛）的必经之路。CSP-S 一等奖选手在高校强基计划中可获大幅优惠。</p><p style="margin-top:14px;"><strong>复赛</strong>为现场上机编程，4 道题目，限时 4 小时。考察内容包括：高级数据结构（线段树、树状数组、平衡树）、图论算法（最短路、最小生成树、网络流、强连通分量）、动态规划优化（斜率优化、状态压缩、树形 DP）、字符串算法（KMP、AC 自动机）以及数论与组合数学。</p><p style="margin-top:14px;">2024 年和 2025 年连续两年复赛<strong style="color:#b0bec5;">二等奖</strong>——能在提高组连续拿奖，本身就是实力的稳定证明。</p><p style="margin-top:14px;">🔗 官网：<a href="https://www.noi.cn" target="_blank">noi.cn</a></p>'},
    AI:{t:'全国青少年人工智能大赛',a:'省级选拔赛一等奖',c:'gold',y:'2026',b:'<p>由<strong>中国福利会</strong>和<strong>中国妇女发展基金会</strong>联合主办，2026 年首届举办，是教育部批准的白名单全国性竞赛。赛事主题："智能向善，生长无限"。</p><p style="margin-top:14px;">大赛设有<strong>五大核心赛道</strong>：基础知识与素养、AI 工具应用、驱动科学研究、具身智能、大语言模型应用——全面覆盖从理论到实践的 AI 领域。面向全国小学、初中、高中（含中职）学生开放。</p><p style="margin-top:14px;">2026 年省级选拔赛中荣获<strong style="color:#ffd700;">一等奖</strong>，展现了在人工智能领域的扎实基础与创新能力。</p><p style="margin-top:14px;">🔗 官网：<a href="https://aic.cwicp.cn" target="_blank">aic.cwicp.cn</a></p>'},
    INFO:{t:'贵州省师生信息素养比赛',a:'市级二等奖 ×2',c:'silver',y:'2024 / 2026',b:'<p><strong>师生信息素养比赛</strong>由教育主管部门主办，面向全省教师和学生，旨在提升信息技术应用能力和数字化创新能力，是省内最具影响力的信息科技类竞赛之一。</p><p style="margin-top:14px;">比赛涵盖数字创作、程序设计、创客项目、人工智能应用等领域，全面考察信息技术综合运用能力。2024 年首次参赛即获<strong style="color:#b0bec5;">贵阳市二等奖</strong>，2026 年再次参赛并蝉联<strong style="color:#b0bec5;">市级二等奖</strong>。</p><p style="margin-top:14px;">🔗 <a href="https://jyj.guiyang.gov.cn" target="_blank">贵阳市教育局 jyj.guiyang.gov.cn</a></p>'}
};
function openMod(k){var d=M[k];document.getElementById('mtag').textContent=d.y;document.getElementById('mtitle').innerHTML=d.t+' · <span class="'+d.c+'">'+d.a+'</span>';document.getElementById('mbody').innerHTML=d.b;document.getElementById('mo').classList.add('active');document.body.style.overflow='hidden'}
function closeMod(e){if(e&&e.target!==document.getElementById('mo'))return;document.getElementById('mo').classList.remove('active');document.body.style.overflow=''}
document.addEventListener('keydown',function(e){if(e.key==='Escape'){document.getElementById('mo').classList.remove('active');document.body.style.overflow=''}});
