
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Cpu, BarChart2, AlertTriangle, CheckCircle, Shield, User, Lock, FileText, Database } from 'lucide-react';

// --- SECURITY MESH DIAGRAM (Formerly Surface Code) ---
// Represents: 2FA & Security Awareness. Nodes are users, errors are phishing, stabilizers are 2FA checks.
export const SecurityMeshDiagram: React.FC = () => {
  const [threats, setThreats] = useState<number[]>([]);
  
  // Adjacency list: User Node -> Security Check Nodes (Stabilizers)
  const adjacency: Record<number, number[]> = {
    0: [0, 1],
    1: [0, 2],
    2: [1, 3],
    3: [2, 3],
    4: [0, 1, 2, 3], // Central node connected to all checks
  };

  const toggleThreat = (id: number) => {
    setThreats(prev => prev.includes(id) ? prev.filter(e => e !== id) : [...prev, id]);
  };

  // Check if stabilizers (2FA/Security Protocols) detect the threat
  const activeChecks = [0, 1, 2, 3].filter(checkId => {
    let threatCount = 0;
    Object.entries(adjacency).forEach(([nodeId, checks]) => {
        if (threats.includes(parseInt(nodeId)) && checks.includes(checkId)) {
            threatCount++;
        }
    });
    // Simple logic: If a connected node is threatened, the check activates
    return threatCount > 0;
  });

  return (
    <div className="flex flex-col items-center p-8 bg-white rounded-xl shadow-sm border border-stone-200 my-8">
      <h3 className="font-serif text-xl mb-4 text-stone-800">互動演示：資安防護網</h3>
      <p className="text-sm text-stone-500 mb-6 text-center max-w-md">
        點擊圓形用戶節點模擬<strong>「社交工程攻擊」</strong>。觀察方形安全節點 (2FA/Passkey) 如何偵測異常並啟動防護。
      </p>
      
      <div className="relative w-64 h-64 bg-[#F5F4F0] rounded-lg border border-stone-200 p-4 flex flex-wrap justify-between content-between relative">
         {/* Grid Lines */}
         <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-20">
            <div className="w-2/3 h-2/3 border border-stone-400"></div>
            <div className="absolute w-full h-[1px] bg-stone-400"></div>
            <div className="absolute h-full w-[1px] bg-stone-400"></div>
         </div>

         {/* Security Checks (Stabilizers) */}
         {[
             {id: 0, x: '50%', y: '20%', label: '2FA'},
             {id: 1, x: '20%', y: '50%', label: 'Key'},
             {id: 2, x: '80%', y: '50%', label: 'Bio'},
             {id: 3, x: '50%', y: '80%', label: 'Log'},
         ].map(check => (
             <motion.div
                key={`check-${check.id}`}
                className={`absolute w-10 h-10 -ml-5 -mt-5 flex items-center justify-center text-white text-xs font-bold rounded-sm shadow-sm transition-all duration-300 ${activeChecks.includes(check.id) ? 'bg-blue-600 opacity-100 scale-110 ring-4 ring-offset-2 ring-stone-200' : 'bg-stone-300 opacity-40'}`}
                style={{ left: check.x, top: check.y }}
             >
                 {activeChecks.includes(check.id) ? <Shield size={16}/> : check.label}
             </motion.div>
         ))}

         {/* User Nodes */}
         {[
             {id: 0, x: '20%', y: '20%'}, {id: 1, x: '80%', y: '20%'},
             {id: 4, x: '50%', y: '50%'}, // Center
             {id: 2, x: '20%', y: '80%'}, {id: 3, x: '80%', y: '80%'},
         ].map(node => (
             <button
                key={`node-${node.id}`}
                onClick={() => toggleThreat(node.id)}
                className={`absolute w-8 h-8 -ml-4 -mt-4 rounded-full border-2 flex items-center justify-center transition-all duration-200 z-10 ${threats.includes(node.id) ? 'bg-red-500 border-red-600 text-white' : 'bg-white border-stone-300 hover:border-stone-500 text-stone-400'}`}
                style={{ left: node.x, top: node.y }}
             >
                {threats.includes(node.id) ? <AlertTriangle size={14} /> : <User size={14} />}
             </button>
         ))}
      </div>

      <div className="mt-6 flex items-center gap-4 text-xs font-mono text-stone-500">
          <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-red-500"></div> 遭受攻擊</div>
          <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-sm bg-blue-600"></div> 安全攔截</div>
          <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-sm bg-stone-300"></div> 正常監控</div>
      </div>
      
      <div className="mt-4 h-6 text-sm font-serif italic text-stone-600">
        {threats.length === 0 ? "System Status: Secure" : `Security Alert: Blocked ${threats.length} phishing attempts.`}
      </div>
    </div>
  );
};

