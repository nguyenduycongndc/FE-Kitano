## .NET 5.0
## Visual studio 2019

# Hướng dẫn cài đặt, biên dịch và chạy ứng dụng ASP.NET Core

Cài đặt các phần mềm liên quan
- **Bộ ASP.NET Core SDK .NET 5.0** (tải .NET 5.0 tại https://dotnet.microsoft.com/download)
- **Một môi trường phát triển ứng dụng tích hợp như Visual Studio 2019, JetBrains Rider hoặc một code editor như Visual Studio Code**
- **Các plugin, library liên quan: Bootstrap 4, Log4Net, Stackexchange Redis .net core, ...**
## Cài đặt ASP.NET Core SDK trên Window
- Để thực thi ứng dụng ASP.NET Core, cần cài đặt ASP.NET Core Runtime. Để phát triển ứng dụng, cần cài đặt ASP.NET Core SDK. 
Khi cài đặt SDK sẽ đồng thời cài đặt luôn Runtime.

### 1.Cài đặt không dùng Visual Studio 2019
- Tải bộ cài về và cài đặt vào máy.
- Sau khi cài đặt xong, chạy lệnh dotnet --version trên Command Prompt hoặc PowerShell để kiểm tra kết quả version.

### 2.Dùng Visual Studio 2019
- Lưu ý, Visual Studio 2017 chỉ hỗ trợ các phiên bản trước của .NET Core.
- Nếu chưa có hoặc đang dùng một bản Visual Studio cũ, hãy cài đặt Visual Studio (community) 2019. 
Trong quá trình cài đặt, hãy chọn Workloads ASP.NET and web development (phát triển ứng dụng trên cả ASP.NET và ASP.NET Core) hoặc .NET Core cross-platform development (phát triển ứng dụng trên .NET Core và ASP.NET Core).
- Nếu đã cài đặt sẵn Visual Studio 2019, hãy update lên build mới nhất. 
Sau đó chạy chương trình Visual Studio Installer => chọn Modify => chọn tab Workloads và cũng lựa chọn một trong hai mục như trên.
- Khi quá trình cài đặt hoàn tất, đã sẵn sàng cho cả việc phát triển và chạy ứng dụng ASP.NET Core.
Chạy lệnh dotnet --version trên Command Prompt hoặc PowerShell để kiểm tra kết quả version.

## Khởi tạo, biên dịch và chạy ứng dụng ASP.NET Core
- Nếu chưa có dự án, có thể tạo dự án ASP.NET Core bằng cách sử dụng CLI từ Command Prompt (hoặc PowerShell) của windows (hoặc từ cửa sổ Terminal của Visual Studio Code) hoặc tạo trực tiếp bằng Visual Studio 2019.
- ASP.NET Core có thể chạy độc lập như một ứng dụng console, cũng có thể tích hợp với một chương trình web server.
- Biên dịch và chạy ứng dụng cũng tương tự như khởi tạo, cũng dùng 2 cách là sử dụng CLI hoặc khởi chạy bằng Visual Studio 2019.
	+ Trên Visual Studio 2019: bấm F5 (debug) hoặc Ctrl + F5 (without debug) để biên dịch và chạy ứng dụng. (url khởi chạy default: https://localhost:44384/ or http://localhost:29671/)
	+ Sử dụng CLI: trỏ địa chỉ về đúng thư mục chứa project cần chạy, gõ lệnh dotnet build và ấn Enter để check lỗi (có thể bỏ qua). Sau đó gõ lệnh dotnet run và ấn Enter để quá trình biên dịch bắt đầu.
	Ctrl + C để ngừng khởi chạy. (url khởi chạy default: https://localhost:5001 or http://localhost:5000 ).

