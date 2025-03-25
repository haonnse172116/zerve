import React from 'react';

const PrivacyPolicyPage = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-5xl mx-auto px-6">
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-3">Chính Sách Bảo Mật Thông Tin</h1>
          <p className="text-lg text-gray-600">
            Cam kết bảo vệ và quản lý thông tin cá nhân của khách hàng một cách an toàn và minh bạch.
          </p>
        </header>

        <section className="mb-8">
          <h2 className="text-3xl font-semibold text-gray-700 mb-4">1. Giới thiệu</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Chúng tôi luôn coi trọng quyền riêng tư của người dùng và cam kết bảo mật mọi thông tin cá nhân. Chính sách này giải thích cách thức thu thập, sử dụng, lưu trữ và chia sẻ dữ liệu.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Việc truy cập và sử dụng dịch vụ đồng nghĩa với việc bạn đã đồng ý với các điều khoản bảo mật của chúng tôi.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-3xl font-semibold text-gray-700 mb-4">2. Thu thập thông tin</h2>
          <ul className="list-disc pl-8 space-y-3 text-gray-700">
            <li>
              <strong>Thông tin cá nhân:</strong> Tên, địa chỉ email, số điện thoại, địa chỉ cư trú và thông tin giấy phép lái xe.
            </li>
            <li>
              <strong>Thông tin giao dịch:</strong> Lịch sử đặt xe, thông tin thanh toán và phản hồi của khách hàng.
            </li>
            <li>
              <strong>Dữ liệu kỹ thuật:</strong> Thông tin trình duyệt, địa chỉ IP, cookie và các dữ liệu liên quan nhằm cải thiện trải nghiệm người dùng.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-3xl font-semibold text-gray-700 mb-4">3. Sử dụng thông tin</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Thông tin thu thập được sẽ được sử dụng để:
          </p>
          <ul className="list-disc pl-8 space-y-3 text-gray-700">
            <li>Quản lý tài khoản và đặt xe.</li>
            <li>Nâng cao chất lượng dịch vụ và cải tiến giao diện người dùng.</li>
            <li>Gửi các thông báo, khuyến mãi và hỗ trợ khách hàng.</li>
            <li>Phân tích dữ liệu nhằm cải thiện hoạt động kinh doanh.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-3xl font-semibold text-gray-700 mb-4">4. Chia sẻ và bảo vệ thông tin</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Chúng tôi cam kết không chia sẻ thông tin cá nhân với bên thứ ba, ngoại trừ các trường hợp sau:
          </p>
          <ul className="list-disc pl-8 space-y-3 text-gray-700">
            <li>Khi có sự đồng ý của người dùng.</li>
            <li>Theo yêu cầu của cơ quan chức năng hoặc pháp luật.</li>
            <li>Khi hợp tác cùng các đối tác chiến lược nhằm nâng cao chất lượng dịch vụ.</li>
          </ul>
          <p className="text-gray-700 leading-relaxed mt-4">
            Để bảo vệ thông tin, chúng tôi áp dụng các biện pháp bảo mật kỹ thuật và quản lý nghiêm ngặt.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-3xl font-semibold text-gray-700 mb-4">5. Quyền lợi của người dùng</h2>
          <p className="text-gray-700 leading-relaxed">
            Người dùng có quyền yêu cầu truy cập, chỉnh sửa hoặc xóa thông tin cá nhân của mình. Mọi yêu cầu sẽ được giải quyết nhanh chóng và bảo mật theo chính sách của chúng tôi.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-3xl font-semibold text-gray-700 mb-4">6. Cập nhật chính sách</h2>
          <p className="text-gray-700 leading-relaxed">
            Chính sách bảo mật có thể được cập nhật theo thời gian. Mọi thay đổi sẽ được công bố trên website và có hiệu lực ngay khi đăng tải.
          </p>
        </section>

      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
