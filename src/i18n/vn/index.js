import terms from './terms';

export default {
    translation: {
        "Appointment" : "Cuộc hẹn",
        "Patient" : "Bệnh nhân",
        "Report" : "Báo cáo",
        "Documents" : "Tài liệu",
        "Settings" : "Cài đặt",
        "Notifications": "Thông báo",
        "Remove Notification": "Gỡ thông báo",
        "No notifications to display yet": "Không có thông báo để hiện thị",
        "Appointment holder": "Người hẹn",
        "Today's Appoinment": "Cuộc hẹn hôm nay",
        "Go back": "Trở về",
        "No Appointment Requests to display yet": "Không có yêu cầu lịch hẹn nào để hiển thị",
        //treatment menu
        "Tooth chart": "Biểu đồ nha chu",
        "Patient profile": "Hồ sơ bệnh nhân",
        "X-Ray Images": "Hình chụp X quang",
        "Images": "Hình ảnh",
        // Common
        "Yes" : "Có",
        "No": "Không",
        "OK": "Đồng ý",
        "Cancel": "Hủy",
        "Delete": "Xóa",
        "Edit": "Sửa",
        "Log in": "Đăng nhập",
        "Log out": "Đăng xuất",
        "Chair": "Ghế",
        "Chairs": "Ghế",
        "All": "Tất cả",
        "Update": "Cập nhật",
        "Total": "Tổng cộng",
        "Busy": "Bận",
        "Completed": "Hoàn thành",
        "Rejected": "Từ chối",
        "Accept": "Chấp nhận",
        "Reject": "Từ chối",
        "From": "Từ",
        "To": "Tới",
        "Apply": "Áp dụng",
        "Search": "Tìm kiếm",
        "Filter": "Lọc",
        "Add": "Thêm",
        "Loading": "Đang tải",
        "No options": "Không có lựa chọn",
        "select": "Chọn",
        "MALE": "NAM",
        "FEMALE": "NỮ",
        "None": "Không",
        "Confirm": "Xác nhận",
        "Start Date": "Ngày BĐ",
        "End Date": "Ngày KT",
        "Today": "Hôm nay",
        "Next S": "T.THEO",
        "Request": "Yêu cầu",
        "At time": "Lúc",
        // Messages
        // Success Messages
        "Update Account Success": "Cập nhật tài khoản thành công",
        "Update Success":"Cập nhật thành công",
        "Insert Success":"Thêm thành công",
        "Delete Success": "Xóa thành công",
        // Success Messages Appointment
        "Delete Appointment successfully": "Xóa cuộc hẹn thành công",
        "Add Appointment successfully": "Thêm cuộc hẹn thành công",
        "Update Appointment successfully": "Cập nhật cuộc hẹn thành công",
        // Success Messages Settings
        "Update Profile successfully": "Cập nhật thông tin thành công",
        "Change Password successfully": "Đổi mật khẩu thành công",
        // Error Messages
        "Update Account Fail": "Cập nhật tài khoản thất bại",
        "You can't insert prescription if it don't have drug":"Không thể thêm đơn thuốc nếu không có thuốc",
        "Cannot change in read mode":"Không thể thay đổi dữ liệu trong chế độ đọc",
        "Update Fail":"Cập nhật thất bại",
        "Insert Fail":"Thêm thất bại",
        "Delete Fail":"Xóa thất bại",
        "Full name must contain at least 3 to 30 characters": "Họ tên phải có từ 3 - 30 ký tự",
        "Email must follow the format abc@xyz.com/net/vn": "Email phải theo định dạng abc@xyz.com/net/vn",
        "Phone must contain at least 10 to 15 number": "Số điện thoại phải có từ 10 - 15 số",
        "Address must contain at least 5 to 300 characters": "Địa chỉ phải có từ 5 - 300 ký tự",
        "Password must contain at least 6 to 100 characters": "Mật khẩu phải có từ 6 đến 100 ký tự",
        "The entered password is incorrect": "Mật khẩu nhập vào không hợp lệ",
        "Confirm password does not match with new password": "Xác nhận mật khẩu không trùng khớp với mật khẩu mới",
        "The new password is identical to old password": "Mật khẩu mới trùng với mật khẩu cũ",
        "Range of date is invalid": "Khoảng thời gian nhập không hợp lệ",
        "First name must contain at least 1 character":"Họ phải có ít nhất 1 ký tự",
        "Last name must contain at least 1 character":"Tên phải có ít nhất 1 ký tự",
        "Error when load data":"Lỗi khi tải dữ liệu",
        "Please fill out all fields":"Hãy điền tất cả thông tin",
        "Name must contain at least 1 to 30 characters":"Tên phải có từ 1 đến 30 ký tự",
        // Error Messages Login
        "Username must contain at least 1 to 30 characters": "Username phải có từ 1 đến 30 ký tự",
        "Sign in successfully": "Đăng nhập thành công",
        "Sign in fail": "Đăng nhập thất bại",
        "The username that you've entered doesn't match any staff account.": "Không tồn tại nhân viên có username vừa nhập",
        "Email or password is not correct": "Username hoặc password không đúng",
        "Refresh token fail": "Làm mới token thất bại",
        // Error Messages Appointment
        "Loading appointments fail !!!": "Tải các cuộc hẹn thất bại",
        "Invalid Chair Filter": "Chọn ghế không hợp lệ",
        "First name must contain at least 1 to 30 characters": "Tên phải có từ 1 - 30 ký tự",
        "Last name must contain at least 1 to 30 characters": "Họ phải có từ 1 - 30 ký tự",
        "First name validate (Short)": "1 - 30 ký tự",
        "Last name validate (Short)": "1 - 30 ký tự",
        "Phone validate (Short)": "10 to 15 số",
        "Provider is required": "Bác sĩ không được để trống",
        "Invalid Date (Holiday)": "Ngày không hợp lệ (Ngày nghỉ)",
        "Invalid Time": "Thời gian không hợp lệ",
        "Appointment duration must be between 30 - 240 minutes and multiple of 30": "Thời lượng cuộc hẹn phải từ 30 - 240 phút, chia hết cho 30",
        "Load Patient fail": "Tải bệnh nhân thất bại",
        "Load Recall fail": "Tải tái hẹn thất bại",
        "Load Treatment fail": "Tải điều trị thất bại",
        "Load Procedure Category fail": "Tải các loại thủ tục thất bại",
        "Load Procedure Code fail": "Tải các mã thủ tục thất bại",
        "Load Teeth of Patient fail": "Tải răng của bệnh nhân thất bại",
        "Load Surface of Tooth fail": "Tải bề mặt răng thất bại",
        "Procedure is required": "Thủ tục không được để trống",
        "Tooth is required": "Răng không được để trống",
        "Surface is required": "Bề mặt không được để trống",
        "Delete Appointment fail": "Xóa cuộc hẹn thất bại",
        "This is a holiday": "Đây là ngày nghỉ",
        "Add Appointment fail": "Thêm cuộc hẹn thất bại",
        "Update Appointment fail": "Cập nhật cuộc hẹn thất bại",
        "Get Next Available Date fail": "Lấy ngày khả dụng tiếp theo thất bại",
        "Provider not working in the near future": "Bác sỹ không có lịch làm việc sắp tới",
        // Error Messages Settings
        "Change language fail": "Thay đổi ngôn ngữ thất bại",
        "Change theme fail": "Thay đổi chủ đề thất bại",
        "Change Password fail": "Đổi mật khẩu thất bại",
        // Error Messages Schedule
        "Load Providers fail": "Tải bác sỹ thất bại",
        "Start day is required": "Ngày bắt đầu không được để trống",
        "Dates are quired": "Các ngày không được để trống",
        "Add Schedule fail": "Thêm lịch thất bại",
        "Update Schedule fail": "Cập nhật lịch thất bại",
        // Confirm Messages
        "Are you sure want to": "Bạn có chắc muốn",
        "Do you want to delete this?":"Bạn có muốn xóa thông tin này không?",
        // Login Page
        "<strong>Login</strong> your account": "<strong>Đăng nhập</strong> tài khoản của bạn",
        "Username": "Tên đăng nhập",
        "Password": "Mật khẩu",
        "Continue": "Tiếp tục",
        "Forgot password?": "Quên mật khẩu?",
        "Don't have an account? Sign Up": "Chưa có tài khoản? Đăng ký",
        "Copyright by": "Bản quyền thuộc về",
        // Patient Profile page
        "Treatment plan": "Kế hoạch điều trị",
        "History": "Lịch sử",
        "Oral Health": "Sức khỏe răng miệng",
        "Medical Issues": "Chống chỉ định thuốc",
        "Currently there are no treatments pending": "Hiện tại không có yêu cầu điều trị nào đang chờ xử lý",
        "Add record": "Thêm mục",
        "Plaque index": "Chỉ số mảng bám",
        "Bleeding index": "Chỉ số chảy máu",
        "Halitosis": "Mức độ hôi miệng",
        "Add more image": "Thêm hình ảnh",
        "Layer": "Lớp",
        "Images per page": "Số hình trên mỗi trang",
        "Prescription":"Đơn thuốc",
        "Add more drug":"Thêm nhiều thuốc",
        "Agree":"Đồng ý",
        "Info":"Info",
        "Expired date":"Ngày hết hạn",

        // Tooth chart page
        "Overview": "Tổng quan",
        "Quickselect": "Chọn nhanh",
        "Missing": "Bị thiếu",
        "Veneer": "Răng dán sứ",
        "Pontics": "Cầu răng",
        "Crown": "Mão răng",
        "Endo tests": "Kiểm tra răng",
        "Dental": "Nha khoa",
        "Reset": "Đặt lại",
        "Pathology": "Bệnh lý",
        "Restoration": "Phục hồi",
        "Endodontic": "Nội nha",
        "Cold": "Lạnh",
        "Percussion": "Va chạm",
        "Palpation": "Sờ nắn",
        "Heat": "Nóng",
        "Electricity": "Điện",
        "Test": "Kiểm tra",
        "Not applicable, Existing Root canal Treatment": "Không thể thực hiện, Đang điều trị tủy răng",
        "Positive": "Tích cực",
        "Uncertain": "Không chắc chắn",
        "Negative": "Tiêu cực",
        "Not applicable": "Không thể áp dụng",
        "Clear": "Xóa hết",
        // Progress Notes
        "Add Note": "Thêm ghi chú",
        "Update Note": "Sửa ghi chú",
        "Title": "Tiêu đề",
        // Settings
        "General" : "Chung",
        "Account": "Tài khoản",
        "Term & Policy": "Chính sách & Điều lệ",
        "Location": "Vị trí",
        "Language": "Ngôn ngữ",
        "English": "Tiếng Anh",
        "Vietnamese": "Tiếng Việt",
        "Theme": "Chủ đề",
        "Light": "Sáng",
        "Dark": "Tối",
        "Term Policy Full Text": terms,
        "Notify when a STAFF sends you a message": "Thông báo khi có tin nhắn từ NHÂN VIÊN",
        "Notify when a PATIENT sends you a message": "Thông báo khi có tin nhắn từ KHÁCH HÀNG",
        "Notify when a you're having a MEETING": "Thông báo khi sắp có CUỘC HẸN",
        "Full Name": "Họ tên",
        "Email": "Email",
        "Phone": "Số điện thoại",
        "Old Password": "Mật khẩu cũ",
        "New Password": "Mật khẩu mới",
        "Confirm Password": "Xác nhận MK",
        // Report
        "Payment": "Thanh toán",
        "Appointments": "Cuộc hẹn",
        "Procedures": "Thủ tục",
        "Tasks": "Công việc",
        "Invoices": "Hóa đơn",
        "Bookings": "Đặt chỗ",
        "Finances": "Tài chính",
        "Work hour": "Thời gian làm việc",
        "New patient": "Bệnh nhân mới",
        // Unit
        "hours": "giờ",
        "percent": "%",
        "Hour Short": "H",
        "Patients": "Bệnh nhân",
        "AppointDurationU": "Phút",
        // Currency
        "CURRENCY": "VND",
        "CURRENCY CHART": "Triệu VND",
        "CURRENCY_PRE": "$",
        //Menu bar
        "Providers":"Bác sĩ",
        "Practices":"Văn phòng",
        "Staffs":"Nhân viên",
        "Procedure":"Thủ tục",
        "Referral":"Giới thiệu",
        "Schedule":"Lịch trình",
        "Authentication":"Xác thực",
        "Document":"Tài liệu",
        "Templates":"Mẫu",
        "Drug":"Thuốc",
        //referral
        "Additional information":"Thông tin thêm",
        //template
        "Template":"Mẫu",
        "Recent":"Gần đây",
        "All templates":"Tất cả mẫu",
        "Invoice":"Hóa đơn",
        "Resignation letter":"Đơn thôi việc",
        "Content":"Nội dung",
        "Note type":"Loại",
        "DEFAULT":"DEFAULT",
        "MEDICAL ALERT":"MEDICAL ALERT",
        "PROGRESS":"PROGRESS",
        "TREATMENT":"TREATMENT",

        //provider
        "#":"#",
        "ID":"ID",
        "Fullname":"Họ tên",
        "Birth":"Ngày sinh",
        "Gender":"Giới tính",
        "Address":"Địa chỉ",
        "ID Card":"ID Card",
        "Publisher":"Nhà phát hành",
        "Country":"Quốc gia",
        "City":"Thành phố",
        "Postal Code":"Mã bưu chính",
        "Male":"Nam",
        "Female":"Nữ",
        "Insert":"Thêm",
        "Insert Person":"Thêm người",
        "Active":"Hoạt động",
        "Inactive":"Không hoạt động",
        "Status":"Trạng thái",
        "Action":"Hành động",
        "Profile":"Hồ sơ",
        "Read":"Đọc",
        "First name":"Họ",
        "Last name":"Tên",
        "Fax":"Fax",
        "Mobile phone":"Di động",
        "Home phone":"Điện thoại bàn",
        "STAFF":"STAFF",
        "PROVIDER":"PROVIDER",
        "PATIENT":"PATIENT",
        //procedure
        "Code":"Code",
        "Fee":"Tiền công",
        "INS":"INS",
        "Duration":"Thời lượng",
        "Type":"Loại",
        "ABBR":"ABBR",
        "Description":"Mô tả",
        "Filepath":"Đường dẫn",
        "Category":"Thể loại",
        "Abbreviation":"Viết tắt",
        "Insured percent":"Phần trăm bảo hiểm",
        "Procedure code":"Mã thủ tục",
        "Procedure fee":"Phí thủ tục",
        "Procedure time":"Thời gian thủ tục",
        "Procedure type":"Loại thủ tục",
        "Tooth select":"Răng được chọn",
        "Tooth type":"Loại răng",
        //authentication
        "Role":"Quyền hạn",
        //practices
        "About us":"Giới thiệu",
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum":"Lorem Ipsum chỉ đơn giản là văn bản giả của ngành in ấn và sắp chữ. Lorem Ipsum đã trở thành văn bản giả tiêu chuẩn của ngành kể từ những năm 1500, khi một nhà in không xác định lấy một dãy loại và xáo trộn nó để tạo thành một cuốn sách mẫu. Nó đã tồn tại không chỉ năm thế kỷ, mà còn là bước nhảy vọt vào lĩnh vực sắp chữ điện tử, về cơ bản vẫn không thay đổi. Nó được phổ biến vào những năm 1960 với việc phát hành các tờ Letraset chứa các đoạn Lorem Ipsum, và gần đây hơn với phần mềm xuất bản trên máy tính để bàn như Aldus PageMaker bao gồm các phiên bản của Lorem Ipsum",
        "Save":"Lưu",
        "Organization":"Tổ chức",
        "Hotline":"Đường dây nóng",
        "Start time":"Thời gian bắt đầu",
        "End time":"Thời gian kết thúc",
        //chair
        "Number":"Số",
        "Room":"Phòng",
        "Provider":"Bác sỹ",
        "Order":"Thứ tự",
        "Color":"Màu",
        //schedule
        "Note":"Ghi chú",
        "Date":"Ngày",
        "Work time":"Giờ làm việc",
        //portal
        "Portal":"Cổng thông tin",
        //drug
        "Quantity":"Định lượng",
        "Name":"Tên",
        "Dispensed":"Pha chế",
        "Refill":"Đổ đầy",
        //patient recall
        "Treatment":"Điều trị",
        "Interval":"Khoảng thời gian",
        "Recall date":"Ngày nhắc nhở",
        "Patient recall":"Nhắc nhở bệnh nhân",
        //table
        "Rows per page":"Số dòng mỗi trang",
        // Appointment
        "Time": "Thời gian",
        "Assistant": "Trợ khám",
        "Select Patient": "Chọn bệnh nhân",
        "Enter new Patient": "Nhập bệnh nhân mới",
        "Patient information": "Thông tin bệnh nhân",
        "Patient ID": "Patient ID",
        "Chart": "Biểu đồ",
        "First name": "Tên",
        "Last name": "Họ",
        "MI": "MI",
        "Patient Contact": "Thông tin liên lạc BN",
        "Home Phone": "ĐT bàn",
        "Mobile": "ĐT Di động",
        "Schedule Appointment": "Lịch hẹn",
        "Staging": "Trạng thái",
        "Reminder Note": "Ghi chú nhắc nhở",
        "Recall": "Tái hẹn",
        "Treatments": "Điều trị",
        "Category": "Loại",
        "Tooth": "Răng",
        "Surface": "Bề mặt",
        "No Recall": "Không có lịch sử tái hẹn",
        "No Treatment": "Không có lịch sử điều trị",
        "Next Available": "Ngày hợp lệ tiếp theo",
        "Only mine": "Chỉ của tôi",
        "Next Available date for default provider": "Ngày hẹn có thể cho bác sỹ mặc định",
        "Appointment Date": "Ngày hẹn",
        //Files
        "File Name": "Tên tệp",
        // Schedule
        "Mode": "Chế độ",
        "Monthly": "Tháng",
        "Weekly": "Tuần",
        "Auto": "Tự chọn",
        "Monday": "Thứ 2",
        "Tuesday": "Thứ 3",
        "Wednesday": "Thứ 4",
        "Thursday": "Thứ 5",
        "Friday": "Thứ 6",
        "Saturday": "Thứ 7",
        "Sunday": "Chủ nhật",
    }
}