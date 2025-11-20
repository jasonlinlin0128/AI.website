
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { HeroScene, QuantumComputerScene } from './components/QuantumScene';
import { SecurityMeshDiagram, RAGBotDiagram, WorkflowEfficiencyChart } from './components/Diagrams';
import { ArrowDown, Menu, X, Code, Cpu, Zap, Calendar, Database, ShieldCheck, Users, Coffee, Search, Settings, Mail, Linkedin, Github, ExternalLink, Moon, Sun, BookOpen } from 'lucide-react';

const ActivityCard = ({ title, role, date, description, delay }: { title: string, role: string, date: string, description: string, delay: string }) => {
  return (
    <div className="flex flex-col group animate-fade-in-up items-start p-8 bg-white rounded-xl border border-stone-200 shadow-sm hover:shadow-md transition-all duration-300 w-full max-w-sm hover:border-nobel-gold/50" style={{ animationDelay: delay }}>
      <h3 className="font-serif text-xl text-stone-900 mb-3">{title}</h3>
      <div className="w-12 h-0.5 bg-nobel-gold mb-4 opacity-60"></div>
      <p className="text-xs text-stone-500 font-bold uppercase tracking-widest leading-relaxed mb-2">{role}</p>
      <p className="text-sm text-stone-400 italic mb-4">{date}</p>
      <p className="text-sm text-stone-600 leading-relaxed">{description}</p>
    </div>
  );
};

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const scrollToSection = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const navItems = [
    { id: 'intro', label: '自我介紹' },
    { id: 'projects', label: '專案項目' },
    { id: 'blog', label: '部落格' },
    { id: 'hobbies', label: '休閒興趣' },
    { id: 'activities', label: '活動參與' },
  ];

  return (
    <div className="min-h-screen bg-[#F9F8F4] dark:bg-stone-900 text-stone-800 dark:text-stone-100 selection:bg-nobel-gold selection:text-white transition-colors duration-300">
      
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#F9F8F4]/90 dark:bg-stone-900/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-4 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-8 h-8 bg-stone-900 rounded-sm flex items-center justify-center text-white font-serif font-bold text-xl shadow-sm pb-1">S</div>
            <span className={`font-serif font-bold text-lg tracking-wide transition-opacity ${scrolled ? 'opacity-100' : 'opacity-0 md:opacity-100'}`}>
              SIMHOPE<span className="text-nobel-gold">+</span>AI
            </span>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide text-stone-600">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={scrollToSection(item.id)}
                  className="hover:text-nobel-gold transition-colors cursor-pointer uppercase"
                >
                  {item.label}
                </a>
              ))}
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun size={20} className="text-stone-600 dark:text-stone-400" /> : <Moon size={20} className="text-stone-600" />}
            </button>

            <button className="md:hidden text-stone-900 dark:text-stone-100 p-2" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-[#F9F8F4] flex flex-col items-center justify-center gap-8 text-xl font-serif animate-fade-in">
            {navItems.map((item) => (
              <a 
                key={item.id}
                href={`#${item.id}`} 
                onClick={scrollToSection(item.id)} 
                className="hover:text-nobel-gold transition-colors cursor-pointer uppercase"
              >
                {item.label}
              </a>
            ))}
        </div>
      )}

      {/* Hero Section */}
      <header className="relative h-screen flex items-center justify-center overflow-hidden">
        <HeroScene />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(249,248,244,0.92)_0%,rgba(249,248,244,0.6)_50%,rgba(249,248,244,0.3)_100%)]" />

        <div className="relative z-10 container mx-auto px-6 text-center">
          <div className="inline-block mb-4 px-3 py-1 border border-stone-400 text-stone-600 text-xs tracking-[0.2em] uppercase font-bold rounded-full backdrop-blur-sm bg-white/30">
            Jason @ Simhope
          </div>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-medium leading-tight md:leading-[0.9] mb-8 text-stone-900 drop-shadow-sm">
            SIMHOPE<br/><span className="italic font-normal text-stone-500 text-3xl md:text-5xl block mt-4">AI Project Executive</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-stone-700 font-light leading-relaxed mb-12">
            將傳統製造業與生成式 AI 接軌的實踐者
            <br/>策略規劃 × 技術開發 × 內部解決方案供應商
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-12">
             <a href="#projects" onClick={scrollToSection('projects')} className="px-8 py-3 bg-stone-900 text-white font-medium rounded-lg hover:bg-nobel-gold hover:text-stone-900 transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 cursor-pointer">
                查看專案
             </a>
             <a href="mailto:james20020128@gmail.com" className="px-8 py-3 bg-white text-stone-900 font-medium rounded-lg border-2 border-stone-300 hover:border-nobel-gold hover:text-nobel-gold transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer">
                聯絡我
             </a>
          </div>

          <div className="flex justify-center">
             <a href="#intro" onClick={scrollToSection('intro')} className="group flex flex-col items-center gap-2 text-sm font-medium text-stone-500 hover:text-stone-900 transition-colors cursor-pointer">
                <span>關於我</span>
                <span className="p-2 border border-stone-300 rounded-full group-hover:border-stone-900 transition-colors bg-white/50">
                    <ArrowDown size={16} />
                </span>
             </a>
          </div>
        </div>
      </header>

      <main>
        {/* Intro / 自我介紹 */}
        <section id="intro" className="py-24 bg-white dark:bg-stone-800">
          <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
            <div className="md:col-span-4">
              <div className="inline-block mb-3 text-xs font-bold tracking-widest text-stone-500 dark:text-stone-400 uppercase">Introduction</div>
              <h2 className="font-serif text-4xl mb-6 leading-tight text-stone-900 dark:text-stone-100">自我介紹</h2>
              <div className="w-16 h-1 bg-nobel-gold mb-6"></div>
            </div>
            <div className="md:col-span-8 text-lg text-stone-600 dark:text-stone-300 leading-relaxed space-y-6">
              <p>
                <span className="text-5xl float-left mr-3 mt-[-8px] font-serif text-nobel-gold">H</span>ello, I am Jason.
                目前任職於 Simhope，一家專注於生產壓鑄機與國防工業產品的傳統製造廠。
                在公司內，我的角色就像是一位「內部的軟體供應商與技術顧問」。
              </p>
              <p>
                我的核心任務是傾聽同仁在流程上的痛點，並評估最佳的解決方案。
                對於能夠快速迭代的需求，我會利用開源技術 (Open Source) 進行開發；
                而針對需要更強大硬體或軟體支援的專案，我則負責評估外部供應商的方案，進行資源整合。
                我致力於將 AI 與數位化工具帶入這家擁有深厚底蘊的製造工廠。
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                 <div className="bg-stone-50 p-4 rounded-lg border border-stone-100">
                    <h4 className="font-serif font-bold text-stone-900 mb-2 flex items-center gap-2"><Settings size={16}/> 解決方案整合</h4>
                    <p className="text-sm">評估 Build vs. Buy 策略，整合開源資源與外部供應商方案。</p>
                 </div>
                 <div className="bg-stone-50 p-4 rounded-lg border border-stone-100">
                    <h4 className="font-serif font-bold text-stone-900 mb-2 flex items-center gap-2"><Zap size={16}/> 流程優化與 AI</h4>
                    <p className="text-sm">從 ERP 對接到生成式 AI 應用 (RAG, Agent)，提升行政與決策效率。</p>
                 </div>
              </div>

              {/* Skills Section */}
              <div className="mt-12 p-6 bg-gradient-to-br from-stone-50 to-stone-100 rounded-xl border border-stone-200">
                <h4 className="font-serif font-bold text-stone-900 mb-6 flex items-center gap-2">
                  <Cpu size={18} className="text-nobel-gold"/>
                  核心技能
                </h4>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">程式語言</p>
                    <div className="flex flex-wrap gap-2">
                      {['Python', 'TypeScript', 'JavaScript'].map(skill => (
                        <span key={skill} className="px-3 py-1 bg-white text-stone-700 text-sm rounded-full border border-stone-200 hover:border-nobel-gold hover:text-nobel-gold transition-colors">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">AI/ML 技術</p>
                    <div className="flex flex-wrap gap-2">
                      {['RAG', 'LangChain', 'Prompt Engineering'].map(skill => (
                        <span key={skill} className="px-3 py-1 bg-white text-stone-700 text-sm rounded-full border border-stone-200 hover:border-nobel-gold hover:text-nobel-gold transition-colors">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">框架 / 工具</p>
                    <div className="flex flex-wrap gap-2">
                      {['React', 'Teams Bot', 'Docker'].map(skill => (
                        <span key={skill} className="px-3 py-1 bg-white text-stone-700 text-sm rounded-full border border-stone-200 hover:border-nobel-gold hover:text-nobel-gold transition-colors">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">領域知識</p>
                    <div className="flex flex-wrap gap-2">
                      {['多模態整合', '流程優化', '價值流'].map(skill => (
                        <span key={skill} className="px-3 py-1 bg-white text-stone-700 text-sm rounded-full border border-stone-200 hover:border-nobel-gold hover:text-nobel-gold transition-colors">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects / 專案項目 */}
        <section id="projects" className="py-24 bg-white dark:bg-stone-800 border-t border-stone-100 dark:border-stone-700">
            <div className="container mx-auto px-6">
                <div className="mb-16">
                   <div className="inline-block mb-3 text-xs font-bold tracking-widest text-stone-500 uppercase">Impact & Case Studies</div>
                   <h2 className="font-serif text-4xl md:text-5xl mb-6 text-stone-900">專案項目</h2>
                   <p className="text-stone-600 max-w-2xl mb-10">從流程數位化到 AI 賦能的實際落地應用。</p>

                   {/* Stats Overview */}
                   <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
                      <div className="text-center p-6 bg-gradient-to-br from-stone-50 to-white rounded-xl border border-stone-200 hover:border-nobel-gold transition-colors">
                         <div className="text-3xl md:text-4xl font-serif font-bold text-nobel-gold mb-2">84</div>
                         <div className="text-xs uppercase tracking-wider text-stone-500 font-bold">分鐘 / 日</div>
                         <div className="text-sm text-stone-600 mt-1">總工時節省</div>
                      </div>
                      <div className="text-center p-6 bg-gradient-to-br from-stone-50 to-white rounded-xl border border-stone-200 hover:border-nobel-gold transition-colors">
                         <div className="text-3xl md:text-4xl font-serif font-bold text-nobel-gold mb-2">8+</div>
                         <div className="text-xs uppercase tracking-wider text-stone-500 font-bold">同仁</div>
                         <div className="text-sm text-stone-600 mt-1">服務人數</div>
                      </div>
                      <div className="text-center p-6 bg-gradient-to-br from-stone-50 to-white rounded-xl border border-stone-200 hover:border-nobel-gold transition-colors">
                         <div className="text-3xl md:text-4xl font-serif font-bold text-nobel-gold mb-2">3+</div>
                         <div className="text-xs uppercase tracking-wider text-stone-500 font-bold">專案</div>
                         <div className="text-sm text-stone-600 mt-1">AI 解決方案</div>
                      </div>
                      <div className="text-center p-6 bg-gradient-to-br from-stone-50 to-white rounded-xl border border-stone-200 hover:border-nobel-gold transition-colors">
                         <div className="text-3xl md:text-4xl font-serif font-bold text-nobel-gold mb-2">100%</div>
                         <div className="text-xs uppercase tracking-wider text-stone-500 font-bold">內部開發</div>
                         <div className="text-sm text-stone-600 mt-1">數位化系統</div>
                      </div>
                   </div>
                </div>

                {/* Project 1: Daily Report Digitization */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-stone-100 text-stone-600 text-xs font-bold tracking-widest uppercase rounded-full mb-6 border border-stone-200">
                            <Users size={14}/> PROJECT A
                        </div>
                        <h3 className="font-serif text-3xl mb-4 text-stone-900">加工部日報表數位化</h3>
                        <p className="text-lg text-stone-600 mb-6 leading-relaxed">
                           針對加工部 8 位同仁與主管的作業流程進行優化。透過自行開發的數位系統，將原本耗時的紙本與 Excel 統整作業轉移至行動裝置，實現即時填報與數據匯出。
                        </p>
                        <ul className="space-y-2 text-stone-600 mb-6">
                            <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-nobel-gold"></span>同仁填寫：10分鐘 → 3分鐘</li>
                            <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-nobel-gold"></span>主管統整：30分鐘 → 2分鐘</li>
                            <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-nobel-gold"></span>每日總計節省：84 分鐘</li>
                        </ul>
                    </div>
                    <div>
                        <WorkflowEfficiencyChart />
                        <div className="text-center mt-4 text-stone-500 text-sm italic">
                            數位轉型前後之時間成本比較圖
                        </div>
                    </div>
                </div>

                {/* Project 2: Teams RAG Bot */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
                     <div className="order-2 lg:order-1">
                        <RAGBotDiagram />
                     </div>
                     <div className="order-1 lg:order-2">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-stone-100 text-stone-600 text-xs font-bold tracking-widest uppercase rounded-full mb-6 border border-stone-200">
                            <Code size={14}/> PROJECT B
                        </div>
                        <h3 className="font-serif text-3xl mb-4 text-stone-900">ISO 文件 RAG 機器人</h3>
                        <p className="text-lg text-stone-600 mb-6 leading-relaxed">
                            在 Microsoft Teams 群組中部署 AI 機器人。利用 RAG (檢索增強生成) 技術，讓同仁能用語意搜尋快速找到資安 ISO 文件與規範，解決傳統文件檢索困難的問題。
                        </p>
                        <ul className="space-y-2 text-stone-600 mb-6">
                            <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-nobel-gold"></span>Teams 整合應用</li>
                            <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-nobel-gold"></span>即時回答資安規範問題</li>
                            <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-nobel-gold"></span>降低內部溝通成本</li>
                        </ul>
                     </div>
                </div>
                
                {/* Project 3: AI Promotion & Security */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-stone-100 text-stone-600 text-xs font-bold tracking-widest uppercase rounded-full mb-6 border border-stone-200">
                            <ShieldCheck size={14}/> PROJECT C
                        </div>
                        <h3 className="font-serif text-3xl mb-4 text-stone-900">AI 推廣與資安意識提升</h3>
                        <p className="text-lg text-stone-600 mb-6 leading-relaxed">
                           不僅導入工具，更重視人員的觀念升級。推動 AI 工具應用 (ChatGPT, Gemini, Perplexity) 的同時，也強化同仁對雙因子驗證 (2FA)、Passkey 及社交工程防護的認知。
                        </p>
                        <ul className="space-y-2 text-stone-600 mb-6">
                            <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-nobel-gold"></span>推廣 NotebookLM 提升知識管理效率</li>
                            <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-nobel-gold"></span>強化 2FA 與 Passkey 使用率</li>
                            <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-nobel-gold"></span>提升社交工程攻擊防禦意識</li>
                        </ul>
                    </div>
                    <div>
                        <SecurityMeshDiagram />
                    </div>
                </div>
            </div>
        </section>

        {/* Hobbies / 休閒興趣 - Coffee */}
        <section id="hobbies" className="py-24 bg-[#2A2420] text-stone-100 relative overflow-hidden">
             <div className="absolute inset-0 pointer-events-none opacity-20">
                 {/* Background elements if needed */}
             </div>
             
             <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12 items-center relative z-10">
                <div className="md:col-span-5 h-[500px] relative">
                    <div className="absolute inset-0 bg-gradient-to-b from-[#3C342E] to-[#1F1A17] rounded-xl overflow-hidden border border-[#5A4D44] shadow-2xl">
                        {/* Reusing QuantumComputerScene but contextualizing as Coffee Extraction */}
                        <QuantumComputerScene />
                        <div className="absolute bottom-4 left-0 right-0 text-center text-xs text-[#C5A059] font-serif italic">The Art of Extraction</div>
                    </div>
                </div>
                <div className="md:col-span-7 flex flex-col justify-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#3C342E] text-[#C5A059] text-xs font-bold tracking-widest uppercase rounded-full mb-6 border border-[#5A4D44] w-fit">
                         <Coffee size={14}/> OFF DUTY
                    </div>
                    <h2 className="font-serif text-4xl mb-6 text-white">休閒興趣：咖啡與職人精神</h2>
                    <p className="text-lg text-[#D7CEC7] mb-6 leading-relaxed">
                        工作之餘，我沉浸在手沖咖啡的世界。沖煮咖啡與調校 AI 模型有著異曲同工之妙——都需要對變數（溫度、研磨度、粉水比）進行精密的控制，才能萃取出最完美的風味。
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="p-4 rounded bg-[#3C342E]/50 border border-[#5A4D44] hover:border-[#C5A059] transition-colors">
                            <h4 className="text-[#C5A059] font-serif text-lg mb-2 flex items-center gap-2"><Coffee size={16}/> 偏好豆種</h4>
                            <p className="text-[#A89F99] text-sm">偏好沖煮衣索比亞、哥倫比亞的豆子，品種有 74110 或是藝妓。</p>
                        </div>
                        <div className="p-4 rounded bg-[#3C342E]/50 border border-[#5A4D44] hover:border-[#C5A059] transition-colors">
                            <h4 className="text-[#C5A059] font-serif text-lg mb-2 flex items-center gap-2"><Zap size={16}/> 沖煮風格</h4>
                            <p className="text-[#A89F99] text-sm">淺焙、水果風味、手沖——追求明亮的酸質與豐富的層次感。</p>
                        </div>
                        <div className="p-4 rounded bg-[#3C342E]/50 border border-[#5A4D44] hover:border-[#C5A059] transition-colors">
                            <h4 className="text-[#C5A059] font-serif text-lg mb-2 flex items-center gap-2"><Search size={16}/> 推薦店家</h4>
                            <p className="text-[#A89F99] text-sm">Kasasagi Coffee Roaster、Underwater、Panshout Coffee Roaster</p>
                        </div>
                        <div className="p-4 rounded bg-[#3C342E]/50 border border-[#5A4D44] hover:border-[#C5A059] transition-colors">
                            <h4 className="text-[#C5A059] font-serif text-lg mb-2 flex items-center gap-2"><Users size={16}/> 展覽與賽事</h4>
                            <p className="text-[#A89F99] text-sm">定期參與咖啡展與觀摩手沖比賽，保持對產業的敏銳度。</p>
                        </div>
                    </div>
                </div>
             </div>
        </section>

        {/* Blog / 部落格 */}
        <section id="blog" className="py-24 bg-gradient-to-b from-stone-50 to-white dark:from-stone-900 dark:to-stone-800 border-t border-stone-100 dark:border-stone-700">
           <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-stone-200 dark:bg-stone-700 text-stone-600 dark:text-stone-300 text-xs font-bold tracking-widest uppercase rounded-full mb-6 border border-stone-300 dark:border-stone-600">
                        <BookOpen size={14}/> INSIGHTS
                    </div>
                    <h2 className="font-serif text-3xl md:text-5xl mb-4 text-stone-900 dark:text-stone-100">技術筆記與見解</h2>
                    <p className="text-stone-500 dark:text-stone-400 max-w-2xl mx-auto">分享 AI 實作經驗、技術心得與產業觀察</p>
                </div>

                <div className="max-w-4xl mx-auto">
                    <div className="bg-white dark:bg-stone-800 rounded-xl border border-stone-200 dark:border-stone-700 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group">
                        <div className="p-8 md:p-12">
                            <div className="flex items-start gap-6">
                                <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-nobel-gold to-yellow-600 rounded-lg flex items-center justify-center shadow-md">
                                    <BookOpen size={32} className="text-white" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-serif text-2xl text-stone-900 dark:text-stone-100 mb-3 group-hover:text-nobel-gold transition-colors">
                                        在 Medium 閱讀更多文章
                                    </h3>
                                    <p className="text-stone-600 dark:text-stone-300 leading-relaxed mb-6">
                                        我在 Medium 上分享 AI 技術實作、製造業數位轉型的實戰經驗，以及對新興技術的思考與觀察。
                                    </p>
                                    <a
                                        href="https://medium.com/@james20020128"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-6 py-3 bg-stone-900 dark:bg-nobel-gold text-white dark:text-stone-900 font-medium rounded-lg hover:bg-nobel-gold dark:hover:bg-yellow-600 transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105"
                                    >
                                        <span>前往 Medium</span>
                                        <ExternalLink size={16} />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Optional: Featured topics */}
                    <div className="mt-8 flex flex-wrap justify-center gap-3">
                        <span className="px-4 py-2 bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-300 text-sm rounded-full border border-stone-200 dark:border-stone-700">
                            #生成式AI
                        </span>
                        <span className="px-4 py-2 bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-300 text-sm rounded-full border border-stone-200 dark:border-stone-700">
                            #製造業轉型
                        </span>
                        <span className="px-4 py-2 bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-300 text-sm rounded-full border border-stone-200 dark:border-stone-700">
                            #RAG 應用
                        </span>
                        <span className="px-4 py-2 bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-300 text-sm rounded-full border border-stone-200 dark:border-stone-700">
                            #LLM 落地
                        </span>
                        <span className="px-4 py-2 bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-300 text-sm rounded-full border border-stone-200 dark:border-stone-700">
                            #技術筆記
                        </span>
                    </div>
                </div>
           </div>
        </section>

        {/* Activities / 活動參與 */}
        <section id="activities" className="py-24 bg-[#F5F4F0] dark:bg-stone-900 border-t border-stone-300 dark:border-stone-700">
           <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-stone-200 text-stone-600 text-xs font-bold tracking-widest uppercase rounded-full mb-6 border border-stone-300">
                        <Calendar size={14}/> TIMELINE
                    </div>
                    <h2 className="font-serif text-3xl md:text-5xl mb-4 text-stone-900">活動參與</h2>
                    <p className="text-stone-500 max-w-2xl mx-auto">跨足科技創新與咖啡工藝的探索足跡。</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
                    <ActivityCard
                        title="日報表系統上線"
                        role="專案負責人"
                        date="2024 - Present"
                        description="將重複性高的內容製作成選單，數位化的同時加速日報表填寫時間。"
                        delay="0s"
                    />
                    <ActivityCard
                        title="台灣國際咖啡展"
                        role="參觀考察"
                        date="2023 - 2025"
                        description="透過每年的咖啡展，能夠看到最新的器材與機器，也能夠看到生豆&熟豆的趨勢，並且可以近距離與世界級的咖啡人交流。"
                        delay="0.1s"
                    />
                    <ActivityCard
                        title="AI 工具應用講座"
                        role="內部講師"
                        date="Apr 2024 - Present"
                        description="分享 ChatGPT 與 NotebookLM，讓同仁能夠思考工作中有什麼流程能夠用 AI 賦能或是共同協作。"
                        delay="0.2s"
                    />
                     <ActivityCard
                        title="手沖咖啡交流賽"
                        role="參賽選手"
                        date="May 2023"
                        description="曾參與珈發盃與嘉義大學手沖交流賽，並於大學時期籌辦手沖賽。"
                        delay="0.3s"
                    />
                    <ActivityCard
                        title="AI年會"
                        role="技術考察"
                        date="May 2025"
                        description="學到 LLM 在製造業的落地應用案例、多模態 AI 的最新進展，特別是影像與文字的結合分析，也吸收到了企業導入 AI 的倫理與法規考量。"
                        delay="0.4s"
                    />
                </div>
           </div>
        </section>

      </main>

      <footer className="bg-stone-900 text-stone-400 py-16">
        <div className="container mx-auto px-6">
            {/* Main Footer Content */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
                {/* Brand Section */}
                <div className="text-center md:text-left">
                    <div className="text-white font-serif font-bold text-2xl mb-3">SIMHOPE<span className="text-nobel-gold">+</span>AI</div>
                    <p className="text-sm mb-4">Jason | GenAI Project Executive</p>
                    <p className="text-xs text-stone-500 leading-relaxed">
                        將傳統製造業與生成式 AI 接軌的實踐者
                    </p>
                </div>

                {/* Quick Links */}
                <div className="text-center">
                    <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Quick Links</h3>
                    <div className="flex flex-col gap-3 text-sm font-medium">
                        <a href="#intro" className="hover:text-nobel-gold transition-colors">自我介紹</a>
                        <a href="#projects" className="hover:text-nobel-gold transition-colors">專案項目</a>
                        <a href="#blog" className="hover:text-nobel-gold transition-colors">部落格</a>
                        <a href="#hobbies" className="hover:text-nobel-gold transition-colors">休閒興趣</a>
                        <a href="#activities" className="hover:text-nobel-gold transition-colors">活動參與</a>
                    </div>
                </div>

                {/* Contact Section */}
                <div className="text-center md:text-left">
                    <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Get In Touch</h3>
                    <div className="flex flex-col gap-3">
                        <a href="mailto:james20020128@gmail.com" className="flex items-center justify-center md:justify-start gap-2 text-sm hover:text-nobel-gold transition-colors group">
                            <Mail size={16} className="group-hover:scale-110 transition-transform" />
                            <span>james20020128@gmail.com</span>
                        </a>
                        <a href="https://linkedin.com/in/jasonlin-38700b294" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center md:justify-start gap-2 text-sm hover:text-nobel-gold transition-colors group">
                            <Linkedin size={16} className="group-hover:scale-110 transition-transform" />
                            <span>LinkedIn Profile</span>
                            <ExternalLink size={12} className="opacity-50" />
                        </a>
                        <a href="https://github.com/jasonlinlin0128" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center md:justify-start gap-2 text-sm hover:text-nobel-gold transition-colors group">
                            <Github size={16} className="group-hover:scale-110 transition-transform" />
                            <span>GitHub</span>
                            <ExternalLink size={12} className="opacity-50" />
                        </a>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-stone-800 pt-8 text-center">
                <p className="text-xs text-stone-600">
                    © 2025 Jason @ Simhope. All rights reserved.
                </p>
            </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
