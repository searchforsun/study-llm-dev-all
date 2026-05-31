#!/bin/bash
# Generate ALL 36 chapters
cd D:/MyWorkStation/Java/program/study-llm-dev-all

python3 -c '
import os, html, json

BASE = r"D:\MyWorkStation\Java\program\study-llm-dev-all\courses"

def h(s): return html.escape(str(s))

def render(course, fn, title, meta, why, outcome, pts, sections,
           conclusions, checklist, cheats, interviews,
           practice, judgments, demo, accept, links, nxt):
    cid=fn; L=[]
    L.append("<section id=\"ch-%s\" class=\"chapter\" data-chapter=\"%s\">" % (cid,cid))
    L.append("<header class=\"chapter-header\"><h2><span class=\"chapter-done-badge\">已完成</span>%s</h2><button type=\"button\" class=\"btn-mark-done\" data-chapter=\"%s\">标记完成</button></header>" % (h(title),cid))
    L.append("<div class=\"concept\"><div class=\"chapter-intro content-section\">")
    L.append("<p class=\"chapter-meta\">%s</p>" % h(meta))
    L.append("<div class=\"notice notice-why-learn\"><h4>为什么学这章</h4><p>%s</p></div>" % h(why))
    L.append("<div class=\"notice notice-outcome\"><h4>学完后能做什么</h4><p>%s</p></div>" % h(outcome))
    L.append("<div class=\"notice\"><h4>本章要点速记</h4><p>%s</p></div>" % h(pts))
    L.append("</div>")
    for sec in sections:
        L.append("<div class=\"section-block\"><h3>%s</h3>" % h(sec[0]))
        for p in sec[1]:
            L.append("<p>%s</p>" % h(p))
        for r in sec[2:]:
            for rl in r.split("\n"):
                L.append(rl)
        L.append("</div>")
    L.append("<div class=\"section-block chapter-conclusions-block notice\"><h3>本章结论</h3><ul class=\"chapter-conclusions-list\">")
    for c in conclusions: L.append("<li>%s</li>" % h(c))
    L.append("</ul></div>")
    L.append("<div class=\"section-block learn-review-block\"><h3>复习与自检</h3>")
    L.append("<div class=\"learn-checklist\"><h4>过关清单</h4><ul>")
    for i,item in enumerate(checklist): L.append("<li><label><input type=\"checkbox\" data-check-id=\"%s-%s\"> %s</label></li>" % (cid,str(i+1),h(item)))
    L.append("</ul></div>")
    L.append("<div class=\"learn-cheat-sheet\"><h4>概念速查</h4><table class=\"outline-table\"><thead><tr><th>术语/概念</th><th>速记</th></tr></thead><tbody>")
    for t,d in cheats: L.append("<tr><td><strong>%s</strong></td><td>%s</td></tr>" % (h(t),h(d)))
    L.append("</tbody></table></div>")
    L.append("<div class=\"learn-interview\"><h4>面试可能问</h4>")
    for q,ans in interviews: L.append("<details><summary>%s</summary><p>%s</p></details>" % (h(q),h(ans)))
    L.append("</div></div>")
    L.append("<div class=\"official-links content-section\"><h3>官方参考</h3><ul>")
    for n_,u_ in links: L.append("<li><a href=\"%s\" target=\"_blank\" rel=\"noopener\">%s</a></li>" % (h(u_),h(n_)))
    L.append("</ul></div>")
    L.append("<div class=\"chapter-practice\"><h3>动手练习</h3><div class=\"steps-operate\"><h4>操作步骤</h4><ol>")
    for s in practice: L.append("<li>%s</li>" % h(s))
    L.append("</ol></div>")
    L.append("<div class=\"steps-judgment-list\"><h4>判断练习</h4>")
    for q,ans in judgments: L.append("<details><summary>%s</summary><p>%s</p></details>" % (h(q),h(ans)))
    L.append("</div>")
    L.append("<div class=\"demo-box\"><h4>实验室</h4><p>%s</p><ul class=\"demo-acceptance\">" % h(demo))
    for a_ in accept: L.append("<li>%s</li>" % h(a_))
    L.append("</ul></div></div>")
    L.append("<div class=\"resources content-section\"><h3>延伸阅读</h3><ul>")
    for n_,u_ in links: L.append("<li><a href=\"%s\" target=\"_blank\" rel=\"noopener\">%s</a></li>" % (h(u_),h(n_)))
    L.append("<li>下一章：<strong>%s</strong></li>" % h(nxt))
    L.append("</ul></div>")
    L.append("</div></section>")
    content = "\n".join(L)
    fp = os.path.join(BASE, course, "chapters", fn+".html")
    os.makedirs(os.path.dirname(fp), exist_ok=True)
    with open(fp, "w", encoding="utf-8") as f: f.write(content)
    lc = len(content.splitlines())
    status = "OK" if lc >= 350 else "SHORT"
    print("  [%s] %s/%s.html (%d lines)" % (status, course, fn, lc))

def S(h3, *args):
    """Section builder: h3, pars, rich1, rich2, ..."""
    return [h3] + list(args)

def T(hd, rows):
    """Table builder"""
    r = "<table class=\"outline-table\"><thead><tr>"
    for hh in hd: r += "<th>%s</th>" % h(hh)
    r += "</tr></thead><tbody>"
    for row in rows:
        r += "<tr>" + "".join("<td>%s</td>" % h(c) for c in row) + "</tr>"
    return r + "</tbody></table>"

def M(md):
    """Mermaid builder"""
    return "<div class=\"mermaid-wrap\"><pre class=\"mermaid\">" + md.strip() + "</pre></div>"

def C(code_text):
    """Code block builder"""
    html_code = h(code_text.strip())
    return "<div class=\"code-block\"><div class=\"code-toolbar\"><span class=\"lang-tag\">python</span><button type=\"button\" class=\"btn-copy\" aria-label=\"复制代码\">复制</button></div><pre><code class=\"language-python\">" + html_code + "</code></pre></div>"

def X(bt,bd,gt,gd):
    """Compare builder"""
    return "<div class=\"learn-compare\"><div class=\"learn-compare-col learn-compare-bad\"><h4>%s</h4><p>%s</p></div><div class=\"learn-compare-col learn-compare-good\"><h4>%s</h4><p>%s</p></div></div>" % (h(bt),h(bd),h(gt),h(gd))

def SC(t,text):
    """Scenario builder"""
    return "<aside class=\"learn-scenario\"><h4>%s</h4><p>%s</p></aside>" % (h(t),h(text))

C1="scenario-py-agent-automation"
C2="scenario-py-code-assistant"
C3="scenario-py-content-studio"

print("=== Generating ALL 36 chapters ===")

# ===== CHAPTERS LOADED FROM embedded data =====
chapters_raw = []
' > /dev/null
echo "Engine ready. Now loading chapters..."
