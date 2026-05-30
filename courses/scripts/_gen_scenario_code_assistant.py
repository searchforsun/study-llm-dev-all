# -*- coding: utf-8 -*-
"""Regenerate scenario-enterprise-code-assistant chapters to example depth."""
from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1] / "scenario-enterprise-code-assistant"
CH = ROOT / "chapters"
COURSE_JSON = ROOT / "course.json"


def t(tid: str, label: str | None = None) -> str:
    lbl = label if label else tid.replace("-", " ")
    return f'<span class="term" data-term-id="{tid}" tabindex="0">{lbl}</span>'


def link(ch_id: str, title: str) -> str:
    return f'<a href="#ch-{ch_id}">{title}</a>'


def code_block(lang: str, body: str) -> str:
    return f"""      <h4>{lang} 示例</h4>
      <div class="code-block">
        <div class="code-toolbar"><span class="lang-tag">{lang}</span><button type="button" class="btn-copy" aria-label="复制代码">复制</button></div>
        <pre><code class="language-{lang}">{body}</code></pre>
      </div>"""


def mermaid(title: str, body: str, caption: str = "") -> str:
    cap = f'<p class="diagram-caption">{caption}</p>' if caption else ""
    return f"""      <div class="mermaid-wrap">
        <h5>{title}</h5>
        <pre class="mermaid">{body}</pre>
        {cap}
      </div>"""


def compare_block(bad: list[str], good: list[str]) -> str:
    bad_li = "".join(f"<li>{x}</li>" for x in bad)
    good_li = "".join(f"<li>{x}</li>" for x in good)
    return f"""      <div class="learn-compare">
        <div class="learn-compare-col learn-compare-bad">
          <span class="learn-compare-heading">不推荐</span>
          <ul>{bad_li}</ul>
        </div>
        <div class="learn-compare-col learn-compare-good">
          <span class="learn-compare-heading">推荐</span>
          <ul>{good_li}</ul>
        </div>
      </div>"""


def render_chapter(spec: dict) -> str:
    cid = spec["id"]
    title = spec["title"]
    phase = spec["phase"]
    minutes = spec.get("minutes", 40)
    capability = spec["capability"]
    why = spec["why"]
    outcomes = spec["outcomes"]
    remember = spec["remember"]
    sections_html = "\n".join(spec["sections"])
    conclusions = spec["conclusions"]
    checklist_key = f"scenario-enterprise-code-assistant_{cid.replace('-', '')}"
    checklist_items = spec["checklist"]
    interview_qs = spec.get("interview", [])
    official = spec["official"]
    practice_intro = spec["practice_intro"]
    operate_steps = spec["operate_steps"]
    judgment = spec["judgment"]
    demo_title = spec["demo_title"]
    demo_path = spec["demo_path"]
    demo_accept = spec["demo_accept"]
    resources = spec["resources"]
    next_ch = spec.get("next")

    checklist_ul = "".join(
        f'<li><label><input type="checkbox" data-id="{item[0]}" /> {item[1]}</label></li>'
        for item in checklist_items
    )
    interview_ol = "".join(f"<li>{q}</li>" for q in interview_qs) if interview_qs else ""
    interview_block = ""
    if interview_qs:
        interview_block = f"""
    <div class="learn-interview">
      <details>
        <summary>答辩 / 面试口述题</summary>
        <div class="learn-interview-body"><ol>{interview_ol}</ol></div>
      </details>
    </div>"""

    judgment_html = ""
    for j in judgment:
        judgment_html += f"""
    <li>
      <p class="judgment-stem">{j["stem"]}</p>
      <div class="learn-practice-answer">
        <details><summary>参考答案</summary>
          <div class="learn-practice-answer-body"><p>{j["answer"]}</p></div>
        </details>
      </div>
    </li>"""

    conclusions_li = "".join(f"<li>{c}</li>" for c in conclusions)
    official_li = "".join(
        f'<li><a href="{u}" target="_blank" rel="noopener">{lbl}</a></li>'
        for lbl, u in official
    )
    operate_li = "".join(f"<li>{s}</li>" for s in operate_steps)
    resources_li = "".join(f"<li>{r}</li>" for r in resources)

    remember_ul = "".join(f"<li>{r}</li>" for r in remember)
    outcomes_ul = "".join(f"<li>{o}</li>" for o in outcomes)

    next_p = ""
    if next_ch:
        next_p = f'<p class="chapter-review-next">下一步：勾选过关清单、完成右侧测验与下方 Demo；下一章 {link(next_ch[0], next_ch[1])}。</p>'

    return f"""<section id="ch-{cid}" class="chapter" data-chapter="{cid}">
  <header class="chapter-header">
    <h2><span class="chapter-done-badge">已完成</span>{title}</h2>
    <button type="button" class="btn-mark-done" data-chapter="{cid}" aria-label="标记本章完成">标记完成</button>
  </header>

  <div class="concept">
    <div class="chapter-intro content-section">
      <p class="chapter-meta">约 <strong>{minutes} 分钟</strong> · 阶段：<strong>{phase}</strong> · 能力：{capability}</p>
      <div class="notice notice-why-learn">
        <strong>为什么要学本章</strong>
        <p>{why}</p>
      </div>
      <div class="notice notice-outcome">
        <strong>学完你能</strong>
        <ul>{outcomes_ul}</ul>
      </div>
      <div class="notice">
        <strong>本章先记住 3 件事</strong>
        <ul>{remember_ul}</ul>
      </div>
    </div>

{sections_html}

    <div class="section-block chapter-conclusions-block notice">
      <h3>本章结论</h3>
      <p class="chapter-conclusions-lead">每条对应上文一个小节，便于串起全章再做题。</p>
      <ul class="chapter-conclusions-list">{conclusions_li}</ul>
    </div>

    <div class="section-block learn-review-block">
      <h3>复习与自检</h3>
      <div class="learn-checklist" data-storage-key="{checklist_key}">
        <p class="learn-checklist-lead">过关清单（勾选会保存在本浏览器）</p>
        <p class="learn-checklist-progress" aria-live="polite">0 / {len(checklist_items)} 已勾选</p>
        <ul>{checklist_ul}</ul>
      </div>
      <div class="learn-cheat-sheet">
        <details>
          <summary>本章速查卡</summary>
          <div class="learn-cheat-body">
            <table>
              <thead><tr><th>概念</th><th>记住一句</th></tr></thead>
              <tbody>{spec.get("cheat_rows", "")}</tbody>
            </table>
          </div>
        </details>
      </div>
{interview_block}
      {next_p}
    </div>
  </div>

  <div class="official-links content-section">
    <h3>官方文档</h3>
    <ul>{official_li}</ul>
  </div>

  <div class="chapter-practice">
    <h3>动手练习</h3>
    <p class="steps-intro">{practice_intro}</p>
    <h4 class="practice-section-title">操作步骤</h4>
    <ol class="steps steps-operate">{operate_li}</ol>
    <h4 class="practice-section-title">判断练习</h4>
    <ol class="steps-judgment-list">{judgment_html}
    </ol>
    <div class="demo-box">
      <h4 class="demo-box-title">Demo：{demo_title}</h4>
      <p>目录：<code>{demo_path}</code>。<strong>验收</strong>：{demo_accept}</p>
    </div>
  </div>

  <div class="resources content-section">
    <h3>延伸学习</h3>
    <ul>{resources_li}</ul>
  </div>
</section>
"""


# --- Chapter content builders (imported from module tail) ---
exec(open(Path(__file__).parent / "_gen_scenario_code_assistant_specs.py", encoding="utf-8").read())
