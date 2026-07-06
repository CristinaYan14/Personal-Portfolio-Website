import React, { useState, useEffect, useRef } from "react";

// ─── Data ─────────────────────────────────────────────────────────────────────

const NAV_ITEMS = [
  { id: "about", label: "关于", en: "ABOUT" },
  { id: "projects", label: "项目", en: "PROJECTS" },
  { id: "skills", label: "技能", en: "SKILLS" },
  { id: "contact", label: "联系", en: "CONTACT" },
];

const PROJECTS = [
  {
    id: 1,
    title: "寒地林场·数智更新",
    en: "Digital Forest Renewal",
    year: "2026",
    tags: ["SketchUp", "Enscape", "数字景观", "实时渲染"],
    award: null,
    desc: "以AI辅助前期场地调研与数据分析，精准识别林场生态本底。SketchUp完成方案建模，Enscape实现寒地季相光照模拟，PS后期强化设计表达。从无人机影像到渲染出图，探索数字化工具在寒地林场更新设计中的全流程应用。",
    caption: [
      "林区全景鸟瞰渲染",
      "林下光影细节模拟",
      "林场员工宿舍花园",
      "社区活力阳光广场",
      "林场生态停车场",
      "整体调研数据展板",
      "综合分析设计展板",
    ],
    images: [
      "core-01-01.png",
      "core-01-02.png",
      "core-01-03.png",
      "core-01-04.png",
      "core-01-05.png",
      "core-01-06.png",
      "core-01-07.png",
    ],
  },
  {
    id: 2,
    title: "湿地之环·博物的尺度",
    en: "Wetland Ring Museum Park",
    year: "2026",
    tags: ["Rhino", "PS", "建筑", "景观"],
    award: null,
    desc: "以Rhino建构参数化湿地景观与博物馆建筑形体，四版方案迭代推敲场馆布局与游客流线。重点关注博物馆内部各功能区的空间节奏与外部湿地公园的视线通廊关系。分析图采用PS手工绘制，最终效果图由AI辅助生成——设计过程的逻辑推演比最终画面更具价值。",
        caption: [
      "整体鸟瞰渲染效果",
      "最终版本场地分析",
      "博物馆内部设计平面",
      "Rhino场馆建模",
      "第一版概念渲染效果",
      "第二版概念渲染效果",
      "最终设计方案效果",
    ],
    images: [
      "core-02-01.jpg",
      "core-02-02.png",
      "core-02-03.png",
      "core-02-04.png",
      "core-02-05.png",
      "core-02-06.png",
      "core-02-07.jpg",
    ],
  },
  {
    id: 3,
    title: "烟火街巷·投标速建",
    en: "Snack Street · Commercial Commission",
    year: "2025",
    tags: ["SketchUp", "Enscape", "PS"],
    award: null,
    desc: "为商业投标提供辅助建模支持，SketchUp快速搭建小吃街建筑群与街道场景，Enscape输出日景/夜景渲染效果。在有限工期内完成模型精度与画面表现的双重交付，验证了高效率建模出图流程在真实商业场景中的可行性。",
        caption: [
      "建模与实景场地融合鸟瞰",
      "小吃街入口一览",
      "小吃街一角二楼视角",
      "街巷空间细节渲染",
      "集装箱风格街道日景",
      "集装箱风格街道傍晚",
      "街道特色鸟瞰",
    ],
    images: [
      "core-03-01.png",
      "core-03-02.jpg",
      "core-03-03.png",
      "core-03-04.png",
      "core-03-05.png",
      "core-03-06.png",
      "core-03-07.png",
    ],
  },
  {
    id: 4,
    title: "拙政遗构·榫卯再生",
    en: "Garden Remnant",
    year: "2025",
    tags: ["SketchUp", "Enscape", "VR全景"],
    award: null,
    desc: "参照拙政园制式，以SketchUp从零手搓房梁、屋檩、花架等木构细节，还原中式古建的空间序列与营造逻辑。每一根梁程的搭接皆经考据推敲。已生成VR全景图，可沉浸式漫游门庭院落，感受传统建筑的空间韵律。",
        caption: [
      "别墅大门渲染",
      "大门花架屋椽细节",
      "将军门各部分构件细节",
      "人视角实景渲染",
      "将军门望廊渲染",
      "仿拙政园椽梁细节",
    ],
       images: [
      "core-04-01.png",
      "core-04-02.png",
      "core-04-03.png",
      "core-04-04.png",
      "core-04-05.jpg",
      "core-04-06.png",
    ],
  },
];

const SKILLS = [
  {
    cat: "建模与推演",
    en: "Modeling & refinement",
    items: [
      "SketchUp",
      "3ds Max",
      "Rhino",
      "blender",
    ],
  },
  {
    cat: "渲染与表现",
    en: "Rendering & Representation",
    items: [
      "Enscape",
      "PS",
      "Pr",
      "Adobe Illustrator",
    ],
  },
  {
    cat: "分析与拓展",
    en: "Analysis & Expansion",
    items: [
      "ArcGIS",
      "Python",
      "C++",
      "UE5",
    ],
  },
];


// ─── Image cache busting ────────────────────────────────────────────
const IMG_VERSION = Date.now();

// ─── Decorative Atoms ─────────────────────────────────────────────────────────

function Diamond({
  size = 8,
  color = "#2A4A38",
  opacity = 1,
  className = "",
}: {
  size?: number;
  color?: string;
  opacity?: number;
  className?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={`inline-block flex-shrink-0 ${className}`}
      style={{
        width: size,
        height: size,
        background: color,
        transform: "rotate(45deg)",
        opacity,
      }}
    />
  );
}

function HatchRect({
  width,
  height,
  className = "",
}: {
  width: number;
  height: number;
  className?: string;
}) {
  const lines = [];
  const step = 10;
  const total = width + height;
  for (let i = -height; i < width; i += step) {
    lines.push(
      <line
        key={i}
        x1={i}
        y1={0}
        x2={i + height}
        y2={height}
        stroke="#2A4A38"
        strokeWidth="0.8"
      />,
    );
  }
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={className}
      aria-hidden="true"
      style={{ overflow: "hidden" }}
    >
      {lines}
    </svg>
  );
}