// --- RAG BOT DIAGRAM (Formerly Transformer Decoder) ---
// Represents: Teams Bot -> ISO Search -> LLM -> Answer
export const RAGBotDiagram: React.FC = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
        setStep(s => (s + 1) % 4);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center p-8 bg-[#F5F4F0] rounded-xl border border-stone-200 my-8">
      <h3 className="font-serif text-xl mb-4 text-stone-900">RAG 運作流程模擬</h3>
      <p className="text-sm text-stone-600 mb-6 text-center max-w-md">
        機器人接收 Teams 提問，檢索 ISO 內部文件庫，並透過 LLM 生成準確回答。
      </p>

      <div className="relative w-full max-w-lg h-56 bg-white rounded-lg shadow-inner overflow-hidden mb-6 border border-stone-200 flex items-center justify-center gap-4 md:gap-8 p-4">
        
        {/* Step 1: User Question */}
        <div className="flex flex-col items-center gap-2">
            <div className={`w-16 h-16 rounded-lg border-2 flex flex-col items-center justify-center transition-colors duration-500 ${step === 0 ? 'border-blue-500 bg-blue-50 text-blue-600' : 'border-stone-200 bg-stone-50 text-stone-300'}`}>
                 <User size={24} />
            </div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-stone-500">Question</span>
        </div>

        {/* Arrow */}
        <motion.div animate={{ opacity: step >= 1 ? 1 : 0.3, x: step >= 1 ? 0 : -5 }}>→</motion.div>

        {/* Step 2: Retrieval (Database) */}
        <div className="flex flex-col items-center gap-2">
             <div className={`w-16 h-16 rounded-lg border-2 flex flex-col items-center justify-center gap-2 transition-colors duration-500 ${step === 1 ? 'border-nobel-gold bg-nobel-gold/10 text-nobel-gold' : 'border-stone-200 bg-stone-50 text-stone-300'}`}>
                <Database size={24} />
             </div>
             <span className="text-[10px] uppercase font-bold tracking-wider text-stone-500">Retrieval</span>
        </div>

         {/* Arrow */}
         <motion.div animate={{ opacity: step >= 2 ? 1 : 0.3, x: step >= 2 ? 0 : -5 }}>→</motion.div>

        {/* Step 3: Synthesis (LLM) */}
        <div className="flex flex-col items-center gap-2">
             <div className={`w-16 h-16 rounded-lg border-2 flex flex-col items-center justify-center gap-2 transition-colors duration-500 ${step === 2 ? 'border-purple-500 bg-purple-50 text-purple-600' : 'border-stone-200 bg-stone-50 text-stone-300'}`}>
                <Cpu size={24} className={step === 2 ? 'animate-pulse' : ''}/>
             </div>
             <span className="text-[10px] uppercase font-bold tracking-wider text-stone-500">AI Gen</span>
        </div>

        {/* Arrow */}
        <motion.div animate={{ opacity: step >= 3 ? 1 : 0.3, x: step >= 3 ? 0 : -5 }}>→</motion.div>

        {/* Step 4: Answer */}
        <div className="flex flex-col items-center gap-2">
            <div className={`w-16 h-16 rounded-lg border-2 flex flex-col items-center justify-center transition-colors duration-500 ${step === 3 ? 'border-green-500 bg-green-50' : 'border-stone-200 bg-stone-50'}`}>
                {step === 3 ? (
                    <FileText size={24} className="text-green-600" />
                ) : (
                    <span className="text-2xl font-serif text-stone-300">...</span>
                )}
            </div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-stone-500">ISO Doc</span>
        </div>

      </div>

      <div className="flex gap-2">
          {[0, 1, 2, 3].map(s => (
              <div key={s} className={`h-1 rounded-full transition-all duration-300 ${step === s ? 'w-8 bg-nobel-gold' : 'w-2 bg-stone-300'}`}></div>
          ))}
      </div>
    </div>
  );
};

