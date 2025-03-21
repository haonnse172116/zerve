import React from "react";

export default function About() {
  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <div className="max-w-5xl w-full bg-white p-8 rounded-xl shadow-lg space-y-10">
        {/* Banner Image */}
        <img
          src="/landingpic.jpg"
          alt="Zerve Banner"
          className="w-full h-64 object-cover rounded-xl shadow-sm"
        />

        <div className="text-center">
          <h1 className="text-3xl font-bold text-orange-500">Về Zerve 🚗</h1>
          <p className="text-gray-600 mt-2 text-lg">
            Nền tảng thuê xe tự lái tiện lợi, nhanh chóng & minh bạch.
          </p>
        </div>

        {/* Sections */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">📜 Lịch sử hình thành</h2>
            <p className="text-gray-600 text-sm">
              Zerve được tạo ra từ một ý tưởng nhỏ: giúp việc thuê xe dễ như gọi trà sữa.
              Từ những trải nghiệm thuê xe phiền phức, chúng tôi muốn tạo ra một nền tảng
              thuê xe **đơn giản – minh bạch – thông minh**.
            </p>
            <img
              src="/Pic2.jpg"
              alt="Car history"
              className="w-full h-40 object-cover rounded-lg shadow"
            />
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">🎯 Mục tiêu của chúng tôi</h2>
            <ul className="list-disc list-inside text-gray-600 text-sm">
              <li>Thao tác thuê xe nhanh chóng, không rườm rà.</li>
              <li>Giá cả minh bạch – không chi phí ẩn.</li>
              <li>Kết nối chủ xe & khách hàng một cách thông minh.</li>
              <li>Phát triển cộng đồng thuê xe văn minh, hiện đại.</li>
            </ul>
            <img
              src="/pic3.jpg"
              alt="Target"
              className="w-full h-40 object-cover rounded-lg shadow"
            />
          </div>

          <div className="space-y-4 md:col-span-2">
            <h2 className="text-xl font-semibold text-gray-800 text-center">💡 Vì sao chọn Zerve?</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-orange-50 p-4 rounded-lg text-sm">
                ✅ Đặt xe trong vài giây – không thủ tục rườm rà.
              </div>
              <div className="bg-orange-50 p-4 rounded-lg text-sm">
                ✅ Giao xe tận nơi – linh hoạt địa điểm.
              </div>
              <div className="bg-orange-50 p-4 rounded-lg text-sm">
                ✅ Hàng trăm mẫu xe – từ phổ thông đến cao cấp.
              </div>
              <div className="bg-orange-50 p-4 rounded-lg text-sm">
                ✅ Dịch vụ hỗ trợ 24/7 – luôn sẵn sàng.
              </div>
            </div>
            <img
              src="/service.png"
              alt="Car fleet"
              className="w-full h-48 object-cover rounded-lg shadow mt-4"
            />
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-10">
          <h2 className="text-xl font-semibold text-gray-800">🚀 Sẵn sàng đồng hành cùng Zerve?</h2>
          <p className="text-gray-600 mt-2">
            Trải nghiệm ngay dịch vụ thuê xe hiện đại nhất Việt Nam.
          </p>
          <a
            href="/"
            className="mt-4 inline-block bg-orange-500 text-white py-3 px-6 rounded-lg shadow-md hover:bg-orange-600 transition"
          >
            Bắt đầu hành trình
          </a>
        </div>
      </div>
    </div>
  );
}
