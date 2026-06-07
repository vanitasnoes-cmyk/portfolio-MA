import { ChevronDown, ImageIcon, Sparkles, ShieldCheck } from 'lucide-react';
import { stepTitleFromText } from '../utils/portfolioUrl';

export type StepEvidence = string | string[] | null;

export interface ProcessStep {
  text: string;
}

function hasEvidence(evidence: StepEvidence): boolean {
  if (evidence == null) return false;
  return Array.isArray(evidence) ? evidence.length > 0 : true;
}

function getStepBadges(text: string, evidence: StepEvidence) {
  const badges: { key: string; label: string; className: string; icon: 'image' | 'ai' | 'hitl' }[] = [];

  if (hasEvidence(evidence)) {
    badges.push({
      key: 'evidence',
      label: 'Ảnh minh chứng',
      className: 'bg-emerald-50 text-emerald-800 border-emerald-200/80 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-900/30',
      icon: 'image',
    });
  }

  if (
    /prompt|gemini|perplexity|chain-of-thought|CLEAR|CRAC|few-shot|nano banana|canva|elicit|trello|zoom|google docs/i.test(
      text,
    )
  ) {
    badges.push({
      key: 'prompt',
      label: 'Prompt / Công cụ AI',
      className: 'bg-violet-50 text-violet-800 border-violet-200/80 dark:bg-violet-950/30 dark:text-violet-400 dark:border-violet-900/30',
      icon: 'ai',
    });
  }

  if (/kiểm chứng|hiệu đính|đối soát|ảo giác|thẩm định|rà soát|chỉnh sửa/i.test(text)) {
    badges.push({
      key: 'hitl',
      label: 'Human-in-the-loop',
      className: 'bg-amber-50 text-amber-900 border-amber-200/80 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-900/30',
      icon: 'hitl',
    });
  }

  return badges;
}

function BadgeIcon({ type }: { type: 'image' | 'ai' | 'hitl' }) {
  if (type === 'image') return <ImageIcon className="w-3 h-3 shrink-0" aria-hidden />;
  if (type === 'ai') return <Sparkles className="w-3 h-3 shrink-0" aria-hidden />;
  return <ShieldCheck className="w-3 h-3 shrink-0" aria-hidden />;
}

interface ProcessStepAccordionProps {
  lessonNumber: number;
  steps: ProcessStep[];
  stepImages: StepEvidence[];
  expandedSteps: Set<number>;
  onToggleStep: (index: number) => void;
  onExpandStep: (index: number) => void;
  onImageClick: (src: string) => void;
}

