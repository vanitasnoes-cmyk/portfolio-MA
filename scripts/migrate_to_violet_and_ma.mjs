import fs from 'fs';
import path from 'path';

const workspaceRoot = '.';
const srcDir = path.join(workspaceRoot, 'src');

// Define new portfolio projects array content for App.tsx
const newPortfolioProjects = `const portfolioProjects = [
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
  ];`;

// Text replacements for name, student ID, email, class, address, etc.
const textReplacements = [
  { from: /Trần Minh Lượng/g, to: 'Đặng Mai Anh' },
  { from: /TRẦN MINH LƯỢNG/g, to: 'ĐẶNG MAI ANH' },
  { from: /TRAN MINH LUONG/g, to: 'DANG MAI ANH' },
  { from: /TranMinhLuong/g, to: 'DangMaiAnh' },
  { from: /25100773/g, to: '25100229' },
  { from: /25100773@vnu\.edu\.vn/g, to: '25100229@vnu.edu.vn' },
  { from: /VNU1001-E252028/g, to: 'VNU1001-E252027' },
  { from: /VNU1001_E252028/g, to: 'VNU1001_E252027' },
  { from: /UMP.E8/g, to: 'UMP.E7' },
  { from: /avatar_luong\.jpg/g, to: 'avatar_ma.jpg' },
  { from: /Bai_1_TranMinhLuong\.pdf/g, to: 'Bai_1_DangMaiAnh.pdf' },
  { from: /Bai_2_TranMinhLuong\.pdf/g, to: 'Bai_2_DangMaiAnh.pdf' },
  { from: /Bai_3_TranMinhLuong\.pdf/g, to: 'Bai_3_DangMaiAnh.pdf' },
  { from: /Bai_4_TranMinhLuong\.pdf/g, to: 'Bai_4_DangMaiAnh.pdf' },
  { from: /Bai_5_TranMinhLuong\.pdf/g, to: 'Bai_5_DangMaiAnh.pdf' },
  { from: /Bai_6_TranMinhLuong\.pdf/g, to: 'Bai_6_DangMaiAnh.pdf' },
  { from: /Bai_7_TranMinhLuong\.pdf/g, to: 'Bai_7_DangMaiAnh.pdf' },
  { from: /Điều dưỡng/g, to: 'Y khoa' },
  { from: /Dieu duong/g, to: 'Y khoa' },
  { from: /dieu duong/g, to: 'y khoa' },
  { from: /VNU-UMP, VNU-UMP, Cầu Giấy, Hà Nội/g, to: 'VNU-UMP, Cầu Giấy, Hà Nội' },
];

