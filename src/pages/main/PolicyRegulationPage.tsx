import React from 'react';

const PolicyAndRegulationPage = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-5xl mx-auto px-6">
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-3">Chính Sách &amp; Quy Định</h1>
          <p className="text-lg text-gray-600">
            Tập hợp các quy định và chính sách nhằm đảm bảo quyền lợi và an toàn khi sử dụng dịch vụ cho thuê xe tự lái.
          </p>
        </header>

        {/* Phần Quy Chế Hoạt Động */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-gray-700 mb-5">I. Quy Chế Hoạt Động</h2>
          <article className="mb-8">
            <h3 className="text-2xl font-bold text-gray-700 mb-3">1. Giới thiệu</h3>
            <p className="text-gray-700 leading-relaxed">
              Trang này cung cấp các quy định nhằm tạo nên môi trường sử dụng dịch vụ an toàn, hiệu quả và minh bạch.
            </p>
          </article>
          <article className="mb-8">
            <h3 className="text-2xl font-bold text-gray-700 mb-3">2. Điều khoản sử dụng</h3>
            <ul className="list-disc pl-8 space-y-3 text-gray-700">
              <li>Người dùng phải cung cấp thông tin chính xác và cập nhật khi đăng ký.</li>
              <li>Chỉ những người đủ tuổi và có giấy phép lái xe hợp lệ mới được phép sử dụng dịch vụ.</li>
              <li>Người dùng cam kết tuân thủ mọi quy định giao thông và hướng dẫn sử dụng xe.</li>
            </ul>
          </article>
          <article className="mb-8">
            <h3 className="text-2xl font-bold text-gray-700 mb-3">3. Quy định đặt xe &amp; thanh toán</h3>
            <ul className="list-decimal pl-8 space-y-3 text-gray-700">
              <li>Đặt xe trước ít nhất 24 giờ để đảm bảo khả năng phục vụ.</li>
              <li>Thanh toán đa dạng qua chuyển khoản, trực tuyến và thanh toán tại điểm nhận xe.</li>
              <li>Chính sách hoàn tiền được áp dụng khi hủy đặt xe theo quy định.</li>
            </ul>
          </article>
          <article>
            <h3 className="text-2xl font-bold text-gray-700 mb-3">4. Sử dụng &amp; bảo dưỡng xe</h3>
            <ul className="list-disc pl-8 space-y-3 text-gray-700">
              <li>Xe phải được sử dụng đúng mục đích và kiểm tra tình trạng trước sau mỗi chuyến đi.</li>
              <li>Mọi hư hỏng phát sinh do sử dụng không đúng cách sẽ do khách hàng chịu trách nhiệm.</li>
              <li>Tuân thủ các quy định về bảo dưỡng và sửa chữa xe theo hướng dẫn của công ty.</li>
            </ul>
          </article>
        </section>

        {/* Phần Chính Sách Bảo Mật Thông Tin */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-gray-700 mb-5">II. Chính Sách Bảo Mật Thông Tin</h2>
          <article className="mb-8">
            <h3 className="text-2xl font-bold text-gray-700 mb-3">1. Giới thiệu</h3>
            <p className="text-gray-700 leading-relaxed">
              Chúng tôi bảo đảm mọi thông tin cá nhân được bảo vệ nghiêm ngặt nhằm tôn trọng quyền riêng tư của người dùng.
            </p>
          </article>
          <article className="mb-8">
            <h3 className="text-2xl font-bold text-gray-700 mb-3">2. Thu thập và sử dụng thông tin</h3>
            <ul className="list-disc pl-8 space-y-3 text-gray-700">
              <li>Thu thập thông tin qua đăng ký tài khoản, giao dịch và dữ liệu kỹ thuật như IP và cookie.</li>
              <li>Sử dụng thông tin để quản lý, nâng cao chất lượng dịch vụ và hỗ trợ khách hàng.</li>
              <li>Chỉ chia sẻ thông tin khi có sự đồng ý của người dùng hoặc theo yêu cầu của pháp luật.</li>
            </ul>
          </article>
          <article>
            <h3 className="text-2xl font-bold text-gray-700 mb-3">3. Quyền lợi người dùng</h3>
            <p className="text-gray-700 leading-relaxed">
              Người dùng có quyền yêu cầu truy cập, cập nhật hoặc xóa thông tin cá nhân của mình. Mọi thắc mắc sẽ được giải đáp kịp thời.
            </p>
          </article>
        </section>

      </div>
    </div>
  );
};

export default PolicyAndRegulationPage;
