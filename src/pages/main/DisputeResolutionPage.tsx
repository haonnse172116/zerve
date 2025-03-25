import React from 'react';

const DisputeResolutionPage = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-5xl mx-auto px-6">
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-3">Giải Quyết Tranh Chấp</h1>
          <p className="text-lg text-gray-600">
            Quy trình và giải pháp để xử lý mọi tranh chấp phát sinh từ dịch vụ cho thuê xe tự lái.
          </p>
        </header>

        <section className="mb-10">
          <h2 className="text-3xl font-semibold text-gray-700 mb-4">1. Phạm vi áp dụng</h2>
          <p className="text-gray-700 leading-relaxed">
            Các quy định dưới đây áp dụng cho mọi tranh chấp liên quan đến hợp đồng, giao dịch và sử dụng dịch vụ của khách hàng với công ty.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-3xl font-semibold text-gray-700 mb-4">2. Quy trình khiếu nại &amp; xử lý</h2>
          <ul className="list-decimal pl-8 space-y-4 text-gray-700">
            <li>
              <strong>Bước 1: Tiếp nhận yêu cầu:</strong> Khách hàng gửi yêu cầu khiếu nại qua email, hotline hoặc mẫu trực tuyến với thông tin chi tiết về sự cố.
            </li>
            <li>
              <strong>Bước 2: Xác minh thông tin:</strong> Bộ phận hỗ trợ sẽ liên hệ trong vòng 48 giờ để xác minh các thông tin liên quan.
            </li>
            <li>
              <strong>Bước 3: Đối thoại giải quyết:</strong> Nếu cần, hai bên sẽ tiến hành trao đổi trực tiếp hoặc qua hội nghị video để thống nhất giải pháp.
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-3xl font-semibold text-gray-700 mb-4">3. Giải pháp hòa giải và trọng tài</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Trong trường hợp không thể tự giải quyết qua đối thoại, chúng tôi sẽ đề xuất phương án hòa giải với sự tham gia của bên thứ ba trung lập. Nếu hòa giải không thành công, tranh chấp sẽ được chuyển đến trọng tài theo quy định của pháp luật.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Các bên sẽ chấp nhận quyết định của trọng tài và thực hiện đầy đủ theo hướng dẫn của cơ quan có thẩm quyền.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-3xl font-semibold text-gray-700 mb-4">4. Tư vấn và hỗ trợ pháp lý</h2>
          <p className="text-gray-700 leading-relaxed">
            Công ty luôn sẵn sàng cung cấp thông tin và hỗ trợ tư vấn pháp lý để giúp khách hàng hiểu rõ quyền lợi và nghĩa vụ của mình trong từng trường hợp tranh chấp.
          </p>
        </section>

      </div>
    </div>
  );
};

export default DisputeResolutionPage;
