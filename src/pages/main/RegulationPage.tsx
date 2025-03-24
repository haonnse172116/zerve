import React from 'react';

const RegulationPage = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-5xl mx-auto px-6">
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-3">Quy Chế Hoạt Động</h1>
          <p className="text-lg text-gray-600">
            Những quy định nhằm đảm bảo trải nghiệm an toàn và chất lượng cho dịch vụ cho thuê xe tự lái của chúng tôi.
          </p>
        </header>

        <section className="mb-8">
          <h2 className="text-3xl font-semibold text-gray-700 mb-4">1. Giới thiệu</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Chào mừng quý khách đến với dịch vụ cho thuê xe tự lái. Trang này cung cấp các quy định nhằm bảo vệ quyền lợi của khách hàng cũng như đảm bảo hoạt động hiệu quả của hệ thống.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Vui lòng đọc kỹ các điều khoản dưới đây trước khi sử dụng dịch vụ. Mọi sự thay đổi về quy chế sẽ được thông báo trên website.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-3xl font-semibold text-gray-700 mb-4">2. Điều khoản đăng ký và sử dụng dịch vụ</h2>
          <ul className="list-disc pl-8 space-y-3 text-gray-700">
            <li>
              <strong>Thông tin đăng ký:</strong> Người dùng phải cung cấp thông tin cá nhân chính xác và cập nhật. Việc cung cấp thông tin sai lệch có thể dẫn đến hủy bỏ tài khoản.
            </li>
            <li>
              <strong>Yêu cầu về tuổi tác:</strong> Chỉ những người đủ 21 tuổi trở lên và có giấy phép lái xe hợp lệ mới được sử dụng dịch vụ.
            </li>
            <li>
              <strong>Chấp nhận điều khoản:</strong> Khi đăng ký, người dùng đồng ý với toàn bộ điều khoản và chính sách của công ty, bao gồm cả các cập nhật sau này.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-3xl font-semibold text-gray-700 mb-4">3. Quy định về đặt xe và thanh toán</h2>
          <ul className="list-decimal pl-8 space-y-3 text-gray-700">
            <li>
              <strong>Đặt xe:</strong> Quý khách cần đặt xe trước ít nhất 24 giờ để đảm bảo xe được sắp xếp hợp lý.
            </li>
            <li>
              <strong>Thanh toán:</strong> Hình thức thanh toán đa dạng gồm chuyển khoản, thanh toán trực tuyến và thanh toán khi nhận xe. Mã giảm giá và khuyến mãi sẽ được áp dụng theo điều kiện cụ thể.
            </li>
            <li>
              <strong>Hoàn tiền:</strong> Khoản đặt cọc và thanh toán sẽ được hoàn trả đầy đủ nếu không có vi phạm điều khoản hoặc hủy đặt xe theo chính sách.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-3xl font-semibold text-gray-700 mb-4">4. Quy định về sử dụng và bảo dưỡng xe</h2>
          <ul className="list-disc pl-8 space-y-3 text-gray-700">
            <li>
              Xe phải được sử dụng đúng mục đích và theo hướng dẫn của công ty. Việc sử dụng sai mục đích có thể gây nguy hiểm và vi phạm pháp luật.
            </li>
            <li>
              Người dùng có trách nhiệm kiểm tra tình trạng xe trước và sau khi sử dụng. Mọi hư hỏng do sử dụng không đúng cách sẽ do khách hàng chịu trách nhiệm.
            </li>
            <li>
              Công ty không chịu trách nhiệm đối với các thiệt hại xảy ra do tai nạn giao thông khi người dùng không tuân thủ quy định về an toàn.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-3xl font-semibold text-gray-700 mb-4">5. Trách nhiệm và bồi thường</h2>
          <p className="text-gray-700 leading-relaxed">
            Trong mọi trường hợp, khách hàng phải thông báo ngay lập tức khi có sự cố xảy ra. Mọi thiệt hại phát sinh do lỗi của khách hàng sẽ được bồi thường theo quy định của pháp luật.
          </p>
        </section>

      </div>
    </div>
  );
};

export default RegulationPage;
