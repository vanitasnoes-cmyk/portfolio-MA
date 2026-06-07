import { useState, useEffect, useCallback, useRef } from 'react';
import { Menu, X, GraduationCap, CheckSquare, Mail, Layers, FileText, ChevronRight, BookOpen, AlertTriangle, Eye, FileDown, LayoutGrid, Columns, Printer, ListTree, Moon, Sun } from 'lucide-react';
import stepEvidenceByProject from './data/step-evidence.json';
import { LESSON_STEPS } from './data/lesson-steps';
import { ProcessStepAccordion, getDefaultExpandedSteps } from './components/ProcessStepAccordion';
import { QuickNavDrawer } from './components/QuickNavDrawer';
import { PortfolioIntroMedia } from './components/PortfolioIntroMedia';
import { LessonMiniToc } from './components/LessonMiniToc';
import { CustomCursor } from './components/CustomCursor';
import { ScrollHighlightSection } from './components/ScrollHighlightSection';
import { Badge } from './components/ui/badge';
import { Button } from './components/ui/button';
import { Card, CardContent, CardFooter, CardTitle } from './components/ui/card';
import { cn } from './lib/utils';
import { RubricChecklist } from './components/RubricChecklist';
import { RubricProgressMap } from './components/RubricProgressMap';
import { LessonRubricSupplements } from './components/RubricSupplements';
import {
  parsePortfolioUrl,
  applyPortfolioUrl,
  getFullPortfolioUrl,
  PORTFOLIO_LESSON_HASH_RE,
  type PortfolioView,
} from './utils/portfolioUrl';

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [currentSection, setCurrentSection] = useState('gioi-thieu');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<PortfolioView>('gallery');
  const [quickNavOpen, setQuickNavOpen] = useState(false);
  const [urlSynced, setUrlSynced] = useState(false);
  const [deepLinkStep, setDeepLinkStep] = useState<number | null>(null);
  const [expandedSteps, setExpandedSteps] = useState<Set<number>>(new Set());
  const [linkCopied, setLinkCopied] = useState(false);
  /** Chỉ ghi #bai-N lên URL sau khi người dùng chọn bài (tránh nhảy section lúc mở trang) */
  const [urlLessonIndex, setUrlLessonIndex] = useState<number | null>(null);
  const scrollToLessonOnLoadRef = useRef(
    PORTFOLIO_LESSON_HASH_RE.test(window.location.hash),
  );

  // Dark mode — persisted in localStorage, class toggled on <html>
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  // Keyboard listener for Escape key to close lightbox modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedImage(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const resetDetailPaneScroll = () => {
    const pane = document.getElementById('dashboard-detail-pane');
    if (pane) pane.scrollTop = 0;
  };

  const scrollToDashboardSection = () => {
    const el = document.getElementById('dashboard-view-container') || document.getElementById('du-an');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Reset scroll pane when switching lessons or view mode
  useEffect(() => {
    resetDetailPaneScroll();
  }, [activeTab, viewMode]);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  // Track scrolling to set active menu highlight
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['gioi-thieu', 'du-an', 'tong-ket'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setCurrentSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#gioi-thieu', label: 'Lời Mở Đầu', id: 'gioi-thieu' },
    { href: '#du-an', label: 'Bài Tập Thực Hành', id: 'du-an' },
    { href: '#tong-ket', label: 'Tổng Kết & Suy Ngẫm', id: 'tong-ket' },
  ];

  // The 6 structural digital assignments from the rubric guidelines
  const portfolioProjects = [
    {
      id: 'bt1',
      coverImage: '/images/anh_1.jpg',
      label: 'Bài 1: Quản lý tệp tin & thư mục',
      fullName: 'Bài tập 1 — Thao tác cơ bản với tệp tin và thư mục (ThucHanh_DangMaiAnh)',
      objective: 'Làm quen với giao diện hệ điều hành Windows, thực hiện tạo, đổi tên, sao chép, di chuyển, xóa và khôi phục tệp tin và thư mục nhằm quản lý dữ liệu học tập khoa học.',
      process: 'Tạo thư mục chính ThucHanh_DangMaiAnh trên máy tính, thực hành tạo tệp GhiChu.txt, đổi tên thành GhiChuQuanTrong.txt, tạo thư mục con TaiLieu, sao chép và di chuyển tệp tin, xóa tệp và khôi phục từ Recycle Bin.',
      product: 'Thư mục học tập ThucHanh_DangMaiAnh chứa các tệp tin và thư mục con được tổ chức khoa học theo yêu cầu bài thực hành.',
      fileUrl: '/files/Bai_1_DangMaiAnh.pdf',
      fileName: 'Bai_1_DangMaiAnh.pdf',
      fileType: 'pdf',
      skills: ['Windows Explorer', 'Quản lý tệp tin', 'Tổ chức dữ liệu', 'Hệ điều hành'],
      images: ['/images/steps/bt1/01.jpg', '/images/steps/bt1/02.jpg'],
      imageDescriptions: [
        'Ảnh 1: Mở File Explorer và định vị không gian làm việc.',
        'Ảnh 2: Truy cập ổ đĩa/thư mục hệ thống để bắt đầu thực hành.'
      ],
      detailedSummary: 'Bài tập 1 giúp em củng cố các kỹ năng quản lý tệp tin và thư mục cơ bản trên hệ điều hành Windows. Việc tạo dựng thư mục mang tên mình (ThucHanh_DangMaiAnh) và thực hiện các thao tác tệp giúp em tổ chức và lưu trữ dữ liệu học tập một cách khoa học, chuyên nghiệp.'
    },
    {
      id: 'bt2',
      coverImage: '/images/anh_2.jpg',
      label: 'Bài 2: Đánh giá thông tin học thuật',
      fullName: 'Bài tập 2 — Tìm kiếm và đánh giá thông tin học thuật về AI trong Chẩn đoán hình ảnh Y tế',
      objective: 'Lựa chọn chủ đề khoa học thách thức "Ứng dụng Trí tuệ Nhân tạo (AI) trong Chẩn đoán Hình ảnh Y tế", xác định phạm vi tìm kiếm và đánh giá độ tin cậy của 10 nguồn tài liệu khác nhau.',
      process: 'Tìm kiếm các bài báo khoa học, báo cáo công nghiệp và sách chuyên khảo trên Google Scholar, PubMed, Cochrane Library. Đánh giá độ tin cậy dựa trên 5 tiêu chí: Uy tín tác giả, Nhà xuất bản/Tạp chí, Phương pháp nghiên cứu, Lượng trích dẫn và Tính cập nhật.',
      product: 'Báo cáo đánh giá chi tiết 10 nguồn tài liệu về AI trong Chẩn đoán hình ảnh y tế và danh mục tài liệu tham khảo chuẩn Harvard.',
      fileUrl: '/files/Bai_2_DangMaiAnh.pdf',
      fileName: 'Bai_2_DangMaiAnh.pdf',
      fileType: 'pdf',
      skills: ['Tra cứu PubMed', 'Đánh giá học thuật', 'CRAAP Criteria', 'AI trong Y tế'],
      images: [],
      imageDescriptions: [],
      detailedSummary: 'Bài tập 2 giúp em nâng cao tư duy phản biện và năng lực nghiên cứu y học số. Việc đánh giá chi tiết các công trình nghiên cứu về AI trong chẩn đoán hình ảnh giúp em nhận diện rõ ranh giới giữa lý thuyết công nghệ và thực tiễn lâm sàng, đồng thời biết cách sàng lọc những nguồn thông tin y khoa có độ tin cậy cao nhất.'
    },
    {
      id: 'bt3',
      coverImage: '/images/anh_3.jpg',
      label: 'Bài 3: Prompt Engineering tối ưu',
      fullName: 'Bài tập 3 — Kỹ năng Prompt Engineering trong tóm tắt, giải thích và thiết kế câu hỏi ôn tập y học',
      objective: 'Thử nghiệm và tối ưu hóa các kỹ năng viết prompt (Cơ bản, Cải tiến, Nâng cao) cho 3 tác vụ học tập phổ biến trong y khoa nhằm so sánh chất lượng đầu ra của AI.',
      process: 'Thiết kế 3 cấp độ prompt cho các tác vụ: Tóm tắt tài liệu học thuật, Giải thích khái niệm y học phức tạp và Tạo câu hỏi ôn tập lâm sàng. Áp dụng kỹ thuật CLEAR/CRAC, Role-playing, Few-shot và Chain-of-Thought trên Google Gemini để so sánh kết quả.',
      product: 'Bộ prompt y học tối ưu và bảng so sánh chi tiết chất lượng phản hồi của AI qua các cấp độ prompt.',
      fileUrl: '/files/Bai_3_DangMaiAnh.pdf',
      fileName: 'Bai_3_DangMaiAnh.pdf',
      fileType: 'pdf',
      skills: ['Prompt Engineering', 'CLEAR/CRAC', 'Few-shot Learning', 'Chain-of-Thought'],
      images: ['/images/steps/bt3/02.png', '/images/steps/bt3/03.png'],
      imageDescriptions: [
        'Ảnh 1: Thiết kế prompt nâng cao CLEAR/CRAC cho tác vụ y khoa trên Google Gemini.',
        'Ảnh 2: Bảng thử nghiệm và so sánh kết quả đầu ra của AI qua 3 phiên bản prompt.'
      ],
      detailedSummary: 'Bài tập 3 rèn luyện cho em kỹ năng tương tác hiệu quả với các mô hình ngôn ngữ lớn (GenAI). Việc thiết kế các prompt nâng cao giúp em khai thác AI như một trợ lý học tập đắc lực, biết cách đặt câu lệnh chính xác để thu về kiến thức y học có chiều sâu, rõ ràng và có tính ứng dụng cao.'
    },
    {
      id: 'bt4',
      coverImage: '/images/anh_4.jpg',
      label: 'Bài 4: Quản lý dự án & TikTok',
      fullName: 'Bài tập 4 — Thực hành công cụ hợp tác trực tuyến cho dự án sản xuất Video TikTok nhóm 21',
      objective: 'Ứng dụng bộ công cụ trực tuyến (Trello, Google Drive, Google Docs, Teams, Zalo) để điều phối dự án nhóm sản xuất video TikTok "Một ngày của sinh viên Y1 UMPVNU" và giải quyết các bài toán thực tế.',
      process: 'Tạo không gian làm việc Kanban trên Trello, thiết lập hệ dung thư mục phân cấp và quy tắc đặt tên file trên Google Drive, họp trao đổi qua Teams/Meet, chia sẻ tài nguyên thô để tránh vỡ nét video và quản lý khủng hoảng nhân sự trực tuyến.',
      product: 'Không gian làm việc Trello nhóm, thư mục tài nguyên chung trên Drive và báo cáo cá nhân về kỹ năng điều phối dự án trực tuyến.',
      fileUrl: '/files/Bai_4_DangMaiAnh.pdf',
      fileName: 'Bai_4_DangMaiAnh.pdf',
      fileType: 'pdf',
      skills: ['Kanban Trello', 'Cộng tác đám mây', 'TikTok Production', 'Quản lý dự án'],
      images: ['/images/steps/bt4/02.png', '/images/steps/bt4/03.png'],
      imageDescriptions: [
        'Ảnh 1: Thiết lập không gian Kanban Trello để theo dõi các đầu việc quay và dựng video.',
        'Ảnh 2: Tổ chức lưu trữ tài nguyên video thô và file âm thanh khoa học trên Google Drive.'
      ],
      detailedSummary: 'Bài tập 4 là cơ hội tuyệt vời để em thực hành vai trò điều phối và làm việc nhóm trong không gian số. Thông qua dự án sản xuất Vlog TikTok chân thực về sinh viên Y khoa năm nhất, em đã nắm vững cách tổ chức dữ liệu trực tuyến, quản trị tiến độ và giải quyết hiệu quả các rào cản kỹ thuật cũng như tương tác nhóm.'
    },
    {
      id: 'bt5',
      coverImage: '/images/anh_5.jpg',
      label: 'Bài 5: Sáng tạo nội dung truyền thông',
      fullName: 'Bài tập 5 — Sản xuất nội dung truyền thông Giải phẫu: Mẹo nhớ 206 chiếc xương',
      objective: 'Ứng dụng chuỗi công cụ AI tạo sinh (ChatGPT, Bing Image Creator, CapCut AI) để xây dựng kịch bản, tạo hình ảnh 3D và dựng video ngắn truyền thông kiến thức giải phẫu xương trên TikTok.',
      process: 'Sử dụng ChatGPT/Gemini xây dựng kịch bản video và viết caption chi tiết. Dùng Bing Image Creator tạo hình ảnh nhân vật sinh viên Y khoa 3D phong cách Pixar biểu cảm panic. Sử dụng CapCut dựng video 5 giây làm hook visual thu hút Gen Z.',
      product: 'Video ngắn 5 giây đăng tải TikTok và bài viết truyền thông kiến thức 206 chiếc xương y học.',
      fileUrl: '/files/Bai_5_DangMaiAnh.pdf',
      fileName: 'Bai_5_DangMaiAnh.pdf',
      fileType: 'pdf',
      skills: ['AI Content Creation', 'Bing Image Creator', 'CapCut Video Editor', 'Giải phẫu học'],
      images: ['/images/steps/bt5/02.png', '/images/steps/bt5/03.png'],
      imageDescriptions: [
        'Ảnh 1: Soạn kịch bản và caption giải phẫu hệ xương khớp với sự hỗ trợ của ChatGPT.',
        'Ảnh 2: Tạo ảnh sinh viên Y khoa 3D phong cách hoạt hình Pixar bằng Bing Image Creator.'
      ],
      detailedSummary: 'Bài tập 5 giúp em làm chủ quy trình phối hợp các công cụ AI để sản xuất nội dung số chất lượng cao. Việc chuyển đổi kiến thức Giải phẫu khô khan (206 tên xương) thành một video TikTok sinh động giúp em hiểu cách tiếp cận người học thời đại số, đồng thời nâng cao ý thức về bản quyền và tính chính xác y học.'
    },
    {
      id: 'bt6',
      coverImage: '/images/anh_6.jpg',
      label: 'Bài 6: AI có trách nhiệm trong Y khoa',
      fullName: 'Bài tập 6 — Sử dụng AI có trách nhiệm trong học tập và nghiên cứu học thuật',
      objective: 'Phân tích chính sách sử dụng AI (thang đánh giá AIAS của VinUniversity) và viết bài luận học thuật thảo luận về đạo đức AI nhằm đúc kết bộ nguyên tắc cá nhân.',
      process: 'Nghiên cứu tài liệu chính sách AI trong giáo dục đại học, dùng ChatGPT hỗ trợ lập dàn ý bài luận phân tích ranh giới giữa hỗ trợ hợp lý và gian lận học thuật, thực hiện hiệu đính thuật ngữ chuyên ngành và xây dựng Bộ 6 nguyên tắc cá nhân.',
      product: 'Bài luận học thuật về đạo đức sử dụng AI và Bộ 6 nguyên tắc cá nhân sử dụng AI có trách nhiệm.',
      fileUrl: '/files/Bai_6_DangMaiAnh.pdf',
      fileName: 'Bai_6_DangMaiAnh.pdf',
      fileType: 'pdf',
      skills: ['AI Ethics', 'Liêm chính học thuật', 'Fact-checking AI', 'Academic Writing'],
      images: ['/images/steps/bt6/02.png', '/images/steps/bt6/03.png'],
      imageDescriptions: [
        'Ảnh 1: Nghiên cứu thang đánh giá AIAS của VinUniversity làm căn cứ thảo luận bài luận.',
        'Ảnh 2: Lập dàn ý bài luận phân tích ranh giới đạo đức số bằng ChatGPT.'
      ],
      detailedSummary: 'Bài tập 6 định hình nền tảng đạo đức học thuật của em trong kỷ nguyên số. Qua việc phân tích ranh giới đạo đức khi dùng AI, em nhận thức rõ tầm quan trọng của việc giữ vai trò chủ động làm chủ công nghệ, luôn xác minh thông tin và duy trì tính liêm chính trong học thuật y khoa.'
    },
    {
      id: 'bt7',
      coverImage: '/images/anh_7.jpg',
      label: 'Bài 7: Quy trình Telemedicine vùng cao',
      fullName: 'Bài tập 7 — Thiết kế quy trình khám bệnh từ xa hỗ trợ bởi AI cho bệnh nhân tăng huyết áp miền núi',
      objective: 'Thiết kế quy trình Telemedicine tích hợp các giải pháp AI (Chatbot, IoT, AI Cloud, IBM Watson, EMR/EHR) nhằm quản lý và điều trị bệnh tăng huyết áp cho người dân vùng núi.',
      process: 'Xây dựng sơ đồ quy trình khám chữa bệnh từ xa 5 bước, phân tích vai trò của AI trong sàng lọc, thu thập chỉ số tự động, cảnh báo nguy cơ đột quỵ, đề xuất phác đồ lâm sàng cho bác sĩ và giải quyết thách thức hạ tầng vùng cao.',
      product: 'Báo cáo thiết kế quy trình Telemedicine hỗ trợ AI cho bệnh nhân tăng huyết áp tại vùng núi khó khăn.',
      fileUrl: '/files/Bai_7_DangMaiAnh.pdf',
      fileName: 'Bai_7_DangMaiAnh.pdf',
      fileType: 'pdf',
      skills: ['Telemedicine', 'AI Y tế', 'Thiết bị IoT', 'Quy trình lâm sàng'],
      images: ['/images/steps/bt7/02.png'],
      imageDescriptions: [
        'Ảnh 1: Sơ đồ quy trình khám bệnh từ xa 5 bước có tích hợp AI và thiết bị đo IoT.'
      ],
      detailedSummary: 'Bài tập 7 giúp em tối ưu hóa quy trình chăm sóc sức khỏe cộng đồng bằng công nghệ số. Việc thiết kế quy trình Telemedicine tích hợp AI cho thấy tiềm năng to lớn của y tế thông minh trong việc kết nối bác sĩ chuyên khoa với bệnh nhân vùng cao khó tiếp cận.'
    }
  ];

  const navigateToLesson = useCallback(
    (index: number, stepIndex: number | null = null) => {
      setActiveTab(index);
      setUrlLessonIndex(index);
      setViewMode('dashboard');
      setDeepLinkStep(stepIndex);
      setQuickNavOpen(false);
      setMenuOpen(false);
      setTimeout(() => scrollToDashboardSection(), 80);
    },
    [],
  );

  const handleSidebarProjectClick = (index: number) => {
    navigateToLesson(index);
  };

  useEffect(() => {
    const parsed = parsePortfolioUrl();
    if (parsed.lessonIndex != null) {
      setActiveTab(parsed.lessonIndex);
      setUrlLessonIndex(parsed.lessonIndex);
    }
    setViewMode(parsed.view);
    if (parsed.stepIndex != null) {
      setDeepLinkStep(parsed.stepIndex);
      setViewMode('dashboard');
    }
    setUrlSynced(true);
  }, []);

  useEffect(() => {
    const onPop = () => {
      const parsed = parsePortfolioUrl();
      if (parsed.lessonIndex != null) {
        setActiveTab(parsed.lessonIndex);
        setUrlLessonIndex(parsed.lessonIndex);
      } else {
        setUrlLessonIndex(null);
      }
      setViewMode(parsed.view);
      setDeepLinkStep(parsed.stepIndex);
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  useEffect(() => {
    if (!urlSynced) return;
    applyPortfolioUrl({
      lessonIndex: urlLessonIndex,
      view: viewMode,
      stepIndex: deepLinkStep,
    });
  }, [urlLessonIndex, viewMode, deepLinkStep, urlSynced]);

  useEffect(() => {
    if (!urlSynced || !scrollToLessonOnLoadRef.current) return;
    scrollToLessonOnLoadRef.current = false;
    if (urlLessonIndex != null && viewMode === 'dashboard') {
      setTimeout(() => scrollToDashboardSection(), 250);
    }
  }, [urlSynced, urlLessonIndex, viewMode]);

  useEffect(() => {
    const projectId = portfolioProjects[activeTab]?.id as keyof typeof stepEvidenceByProject;
    const stepImages = stepEvidenceByProject[projectId] ?? [];
    setExpandedSteps(getDefaultExpandedSteps(stepImages, deepLinkStep));
  }, [activeTab, deepLinkStep]);

  useEffect(() => {
    if (!urlSynced || deepLinkStep == null || viewMode !== 'dashboard') return;
    const t = window.setTimeout(() => {
      document.getElementById(`step-${deepLinkStep + 1}`)?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }, 450);
    return () => clearTimeout(t);
  }, [deepLinkStep, activeTab, viewMode, urlSynced]);

  const copyLessonLink = async () => {
    try {
      await navigator.clipboard.writeText(
        getFullPortfolioUrl(activeTab, viewMode, deepLinkStep),
      );
      setLinkCopied(true);
      window.setTimeout(() => setLinkCopied(false), 2500);
    } catch {
      /* clipboard blocked */
    }
  };

  const handleMainNavClick = (sectionId: string) => {
    setMenuOpen(false);
    if (sectionId === 'gioi-thieu' || sectionId === 'tong-ket' || sectionId === 'du-an') {
      setUrlLessonIndex(null);
      setDeepLinkStep(null);
    }
  };

  const jumpToStep = (stepIndex: number) => {
    setUrlLessonIndex((prev) => prev ?? activeTab);
    setDeepLinkStep(stepIndex);
    setExpandedSteps((prev) => new Set([...prev, stepIndex]));
    setQuickNavOpen(false);
    window.setTimeout(() => {
      document.getElementById(`step-${stepIndex + 1}`)?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }, 150);
  };

  const toggleProcessStep = (stepIndex: number) => {
    setExpandedSteps((prev) => {
      const next = new Set(prev);
      if (next.has(stepIndex)) next.delete(stepIndex);
      else next.add(stepIndex);
      return next;
    });
  };

  const getSelectedImageDescription = () => {
    if (!selectedImage) return '';
    const projectId = portfolioProjects[activeTab].id as keyof typeof stepEvidenceByProject;
    const evidence = stepEvidenceByProject[projectId] ?? [];
    
    let stepIndex = -1;
    let imgSubIndex = -1;
    for (let i = 0; i < evidence.length; i++) {
      const item = evidence[i];
      if (item === selectedImage) {
        stepIndex = i;
        break;
      } else if (Array.isArray(item)) {
        const idx = item.indexOf(selectedImage);
        if (idx !== -1) {
          stepIndex = i;
          imgSubIndex = idx;
          break;
        }
      }
    }
    
    if (stepIndex === -1) return '';
    
    const steps = LESSON_STEPS[activeTab] ?? [];
    const stepText = steps[stepIndex]?.text || '';
    const cleanText = stepText.replace(/^\d+\.\s*/, '');
    const subIndexStr = imgSubIndex !== -1 ? ` (Hình ảnh ${imgSubIndex + 1})` : '';
    return `Minh chứng bước ${stepIndex + 1}${subIndexStr}: ${cleanText}`;
  };

  const getBadgeStyleClass = (skillIndex: number) => {
    const classes = ['badge-blue', 'badge-purple', 'badge-violet', 'badge-purple', 'badge-blue', 'badge-emerald'];
    return `skill-badge ${classes[skillIndex % classes.length]}`;
  };

  const renderDetailedProcess = (tabIndex: number) => {
    const projectId = portfolioProjects[tabIndex].id as keyof typeof stepEvidenceByProject;
    const stepImages = stepEvidenceByProject[projectId] ?? [];
    const steps = LESSON_STEPS[tabIndex] ?? [];

    return (
      <div className="space-y-3 bg-violet-50/30 p-5 border border-violet-100/60 rounded-2xl print:bg-white print:border-slate-300">
        <p className="text-[10px] text-violet-600/70 font-semibold italic print:text-slate-700">
          Mở từng bước để xem mô tả chi tiết và minh chứng. Badge đánh dấu Prompt/AI, Human-in-the-loop và ảnh kết quả.
        </p>
        <ProcessStepAccordion
          lessonNumber={tabIndex + 1}
          steps={steps}
          stepImages={stepImages}
          expandedSteps={expandedSteps}
          onToggleStep={toggleProcessStep}
          onExpandStep={(idx) =>
            setExpandedSteps((prev) => new Set([...prev, idx]))
          }
          onImageClick={setSelectedImage}
        />
      </div>
    );
  };

  // ── 3-D Tilt Card effect: gentle perspective rotate on mouse-move ──
  const handleTiltMove = (e: React.MouseEvent<HTMLElement>) => {
    const card = e.currentTarget as HTMLElement;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotX = ((y - cy) / cy) * -8;   // max ±8deg
    const rotY = ((x - cx) / cx) * 8;
    card.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.02)`;
    card.style.transition = 'transform 0.08s linear, box-shadow 0.3s ease';
  };

  const handleTiltLeave = (e: React.MouseEvent<HTMLElement>) => {
    const card = e.currentTarget as HTMLElement;
    card.style.transform = '';
    card.style.transition = 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.4s ease';
  };

  return (
    <div className="flex min-h-screen gradient-bg-elegant text-[#5b21b6] relative overflow-hidden">
      {/* Custom interactive cursor — renders on top of everything */}
      <CustomCursor />
      {/* Fixed Background Image - Elegant, Lightweight & High Performance */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <img 
          src="/images/anh_6.jpg" 
          alt="Đặng Mai Anh - Background" 
          className="w-full h-full object-cover opacity-15 dark:opacity-8 filter saturate-50"
        />
        {/* Clean white overlay — blue-on-white theme */}
        <div className="absolute inset-0 bg-gradient-to-b from-violet-50/30 via-white/85 to-violet-50/20 dark:from-[#0a0413]/90 dark:via-[#0c0617]/95 dark:to-[#0a0413]/90" />
      </div>

      {/* 1. Desktop Persistent Left Sidebar Navigation */}
      <aside className="hidden xl:flex flex-col w-[280px] bg-white/95 dark:bg-[#140a24]/95 border-r-[2.5px] border-[#5b21b6]/20 dark:border-[#a78bfa]/20 h-screen sticky top-0 pt-8 pb-0 justify-between shrink-0 z-30 shadow-[6px_0_0_0_rgba(91, 33, 182, 0.06)] backdrop-blur-md">
        <div className="flex flex-col">
          {/* Sidebar Header Brand Logo */}
          <div className="px-6 pb-6 border-b-[2.5px] border-[#5b21b6]/15 dark:border-[#a78bfa]/15">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-8 h-8 rounded-xl bg-[#5b21b6] flex items-center justify-center text-white font-extrabold shadow-md shadow-violet-300/30">
                DS
              </span>
              <span className="text-[#5b21b6] dark:text-violet-200 text-base font-extrabold tracking-tight block font-sans">
                PORTFOLIO SỐ
              </span>
            </div>
            <span className="text-xs font-bold text-[#5b21b6] dark:text-violet-400 uppercase tracking-widest block pl-0.5">
              Đặng Mai Anh
            </span>
            <span className="text-[10px] text-[#5b21b6]/60 dark:text-violet-300/70 font-semibold block mt-1 pl-0.5">
              Sinh viên lớp VNU1001-E252027 • VNU-UMP
            </span>
          </div>

          {/* Sidebar Navigation Tree */}
          <nav className="mt-6 flex flex-col gap-1 px-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => handleMainNavClick(link.id)}
                className={`sidebar-link flex items-center gap-3 px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all dark:text-violet-200 dark:hover:text-white ${
                  currentSection === link.id ? 'active dark:!text-violet-300 dark:!bg-violet-950/60 dark:!border-blue-400' : ''
                }`}
              >
                {link.id === 'gioi-thieu' && <GraduationCap className="w-4.5 h-4.5 text-[#5b21b6] dark:text-violet-400" />}
                {link.id === 'du-an' && <FileText className="w-4.5 h-4.5 text-[#5b21b6] dark:text-violet-400" />}
                {link.id === 'tong-ket' && <BookOpen className="w-4.5 h-4.5 text-[#5b21b6] dark:text-violet-400" />}
                {link.label}
              </a>
            ))}

            {/* Nested Project Structure inside sidebar */}
            <div className="mt-4 pl-3 border-l-2 border-[#ede9fe] dark:border-violet-900/50 ml-6 flex flex-col gap-1.5">
              <span className="text-[9px] uppercase font-bold tracking-widest text-[#5b21b6]/40 dark:text-violet-400/60 block py-1 px-2">
                Bài tập thực hành
              </span>
              {portfolioProjects.map((proj, idx) => (
                <button
                  key={proj.id}
                  onClick={() => handleSidebarProjectClick(idx)}
                  className={`text-left text-xs font-semibold py-2 px-2.5 rounded-lg transition-all ${
                    activeTab === idx 
                    ? 'text-[#5b21b6] dark:text-violet-200 bg-[#ede9fe]/50 dark:bg-violet-950/60 font-extrabold border-r-2 border-[#5b21b6] shadow-sm' 
                    : 'text-[#5b21b6]/60 dark:text-violet-400 hover:text-[#5b21b6] dark:hover:text-violet-200 hover:bg-[#f5f3ff] dark:hover:bg-violet-900/30'
                  }`}
                >
                  Bài {idx + 1}: {proj.label.split(':')[1]?.trim() || proj.label}
                </button>
              ))}
            </div>
          </nav>
        </div>

        {/* Sidebar Footer Details */}
        <div className="w-full px-6 py-5 border-t border-[#5b21b6]/15 dark:border-violet-900/50 text-[11px] text-[#5b21b6]/60 dark:text-violet-400 space-y-2 bg-[#f5f3ff]/25 dark:bg-violet-950/10 mt-auto">
          <p className="font-extrabold text-[#5b21b6] dark:text-violet-300 tracking-wide uppercase text-[9px]">Liên hệ hỗ trợ:</p>
          <div className="flex items-center gap-2 text-[#5b21b6] dark:text-violet-300">
            <Mail className="w-3.5 h-3.5 text-[#5b21b6] shrink-0" />
            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=25100229@vnu.edu.vn" target="_blank" rel="noopener noreferrer" className="truncate font-bold text-[#5b21b6] dark:text-violet-400 hover:underline">
              25100229@vnu.edu.vn
            </a>
          </div>
        </div>
      </aside>

      {/* Main Right Scrollable Layout */}
      <div className="flex-1 min-w-0 flex flex-col relative z-10">
        {/* 2. Top Navigation Bar */}
        <header className="sticky top-0 z-40 bg-white/92 dark:bg-[#140a24]/95 backdrop-blur-md border-b-[2.5px] border-[#5b21b6]/15 dark:border-[#a78bfa]/15 px-4 sm:px-6 py-4 flex items-center justify-between xl:justify-end">
          <div className="flex items-center gap-2 xl:hidden">
            <span className="w-7 h-7 rounded-lg bg-[#5b21b6] flex items-center justify-center text-white font-extrabold text-xs shadow-md shadow-violet-300/20">
              DS
            </span>
            <span className="text-[#5b21b6] dark:text-violet-200 font-extrabold text-sm sm:text-base tracking-tight font-sans">
              PORTFOLIO • Đặng Mai Anh
            </span>
          </div>

          {/* Top menu for screens < 1280px */}
          <div className="hidden lg:flex xl:hidden items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => handleMainNavClick(link.id)}
                className={`nav-top-link text-xs sm:text-sm font-bold py-1 transition-all ${
                  currentSection === link.id ? 'active' : ''
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => window.open('https://mail.google.com/mail/?view=cm&fs=1&to=25100229@vnu.edu.vn', '_blank')}
              className="hidden sm:flex rounded-xl text-xs active:scale-95"
            >
              <Mail className="w-3.5 h-3.5" /> Gửi VNU Gmail
            </button>

            {/* Dark mode toggle */}
            <button
              onClick={() => setDarkMode((v) => !v)}
              className="flex items-center justify-center w-9 h-9 rounded-xl bg-[#f5f3ff] dark:bg-violet-900/60 text-[#5b21b6] dark:text-violet-300 hover:bg-[#ede9fe] dark:hover:bg-violet-900 transition-colors cursor-pointer"
              aria-label={darkMode ? 'Chuyển sang giao diện sáng' : 'Chuyển sang giao diện tối'}
              title={darkMode ? 'Giao diện sáng' : 'Giao diện tối'}
            >
              {darkMode ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5" />}
            </button>

            {/* Mobile Hamburger menu toggle */}
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="xl:hidden flex items-center justify-center w-9 h-9 rounded-xl bg-[#f5f3ff] dark:bg-violet-900/60 text-[#5b21b6] dark:text-violet-200 hover:bg-[#ede9fe] dark:hover:bg-violet-900 transition-colors cursor-pointer"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            >
              {menuOpen ? <X className="w-4.5 h-4.5" /> : <Menu className="w-4.5 h-4.5" />}
            </button>
          </div>
        </header>

        {/* Mobile menu drawer overlay */}
        {menuOpen && (
          <div
            className="xl:hidden fixed inset-0 z-40 bg-[#5b21b6]/50 backdrop-blur-sm transition-opacity duration-300"
            onClick={() => setMenuOpen(false)}
          />
        )}

        {/* Mobile menu drawer */}
        <div
          className={`xl:hidden fixed top-0 right-0 bottom-0 z-50 w-[80%] max-w-xs bg-white dark:bg-[#140a24] shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            menuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex flex-col h-full pt-16 px-6 pb-6">
            <div className="flex items-center justify-between pb-4 border-b-2 border-[#ede9fe] dark:border-violet-900">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-[#5b21b6] flex items-center justify-center text-white font-extrabold text-xs shadow-md">
                  DS
                </span>
                <span className="text-[#5b21b6] dark:text-violet-200 font-extrabold text-sm">PORTFOLIO</span>
              </div>
              <button 
                onClick={() => setMenuOpen(false)} 
                className="w-8 h-8 rounded-full bg-[#f5f3ff] dark:bg-violet-900/60 flex items-center justify-center text-[#5b21b6] dark:text-violet-300"
              >
                <X className="w-4.5 h-4.5" />
              </button>
            </div>
            
            <nav className="mt-6 flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => handleMainNavClick(link.id)}
                  className={`text-sm font-bold text-[#5b21b6] dark:text-violet-200 py-3 border-b border-[#ede9fe]/60 dark:border-violet-900/50 flex items-center gap-2 ${
                    currentSection === link.id ? 'text-[#5b21b6] dark:text-violet-400 border-b-2 border-[#5b21b6]/40' : ''
                  }`}
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-3 mt-2 border-t-2 border-[#ede9fe]/40">
                <span className="text-[9px] font-black uppercase tracking-widest text-[#5b21b6]/50 dark:text-sky-500 block mb-2 px-1">
                  7 bài tập
                </span>
                {portfolioProjects.map((proj, idx) => (
                  <button
                    key={proj.id}
                    type="button"
                    onClick={() => navigateToLesson(idx)}
                    className={`w-full text-left text-xs font-bold py-2.5 px-2 rounded-lg mb-1 cursor-pointer ${
                      activeTab === idx ? 'bg-[#f5f3ff] dark:bg-violet-950/60 text-[#5b21b6] dark:text-violet-300' : 'text-[#5b21b6]/70 dark:text-violet-300 hover:bg-[#f5f3ff] dark:hover:bg-violet-900/40'
                    }`}
                  >
                    #bai-{idx + 1} · {proj.label.split(':')[0]}
                  </button>
                ))}
              </div>
            </nav>

            <div className="mt-auto pt-6 border-t-2 border-[#ede9fe]/40 dark:border-violet-900 text-xs text-[#5b21b6]/60 dark:text-violet-400 space-y-2 bg-[#f5f3ff]/20 dark:bg-violet-950/20 p-4 rounded-xl">
              <p className="font-extrabold text-[#5b21b6] dark:text-violet-300 text-xs uppercase tracking-wide">Đặng Mai Anh</p>
              <p className="font-semibold text-[#5b21b6] dark:text-violet-300">Trường Đại học Y Dược, ĐHQGHN</p>
              <p className="text-[#5b21b6] dark:text-violet-400 font-bold truncate">Gmail: 25100229@vnu.edu.vn</p>
            </div>
          </div>
        </div>

        {/* 3. Header Banner */}
        <section className="relative h-[260px] sm:h-[320px] md:h-[360px] w-full overflow-hidden flex items-center justify-center dark-gradient-banner">
          {/* Static nature background inside header banner */}
          <img 
            src="/images/anh_6.jpg" 
            alt="Đặng Mai Anh - VNU University of Medicine and Pharmacy" 
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          {/* Deep blue semi-transparent banner overlay */}
          <div className="absolute inset-0 bg-[#5b21b6]/70 z-10" />

          {/* Banner Contents */}
          <div className="relative z-20 text-center px-4 sm:px-6 max-w-4xl">
            <p className="text-[#ede9fe] text-[13px] sm:text-[16px] md:text-[18px] font-bold tracking-widest uppercase drop-shadow-md font-sans">
              Hành trình trải nghiệm và áp dụng kĩ năng số.
            </p>
            
            {/* The main title */}
            <h1 className="banner-name text-white mt-3 drop-shadow-lg tracking-tight text-center">
              Đặng Mai Anh
            </h1>

            <p className="text-[#ede9fe] text-xs sm:text-sm md:text-base mt-3 max-w-2xl mx-auto font-semibold drop-shadow-sm">
              Sinh viên lớp VNU1001-E252027 • VNU University of Medicine and Pharmacy
            </p>

            {/* Highlight Accent Line below title */}
            <div className="mt-5 bg-[#ede9fe] h-2 w-32 mx-auto rounded-none shadow-lg shadow-violet-300/30" />
          </div>
        </section>

        {/* 4. Page: Lời mở đầu (Giới thiệu) */}
        <section id="gioi-thieu" className="py-16 sm:py-20 px-6 sm:px-10 md:px-16 max-w-5xl mx-auto w-full relative">
          <div className="text-center mb-12">
            <h3 className="academic-section-title uppercase">
              Lời Mở Đầu
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start relative z-10">
            {/* Left side: Profile Card */}
            <div className="md:col-span-4">
              <PortfolioIntroMedia />
            </div>

            {/* Right side: Welcome & Goals */}
            <div className="md:col-span-8 space-y-6">
              {/* Welcome Card — scroll highlight */}
              <ScrollHighlightSection defaultActive={true} className="glass-panel dark:bg-[#140a24]/80 p-6 sm:p-8 rounded-3xl space-y-4">
                <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed text-justify font-medium">
                  Sự bùng nổ của trí tuệ nhân tạo và các công nghệ số hiện đại đang tái định hình sâu sắc <strong className="text-[#5b21b6] dark:text-white">nền y học lâm sàng</strong>, mở ra những phương thức tiếp cận đột phá trong việc tối ưu hóa hiệu quả chẩn đoán và chăm sóc sức khỏe. Là một sinh viên Y khoa thuộc Trường Đại học Y Dược – Đại học Quốc gia Hà Nội, tôi nhận thức rõ ràng rằng <strong className="text-[#5b21b6] dark:text-white">năng lực làm chủ công nghệ</strong> không còn là một kỹ năng bổ trợ mà đã trở thành yêu cầu bắt buộc đối với người thầy thuốc trong kỷ nguyên mới.
                </p>
                <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed text-justify font-medium">
                  Tập hồ sơ năng lực này ghi lại một cách hệ thống hành trình rèn luyện, tư duy và phát triển bản thân qua chuỗi bài tập thực hành ứng dụng thực tế. Đi từ các kỹ năng quản trị dữ liệu số căn bản, phương thức điều phối dự án nhóm trực tuyến, cho đến tư duy thiết kế prompt nâng cao và xây dựng các giải pháp y tế số như sản xuất nội dung truyền thông Giải phẫu, thiết lập mô hình Telemedicine hỗ trợ bởi AI, toàn bộ nội dung sẽ minh chứng cho khả năng <strong className="text-[#5b21b6] dark:text-white">kết hợp hài hòa giữa kiến thức y sinh học lâm sàng và công nghệ tương tác hiện đại</strong>.
                </p>
              </ScrollHighlightSection>

              {/* Goal Card — scroll highlight */}
              <ScrollHighlightSection className="p-5 bg-[#f5f3ff] dark:bg-violet-950/40 border-2 border-[#ede9fe] dark:border-violet-900/30 rounded-2xl space-y-2">
                <span className="text-xs font-black text-[#5b21b6] dark:text-violet-300 uppercase tracking-widest block font-sans">
                  Mục Tiêu Portfolio
                </span>
                <p className="text-xs sm:text-sm text-[#5b21b6]/80 dark:text-violet-300 leading-relaxed font-semibold text-justify">
                  Hồ sơ năng lực được thiết lập nhằm hệ thống hóa một cách trực quan, khoa học toàn bộ các kỹ năng kỹ thuật, tư duy khai thác GenAI và năng lực quản lý dự án trực tuyến mà tôi đã tích lũy trong quá trình học tập. Thông qua việc chuẩn hóa quy trình làm việc và ứng dụng các công cụ phối hợp số, tôi hướng đến việc định hình một phong cách làm việc chuyên nghiệp, có tổ chức, đảm bảo tính <strong className="text-[#5b21b6] dark:text-white">bảo mật và minh bạch thông tin dữ liệu y tế</strong>. Đồng thời, đây là lời khẳng định cho tinh thần tự học chủ động, sự nhạy bén với các xu hướng đổi mới sáng tạo và cam kết thực hành nghiêm túc các chuẩn mực đạo đức, liêm chính học thuật trong việc ứng dụng công nghệ vào nghiên cứu khoa học sức khỏe.
                </p>
              </ScrollHighlightSection>
            </div>
          </div>

          {/* Academic Focus Cards & Portfolio Checklist centering under row 1 */}
          <div className="relative z-10 mt-8 space-y-6">
            {/* Row/Grid of Academic Focus Cards — tilt interaction */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Profile Card 1 */}
              <div
                className="glass-panel hover-lift rounded-2xl p-5 dark:bg-[#140a24]/70 shadow-sm flex flex-col justify-center items-center text-center gap-2.5 min-h-[180px]"
                onMouseMove={handleTiltMove}
                onMouseLeave={handleTiltLeave}
              >
                <div className="flex items-center gap-2 text-[#5b21b6] dark:text-violet-300 font-extrabold text-xs font-sans uppercase tracking-wide">
                  <GraduationCap className="w-4 h-4 text-[#5b21b6] dark:text-violet-400 shrink-0" />
                  Chuyên ngành
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed font-semibold">
                  <strong className="text-[#5b21b6] dark:text-white">Đặng Mai Anh</strong>, sinh viên thuộc khối ngành Y khoa, hệ thống thông tin (Lớp QH.2025.YE). Trường Đại học Y Dược, Đại học Quốc gia Hà Nội (VNU-UMP).
                </p>
              </div>

              {/* Profile Card 2 */}
              <div
                className="glass-panel hover-lift rounded-2xl p-5 dark:bg-[#140a24]/70 shadow-sm flex flex-col justify-center items-center text-center gap-2.5 min-h-[180px]"
                onMouseMove={handleTiltMove}
                onMouseLeave={handleTiltLeave}
              >
                <div className="flex items-center gap-2 text-[#5b21b6] dark:text-violet-300 font-extrabold text-xs font-sans uppercase tracking-wide">
                  <Layers className="w-4 h-4 text-[#5b21b6] dark:text-violet-400 shrink-0" />
                  Lĩnh vực quan tâm
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed font-semibold">
                  Định hướng học tập và nghiên cứu của tôi tập trung vào việc <strong className="text-[#5b21b6] dark:text-white">tích hợp Trí tuệ nhân tạo (AI) trong chẩn đoán hình ảnh y tế</strong> nhằm tối ưu hóa độ chính xác lâm sàng, đồng thời ứng dụng mô hình <strong className="text-[#5b21b6] dark:text-white">y tế từ xa (Telemedicine)</strong> kết hợp các thiết bị theo dõi thông minh để quản lý các bệnh lý mạn tính cho người dân tại vùng sâu, vùng xa. Bên cạnh đó, tôi đặc biệt đam mê nghiên cứu kỹ nghệ thiết kế prompt tối ưu hóa dữ liệu học thuật và khai thác AI tạo sinh phục vụ công tác truyền thông giáo dục sức khỏe cộng đồng.
                </p>
              </div>

              {/* Profile Card 3 */}
              <div
                className="glass-panel hover-lift rounded-2xl p-5 dark:bg-[#140a24]/70 shadow-sm flex flex-col justify-between"
                onMouseMove={handleTiltMove}
                onMouseLeave={handleTiltLeave}
              >
                <div className="flex items-center gap-2 text-[#5b21b6] dark:text-violet-300 font-extrabold text-xs mb-2 font-sans uppercase tracking-wide">
                  <CheckSquare className="w-4 h-4 text-[#5b21b6] dark:text-violet-400 shrink-0" />
                  Kỹ năng cốt lõi
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed font-semibold text-justify">
                  Tôi trang bị cho mình bộ kỹ năng toàn diện, cân bằng giữa năng lực kỹ thuật và kỹ năng điều phối, quản trị. Về mặt công nghệ, tôi sử dụng thành thạo hệ điều hành Windows trong tổ chức lưu trữ tệp tin chuyên môn, làm chủ các kỹ thuật <strong className="text-[#5b21b6] dark:text-white">Prompt nâng cao</strong> (bối cảnh, phân tầng nhiệm vụ, thiết lập ràng buộc) để khai thác hiệu quả các mô hình ngôn ngữ lớn, và vận dụng linh hoạt AI tạo ảnh/video ngắn trong sản xuất nội dung số. Về mặt quản lý, tôi có năng lực điều hành và quản trị khủng hoảng nhân sự dự án nhóm thông qua mô hình trực quan <strong className="text-[#5b21b6] dark:text-white">Trello</strong>, kết hợp đồng bộ tài liệu realtime trên đám mây và làm việc cộng tác từ xa hiệu quả.
                </p>
              </div>
            </div>

            {/* Portfolio Rubric Checklist */}
            <RubricChecklist variant="portfolio" />
          </div>
        </section>

        {/* 5. Page: Bài tập thực hành (Dự án) */}
        <section id="du-an" className="py-16 sm:py-20 px-4 sm:px-8 md:px-12 bg-transparent relative z-10">
          <div className="max-w-5xl mx-auto w-full">
            <div className="text-center mb-12">
              <h3 className="academic-section-title uppercase">
                Bài Tập Thực Hành
              </h3>
              <p className="text-xs sm:text-sm text-[#5b21b6]/70 dark:text-violet-300 max-w-2xl mx-auto mt-3 font-semibold font-sans">
                Hệ thống 7 bài tập lớn rèn luyện năng lực số chuẩn công nghệ số được thực hiện chi tiết theo quy trình nghiên cứu học thuật.
              </p>
            </div>

            {/* Rubric Progress Map (8 items) */}
            <div className="mb-8">
              <RubricProgressMap onGoToLesson={navigateToLesson} />
            </div>

            {/* View Mode Switcher */}
            <div className="flex justify-center mb-8">
              <div className="bg-white/90 dark:bg-[#140a24]/80 backdrop-blur-md p-1.5 rounded-xl border-2 border-[#ede9fe] dark:border-violet-900 inline-flex items-center gap-1.5 shadow-sm">
                <button
                  onClick={() => {
                    setViewMode('gallery');
                    setDeepLinkStep(null);
                  }}
                  className={cn(
                    'flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold transition-colors cursor-pointer',
                    viewMode === 'gallery'
                      ? 'bg-[#5b21b6] text-white shadow-sm'
                      : 'text-[#5b21b6] hover:text-[#7c3aed] hover:bg-[#f5f3ff] dark:text-violet-300 dark:hover:bg-violet-900/40',
                  )}
                >
                  <LayoutGrid className="w-4 h-4" />
                  Chế độ Gallery (Notion)
                </button>
                <button
                  onClick={() => {
                    setViewMode('dashboard');
                    setTimeout(() => scrollToDashboardSection(), 100);
                  }}
                  className={cn(
                    'flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold transition-colors cursor-pointer',
                    viewMode === 'dashboard'
                      ? 'bg-[#5b21b6] text-white shadow-sm'
                      : 'text-[#5b21b6] hover:text-[#7c3aed] hover:bg-[#f5f3ff] dark:text-violet-300 dark:hover:bg-violet-900/40',
                  )}
                >
                  <Columns className="w-4 h-4" />
                  Chế độ Dashboard (Phân tích)
                </button>
              </div>
            </div>

            {viewMode === 'gallery' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {portfolioProjects.map((proj, idx) => (
                  <Card
                    key={proj.id}
                    className="gallery-tilt-card hover-lift overflow-hidden flex flex-col justify-between h-full rounded-xl border-[#ede9fe] shadow-sm hover:border-[#5b21b6]/40 transition-all duration-300"
                    onMouseMove={handleTiltMove}
                    onMouseLeave={handleTiltLeave}
                  >
                    <div>
                      {/* Cover Image */}
                      <div className="h-44 w-full overflow-hidden bg-[#f5f3ff] relative group border-b border-[#ede9fe]/30">
                        <img
                          src={proj.coverImage}
                          alt={proj.label}
                          className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                        />
                        <div className="absolute top-3 left-3">
                          <span className="inline-flex items-center rounded-md border-2 border-[#5b21b6] bg-white px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wide text-[#5b21b6] shadow-sm">
                            Bài {idx + 1}
                          </span>
                        </div>
                      </div>

                      {/* Card Content */}
                      <CardContent className="pt-5 space-y-3">
                        <CardTitle className="text-[#5b21b6] dark:text-slate-100 line-clamp-2">
                          {proj.fullName}
                        </CardTitle>
                        
                        {/* Skills badges */}
                        <div className="flex flex-wrap gap-1">
                          {proj.skills.slice(0, 3).map((skill, sIdx) => (
                            <Badge key={sIdx} variant={sIdx % 2 === 0 ? 'default' : 'teal'} className="text-[9px] px-2 py-0.5">
                              {skill}
                            </Badge>
                          ))}
                          {proj.skills.length > 3 && (
                            <Badge variant="secondary" className="text-[9px] px-2 py-0.5">
                              +{proj.skills.length - 3}
                            </Badge>
                          )}
                        </div>

                        <ScrollHighlightSection threshold={0.15} rootMargin="-5% 0px -5% 0px">
                          <p className="text-slate-600 text-xs leading-relaxed text-justify line-clamp-3 font-semibold">
                            {proj.objective}
                          </p>
                        </ScrollHighlightSection>
                      </CardContent>
                    </div>

                    {/* Card Actions */}
                    <CardFooter className="px-5 pb-5 pt-3 border-t-2 border-[#ede9fe]/50 flex items-center justify-between gap-3 bg-[#f5f3ff]/30">
                      <Button
                        onClick={() => navigateToLesson(idx)}
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="px-2 text-xs text-[#5b21b6] hover:text-[#7c3aed]"
                        data-cursor-label="Xem"
                      >
                        <Eye className="w-3.5 h-3.5" /> Xem chi tiết
                      </Button>
                      
                      {proj.fileUrl && (
                        <a
                          href={proj.fileUrl}
                          download={proj.fileName}
                          className="text-[10px] uppercase font-bold text-[#5b21b6] hover:text-[#5b21b6] transition-colors flex items-center gap-1 font-sans"
                        >
                          <FileDown className="w-3.5 h-3.5" /> Tải báo cáo
                        </a>
                      )}
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div id="dashboard-view-container" className="scroll-mt-24 glass-panel rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row min-h-[580px]">
                {/* Left Selector Sidebar */}
                <div className="w-full md:w-[260px] bg-[#f5f3ff]/50 dark:bg-[#140a24]/60 border-r-2 border-[#ede9fe] dark:border-violet-900/40 flex flex-col shrink-0">
                  <div className="p-5 border-b-2 border-[#ede9fe] dark:border-violet-900/40 bg-[#f5f3ff]/60 dark:bg-[#140a24]/40">
                    <span className="text-xs font-black text-[#5b21b6] dark:text-violet-200 uppercase tracking-widest block font-sans">
                      Danh Sách Bài Học
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:flex md:flex-col p-3 gap-2">
                    {portfolioProjects.map((proj, idx) => (
                      <button
                        key={proj.id}
                        onClick={() => handleSidebarProjectClick(idx)}
                        className={cn('text-left w-full md:shrink flex items-center gap-3 px-3 py-3 rounded-lg text-xs font-bold transition-colors active:scale-[0.98]',
                          activeTab === idx
                            ? 'bg-[#5b21b6] text-white shadow-sm'
                            : 'text-[#5b21b6] hover:text-[#7c3aed] hover:bg-white bg-white/50 dark:bg-transparent dark:text-violet-300 dark:hover:bg-violet-900/30'
                        )}
                      >
                        <span className={`w-5.5 h-5.5 rounded-lg flex items-center justify-center text-[10px] font-extrabold shrink-0 ${
                          activeTab === idx ? 'bg-white text-[#5b21b6]' : 'bg-[#ede9fe] text-[#5b21b6]'
                        }`}>
                          {idx + 1}
                        </span>
                        <span className="truncate font-sans">{proj.label.split(':')[0]}</span>
                        <ChevronRight className={`w-4 h-4 ml-auto hidden md:block ${
                          activeTab === idx ? 'opacity-100' : 'opacity-30'
                        }`} />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Right Detail Pane */}
                <div 
                  id="dashboard-detail-pane"
                  className="flex-1 p-6 sm:p-8 md:p-10 flex flex-col justify-between bg-white dark:bg-[#08030f] relative md:max-h-[720px] overflow-y-auto custom-scrollbar"
                >
                  <div key={activeTab} id="lesson-print-area" className="space-y-6 animate-focus-zoom print:animate-none">
                    {/* Title of exercise */}
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 pb-4 border-b-2 border-[#ede9fe]/50">
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-[9px] uppercase font-black text-[#5b21b6] bg-[#f5f3ff] px-2.5 py-1 rounded-full tracking-widest font-sans border-2 border-[#ede9fe]">
                            Bài Tập Số {activeTab + 1}
                          </span>
                          <span className="text-[9px] uppercase font-black text-[#5b21b6] bg-violet-50 px-2.5 py-1 rounded-full tracking-widest font-sans border-2 border-[#ede9fe]">
                            Giáo Trình VNU-UMP
                          </span>
                          <span className="no-print text-[9px] font-mono text-slate-500 bg-slate-50 px-2 py-1 rounded-lg border border-slate-200/80">
                            #bai-{activeTab + 1}
                            {deepLinkStep != null ? `-step-${deepLinkStep + 1}` : ''}
                          </span>
                        </div>
                        <p className="text-[#5b21b6] dark:text-violet-100 text-xl sm:text-2xl font-black font-sans leading-tight">
                          {portfolioProjects[activeTab].fullName}
                        </p>
                      </div>
                      

                    </div>

                    <LessonMiniToc
                      lessonNumber={activeTab + 1}
                      steps={LESSON_STEPS[activeTab] ?? []}
                      onJumpToStep={jumpToStep}
                    />

                    {/* Core skills badges */}
                    {portfolioProjects[activeTab].skills && (
                      <div className="flex flex-wrap gap-2 pt-1 border-b-2 border-[#ede9fe]/40 pb-4">
                        {portfolioProjects[activeTab].skills.map((skill, skillIdx) => (
                          <span key={skillIdx} className={getBadgeStyleClass(skillIdx)}>
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Objective (Mục tiêu) */}
                    <div className="space-y-2">
                      <h5 className="text-[#5b21b6] text-xs sm:text-sm font-extrabold uppercase tracking-wider flex items-center gap-2 font-sans">
                        <span className="w-1.5 h-3 bg-[#5b21b6] rounded-none inline-block" />
                        Mục tiêu bài tập
                      </h5>
                      <ScrollHighlightSection threshold={0.2} rootMargin="-5% 0px -5% 0px">
                        <p className="text-slate-700 text-xs sm:text-sm leading-relaxed text-justify font-medium">
                          {portfolioProjects[activeTab].objective}
                        </p>
                      </ScrollHighlightSection>
                    </div>

                    {/* Detailed Summary */}
                    {portfolioProjects[activeTab].detailedSummary && (
                      <div className="space-y-2 bg-[#f5f3ff]/60 p-5 border-l-4 border-[#5b21b6] rounded-r-2xl">
                        <h5 className="text-[#5b21b6] text-xs sm:text-sm font-extrabold uppercase tracking-widest font-sans">
                          Tóm tắt quá trình thực hiện
                        </h5>
                        <ScrollHighlightSection threshold={0.2} rootMargin="-5% 0px -5% 0px">
                          <p className="text-slate-700 text-xs sm:text-sm leading-relaxed text-justify italic font-semibold">
                            "{portfolioProjects[activeTab].detailedSummary}"
                          </p>
                        </ScrollHighlightSection>
                      </div>
                    )}

                    {/* Implementation Process */}
                    <div className="space-y-2">
                      <h5 className="text-[#5b21b6] text-xs sm:text-sm font-extrabold uppercase tracking-wider flex items-center gap-2 font-sans">
                        <span className="w-1.5 h-3 bg-[#5b21b6] rounded-none inline-block" />
                        Quy trình thực hiện chi tiết
                      </h5>
                      {renderDetailedProcess(activeTab)}
                    </div>

                    {/* Rubric Supplements (for video embed in Bài 4 etc) */}
                    <div className="space-y-2 pt-4 border-t border-dashed border-slate-200/80 dark:border-slate-800/80">
                      <LessonRubricSupplements tabIndex={activeTab} />
                    </div>

                    {/* Rubric Checklist for current Lesson */}
                    <div className="space-y-2 pt-4 border-t border-dashed border-slate-200/80 dark:border-slate-800/80">
                      <RubricChecklist
                        variant="lesson"
                        lessonIndex={activeTab}
                        lessonLabel={portfolioProjects[activeTab].label}
                      />
                    </div>
                  </div>

                  {/* Previous & Next navigation */}
                  <div className="mt-8 pt-6 border-t-2 border-[#ede9fe]/40 flex items-center justify-between gap-4 w-full flex-wrap sm:flex-nowrap">
                    {activeTab > 0 ? (
                      <button
                        onClick={() => navigateToLesson(activeTab - 1)}
                        className="flex items-center gap-2 px-4 py-3.5 rounded-2xl bg-[#f5f3ff] hover:bg-[#ede9fe] text-[#5b21b6] font-bold text-xs transition-all border-2 border-[#ede9fe] cursor-pointer active:scale-95 text-left max-w-full sm:max-w-[48%] w-full sm:w-auto"
                      >
                        <ChevronRight className="w-4.5 h-4.5 rotate-180 shrink-0 text-[#5b21b6] animate-pulse" />
                        <div className="truncate">
                          <span className="text-[9px] uppercase block tracking-widest text-[#5b21b6]/50 font-black">Bài trước đó</span>
                          Bài {activeTab}: {portfolioProjects[activeTab - 1].label.split(':')[1]?.trim() || portfolioProjects[activeTab - 1].label}
                        </div>
                      </button>
                    ) : (
                      <div className="hidden sm:block" />
                    )}

                    {activeTab < 5 && (
                      <button
                        onClick={() => navigateToLesson(activeTab + 1)}
                        className="flex items-center gap-2 px-4 py-3.5 rounded-2xl bg-[#5b21b6] hover:bg-[#7c3aed] text-white font-bold text-xs transition-all border-2 border-[#5b21b6] cursor-pointer active:scale-95 text-left max-w-full sm:max-w-[48%] w-full sm:w-auto ml-auto shadow-md shadow-violet-300/30"
                      >
                        <div className="truncate flex-1">
                          <span className="text-[9px] uppercase block tracking-widest text-[#ede9fe] font-black">Bài tiếp theo</span>
                          Bài {activeTab + 2}: {portfolioProjects[activeTab + 1].label.split(':')[1]?.trim() || portfolioProjects[activeTab + 1].label}
                        </div>
                        <ChevronRight className="w-4.5 h-4.5 shrink-0 text-white/90 animate-pulse" />
                      </button>
                    )}
                  </div>

                  {/* Call-to-action details */}
                  <div className="mt-8 pt-6 border-t-2 border-[#ede9fe]/40 flex items-center justify-between flex-wrap gap-5 w-full">
                    <span className="text-[11px] text-[#5b21b6]/40 font-bold md:max-w-[40%] leading-relaxed">
                      * Mọi báo cáo và hình ảnh đều được trích dẫn trực tiếp từ sản phẩm gốc của sinh viên Đặng Mai Anh.
                    </span>
                    
                    <div className="no-print flex items-center gap-3 flex-wrap sm:flex-nowrap">
                      <button
                        type="button"
                        onClick={() => window.print()}
                        className="outline-button text-[#5b21b6] text-xs sm:text-sm font-bold px-5 py-3.5 rounded-xl transition-all inline-flex items-center gap-2 cursor-pointer"
                      >
                        <Printer className="w-4.5 h-4.5 text-[#5b21b6] shrink-0" />
                        In / Xuất PDF
                      </button>

                      {portfolioProjects[activeTab].fileUrl && (
                        <a
                          href={portfolioProjects[activeTab].fileUrl}
                          download={portfolioProjects[activeTab].fileName}
                          className="gradient-button text-white text-xs sm:text-sm font-bold px-6 py-3.5 rounded-xl transition-all inline-flex items-center gap-2 active:scale-95 cursor-pointer shadow-md"
                        >
                          <FileDown className="w-4.5 h-4.5 shrink-0" /> Tải xuống báo cáo (.{portfolioProjects[activeTab].fileType})
                        </a>
                      )}

                      <button
                        onClick={() =>
                          window.open(
                            `https://mail.google.com/mail/?view=cm&fs=1&to=25100229@vnu.edu.vn&su=Trao đổi về: ${portfolioProjects[activeTab].label}`,
                            '_blank'
                          )
                        }
                        className="outline-button text-[#5b21b6] text-xs sm:text-sm font-bold px-5 py-3.5 rounded-xl transition-all inline-flex items-center gap-2 cursor-pointer"
                      >
                        <Mail className="w-4.5 h-4.5 text-[#5b21b6] shrink-0" /> Liên hệ VNU Gmail
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* 6. Page: Tổng kết & Suy ngẫm */}
        <section id="tong-ket" className="py-16 sm:py-20 px-6 sm:px-10 md:px-16 max-w-5xl mx-auto w-full relative z-10">
          <div className="text-center mb-12">
            <h3 className="academic-section-title uppercase">
              Tổng Kết & Suy Ngẫm
            </h3>
            <p className="text-xs sm:text-sm text-[#5b21b6]/60 max-w-xl mx-auto mt-3 font-semibold font-sans">
              Đúc kết chặng đường rèn luyện và xây dựng tư duy "Nhà quản trị số" vững vàng.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
            {/* Column 1: Lessons per assignment */}
            <ScrollHighlightSection threshold={0.15} rootMargin="-5% 0px -5% 0px" className="glass-panel hover-lift rounded-2xl p-6 space-y-4 flex flex-col">
              <div className="flex items-center gap-3 text-[#5b21b6] dark:text-violet-200 font-extrabold text-sm border-b-2 border-[#ede9fe] dark:border-violet-900/40 pb-3 font-sans">
                <span className="w-8 h-8 rounded-xl bg-[#f5f3ff] dark:bg-violet-900/30 flex items-center justify-center shrink-0">
                  <BookOpen className="w-5 h-5 text-[#5b21b6] dark:text-violet-400" />
                </span>
                Kiến Thức Tích Luỹ
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed text-justify font-medium">
                Hành trình trải nghiệm thực chiến đã mang lại cho tôi nền tảng kiến thức đa chiều về mối <strong className="text-[#5b21b6] dark:text-white">giao thoa giữa y học và kỹ thuật số</strong>. Tôi nắm vững các nguyên lý căn bản về lưu trữ, phân quyền và bảo mật dữ liệu cục bộ trong môi trường số. Trên phương diện chuyên môn, tôi hiểu rõ cơ hội, thách thức và quy trình triển khai lâm sàng của thuật toán học sâu trong <strong className="text-[#5b21b6] dark:text-white">chẩn đoán hình ảnh (X-quang, CT, MRI)</strong>, đồng thời chuẩn hóa kiến thức về cấu trúc <strong className="text-[#5b21b6] dark:text-white">hệ thống Telemedicine</strong>, cơ chế hoạt động của trợ lý ảo AI hỗ trợ phục hồi chức năng và theo dõi tự động cho bệnh nhân tim mạch, tăng huyết áp mạn tính.
              </p>
            </ScrollHighlightSection>

            {/* Column 2: Self growth */}
            <ScrollHighlightSection threshold={0.15} rootMargin="-5% 0px -5% 0px" className="glass-panel hover-lift rounded-2xl p-6 space-y-4 flex flex-col justify-start">
              <div className="flex items-center gap-3 text-[#5b21b6] dark:text-violet-200 font-extrabold text-sm border-b-2 border-[#ede9fe] dark:border-violet-900/40 pb-3 font-sans">
                <span className="w-8 h-8 rounded-xl bg-[#f5f3ff] dark:bg-violet-900/30 flex items-center justify-center shrink-0">
                  <Layers className="w-5 h-5 text-[#5b21b6] dark:text-violet-400" />
                </span>
                Sự Phát Triển Bản Thân
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed text-justify font-medium">
                Sự trưởng thành lớn nhất của tôi qua chuỗi bài tập chính là việc dịch chuyển tư duy mạnh mẽ từ một người sử dụng công nghệ thụ động sang vai trò <strong className="text-[#5b21b6] dark:text-white">chủ động kiểm soát và điều hướng công nghệ</strong>. Thay vì phụ thuộc vào các công cụ trí tuệ nhân tạo, tôi áp dụng mô hình tương tác <strong className="text-[#5b21b6] dark:text-white">"Human-in-the-loop"</strong>, đặt AI vào vị trí trợ lý ngôn từ giúp giải phóng sức lao động ở khâu lên ý tưởng, tìm lỗi hoặc dựng khung thô, trong khi bản thân luôn giữ quyền thẩm định tối cao dựa trên bằng chứng khoa học và tư duy phản biện y khoa. Sự phát triển này còn gắn liền với việc tự xây dựng cho mình <strong className="text-[#5b21b6] dark:text-white">ý thức "đạo đức số" sắc bén</strong>, luôn tuân thủ nguyên tắc liêm chính học thuật, bảo mật dữ liệu và chịu trách nhiệm hoàn toàn đối với sản phẩm tri thức của mình.
              </p>
            </ScrollHighlightSection>

            {/* Column 3: Challenges & Resolution */}
            <ScrollHighlightSection threshold={0.15} rootMargin="-5% 0px -5% 0px" className="glass-panel hover-lift rounded-2xl p-6 space-y-4 flex flex-col justify-start">
              <div className="flex items-center gap-3 text-[#5b21b6] dark:text-violet-200 font-extrabold text-sm border-b-2 border-[#ede9fe] dark:border-violet-900/40 pb-3 font-sans">
                <span className="w-8 h-8 rounded-xl bg-[#f5f3ff] dark:bg-violet-900/30 flex items-center justify-center shrink-0">
                  <AlertTriangle className="w-5 h-5 text-[#5b21b6] dark:text-violet-400" />
                </span>
                Thách Thức & Giải Pháp
              </div>
              <div className="space-y-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
                <p className="text-justify">
                  Trong quá trình thực hiện chuỗi tác vụ, tôi đã chủ động vượt qua ba rào cản lớn nhờ những giải pháp mang tính hệ thống. Đầu tiên, để ngăn chặn hiện tượng <strong className="text-[#5b21b6] dark:text-white">ảo giác và nhiễu thông tin của AI</strong> dẫn đến sai lệch kiến thức y khoa, tôi áp dụng kỹ thuật prompt phân tầng nhiệm vụ kèm ràng buộc chặt chẽ, đồng thời bắt buộc kiểm chứng chéo kết quả với giáo trình chính thống và các cơ sở dữ liệu uy tín như PubMed, ISI hay Scopus.
                </p>
                <p className="text-justify">
                  Tiếp theo, nhằm giải quyết sự trì trệ và nguy cơ chậm tiến độ khi làm việc nhóm từ xa, tôi sử dụng giải pháp điều phối trực quan dựa trên minh chứng số công khai từ <strong className="text-[#5b21b6] dark:text-white">Trello và lịch sử chỉnh sửa trên Google Drive</strong> để nhắc nhở thành viên một cách minh bạch, thuyết phục mà không gây xung đột.
                </p>
                <p className="text-justify">
                  Cuối cùng, trước thách thức về hạ tầng Internet hạn chế tại vùng cao và rào cản <strong className="text-[#5b21b6] dark:text-white">tiếp cận Telemedicine của người cao tuổi</strong>, tôi đề xuất tích hợp tính năng lưu trữ dữ liệu ngoại tuyến để đồng bộ sau, tối giản hóa giao diện và xây dựng hệ thống video hướng dẫn bằng biểu tượng trực quan giúp người bệnh dễ dàng tương tác với trợ lý ảo phục hồi chức năng tại nhà.
                </p>
              </div>
            </ScrollHighlightSection>
          </div>

          {/* Summary Rubric Supplement removed */}

          {/* Summary Rubric Checklist */}
          <div className="mt-6">
            <RubricChecklist variant="summary" />
          </div>

          {/* Action row at bottom of conclusion */}
          <div className="mt-12 bg-[#5b21b6] text-white border-[2.5px] border-[#5b21b6] p-8 rounded-3xl shadow-xl shadow-violet-300/20 text-center space-y-4 relative overflow-hidden">
            {/* Background absolute glowing blob */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#ede9fe]/15 rounded-full blur-2xl animate-pulse" />
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-pulse" />

            <span className="text-[#ede9fe] text-xs font-black uppercase tracking-widest block font-sans">
              Nhà Quản trị Số VNU-UMP • Lộ Trình Phát Triển 2026
            </span>
            <p className="text-white/90 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed font-semibold">
              Trang bị tư duy công nghệ bền vững, kỹ năng cộng tác thông minh, sẵn sàng hành trang bước vào giai đoạn chuyển đổi số và quản trị số toàn diện.
            </p>
            <div className="pt-3 flex justify-center gap-4 flex-wrap sm:flex-nowrap relative z-10">
              <a
                href="#du-an"
                className="bg-white text-[#5b21b6] text-xs font-black px-6 py-3 rounded-none uppercase tracking-widest transition-all shadow-md hover:-translate-x-[2px] hover:-translate-y-[2px] border-[2.5px] border-white active:scale-95 font-sans"
                style={{boxShadow: '3px 3px 0px rgba(221, 214, 254, 0.6)'}}
              >
                Khám phá 7 Bài học số
              </a>
              <a
                href="#gioi-thieu"
                className="text-white hover:text-[#ede9fe] text-xs font-black py-3 px-6 rounded-none transition-all border-[2.5px] border-white/60 uppercase tracking-widest font-sans"
              >
                Quay lại đầu trang
              </a>
            </div>
          </div>
        </section>

        {/* 7. Academic Footer */}
        <footer className="bg-[#5b21b6] border-t-[2.5px] border-[#7c3aed] py-12 px-6 text-center text-white/80 relative z-10">
          <div className="max-w-5xl mx-auto space-y-4">
            <p className="text-sm font-black uppercase tracking-widest text-white font-sans">
              Đặng Mai Anh • Sinh viên Y Dược Tương Lai
            </p>
            <p className="text-xs text-[#ede9fe] font-semibold max-w-xl mx-auto font-sans">
              Sinh viên lớp VNU1001-E252027 • Trường Đại học Y Dược, Đại học Quốc gia Hà Nội
            </p>
            <p className="text-xs text-white/60 max-w-2xl mx-auto font-medium">
              VNU Gmail: <a href="https://mail.google.com/mail/?view=cm&fs=1&to=25100229@vnu.edu.vn" target="_blank" rel="noopener noreferrer" className="text-[#ede9fe] font-bold hover:underline">25100229@vnu.edu.vn</a> &nbsp;|&nbsp; Địa chỉ học tập: VNU-UMP, Cầu Giấy, Hà Nội
            </p>
            <div className="pt-6 text-[10px] text-white/40 border-t border-white/10 max-w-xs mx-auto font-bold font-sans">
              © 2026 Đặng Mai Anh. Light Violet Portfolio Edition.
            </div>
          </div>
        </footer>

        {/* 8. Quick Nav FAB */}
        <button
          type="button"
          onClick={() => setQuickNavOpen(true)}
          className="quick-nav-fab no-print fixed bottom-6 right-6 z-40 flex items-center gap-2 px-4 py-3 rounded-2xl bg-[#5b21b6] text-white text-xs font-black uppercase tracking-wide shadow-lg shadow-violet-400/40 border-[2.5px] border-[#7c3aed] hover:scale-105 hover:-translate-x-[2px] hover:-translate-y-[2px] active:scale-95 transition-all cursor-pointer"
          aria-label="Mở điều hướng nhanh"
          style={{boxShadow: '4px 4px 0px #7c3aed'}}
        >
          <ListTree className="w-4 h-4" />
          <span className="hidden sm:inline">Điều hướng</span>
        </button>

        {linkCopied && (
          <div
            className="no-print fixed bottom-24 right-6 z-50 bg-[#5b21b6] text-white text-xs font-bold px-4 py-2 rounded-xl shadow-lg border-[2.5px] border-[#7c3aed]"
            role="status"
          >
            Đã sao chép link bài tập
          </div>
        )}

        <QuickNavDrawer
          open={quickNavOpen}
          onClose={() => setQuickNavOpen(false)}
          navLinks={navLinks}
          currentSection={currentSection}
          portfolioProjects={portfolioProjects}
          activeTab={activeTab}
          viewMode={viewMode}
          stepTexts={(LESSON_STEPS[activeTab] ?? []).map((s) => s.text)}
          onSelectSection={(href) => {
            setMenuOpen(false);
            setQuickNavOpen(false);
            const sectionId = href.replace('#', '');
            handleMainNavClick(sectionId);
            window.location.hash = '';
            document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
          }}
          onSelectLesson={(idx) => navigateToLesson(idx)}
          onSelectView={(view) => {
            setViewMode(view);
            setDeepLinkStep(null);
            if (view === 'dashboard') setTimeout(() => scrollToDashboardSection(), 80);
          }}
          onJumpToStep={jumpToStep}
          onCopyLessonLink={copyLessonLink}
        />

        {selectedImage && (
          <div 
            className="fixed inset-0 z-50 bg-[#5b21b6]/95 backdrop-blur-md flex items-center justify-center p-4 transition-all duration-300"
            onClick={() => setSelectedImage(null)}
            role="dialog"
            aria-modal="true"
            aria-label="Xem ảnh minh chứng phóng to"
          >
            <button 
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 bg-white/15 hover:bg-white/25 text-white rounded-xl p-2.5 transition-colors focus:outline-none z-55 cursor-pointer border-2 border-white/20"
              aria-label="Close lightbox"
            >
              <X className="w-6 h-6" />
            </button>
            
            <div 
              className="relative max-w-4xl w-full max-h-[85vh] flex flex-col items-center gap-4 animate-in fade-in zoom-in-95 duration-200"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={selectedImage} 
                alt="Evidence Fullscreen View" 
                className="max-w-full max-h-[75vh] object-contain rounded-2xl shadow-2xl border-[2.5px] border-white/20 screenshot-img"
              />
              {(() => {
                const desc = getSelectedImageDescription();
                return desc ? (
                  <div className="bg-white/15 text-white text-xs sm:text-sm py-2.5 px-5 rounded-xl max-w-2xl text-center backdrop-blur-md shadow-md border border-white/20 font-semibold leading-relaxed">
                    {desc}
                  </div>
                ) : null;
              })()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
