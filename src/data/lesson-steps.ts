/** Quy trình chi tiết từng bài — dùng cho accordion & điều hướng bước */
export interface LessonStep {
  text: string;
}

export const LESSON_STEPS: LessonStep[][] = [
  // ─── BÀI 1: Thao tác cơ bản với tệp tin và thư mục ───
  [
    { text: '1. Mở File Explorer: Nhấn tổ hợp phím Windows + E hoặc nhấp vào biểu tượng thư mục màu vàng trên thanh tác vụ.' },
    { text: '2. Truy cập ổ đĩa/thư mục: Ở cột bên trái, nhấp vào This PC. Sau đó nhấp đúp vào một ổ đĩa không phải ổ hệ thống (ví dụ: ổ D: hoặc E:). Nếu chỉ có ổ C:, hãy vào thư mục Documents.' },
    { text: '3. Tạo thư mục mới: Nhấp chuột phải vào một khoảng trống -> chọn New -> Folder. Đặt tên thư mục là ThucHanh_DangMaiAnh. Nhấn Enter.' },
    { text: '4. Vào thư mục vừa tạo: Nhấp đúp vào thư mục ThucHanh_DangMaiAnh.' },
    { text: '5. Tạo tệp tin văn bản: Nhấp chuột phải vào khoảng trống -> New -> Text Document. Đặt tên là GhiChu.txt. Nhấn Enter.' },
    { text: '6. Đổi tên tệp tin: Nhấp chuột phải vào tệp GhiChu.txt -> chọn Rename. Đổi tên thành GhiChuQuanTrong.txt. Nhấn Enter.' },
    { text: '7. Tạo thư mục con: Trong thư mục ThucHanh_DangMaiAnh. Nhấp chuột phải -> New -> Folder. Đặt tên là TaiLieu.' },
    { text: '8. Sao chép tệp tin (Copy & Paste): Nhấp chuột phải vào tệp GhiChuQuanTrong.txt -> chọn Copy (hoặc chọn tệp rồi nhấn Ctrl + C). Nhấp đúp vào thư mục TaiLieu. Nhấp chuột phải vào khoảng trống bên trong -> chọn Paste (hoặc nhấn Ctrl + V). Bây giờ bạn có một bản sao của tệp trong thư mục TaiLieu.' },
    { text: '9. Di chuyển tệp tin (Cut & Paste): Quay lại thư mục ThucHanh_DangMaiAnh. Tạo một tệp mới tên là DiChuyen.txt. Nhấp chuột phải vào tệp DiChuyen.txt -> chọn Cut (hoặc chọn tệp rồi nhấn Ctrl + X). Nhấp đúp vào thư mục TaiLieu. Nhấp chuột phải vào khoảng trống -> chọn Paste (hoặc nhấn Ctrl + V). Tệp gốc đã biến mất khỏi vị trí cũ và chỉ còn ở vị trí mới.' },
    { text: '10. Xóa tệp tin: Trong thư mục TaiLieu, nhấp chuột phải vào tệp GhiChuQuanTrong.txt -> chọn Delete. Tệp sẽ được chuyển vào thùng rác (Recycle Bin).' },
    { text: '11. Xóa vĩnh viễn: Chọn tệp DiChuyen.txt. Nhấn giữ phím Shift và nhấn phím Delete. Một cảnh báo sẽ hiện ra. Nếu đồng ý, tệp sẽ bị xóa vĩnh viễn mà không qua Thùng rác.' },
    { text: '12. Khôi phục từ Thùng rác (Tùy chọn): Tìm biểu tượng Recycle Bin trên màn hình nền, nhấp đúp để mở. Tìm tệp GhiChuQuanTrong.txt đã xóa, nhấp chuột phải vào nó và chọn Restore. Tệp sẽ quay trở lại vị trí ban đầu.' }
  ],

  // ─── BÀI 2: Đánh giá tài liệu nghiên cứu - AI trong Chẩn đoán Hình ảnh Y tế ───
  [
    { text: '1. Lý do lựa chọn chủ đề và tính thách thức: Lựa chọn chủ đề "Ứng dụng Trí tuệ Nhân tạo (AI) trong Chẩn đoán Hình ảnh Y tế: Cơ hội, Thách thức và Quy trình Triển khai Lâm sàng". Phân tích các rào cản liên ngành, an toàn người bệnh và tốc độ cập nhật công nghệ nhanh chóng.' },
    { text: '2. Xác định phạm vi tìm kiếm thông tin: Giới hạn thời gian từ năm 2018 đến 2026. Tìm kiếm các bài báo khoa học, báo cáo công nghệ và sách chuyên khảo trên Google Scholar, PubMed, Cochrane Library với các từ khóa CNN, GAN, hiện tượng "Hộp đen", rủi ro dữ liệu sai lệch.' },
    { text: '3. Tìm kiếm tài liệu chuyên ngành: Thu thập 10 nguồn tài liệu y sinh uy tín từ Diagnostics, Radiologia, Bioengineering, British Journal of Radiology, thông tin phê duyệt của FDA đối với phần mềm MIM Contour ProtégéAI của GE HealthCare, và Báo Tuổi Trẻ.' },
    { text: '4. Đánh giá độ tin cậy của nguồn thông tin: Thẩm định 10 nguồn thông tin dựa trên 5 tiêu chí: Uy tín tác giả, Cơ quan/Tạp chí xuất bản, Phương pháp nghiên cứu, Số lượng trích dẫn học thuật và Tính cập nhật của tài liệu.' },
    { text: '5. Kết luận & Tổng hợp lâm sàng: Qua bài tôi đã biết cách tìm tài liệu ở các nguồn uy tín đồng thời đánh giá độ uy tín của nguồn.' }
  ],

  // ─── BÀI 3: Kỹ năng Prompt Engineering trong Học tập y khoa ───
  [
    { text: '1. Lựa chọn ba tác vụ học tập y khoa phổ biến: Lựa chọn các tác vụ: Tóm tắt tài liệu học thuật y học dài phức tạp, Giải thích khái niệm sinh lý/y khoa khó hiểu cho các đối tượng khác nhau, và Thiết kế câu hỏi ôn tập lâm sàng tự đánh giá.' },
    { text: '2. Thiết kế các phiên bản prompt: Xây dựng 3 cấp độ prompt cho từng tác vụ: Cơ bản (Zero-shot, lệnh ngắn), Cải tiến (thêm ngữ cảnh, đối tượng sinh viên), và Nâng cao (áp dụng kỹ thuật đóng vai giáo sư, Few-shot Examples và Chain-of-Thought).' },
    { text: '3. Thử nghiệm trên mô hình AI tạo sinh: Chạy thử nghiệm các prompt trên Gemini/ChatGPT. Thu thập kết quả phản hồi của AI để so sánh tính cô đọng (Basic) -> có cấu trúc rõ ràng (Improved) -> chiều sâu học thuật kèm ẩn dụ sinh động (Advanced).' },
    { text: '4. Đánh giá và so sánh kết quả: Phân tích chất lượng đầu ra dựa trên các tiêu chí: Độ chính xác y học, Mức độ đầy đủ, Cấu trúc mạch lạc, Độ sâu phân tích, và Khả năng kiểm soát đầu ra (Controllability) của prompt.' },
    { text: '5. Tổng hợp nguyên tắc viết prompt tối ưu: Đúc kết 4 nguyên tắc vàng trong thiết kế prompt y học: Gán vai trò (Persona), Bối cảnh & Mục tiêu (Context), Phân tầng nhiệm vụ (Task Decomposition), và Các ràng buộc/định dạng đầu ra cụ thể.' }
  ],

  // ─── BÀI 4: Thực hành công cụ hợp tác trực tuyến - Video TikTok Nhóm 21 ───
  [
    { text: '1. Lựa chọn và thiết lập công cụ: Thống nhất sử dụng Microsoft Teams để họp thảo luận, Trello (Kanban) quản trị dự án, Google Drive lưu trữ và chia sẻ tài nguyên video thô, Zalo giao tiếp nhanh cho dự án Nhóm 21.' },
    { text: '2. Lên kế hoạch sản xuất Video TikTok: Xây dựng dự án sản xuất video "Một ngày của sinh viên Y1 UMPVNU" nhằm mô tả cuộc sống tân binh trường Y áp lực Giải phẫu, Xác suất thống kê qua lăng kính vlogs TikTok 9:16.' },
    { text: '3. Thực hiện vai trò cá nhân: Đảm nhận vị trí biên kịch, diễn viên, quay phim và Editor. Phân công mỗi thành viên trong nhóm tự sản xuất và chỉnh sửa một video vlogs cá nhân của mình.' },
    { text: '4. Tổ chức tài nguyên và giải quyết rào cản Drive: Thiết lập cấu trúc thư mục Google Drive nhóm khoa học ([01_Canh_Giang_Duong], [02_Canh_Tu_Hoc]...). Ban hành quy định đẩy file video thô lên Drive để tránh thuật toán nén làm vỡ nét video.' },
    { text: '5. Quản trị xung đột trực tuyến và kết luận: Giải quyết hiệu quả sự thiếu hụt tương tác của thành viên thông qua các minh chứng số (lịch sử cập nhật Trello/Drive), đúc kết kỹ năng điều phối khủng hoảng nhân sự trên không gian ảo.' }
  ],

  // ─── BÀI 5: Sáng tạo nội dung số với AI - Mẹo nhớ 206 chiếc xương Giải phẫu ───
  [
    { text: '1. Đề tài truyền thông y học số: Lựa chọn đề tài sản xuất video ngắn TikTok: "Cách nhớ nhanh và có hệ thống tên 206 chiếc xương" nhằm giải quyết khó khăn Giải phẫu hệ xương khớp của sinh viên y khoa năm nhất.' },
    { text: '2. Lên kịch bản nội dung bằng AI tạo chữ: Sử dụng Gemini và ChatGPT với prompt chi tiết để lên cấu trúc kịch bản video TikTok 5 giây (hook visual sinh viên panic) và soạn phần caption chi tiết bẻ nhỏ kiến thức Giải phẫu dễ nhớ.' },
    { text: '3. Tạo ảnh nhân vật 3D bằng Bing Image Creator: Soạn prompt mô tả chi tiết nhân vật sinh viên Y khoa 3D phong cách Pixar, đang panic ôm đầu bên đống giáo trình Giải phẫu để làm mồi nhử thị giác (Hook) thu hút Gen Z.' },
    { text: '4. Biên tập video trên CapCut AI: Sử dụng template video CapCut, can thiệp bóc tách các lớp layer bị lỗi, xóa bỏ chữ rác của template, và điều chỉnh video đúng thời lượng vàng 5 giây để tối ưu thuật toán TikTok.' },
    { text: '5. Đánh giá vai trò của AI tạo sinh: Nhận định AI là trợ lý đắc lực giúp giải phóng sức lao động, nâng cao hiệu suất thiết kế video truyền thông và giải quyết triệt để vấn đề bản quyền hình ảnh y khoa.' },
    { text: '6. Trách nhiệm chuyên môn và đạo đức: Thực hiện kiểm chứng tính chính xác của tên các xương y khoa trong kịch bản và caption, tự chịu trách nhiệm chuyên môn cuối cùng đối với sản phẩm số truyền thông sức khỏe.' }
  ],

  // ─── BÀI 6: Sử dụng AI có trách nhiệm trong học tập và nghiên cứu ───
  [
    { text: '1. Nghiên cứu chính sách AI của VinUniversity: Tìm hiểu Guidelines của VinUni về việc sử dụng AI, phân tích sâu Thang đánh giá mức độ sử dụng AI (AIAS) trong học tập và thi cử.' },
    { text: '2. Viết bài luận về Đạo đức và Liêm chính học thuật: Sử dụng ChatGPT hỗ trợ lập dàn ý bài luận phân tích ranh giới giữa hỗ trợ hợp lý và gian lận học thuật, sở hữu trí tuệ và sự suy giảm tư duy độc lập khi lạm dụng AI.' },
    { text: '3. Tinh chỉnh phản biện và cải thiện bài luận: Phản biện bài viết do AI soạn, phát hiện trích dẫn ảo giác, bổ sung nghiên cứu Selwyn (2020), bản địa hóa nội dung bằng cách lồng ghép thang AIAS của VinUni, và biên tập loại bỏ từ nối rập khuôn.' },
    { text: '4. Đúc kết Bộ 6 nguyên tắc cá nhân sử dụng AI: Đưa ra 6 nguyên tắc: (1) Trung thực & minh bạch, (2) Giữ vai trò chủ động, (3) Tôn trọng bản quyền, (4) Kiểm chứng thông tin, (5) Phát triển năng lực, (6) Trách nhiệm xã hội.' },
    { text: '5. Trực quan hóa và kết luận liêm chính: Thiết kế infographic trực quan hóa các nguyên tắc, đúc kết bài học rằng AI chỉ là bệ phóng còn con người phải luôn là chủ thể chịu trách nhiệm cho các sản phẩm nghiên cứu.' }
  ],

  // ─── BÀI 7: Quy trình Telemedicine hỗ trợ AI cho bệnh nhân tăng huyết áp miền núi ───
  [
    { text: '1. Đề xuất quy trình Telemedicine hỗ trợ AI: Lên ý tưởng quy trình khám bệnh từ xa cho bệnh nhân tăng huyết áp tại vùng núi khó khăn, kết hợp chatbot triệu chứng, thiết bị đo huyết áp IoT tại xã, AI Cloud phân tích dữ liệu và hồ sơ bệnh án điện tử.' },
    { text: '2. Thiết kế Flowchart quy trình khám bệnh: Xây dựng sơ đồ quy trình khám bệnh từ xa 5 bước: (1) Sàng lọc triệu chứng qua chatbot, (2) Đo huyết áp IoT tại xã/nhà, (3) AI Cloud phân tích cảnh báo nguy cơ, (4) Hội chẩn trực tuyến, (5) AI nhắc lịch uống thuốc.' },
    { text: '3. Phân tích vai trò AI trong lâm sàng: AI đóng vai trò là trợ lý thu thập chỉ số tự động, đưa ra cảnh báo sớm nguy cơ đột quỵ từ dữ liệu lịch sử và gợi ý phác đồ lâm sàng chuẩn y khoa cho bác sĩ.' },
    { text: '4. Đánh giá thách thức vùng cao & Giải pháp: Phân tích rào cản địa lý và hạ tầng internet (giải pháp đồng bộ offline) cùng khó khăn của người cao tuổi khi dùng app (giải pháp trợ lý giọng nói tiếng Việt và sự hỗ trợ trực tiếp của y tá xã).' }
  ]
];