// --- WORKFLOW EFFICIENCY CHART (Formerly Performance Metric) ---
// Represents: Paper vs Digital Time Savings
export const WorkflowEfficiencyChart: React.FC = () => {
    const [role, setRole] = useState<'Staff' | 'Manager'>('Staff');
    
    // Data: Time spent in minutes (Lower is better)
    // Staff: 10m -> 3m
    // Manager: 30m -> 2m
    const data = {
        'Staff': { traditional: 10, digital: 3, label: '同仁填寫時間 (分)' },
        'Manager': { traditional: 30, digital: 2, label: '主管統整時間 (分)' }
    };

    const currentData = data[role];
    const maxVal = role === 'Staff' ? 12 : 35; 
    
    const formatValue = (val: number) => val + ' min';

    return (
        <div className="flex flex-col md:flex-row gap-8 items-center p-8 bg-stone-900 text-stone-100 rounded-xl my-8 border border-stone-800 shadow-lg">
            <div className="flex-1 min-w-[240px]">
                <h3 className="font-serif text-xl mb-2 text-nobel-gold">數位化效益分析</h3>
                <p className="text-stone-400 text-sm mb-4 leading-relaxed">
                    系統上線後，{currentData.label}顯著下降。全公司每日總計節省約 84 分鐘工時。
                </p>
                <div className="flex gap-2 mt-6">
                    {(['Staff', 'Manager'] as const).map((r) => (
                        <button 
                            key={r}
                            onClick={() => setRole(r)} 
                            className={`px-3 py-1.5 rounded text-sm font-medium transition-all duration-200 border ${role === r ? 'bg-nobel-gold text-stone-900 border-nobel-gold' : 'bg-transparent text-stone-400 border-stone-700 hover:border-stone-500 hover:text-stone-200'}`}
                        >
                            {r === 'Staff' ? '加工部同仁' : '部門主管'}
                        </button>
                    ))}
                </div>
                <div className="mt-6 font-mono text-xs text-stone-500 flex items-center gap-2">
                    <BarChart2 size={14} className="text-nobel-gold" /> 
                    <span>LOWER IS BETTER (TIME SPENT)</span>
                </div>
            </div>
            
            <div className="relative w-64 h-72 bg-stone-800/50 rounded-xl border border-stone-700/50 p-6 flex justify-around items-end">
                {/* Background Grid Lines */}
                <div className="absolute inset-0 p-6 flex flex-col justify-between pointer-events-none opacity-10">
                   <div className="w-full h-[1px] bg-stone-400"></div>
                   <div className="w-full h-[1px] bg-stone-400"></div>
                   <div className="w-full h-[1px] bg-stone-400"></div>
                   <div className="w-full h-[1px] bg-stone-400"></div>
                </div>

                {/* Traditional Bar */}
                <div className="w-20 flex flex-col justify-end items-center h-full z-10">
                    <div className="flex-1 w-full flex items-end justify-center relative mb-3">
                        <div className="absolute -top-8 w-full text-center text-sm font-mono text-stone-400 font-bold bg-stone-900/90 py-1 px-2 rounded backdrop-blur-sm border border-stone-700/50 shadow-sm whitespace-nowrap">{formatValue(currentData.traditional)}</div>
                        <motion.div 
                            className="w-full bg-stone-600 rounded-t-md border-t border-x border-stone-500/30"
                            initial={{ height: 0 }}
                            animate={{ height: `${(currentData.traditional / maxVal) * 100}%` }}
                            transition={{ type: "spring", stiffness: 80, damping: 15 }}
                        />
                    </div>
                    <div className="h-6 flex items-center text-xs font-bold text-stone-500 uppercase tracking-wider">紙本作業</div>
                </div>

                {/* Digital Bar */}
                <div className="w-20 flex flex-col justify-end items-center h-full z-10">
                     <div className="flex-1 w-full flex items-end justify-center relative mb-3">
                        <div className="absolute -top-8 w-full text-center text-sm font-mono text-nobel-gold font-bold bg-stone-900/90 py-1 px-2 rounded backdrop-blur-sm border border-nobel-gold/30 shadow-sm whitespace-nowrap">{formatValue(currentData.digital)}</div>
                        <motion.div 
                            className="w-full bg-nobel-gold rounded-t-md shadow-[0_0_20px_rgba(197,160,89,0.25)] relative overflow-hidden"
                            initial={{ height: 0 }}
                            animate={{ height: Math.max(5, (currentData.digital / maxVal) * 100) + '%' }}
                            transition={{ type: "spring", stiffness: 80, damping: 15, delay: 0.1 }}
                        >
                           {/* Shine effect */}
                           <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-white/20"></div>
                        </motion.div>
                    </div>
                     <div className="h-6 flex items-center text-xs font-bold text-nobel-gold uppercase tracking-wider">數位系統</div>
                </div>
            </div>
        </div>
    )
}