// Color replacements: hex codes and rgba values for Light Violet theme
const colorReplacements = [
  // 1. Hex codes
  { from: /#1b365d/gi, to: '#5b21b6' }, // Navy Blue primary -> Violet-800
  { from: /#1e3a8a/gi, to: '#7c3aed' }, // Cobalt hover -> Violet-600
  { from: /#dbeafe/gi, to: '#ede9fe' }, // Light blue-100 -> Violet-100
  { from: /#fff5f9/gi, to: '#f5f3ff' }, // Soft pinkish white -> Violet-50
  { from: /#60a5fa/gi, to: '#a78bfa' }, // Soft blue text -> Violet-400
  { from: /#0b0f19/gi, to: '#0c0617' }, // Dark mode background 1 -> Violet-Black
  { from: /#090d16/gi, to: '#0a0413' }, // Dark mode background 2
  { from: /#071530/gi, to: '#140a24' }, // Dark mode card background
  { from: /#030d1a/gi, to: '#08030f' }, // Dark mode gradient start
  { from: /#172554/gi, to: '#2e1065' }, // Dark mode secondary accent (Violet-950)
  
  // 2. RGBA colors
  { from: /rgba\(37,\s*99,\s*235,\s*0\.08\)/gi, to: 'rgba(124, 58, 237, 0.08)' }, // blue-600 -> violet-600
  { from: /rgba\(59,\s*130,\s*246,\s*0\.09\)/gi, to: 'rgba(139, 92, 246, 0.09)' }, // blue-500 -> violet-500
  { from: /rgba\(37,\s*99,\s*235,\s*0\.16\)/gi, to: 'rgba(124, 58, 237, 0.16)' },
  { from: /rgba\(37,\s*99,\s*235,\s*0\.10\)/gi, to: 'rgba(124, 58, 237, 0.10)' },
  { from: /rgba\(37,\s*99,\s*235,\s*0\.07\)/gi, to: 'rgba(124, 58, 237, 0.07)' },
  { from: /rgba\(37,\s*99,\s*235,\s*0\.03\)/gi, to: 'rgba(124, 58, 237, 0.03)' },
  { from: /rgba\(37,\s*99,\s*235,\s*0\.28\)/gi, to: 'rgba(124, 58, 237, 0.28)' },
  { from: /rgba\(30,\s*64,\s*175,\s*0\.06\)/gi, to: 'rgba(91, 33, 182, 0.06)' }, // blue-800 -> violet-800
  { from: /rgba\(191,\s*219,\s*254,\s*0\.6\)/gi, to: 'rgba(221, 214, 254, 0.6)' }, // blue-200 -> violet-200
  { from: /rgba\(30,\s*58,\s*138/gi, to: 'rgba(91, 33, 182' },
  { from: /rgba\(219,\s*39,\s*119/gi, to: 'rgba(124, 58, 237' },
  
  // 3. Tailwind class names
  { from: /text-blue-100/g, to: 'text-violet-100' },
  { from: /text-blue-200/g, to: 'text-violet-200' },
  { from: /text-blue-300/g, to: 'text-violet-300' },
  { from: /text-blue-400/g, to: 'text-violet-400' },
  { from: /text-blue-500/g, to: 'text-violet-500' },
  { from: /text-blue-600/g, to: 'text-violet-600' },
  { from: /text-blue-700/g, to: 'text-violet-700' },
  { from: /text-blue-800/g, to: 'text-violet-800' },
  { from: /text-blue-900/g, to: 'text-violet-900' },
  { from: /bg-blue-50/g, to: 'bg-violet-50' },
  { from: /bg-blue-100/g, to: 'bg-violet-100' },
  { from: /bg-blue-200/g, to: 'bg-violet-200' },
  { from: /bg-blue-300/g, to: 'bg-violet-300' },
  { from: /bg-blue-400/g, to: 'bg-violet-400' },
  { from: /bg-blue-500/g, to: 'bg-violet-500' },
  { from: /bg-blue-600/g, to: 'bg-violet-600' },
  { from: /bg-blue-700/g, to: 'bg-violet-700' },
  { from: /bg-blue-800/g, to: 'bg-violet-800' },
  { from: /bg-blue-900/g, to: 'bg-violet-900' },
  { from: /bg-blue-950/g, to: 'bg-violet-950' },
  { from: /hover:bg-blue-950/g, to: 'hover:bg-violet-950' },
  { from: /border-blue-50/g, to: 'border-violet-50' },
  { from: /border-blue-100/g, to: 'border-violet-100' },
  { from: /border-blue-200/g, to: 'border-violet-200' },
  { from: /border-blue-900/g, to: 'border-violet-900' },
  { from: /dark:text-blue-200/g, to: 'dark:text-violet-200' },
  { from: /dark:text-blue-300/g, to: 'dark:text-violet-300' },
  { from: /dark:text-blue-400/g, to: 'dark:text-violet-400' },
  { from: /dark:bg-blue-950/g, to: 'dark:bg-violet-950' },
  
  // Indigo references
  { from: /text-indigo-100/g, to: 'text-violet-100' },
  { from: /border-indigo-100/g, to: 'border-violet-100' },
  
  // Gradients and highlights
  { from: /from-blue-50\/30/g, to: 'from-violet-50/30' },
  { from: /to-blue-50\/20/g, to: 'to-violet-50/20' },
  { from: /shadow-blue-300\/30/g, to: 'shadow-violet-300/30' },
  { from: /shadow-blue-300\/20/g, to: 'shadow-violet-300/20' },
  { from: /shadow-blue-400\/40/g, to: 'shadow-violet-400/40' },
  { from: /dark:from-\[#090d16\]/g, to: 'dark:from-[#0a0413]' },
  { from: /dark:via-\[#0b0f19\]/g, to: 'dark:via-[#0c0617]' },
  { from: /dark:to-\[#090d16\]/g, to: 'dark:to-[#0a0413]' },
  
  // Theme edition text
  { from: /Navy Blue Portfolio Edition/g, to: 'Light Violet Portfolio Edition' },
  { from: /Navy Blue/g, to: 'Light Violet' }
];

function scanAndMigrate(dir) {
  const list = fs.readdirSync(dir);
  for (const f of list) {
    const fullPath = path.join(dir, f);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      if (['node_modules', 'dist', '.git'].includes(f)) continue;
      scanAndMigrate(fullPath);
    } else {
      const ext = path.extname(f).toLowerCase();
      if (['.tsx', '.ts', '.css'].includes(ext)) {
        let content = fs.readFileSync(fullPath, 'utf8');
        let initialContent = content;
        
        // Skip files that we update completely or manually
        if (f === 'lesson-steps.ts' || f === 'group-deliverables.ts') {
          continue;
        }

        // Specifically for App.tsx, replace the portfolioProjects array
        if (f === 'App.tsx') {
          const regex = /const\s+portfolioProjects\s*=\s*\[[\s\S]*?\];/;
          if (regex.test(content)) {
            content = content.replace(regex, newPortfolioProjects);
            console.log('Replaced portfolioProjects array in App.tsx');
          } else {
            console.warn('Could not find portfolioProjects array in App.tsx using regex');
          }
          
          // Specially replace the specialty description block on line 759
          content = content.replace(
            /<strong className="text-\[#1b365d\] dark:text-white">Trần Minh Lượng<\/strong>, sinh viên thuộc khối ngành Điều dưỡng\s*, hệ thống thông tin \(Lớp VNU1001-E252028\)\. Trường Đại học Y Dược, Đại học Quốc gia Hà Nội \(VNU-UMP\)\./,
            `<strong className="text-[#5b21b6] dark:text-white">Đặng Mai Anh</strong>, sinh viên thuộc khối ngành Y khoa, hệ thống thông tin (Lớp VNU1001-E252027). Trường Đại học Y Dược, Đại học Quốc gia Hà Nội (VNU-UMP).`
          );
        }

        // Apply text info replacements
        for (const rep of textReplacements) {
          content = content.replace(rep.from, rep.to);
        }

        // Apply color replacements
        for (const rep of colorReplacements) {
          content = content.replace(rep.from, rep.to);
        }

        if (content !== initialContent) {
          fs.writeFileSync(fullPath, content);
          console.log(`Updated: ${fullPath}`);
        }
      }
    }
  }
}

// 1. Scan src directory
scanAndMigrate(srcDir);

// 2. Update index.html specifically
const htmlPath = path.join(workspaceRoot, 'index.html');
if (fs.existsSync(htmlPath)) {
  let content = fs.readFileSync(htmlPath, 'utf8');
  let initialContent = content;
  
  for (const rep of textReplacements) {
    content = content.replace(rep.from, rep.to);
  }
  
  // Update header text in index.html if any color name is present
  content = content.replace(/Navy Blue/g, 'Light Violet');

  if (content !== initialContent) {
    fs.writeFileSync(htmlPath, content);
    console.log(`Updated: ${htmlPath}`);
  }
}

console.log('Migration to Light Violet & Đặng Mai Anh completed successfully!');