export function ProcessStepAccordion({
  lessonNumber,
  steps,
  stepImages,
  expandedSteps,
  onToggleStep,
  onExpandStep,
  onImageClick,
}: ProcessStepAccordionProps) {
  return (
    <div className="space-y-2">
      {steps.map((step, idx) => {
        const evidence = stepImages[idx] ?? null;
        const isOpen = expandedSteps.has(idx);
        const badges = getStepBadges(step.text, evidence);
        const urls = evidence == null ? [] : Array.isArray(evidence) ? evidence : [evidence];
        const stepNum = idx + 1;
        const title = stepTitleFromText(step.text);

        return (
          <div
            key={idx}
            id={`step-${stepNum}`}
            className="scroll-mt-28 rounded-xl border border-slate-100 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 shadow-xs overflow-hidden print:break-inside-avoid"
          >
            <button
              type="button"
              onClick={() => onToggleStep(idx)}
              className="w-full flex items-start gap-2 p-3.5 text-left hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors cursor-pointer"
              aria-expanded={isOpen}
              aria-controls={`step-panel-${lessonNumber}-${stepNum}`}
            >
              <span className="w-7 h-7 rounded-lg bg-violet-50 dark:bg-violet-950/50 text-violet-700 dark:text-violet-400 text-[11px] font-black flex items-center justify-center shrink-0 border border-violet-100/60 dark:border-violet-900/40">
                {stepNum}
              </span>
              <div className="flex-1 min-w-0 space-y-1.5">
                <span className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 leading-snug block">
                  {title}
                </span>
                {badges.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {badges.map((b) => (
                      <span
                        key={b.key}
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-wide border ${b.className}`}
                      >
                        <BadgeIcon type={b.icon} />
                        {b.label}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <ChevronDown
                className={`w-5 h-5 text-slate-400 dark:text-slate-500 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                aria-hidden
              />
            </button>

            {isOpen && (
              <div
                id={`step-panel-${lessonNumber}-${stepNum}`}
                className="px-3.5 pb-3.5 pt-0 border-t border-slate-50 dark:border-slate-800/60 space-y-2.5"
              >
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-semibold pl-9 whitespace-pre-line">
                  {step.text}
                </p>
                {lessonNumber === 3 && stepNum === 4 && (
                  <div className="pl-9 mt-3 overflow-x-auto rounded-xl border border-violet-100 dark:border-violet-900/40 bg-white dark:bg-slate-900/45 shadow-xs max-w-4xl">
                    <table className="w-full text-left text-[11px] font-sans border-collapse">
                      <thead>
                        <tr className="bg-violet-600 text-white font-extrabold uppercase tracking-wider text-[10px] border-b border-violet-700">
                          <th className="p-3 bg-violet-700 text-white font-black w-[20%] text-center">Tiêu chí</th>
                          <th className="p-3 text-center w-[26%]">Cơ Bản</th>
                          <th className="p-3 text-center w-[26%]">Cải Tiến</th>
                          <th className="p-3 text-center w-[28%]">Nâng Cao</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-violet-100/40 dark:divide-violet-900/30 text-slate-700 dark:text-slate-300 font-semibold text-justify">
                        <tr className="hover:bg-violet-50/20 dark:hover:bg-violet-950/20 transition-colors">
                          <td className="p-3 font-bold text-violet-900 dark:text-violet-400 bg-violet-50/10 align-middle text-center uppercase tracking-wider text-[10px]">Độ Chính Xác</td>
                          <td className="p-3 align-top leading-relaxed text-xs">Nội dung nhìn chung đúng yêu cầu nhưng có thể còn thiếu trọng tâm hoặc chưa làm rõ ý chính.</td>
                          <td className="p-3 align-top leading-relaxed text-xs">Nội dung đúng và bám sát yêu cầu hơn, đã thể hiện được các ý quan trọng.</td>
                          <td className="p-3 align-top leading-relaxed text-xs bg-violet-50/5">Nội dung chính xác cao, không chỉ đúng mà còn làm rõ bản chất và các ý trọng tâm.</td>
                        </tr>
                        <tr className="hover:bg-violet-50/20 dark:hover:bg-violet-950/20 transition-colors">
                          <td className="p-3 font-bold text-violet-900 dark:text-violet-400 bg-violet-50/10 align-middle text-center uppercase tracking-wider text-[10px]">Độ Đầy Đủ</td>
                          <td className="p-3 align-top leading-relaxed text-xs">Đáp ứng yêu cầu ở mức cơ bản nhưng có thể thiếu một số chi tiết quan trọng.</td>
                          <td className="p-3 align-top leading-relaxed text-xs">Đáp ứng khá đầy đủ yêu cầu, có bổ sung thêm thông tin cần thiết.</td>
                          <td className="p-3 align-top leading-relaxed text-xs bg-violet-50/5">Đáp ứng đầy đủ và toàn diện yêu cầu, ít hoặc không bỏ sót thông tin.</td>
                        </tr>
                        <tr className="hover:bg-violet-50/20 dark:hover:bg-violet-950/20 transition-colors">
                          <td className="p-3 font-bold text-violet-900 dark:text-violet-400 bg-violet-50/10 align-middle text-center uppercase tracking-wider text-[10px]">Cấu Trúc và Tính Mạch Lạc</td>
                          <td className="p-3 align-top leading-relaxed text-xs">Nội dung có logic nhưng còn tự phát.</td>
                          <td className="p-3 align-top leading-relaxed text-xs">Nội dung được sắp xếp hợp lý hơn, dễ theo dõi và hiểu.</td>
                          <td className="p-3 align-top leading-relaxed text-xs bg-violet-50/5">Nội dung được tổ chức chặt chẽ, rõ ràng, có cấu trúc logic cao.</td>
                        </tr>
                        <tr className="hover:bg-violet-50/20 dark:hover:bg-violet-950/20 transition-colors">
                          <td className="p-3 font-bold text-violet-900 dark:text-violet-400 bg-violet-50/10 align-middle text-center uppercase tracking-wider text-[10px]">Độ Sâu và Chất Lượng Phân Tích</td>
                          <td className="p-3 align-top leading-relaxed text-xs">Chủ yếu dừng ở mức mô tả hoặc liệt kê, ít phân tích.</td>
                          <td className="p-3 align-top leading-relaxed text-xs">Có yếu tố phân tích nhưng chưa thật sự sâu hoặc nhất quán.</td>
                          <td className="p-3 align-top leading-relaxed text-xs bg-violet-50/5">Thể hiện rõ khả năng phân tích, giải thích bản chất và có chiều sâu.</td>
                        </tr>
                        <tr className="hover:bg-violet-50/20 dark:hover:bg-violet-950/20 transition-colors">
                          <td className="p-3 font-bold text-violet-900 dark:text-violet-400 bg-violet-50/10 align-middle text-center uppercase tracking-wider text-[10px]">Sự Phù Hợp với Mục Tiêu</td>
                          <td className="p-3 align-top leading-relaxed text-xs">Phù hợp ở mức cơ bản, chủ yếu hỗ trợ người đã có nền tảng.</td>
                          <td className="p-3 align-top leading-relaxed text-xs">Phù hợp hơn với mục tiêu học tập, hỗ trợ hiểu nội dung tốt hơn.</td>
                          <td className="p-3 align-top leading-relaxed text-xs bg-violet-50/5">Rất phù hợp với mục tiêu học tập, có thể hỗ trợ cả người mới và nâng cao hiểu biết.</td>
                        </tr>
                        <tr className="hover:bg-violet-50/20 dark:hover:bg-violet-950/20 transition-colors">
                          <td className="p-3 font-bold text-violet-900 dark:text-violet-400 bg-violet-50/10 align-middle text-center uppercase tracking-wider text-[10px]">Khả Năng Kiểm Soát Đầu Ra</td>
                          <td className="p-3 align-top leading-relaxed text-xs">Ít hoặc không có kiểm soát, kết quả có thể không ổn định.</td>
                          <td className="p-3 align-top leading-relaxed text-xs">Có một số kiểm soát về nội dung và hình thức.</td>
                          <td className="p-3 align-top leading-relaxed text-xs bg-violet-50/5">Kiểm soát tốt đầu ra về nội dung, cấu trúc và định dạng.</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                )}
                {urls.length > 0 && (
                  <div className="pl-9 flex flex-col gap-2">
                    {urls.map((src, imgIdx) => (
                      <button
                        key={src}
                        type="button"
                        onClick={() => {
                          onExpandStep(idx);
                          onImageClick(src);
                        }}
                        className="text-left rounded-lg border border-slate-200/60 dark:border-slate-700/80 overflow-hidden cursor-zoom-in hover:opacity-95 hover:shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-400"
                      >
                        <img
                          src={src}
                          alt={`Bài ${lessonNumber} – Bước ${stepNum}: ${title}${urls.length > 1 ? ` (${imgIdx + 1})` : ''}`}
                          loading="lazy"
                          className="w-full max-w-lg object-contain bg-slate-50 dark:bg-slate-800 screenshot-img"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export function getDefaultExpandedSteps(
  stepImages: StepEvidence[],
  deepLinkStepIndex: number | null,
): Set<number> {
  const expanded = new Set<number>();
  stepImages.forEach((ev, i) => {
    if (hasEvidence(ev)) expanded.add(i);
  });
  if (deepLinkStepIndex != null && deepLinkStepIndex >= 0) {
    expanded.add(deepLinkStepIndex);
  }
  if (expanded.size === 0 && stepImages.length > 0) {
    expanded.add(0);
  }
  return expanded;
}