function SpruceGlyph({ height = 64 }: { height?: number }) {
  const w = height * 0.55;
  const h = height;
  const cx = w / 2;
  return (
    <svg
      width={w}
      height={h}
      viewBox={`0 0 ${w} ${h}`}
      fill="none"
      aria-hidden="true"
    >
      <polygon
        points={[
          `${cx},2`,
          `${w - 2},${h * 0.42}`,
          `${w * 0.68},${h * 0.42}`,
          `${w - 5},${h * 0.68}`,
          `${w * 0.66},${h * 0.68}`,
          `${w * 0.62},${h - 6}`,
          `${w * 0.38},${h - 6}`,
          `${w * 0.34},${h * 0.68}`,
          `5,${h * 0.68}`,
          `${w * 0.32},${h * 0.42}`,
          `2,${h * 0.42}`,
        ].join(" ")}
        stroke="#2A4A38"
        strokeWidth="1.2"
        fill="none"
      />
    </svg>
  );
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────

function Sidebar({
  active,
  onNav,
  isMobile,
  sidebarOpen,
  onToggle,
}: {
  active: string;
  onNav: (id: string) => void;
  isMobile?: boolean;
  sidebarOpen?: boolean;
  onToggle?: () => void;
}) {
  return (
    <aside
      className={"fixed left-0 top-0 h-full z-20 flex flex-col overflow-hidden" + (sidebarOpen ? " sidebar-expanded" : "")}
      style={{ width: isMobile ? (sidebarOpen ? 280 : undefined) : 268, background: "#2A4A38" }}
    >
      {/* ─── PC 侧栏内容 ─── */}
      <div className="sidebar-pc-content flex flex-col h-full">
      {/* Top-right hatch decoration */}
      <div className="absolute top-0 right-0 opacity-20 pointer-events-none">
        <HatchRect width={80} height={80} />
      </div>

      {/* Identity */}
      <div
        className="px-8 pt-10 pb-7 border-b flex-shrink-0"
        style={{ borderColor: "rgba(249,247,235,0.1)" }}
      >
        <div className="flex items-end gap-3 mb-4">
          <SpruceGlyph height={56} />
          <div className="opacity-60">
            <SpruceGlyph height={40} />
          </div>
          <div className="opacity-35">
            <SpruceGlyph height={28} />
          </div>
        </div>
        <h1
          className="text-white text-2xl leading-tight mt-4"
          style={{
            fontFamily: "'Noto Sans SC', sans-serif",
            fontWeight: 900,
            letterSpacing: "0.02em",
          }}
        >
          鄢如影
        </h1>
        <p
          className="font-mono text-[9px] tracking-[0.18em] mt-1"
          style={{ color: "rgba(249,247,235,0.4)" }}
        >
          YAN RUYING
        </p>
        <p
          className="text-xs mt-3 leading-relaxed"
          style={{
            color: "rgba(249,247,235,0.55)",
            fontFamily: "'Noto Sans SC', sans-serif",
          }}
        >
          景观建筑 · 数字环境设计
        </p>
        <p
          className="font-mono text-[9px] tracking-wider mt-1"
          style={{ color: "rgba(249,247,235,0.28)" }}
        >
          Landscape → Digital → UE5
        </p>
      </div>

      {/* Nav */}
      <nav className="px-8 pt-7 pb-4 flex-shrink-0 sidebar-mobile-hide">
        <p
          className="font-mono text-[8px] tracking-[0.28em] mb-4 uppercase"
          style={{ color: "rgba(249,247,235,0.28)" }}
        >
          Navigation
        </p>
        <ul className="space-y-0.5">
          {NAV_ITEMS.map((item) => {
            const isActive = active === item.id;
            return (
              <li key={item.id}>
                <button
                  onClick={() => onNav(item.id)}
                  className="group w-full text-left flex items-center gap-3 py-2 transition-all duration-200"
                >
                  <span
                    className="flex-shrink-0 transition-all duration-300"
                    style={{
                      width: isActive ? 24 : 12,
                      height: 1,
                      background: isActive
                        ? "#F9F7EB"
                        : "rgba(249,247,235,0.2)",
                    }}
                  />
                  <span
                    className="font-mono text-[10px] tracking-[0.15em] uppercase transition-colors duration-200"
                    style={{
                      color: isActive
                        ? "#F9F7EB"
                        : "rgba(249,247,235,0.38)",
                    }}
                  >
                    {item.en}
                  </span>
                  <span
                    className="ml-auto text-[11px] transition-colors duration-200"
                    style={{
                      fontFamily: "'Noto Sans SC', sans-serif",
                      color: isActive
                        ? "rgba(249,247,235,0.65)"
                        : "rgba(249,247,235,0.18)",
                    }}
                  >
                    {item.label}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Project index */}
      <div
        className="px-8 pt-5 pb-4 border-t flex-1 overflow-y-auto sidebar-mobile-hide"
        style={{
          borderColor: "rgba(249,247,235,0.1)",
          scrollbarWidth: "none",
        }}
      >
        <p
          className="font-mono text-[8px] tracking-[0.28em] mb-4 uppercase"
          style={{ color: "rgba(249,247,235,0.28)" }}
        >
          Projects
        </p>
        <ul className="space-y-4">
          {PROJECTS.map((p, i) => (
            <li key={p.id} className="flex items-start gap-2.5">
              <span
                className="font-mono text-[8px] flex-shrink-0 mt-0.5 w-4"
                style={{ color: "rgba(249,247,235,0.22)" }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <p
                  className="font-mono text-[9px] tracking-wider leading-snug"
                  style={{ color: "rgba(249,247,235,0.42)" }}
                >
                  {p.en}
                </p>
                <p
                  className="text-[10px] mt-0.5"
                  style={{
                    color: "rgba(249,247,235,0.26)",
                    fontFamily: "'Noto Sans SC', sans-serif",
                  }}
                >
                  {p.title}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Footer */}
      <div
        className="px-8 py-5 border-t flex-shrink-0 sidebar-mobile-hide"
        style={{ borderColor: "rgba(249,247,235,0.1)" }}
      >
        <p
          className="font-mono text-[8px] tracking-widest"
          style={{ color: "rgba(249,247,235,0.2)" }}
        >
          东北农业大学 · 2023-2027
        </p>
        <p
          className="font-mono text-[8px] mt-1 tracking-wide"
          style={{ color: "rgba(249,247,235,0.14)" }}
        >
          B.Eng. in Landscape Architecture
        </p>
      </div>
      </div>

      {/* ─── 移动端侧栏布局（3:4:3） ─── */}
      {isMobile && (
        <div className="sidebar-mobile-layout">
          {/* 顶部（3份）：姓名 + 英文名 + 专业方向 */}
          <div className="sidebar-top">
            <div className="sidebar-mobile-name">鄢如影</div>
            <div className="sidebar-mobile-en">YAN RUYING</div>
            <div className="sidebar-mobile-field1">景观建筑</div>
            <div className="sidebar-mobile-field2">数字环境设计</div>
          </div>

          {/* 中部（4份）：导航菜单 */}
          <div className="sidebar-middle">
            <div className="sidebar-nav-title">NAVIGATION</div>
            {NAV_ITEMS.map((item) => {
              const isActive = active === item.id;
              return (
                <button
                  key={item.id}
                  className={"sidebar-nav-item" + (isActive ? " active" : "")}
                  onClick={() => onNav(item.id)}
                >
                  <span className="nav-item-cn">{item.label}</span>
                  <span className="nav-item-en">{item.en}</span>
                  <span className="nav-item-line" />
                </button>
              );
            })}
          </div>

          {/* 底部（3份）：学校 + 年份 */}
          <div className="sidebar-bottom">
            <div className="sidebar-mobile-school">东北农业大学</div>
            <div className="sidebar-mobile-years">2023-2027</div>
          </div>
        </div>
      )}
    </aside>
  );
}

// ─── Section: About / Hero ────────────────────────────────────────────────────

function AboutSection() {
  return (
    <section
      id="about"
      className="relative min-h-screen flex flex-col justify-center px-16 py-24 overflow-hidden"
    >
      {/* Corner hatch decorations */}
      <div className="absolute top-0 right-0 opacity-30 pointer-events-none">
        <HatchRect width={160} height={160} />
      </div>
      <div
        className="absolute bottom-0 left-0 opacity-20 pointer-events-none"
        style={{ transform: "rotate(180deg)" }}
      >
        <HatchRect width={100} height={100} />
      </div>

      {/* Forest silhouette – right */}
      <div className="absolute right-16 bottom-20 flex items-end gap-3 pointer-events-none opacity-[0.07]">
        {[72, 96, 80, 112, 88, 64].map((h, i) => (
          <SpruceGlyph key={i} height={h} />
        ))}
      </div>

      <div className="max-w-2xl relative z-10">
        {/* Eyebrow */}
        <div className="flex items-center gap-3 mb-10">
          <Diamond size={7} />
          <span
            className="font-mono text-[10px] tracking-[0.3em] uppercase"
            style={{ color: "#739482" }}
          >
            Personal Portfolio — 2026
          </span>
        </div>

        {/* Main headline */}
        <h2
          className="text-[58px] leading-none tracking-tight mb-1"
          style={{
            fontFamily: "'Noto Sans SC', sans-serif",
            fontWeight: 900,
            color: "#111111",
          }}
        >
          扎根黑土，
        </h2>
        <h2
          className="text-[58px] leading-none tracking-tight mb-10"
          style={{
            fontFamily: "'Noto Sans SC', sans-serif",
            fontWeight: 900,
            color: "#2A4A38",
          }}
        >
          造境虚实。
        </h2>

        {/* EN subtitle */}
        <p
          className="font-mono text-sm tracking-widest uppercase mb-10 border-l-2 pl-4"
          style={{ borderColor: "#739482", color: "#739482" }}
        >
          Landscape Architecture → Digital Environment → UE5
        </p>

        {/* Description */}
        <p
          className="text-[15px] leading-[1.95] max-w-lg"
          style={{
            color: "#444444",
            fontFamily: "'Noto Sans SC', sans-serif",
          }}
        >
          具备完整的风景园林项目落地思维，实践覆盖林场更新、滨水公园、中式古建建模及商业街区投标，熟练驾驭SU/Rhino/Blender/3dsmax等多维建模工具，并精通Enscape、PS、AI的全流程可视化表达。
        </p>

        {/* Stats */}
        <div
          className="flex gap-14 mt-14 pt-10 border-t"
          style={{ borderColor: "rgba(42,74,56,0.14)" }}
        >
          {[
            { num: "04", label: "核心项目", en: "Featured" },
            {
              num: "40+",
              label: "商业委托",
              en: "Commissioned	",
            },
            { num: "10+", label: "软件协作", en: "Collaboration" },
          ].map((s) => (
            <div key={s.en}>
              <div
                className="text-4xl leading-none"
                style={{
                  fontFamily: "'Courier Prime', monospace",
                  fontWeight: 700,
                  color: "#2A4A38",
                }}
              >
                {s.num}
              </div>
              <div
                className="text-xs mt-1.5"
                style={{
                  color: "#444444",
                  fontFamily: "'Noto Sans SC', sans-serif",
                }}
              >
                {s.label}
              </div>
              <div
                className="font-mono text-[9px] tracking-widest mt-0.5"
                style={{ color: "#739482" }}
              >
                {s.en}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Section: Projects ────────────────────────────────────────────────────────

function ProjectCard({
  project,
  index,
}: {
  project: (typeof PROJECTS)[0];
  index: number;
}) {
  const [activeImg, setActiveImg] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [fading, setFading] = useState(false);

  const switchTo = (next: number) => {
    if (next === activeImg || fading) return;
    setPrev(activeImg);
    setFading(true);
    setActiveImg(next);
    setTimeout(() => {
      setPrev(null);
      setFading(false);
    }, 560);
  };

  const goDir = (dir: number) => {
    switchTo(
      (activeImg + dir + project.images.length) %
        project.images.length,
    );
  };

  return (
    <div
      className="flex border overflow-hidden"
      style={{
        borderColor: "rgba(42,74,56,0.18)",
        height: 560,
      }}
    >
      {/* ── Far-left label column ────────────────── */}
      <div
        className="flex-shrink-0 flex flex-col items-center justify-between py-6 border-r"
        style={{
          width: 44,
          borderColor: "rgba(42,74,56,0.12)",
        }}
      >
        {/* Image counter */}
        <span
          className="font-mono text-[9px] tracking-widest leading-none"
          style={{ color: "#739482" }}
        >
          {String(activeImg + 1).padStart(2, "0")}/
          {String(project.images.length).padStart(2, "0")}
        </span>

        {/* Rotated section label */}
        <span
          className="font-mono text-[8px] tracking-[0.25em] uppercase whitespace-nowrap"
          style={{
            color: "rgba(42,74,56,0.35)",
            writingMode: "vertical-rl",
            transform: "rotate(180deg)",
          }}
        >
          Project {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      {/* ── Image area + thumbnails ──────────────── */}
      <div
        className="flex flex-col border-r"
        style={{
          width: 510,
          flexShrink: 0,
          borderColor: "rgba(42,74,56,0.12)",
        }}
      >
        {/* Main image (crossfade stack) */}
        <div className="flex-1 relative overflow-hidden bg-[#EAE8D8]">
          {/* Previous image fades out */}
          {prev !== null && (
            <img
              key={`prev-${prev}`}
              src={`/images/${project.images[prev]}?v=${IMG_VERSION}`}
              alt=""
              aria-hidden="true"
              loading="lazy" decoding="async"
              className="absolute inset-0 w-full h-full object-cover"
              style={{
                filter: "saturate(0.75)",
                opacity: fading ? 0 : 1,
                transition:
                  "opacity 0.55s cubic-bezier(0.4,0,0.2,1)",
                zIndex: 1,
              }}
            />
          )}
          {/* Active image fades in */}
          <img
            key={`active-${activeImg}`}
            loading="lazy" decoding="async" src={`/images/${project.images[activeImg]}?v=${IMG_VERSION}`}
            alt={project.caption[activeImg]}
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              filter: "saturate(0.75)",
              opacity: fading ? 1 : 1,
              transition:
                "opacity 0.55s cubic-bezier(0.4,0,0.2,1)",
              zIndex: 2,
            }}
          />

          {/* Top-left project title overlay */}
          <div
            className="absolute top-0 left-0 right-0 px-4 pt-4 z-10"
            style={{ zIndex: 3 }}
          >
            <div
              className="inline-flex items-center gap-2 px-2.5 py-1"
              style={{ background: "rgba(249,247,235,0.92)" }}
            >
              <span
                className="text-sm font-black leading-none"
                style={{
                  fontFamily: "'Noto Sans SC', sans-serif",
                  fontWeight: 900,
                  color: "#111111",
                }}
              >
                {project.title}
              </span>
            </div>
          </div>

          {/* Image caption bar at bottom */}
          <div
            className="absolute bottom-0 left-0 right-0 z-10 px-4 pb-3"
            style={{ zIndex: 3 }}
          >
            <p
              className="font-mono text-[9px] tracking-wider"
              style={{
                color: "rgba(249,247,235,0.8)",
                textShadow: "0 1px 4px rgba(0,0,0,0.5)",
              }}
            >
              {project.caption[activeImg]}
            </p>
          </div>
        </div>

        {/* Thumbnail strip */}
        <div
          className="flex gap-0 border-t flex-shrink-0"
          style={{
            height: 76,
            borderColor: "rgba(42,74,56,0.12)",
          }}
        >
          {project.images.map((img, i) => (
            <button
              key={i}
              onClick={() => switchTo(i)}
              className="relative flex-1 overflow-hidden transition-opacity duration-300"
              style={{ opacity: i === activeImg ? 1 : 0.45 }}
            >
              <img
                loading="lazy" decoding="async" src={`/images/${img}?v=${IMG_VERSION}`}
                alt={project.caption[i]}
                className="w-full h-full object-cover"
                style={{ filter: "saturate(0.6)" }}
              />
              {/* Active thumb indicator */}
              {i === activeImg && (
                <div
                  className="absolute top-0 left-0 right-0 h-[2px]"
                  style={{ background: "#2A4A38" }}
                />
              )}
              {/* Separator between thumbs */}
              {i < project.images.length - 1 && (
                <div
                  className="absolute top-0 right-0 bottom-0 w-px"
                  style={{ background: "rgba(42,74,56,0.15)" }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* ── Right: text + nav ────────────────────── */}
      <div className="flex-1 flex flex-col p-8">
        {/* Header */}
        <div className="mb-6">
          {project.award && (
            <div
              className="inline-flex items-center gap-1.5 border px-2 py-0.5 mb-4"
              style={{
                borderColor: "#2A4A38",
                color: "#2A4A38",
              }}
            >
              <Diamond size={5} />
              <span className="font-mono text-[9px] tracking-wider">
                {project.award}
              </span>
            </div>
          )}
          <h3
            className="text-2xl leading-snug"
            style={{
              fontFamily: "'Noto Sans SC', sans-serif",
              fontWeight: 900,
              color: "#111111",
            }}
          >
            {project.title}
          </h3>
          <p
            className="font-mono text-[10px] tracking-wider mt-1.5"
            style={{ color: "#739482" }}
          >
            {project.en} · {project.year}
          </p>
        </div>

        {/* Divider */}
        <div
          className="h-px mb-6"
          style={{ background: "rgba(42,74,56,0.12)" }}
        />

        {/* Description */}
        <p
          className="text-sm leading-[1.9] flex-1"
          style={{
            color: "#444444",
            fontFamily: "'Noto Sans SC', sans-serif",
          }}
        >
          {project.desc}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-[9px] tracking-wider px-2 py-0.5"
              style={{
                background: "rgba(42,74,56,0.08)",
                color: "#2A4A38",
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Bottom: nav arrows (bottom-right) */}
        <div className="flex items-center justify-end gap-2">
          <span
            className="font-mono text-[9px] tracking-widest mr-auto"
            style={{ color: "#739482" }}
          >
            {String(activeImg + 1).padStart(2, "0")} /{" "}
            {String(project.images.length).padStart(2, "0")}
          </span>
          <button
            onClick={() => goDir(-1)}
            aria-label="上一张"
            className="group flex items-center justify-center w-8 h-8 border transition-all duration-200 hover:bg-primary"
            style={{ borderColor: "#2A4A38" }}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
            >
              <path
                d="M8 2L4 6L8 10"
                stroke="#2A4A38"
                strokeWidth="1.5"
                className="group-hover:stroke-[#F9F7EB]"
              />
            </svg>
          </button>
          <button
            onClick={() => goDir(1)}
            aria-label="下一张"
            className="group flex items-center justify-center w-8 h-8 border transition-all duration-200 hover:bg-primary"
            style={{ borderColor: "#2A4A38" }}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
            >
              <path
                d="M4 2L8 6L4 10"
                stroke="#2A4A38"
                strokeWidth="1.5"
                className="group-hover:stroke-[#F9F7EB]"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

function ProjectsSection() {
  return (
    <section
      id="projects"
      className="px-16 py-20 border-t"
      style={{ borderColor: "rgba(42,74,56,0.12)" }}
    >
      <SectionHeader en="Selected Work" zh="主要项目作品" />
      <div className="space-y-6 mt-14">
        {PROJECTS.map((project, i) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={i}
          />
        ))}
      </div>
    </section>
  );
}

// ─── Section: Skills ──────────────────────────────────────────────────────────

function SkillsSection() {
  return (
    <section
      id="skills"
      className="px-16 py-20 border-t"
      style={{ borderColor: "rgba(42,74,56,0.12)" }}
    >
      <SectionHeader en="Expertise" zh="技能图谱" />

      {/* Skills grid */}
      <div
        className="grid grid-cols-3 border mt-14"
        style={{ borderColor: "rgba(42,74,56,0.15)" }}
      >
        {SKILLS.map((cat) => (
          <div
            key={cat.en}
            className="p-8 border-r last:border-r-0"
            style={{ borderColor: "rgba(42,74,56,0.15)" }}
          >
            <div
              className="h-[2px] w-8 mb-6"
              style={{ background: "#2A4A38" }}
            />
            <p
              className="font-mono text-[9px] tracking-[0.25em] mb-1"
              style={{ color: "#739482" }}
            >
              {cat.en}
            </p>
            <p
              className="text-base font-bold mb-6"
              style={{
                fontFamily: "'Noto Sans SC', sans-serif",
                color: "#2A4A38",
              }}
            >
              {cat.cat}
            </p>
            <ul className="space-y-3">
              {cat.items.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2.5"
                >
                  <Diamond
                    size={5}
                    color="#739482"
                    opacity={0.6}
                  />
                  <span
                    className="text-sm"
                    style={{
                      color: "#444444",
                      fontFamily: "'Noto Sans SC', sans-serif",
                    }}
                  >
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Education timeline */}
      <div className="mt-16">
        <p
          className="font-mono text-[10px] tracking-[0.28em] uppercase mb-8"
          style={{ color: "#739482" }}
        >
          Education & Background
        </p>
        <div className="relative">
          <div
            className="absolute left-0 top-2 bottom-2 w-px"
            style={{ background: "rgba(42,74,56,0.2)" }}
          />
          <div className="space-y-9 pl-9">
            {[
              {
                year: "2023 – 2027",
                title: "风景园林工学学士（在读）",
                sub: "东北农业大学 · 园艺学院",
                note: "主修课程：景观生态学、场地规划、数字化景观技术",
              },
              {
                year: null,
                title: "语言能力",
                sub: "英语 CET-4 / CET-6 已通过",
                note: "持续提升专业英语与跨文化交流能力",
              },
              {
                year: null,
                title: "实践经历",
                sub: "40+ 线上建模委托（SketchUp + Enscape）",
                note: "自主拓展：UE5 场景搭建 / Blender 建模 / Python 数据处理",
              },
            ].map((edu) => (
              <div key={edu.title} className="relative">
                {/* Diamond marker */}
                <div
                  className="absolute -left-[38px] top-1.5 w-3 h-3 rotate-45"
                  style={{
                    background: "#F9F7EB",
                    border: "1.5px solid #2A4A38",
                  }}
                />
                <p
                  className="font-mono text-[10px] tracking-wider mb-1"
                  style={{ color: "#739482" }}
                >
                  {edu.year}
                </p>
                <p
                  className="text-base font-bold"
                  style={{
                    fontFamily: "'Noto Sans SC', sans-serif",
                    color: "#111111",
                    fontWeight: 700,
                  }}
                >
                  {edu.title}
                </p>
                <p
                  className="text-sm mt-0.5"
                  style={{
                    color: "#444444",
                    fontFamily: "'Noto Sans SC', sans-serif",
                  }}
                >
                  {edu.sub}
                </p>
                <p
                  className="font-mono text-[9px] mt-1"
                  style={{ color: "#739482" }}
                >
                  {edu.note}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Section: Contact ─────────────────────────────────────────────────────────

function ContactSection() {
  return (
    <section
      id="contact"
      className="px-16 py-20 border-t relative overflow-hidden"
      style={{ borderColor: "rgba(42,74,56,0.12)" }}
    >
      {/* Bottom-right hatch */}
      <div
        className="absolute bottom-0 right-0 opacity-20 pointer-events-none"
        style={{ transform: "rotate(180deg)" }}
      >
        <HatchRect width={120} height={120} />
      </div>

      <SectionHeader en="Get In Touch" zh="联系方式" />

      <div className="flex gap-16 mt-14">
        {/* Left: copy + contacts */}
        <div className="max-w-sm">
          <p
            className="text-[15px] leading-relaxed mb-8"
            style={{
              color: "#444444",
              fontFamily: "'Noto Sans SC', sans-serif",
            }}
          >
            欢迎就景观设计、数字环境可视化或学术合作展开交流。无论是竞赛投稿、实习机会还是创作讨论，均可通过以下方式联系。
          </p>

          <div className="space-y-5">
            {[
              {
                label: "EMAIL",
                value: "2117497189@qq.com",
              },
              { label: "WECHAT", value: "christine3754" },
              {
                label: "PHONE",
                value: "15272637754",
              },
            ].map((c) => (
              <div
                key={c.label}
                className="flex items-center gap-4"
              >
                <span
                  className="font-mono text-[9px] tracking-[0.2em] w-20 flex-shrink-0"
                  style={{ color: "#739482" }}
                >
                  {c.label}
                </span>
                <div
                  className="flex-1 h-px"
                  style={{ background: "rgba(42,74,56,0.15)" }}
                />
                <span
                  className="font-mono text-[11px] tracking-wide"
                  style={{ color: "#2A4A38" }}
                >
                  {c.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: decorative location card */}
        <div
          className="flex-1 border flex items-center justify-center min-h-40 relative overflow-hidden"
          style={{ borderColor: "rgba(42,74,56,0.2)" }}
        >
          <div className="absolute inset-0 opacity-[0.04]">
            <HatchRect width={600} height={300} />
          </div>
          <div className="relative text-center py-12">
            <div className="flex justify-center gap-5 mb-5 opacity-30">
              {[52, 72, 44].map((h, i) => (
                <SpruceGlyph key={i} height={h} />
              ))}
            </div>
            <p
              className="font-mono text-[10px] tracking-[0.3em] uppercase"
              style={{ color: "#739482" }}
            >
              Harbin, Heilongjiang · China
            </p>
            <p
              className="text-xs mt-1"
              style={{
                color: "#739482",
                fontFamily: "'Noto Sans SC', sans-serif",
              }}
            >
              现居：黑龙江省 · 哈尔滨
            </p>
          </div>
        </div>
      </div>

      {/* Footer rule */}
      <div
        className="mt-20 pt-7 border-t flex justify-between items-center"
        style={{ borderColor: "rgba(42,74,56,0.12)" }}
      >
        <p
          className="font-mono text-[9px] tracking-widest"
          style={{ color: "#739482" }}
        >
          © 2026 鄢如影 · ALL RIGHTS RESERVED
        </p>
        <div className="flex items-center gap-2">
          <Diamond size={4} opacity={0.3} />
          <span
            className="font-mono text-[9px] tracking-widest"
            style={{ color: "#739482" }}
          >
            DESIGNED WITH INTENT
          </span>
        </div>
      </div>
    </section>
  );
}

// ─── Data: Other Projects (42 items) ─────────────────────────────────────────

const OTHER_PROJECTS: {
  title: string;
  en: string;
  year: string;
  type: string;
  desc: string;
  img: string;
  w: number;
  h: number;
}[] = [
  {
    title: "湘江公园更新设计",
    en: "Xiangjiang Park Renewal",
    year: "2025",
    type: "景观规划",
    desc: "实地踏勘与数据采集，CAD 推演植物配置方案，SU 建模、Enscape 渲染、PS 后期合成。",
    img: "other-01.jpg",
    w: 400,
    h: 260,
  },
  {
    title: "公园渲染（一）",
    en: "Park Visualization I",
    year: "2026",
    type: "景观规划",
    desc: "使用 Blender 完成公园景观小品及植物场景的氛围渲染。",
    img: "other-02.png",
    w: 400,
    h: 260,
  },
  {
    title: "公园渲染（二）",
    en: "Park Visualization II",
    year: "2026",
    type: "景观规划",
    desc: "同一场景的早晚间氛围变化渲染测试。",
    img: "other-03.png",
    w: 400,
    h: 260,
  },
  {
    title: "怒江大桥渲染",
    en: "Nujiang Bridge Visualization",
    year: "2025",
    type: "商业委托",
    desc: "使用 Blender 完成桥梁结构建模及峡谷场景氛围渲染。",
    img: "other-04.png",
    w: 400,
    h: 260,
  },
  {
    title: "两层火锅店修改渲染（一）",
    en: "Hotpot Restaurant Remodel I",
    year: "2025",
    type: "商业委托",
    desc: "在原方案基础上调整大堂景观设计以及包间设计，输出一轮渲染。",
    img: "other-05.jpg",
    w: 400,
    h: 260,
  },
  {
    title: "两层火锅店修改渲染（二）",
    en: "Hotpot Restaurant Remodel II",
    year: "2025",
    type: "商业委托",
    desc: "包间调整了墙面贴图、增加了墙饰、吊灯，修改了包间门的设计",
    img: "other-06.png",
    w: 400,
    h: 260,
  },
  {
    title: "两层火锅店修改渲染（三）",
    en: "Hotpot Restaurant Remodel III",
    year: "2025",
    type: "商业委托",
    desc: "增加了立柱，调整了窗户和窗帘，输出了夜间渲染图",
    img: "other-07.png",
    w: 400,
    h: 260,
  },
    {
    title: "概念街道建模渲染",
    en: "Conceptual Street View",
    year: "2026",
    type: "概念设计",
    desc: "依据 CAD 底图完成沿街建筑群建模及日景街道场景渲染。",
    img: "other-08.png",
    w: 400,
    h: 260,
  },
  {
    title: "铁艺公园建模渲染",
    en: "Iron Art Park Rendering",
    year: "2026",
    type: "公共艺术",
    desc: "以铁艺构筑物为主题的公园节点的建模与氛围渲染。",
    img: "other-09.jpg",
    w: 400,
    h: 260,
  },
  {
    title: "钢铁公园建模渲染",
    en: "Steel Park Rendering",
    year: "2026",
    type: "公共艺术",
    desc: "以工业风格景观构筑物为核心的公园场景建模与表现。",
    img: "other-10.jpg",
    w: 400,
    h: 260,
  },
  {
    title: "商品房渲染（一）",
    en: "Residential Building Rendering I",
    year: "2025",
    type: "商业委托",
    desc: "基于已有 SU 模型优化构图与光照，输出室内软装写实渲染。",
    img: "other-11.jpg",
    w: 400,
    h: 260,
  },
  {
    title: "商品房渲染（二）",
    en: "Residential Building Rendering II",
    year: "2025",
    type: "商业委托",
    desc: "基于已有 SU 模型优化构图与光照，输出另一个房间室内软装写实渲染。",
    img: "other-12.jpg",
    w: 400,
    h: 260,
  },
  {
    title: "商品房渲染（三）",
    en: "Residential Building Rendering III",
    year: "2025",
    type: "商业委托",
    desc: "基于已有 SU 模型优化构图与光照，输出另一个房间室内软装剖面写实渲染。",
    img: "other-13.jpg",
    w: 400,
    h: 260,
  },
  {
    title: "小型 LOFT 建模渲染",
    en: "LOFT Space Modeling",
    year: "2025",
    type: "商业委托",
    desc: "依据客户需求自行设计 CAD 平面，完成从建模到室内场景渲染的全流程。",
    img: "other-14.jpg",
    w: 400,
    h: 260,
  },
  {
    title: "两层饭店建模渲染（一）",
    en: "Two-story Restaurant I",
    year: "2025",
    type: "商业委托",
    desc: "依据 CAD 图纸完成建筑主体建模及日景渲染。",
    img: "other-15.jpg",
    w: 400,
    h: 260,
  },
  {
    title: "两层饭店建模渲染（二）",
    en: "Two-story Restaurant II",
    year: "2025",
    type: "商业委托",
    desc: "同一项目的大堂入口局部渲染。",
    img: "other-16.jpg",
    w: 400,
    h: 260,
  },
  {
    title: "两层大商城建模渲染",
    en: "Two-story Mall Rendering",
    year: "2025",
    type: "商业委托",
    desc: "依据 CAD 图纸完成大型商业建筑体量建模及街景渲染。",
    img: "other-17.jpg",
    w: 400,
    h: 260,
  },
  {
    title: "火锅店装潢建模",
    en: "Hotpot Restaurant Interior",
    year: "2025",
    type: "商业委托",
    desc: "依据客户空间需求完成 SU 模型搭建与 Enscape 室内灯光材质渲染。",
    img: "other-18.png",
    w: 400,
    h: 260,
  },
  {
    title: "别墅前庭置景设计（一）",
    en: "Villa Courtyard Design I",
    year: "2025",
    type: "商业委托",
    desc: "从概念草图到 SU 模型深化，完成前庭铺装、水景与植物配置的渲染表现。",
    img: "other-19.png",
    w: 400,
    h: 260,
  },
  {
    title: "别墅前庭置景设计（二）",
    en: "Villa Courtyard Design II",
    year: "2025",
    type: "商业委托",
    desc: "针对客户反馈调整置景布局与材质细节，输出日暮两种氛围渲染。",
    img: "other-20.jpg",
    w: 400,
    h: 260,
  },
  {
    title: "酒吧建模渲染（一）",
    en: "Bar Interior Rendering I",
    year: "2025",
    type: "商业委托",
    desc: "依据 CAD 图纸完成酒吧室内空间建模及暖色灯光氛围渲染。",
    img: "other-21.jpg",
    w: 400,
    h: 260,
  },
  {
    title: "酒吧建模渲染（二）",
    en: "Bar Interior Rendering II",
    year: "2025",
    type: "商业委托",
    desc: "同一空间的不同视角及吧台区域细节渲染。",
    img: "other-22.png",
    w: 400,
    h: 260,
  },
  {
    title: "酒吧建模渲染（三）",
    en: "Bar Interior Rendering III",
    year: "2025",
    type: "商业委托",
    desc: "卡座区及装饰墙面材质的近景细节渲染。",
    img: "other-23.png",
    w: 400,
    h: 260,
  },
  {
    title: "咖啡厅设计建模",
    en: "Café Design Visualization",
    year: "2025",
    type: "商业委托",
    desc: "从概念设计到 SU 建模渲染，完成咖啡厅室内外一体化空间表现。",
    img: "other-24.png",
    w: 400,
    h: 260,
  },
];

// ─── Carousel helpers ─────────────────────────────────────────────────────────

const ITEM_W = 496; // base item width (px, at scale 1)
const ITEM_H = 348; // base item height
const SPACING = 0.74; // centre-to-centre = ITEM_W * SPACING
const WIN = 4; // items rendered on each side of active

function carouselItemStyle(
  offset: number,
  extraBlur: number,
): React.CSSProperties {
  const abs = Math.min(Math.abs(offset), 3);
  const scale = [1, 0.7, 0.5, 0.34][abs];
  const baseBlur = [0, 2.0, 4.0, 7.0][abs];
  const opacity = [1, 0.52, 0.28, 0.1][abs];
  const gray = [0, 0.6, 0.88, 1.0][abs];
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const effItemW = isMobile ? window.innerWidth * 0.55 : ITEM_W;  /* 修正-其它项目偏移步长适配 */
  const xPx = offset * effItemW * SPACING;
  // extraBlur decays slightly with distance so far items don't get over-blurred
  const totalBlur =
    baseBlur + extraBlur * Math.max(0, 1 - abs * 0.18);

  return {
    position: "absolute",
    left: "50%",
    top: "50%",
    width: ITEM_W,
    height: ITEM_H,
    transform: `translate(-50%, -50%) translateX(${xPx}px) scale(${scale})`,
    transformOrigin: "center center",
    opacity,
    filter:
      totalBlur > 0.05 || gray > 0
        ? `blur(${totalBlur.toFixed(2)}px) grayscale(${gray})`
        : "none",
    transition:
      "transform 0.48s cubic-bezier(0.4,0,0.2,1), opacity 0.48s cubic-bezier(0.4,0,0.2,1), filter 0.48s cubic-bezier(0.4,0,0.2,1)",
    zIndex: 10 - abs,
    };
}

function OtherProjectsSection() {
  const [active, setActive] = useState(0);
  const [extraBlur, setExtraBlur] = useState(0);
  const [touchStartX, setTouchStartX] = useState(0);
  const total = OTHER_PROJECTS.length;
  const mod = (n: number) => ((n % total) + total) % total;

  const go = (dir: number) => {
    // Flash motion blur, then let CSS ease it back to zero
    setExtraBlur(12);
    setActive((i) => mod(i + dir));
    requestAnimationFrame(() =>
      requestAnimationFrame(() => setExtraBlur(0)),
    );
  };

  // 仅修改-其他项目滑动：手指触控
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(diff) > 30) {
      go(diff > 0 ? -1 : 1);
    }
  };

  // Render WIN*2+1 items keyed by data index so DOM elements persist across
  // active changes and CSS transitions animate the position/blur changes.
  const windowItems = Array.from(
    { length: WIN * 2 + 1 },
    (_, i) => {
      const offset = i - WIN;
      const dataIdx = mod(active + offset);
      return { offset, dataIdx, proj: OTHER_PROJECTS[dataIdx] };
    },
  );

  const activeProj = OTHER_PROJECTS[active];

  return (
    <section
      id="other-projects"
      className="px-16 py-20 border-t"
      style={{ borderColor: "rgba(42,74,56,0.12)", contain: "layout paint" }}
    >
      <SectionHeader en="Project Overview" zh="其它项目概览" />

      <div className="mt-14 select-none">
        {/* ── Track ─────────────────────────────── */}
        <div
          className="other-projects-track relative overflow-hidden" style={{ height: ITEM_H + 40, contain: "layout paint" }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Left arrow */}
          <button
            onClick={() => go(-1)}
            aria-label="上一项目"
            className="absolute left-0 top-1/2 -translate-y-1/2 z-30 group flex items-center justify-center w-8 h-8 border transition-colors duration-200 hover:bg-primary"
            style={{ borderColor: "#2A4A38" }}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
            >
              <path
                d="M8 2L4 6L8 10"
                stroke="#2A4A38"
                strokeWidth="1.5"
                className="group-hover:stroke-[#F9F7EB]"
              />
            </svg>
          </button>

          {/* Right arrow */}
          <button
            onClick={() => go(1)}
            aria-label="下一项目"
            className="absolute right-0 top-1/2 -translate-y-1/2 z-30 group flex items-center justify-center w-8 h-8 border transition-colors duration-200 hover:bg-primary"
            style={{ borderColor: "#2A4A38" }}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
            >
              <path
                d="M4 2L8 6L4 10"
                stroke="#2A4A38"
                strokeWidth="1.5"
                className="group-hover:stroke-[#F9F7EB]"
              />
            </svg>
          </button>

          {/* Items – keyed by data index for smooth CSS transitions */}
          {windowItems.map(({ offset, dataIdx, proj }) => {
            const isCenter = offset === 0;
            return (
              <div
                key={dataIdx}
                style={carouselItemStyle(offset, extraBlur)}
              >
                <img
                  src={`/images/${proj.img}?v=${IMG_VERSION}`}
                  alt={proj.en}
                  className="w-full h-full object-cover"
                  draggable={false}
                  onError={(e) => { (e.target as HTMLImageElement).style.display = "none" }}
                  style={{
                    filter: isCenter
                      ? "saturate(0.82)"
                      : "saturate(0.4)",
                  }}
                />
                {isCenter && (
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      border: "1.5px solid rgba(42,74,56,0.55)",
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* ── Caption ───────────────────────────── */}
        <div className="mt-8 text-center px-20">
          <div className="flex items-center justify-center gap-2.5 mb-2">
            <Diamond size={5} />
            <span
              className="font-mono text-[9px] tracking-[0.25em] uppercase"
              style={{ color: "#739482" }}
            >
              {activeProj.type} · {activeProj.year}
            </span>
          </div>
          <h3
            className="text-lg mb-1"
            style={{
              fontFamily: "'Noto Sans SC', sans-serif",
              fontWeight: 900,
              color: "#111111",
            }}
          >
            {activeProj.title}
          </h3>
          <p
            className="font-mono text-[10px] tracking-wider mb-3"
            style={{ color: "#739482" }}
          >
            {activeProj.en}
          </p>
          <p
            className="text-sm leading-relaxed max-w-md mx-auto"
            style={{
              color: "#444444",
              fontFamily: "'Noto Sans SC', sans-serif",
            }}
          >
            {activeProj.desc}
          </p>
        </div>

        {/* ── Progress bar + counter ─────────────── */}
        <div className="mt-7 px-20">
          <div
            className="relative h-px w-full"
            style={{ background: "rgba(42,74,56,0.1)" }}
          >
            <div
              className="absolute left-0 top-0 h-full"
              style={{
                width: `${((active + 1) / total) * 100}%`,
                background: "#2A4A38",
                transition:
                  "width 0.48s cubic-bezier(0.4,0,0.2,1)",
              }}
            />
          </div>
          <div className="flex justify-between mt-2">
            <span
              className="font-mono text-[9px] tracking-widest"
              style={{ color: "#739482" }}
            >
              {String(active + 1).padStart(2, "0")}
            </span>
            <span
              className="font-mono text-[9px] tracking-widest"
              style={{ color: "rgba(42,74,56,0.3)" }}
            >
              {String(total).padStart(2, "0")}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Shared: Section header ───────────────────────────────────────────────────

function SectionHeader({ en, zh }: { en: string; zh: string }) {
  return (
    <div className="flex items-center gap-4">
      <Diamond size={8} />
      <div>
        <p
          className="font-mono text-[10px] tracking-[0.3em] uppercase"
          style={{ color: "#739482" }}
        >
          {en}
        </p>
        <h2
          className="text-3xl leading-tight mt-0.5"
          style={{
            fontFamily: "'Noto Sans SC', sans-serif",
            fontWeight: 900,
            color: "#111111",
          }}
        >
          {zh}
        </h2>
      </div>
    </div>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  const [activeSection, setActiveSection] = useState("about");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el && mainRef.current) {
      mainRef.current.scrollTo({
        top: el.offsetTop - 48,
        behavior: "smooth",
      });
    }
    setActiveSection(id);
  };

  useEffect(() => {
    const main = mainRef.current;
    if (!main) return;
    const sections = ["about", "projects", "skills", "contact"];

    const handler = () => {
      const scrollTop = main.scrollTop;
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && el.offsetTop - 120 <= scrollTop) {
          setActiveSection(id);
          return;
        }
      }
      setActiveSection("about");
    };

    main.addEventListener("scroll", handler, { passive: true });
    return () => main.removeEventListener("scroll", handler);
  }, []);

  // 移动端：窗口 resize 监听
  useEffect(() => {
    const handler = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) setSidebarOpen(false);
    };
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar
          active={activeSection}
          onNav={scrollToSection}
          isMobile={isMobile}
          sidebarOpen={sidebarOpen}
          onToggle={() => setSidebarOpen(!sidebarOpen)}
        />
        {/* 移动端遮罩 */}
        {isMobile && (
          <div
            className={"sidebar-overlay" + (sidebarOpen ? " visible" : "")}
            onClick={() => setSidebarOpen(false)}
          />
        )}
        {/* 移动端汉堡按钮 */}
        {isMobile && (
          <button
            className={"hamburger-btn" + (sidebarOpen ? " open" : "")}
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label={sidebarOpen ? "关闭菜单" : "打开菜单"}
          >
            <svg width="18" height="14" viewBox="0 0 18 14" fill="none">
              <line x1="1" y1="2" x2="17" y2="2" stroke="#F9F7EB" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="1" y1="7" x2="17" y2="7" stroke="#F9F7EB" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="1" y1="12" x2="17" y2="12" stroke="#F9F7EB" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        )}
      <main
        ref={mainRef}
        className="flex-1 overflow-y-auto"
        style={{
          marginLeft: isMobile ? 0 : 268,
          scrollbarWidth: "none",
          transition: isMobile ? "margin-left 0.3s ease" : undefined,
        }}
      >
        <AboutSection />
        <ProjectsSection />
        <OtherProjectsSection />
        <SkillsSection />
        <ContactSection />
      </main>
    </div>
  );
}







