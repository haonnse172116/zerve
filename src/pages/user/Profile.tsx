import { FaGift } from "react-icons/fa";

const ProfilePage = () => {
    return (
        <div className="max-w-full mx-auto p-6 bg-white shadow-md rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Profile Section */}
                <div className="p-6 bg-white rounded-lg flex flex-col items-center shadow-md">
                    {/* Avatar */}
                    <div className="relative">
                        <div className="w-24 h-24 rounded-full bg-orange-500 flex items-center justify-center">
                            <img
                                src="tinh gia.jpg"
                                alt="Profile"
                                className="w-20 h-20 rounded-full"
                            />
                        </div>
                    </div>

                    {/* User Info */}
                    <h2 className="text-lg font-bold mt-4">Phạm Văn Chính</h2>
                    <p className="text-gray-500 text-sm">Tham gia từ năm 2022</p>

                    {/* Stats */}
                    <div className="flex justify-between w-full mt-4 border-t border-gray-200 pt-4">
                        <div className="text-center flex-1">
                            <p className="text-lg font-bold">76</p>
                            <p className="text-gray-500 text-sm">Lượt đánh giá</p>
                        </div>
                        <div className="w-px bg-gray-300"></div> {/* Thanh phân cách */}
                        <div className="text-center flex-1">
                            <p className="text-lg font-bold">0</p>
                            <p className="text-gray-500 text-sm">Số chuyến hủy</p>
                        </div>
                    </div>

                    {/* Button */}
                    <button className="mt-4 px-4 py-2 border rounded-md flex items-center gap-2">
                        <FaGift className="text-gray-500" />
                        0 điểm
                    </button>
                </div>

                {/* Info Section */}
                <div className="p-6">
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <span className="font-medium">Số điện thoại</span>
                            <span className="text-sm bg-green-100 text-green-600 px-2 py-1 rounded-full">Đã xác thực</span>
                        </div>
                        <input type="text" className="border w-full p-2 rounded" value="+84 123 456 789" readOnly />

                        <div className="flex justify-between items-center">
                            <span className="font-medium">Email</span>
                            <span className="text-sm bg-green-100 text-green-600 px-2 py-1 rounded-full">Đã xác thực</span>
                        </div>
                        <input type="email" className="border w-full p-2 rounded" value="phamvanchinh@gmail.com" readOnly />

                        <div>
                            <span className="font-medium">Ngày sinh</span>
                            <input type="text" className="border w-full p-2 rounded" value="01/01/1990" readOnly />
                        </div>

                        <div>
                            <span className="font-medium">Giới tính</span>
                            <input type="text" className="border w-full p-2 rounded" value="Nam" readOnly />
                        </div>

                        <div>
                            <span className="font-medium">Facebook</span>
                            <input type="text" className="border w-full p-2 rounded" value="www.facebook.com" readOnly />
                        </div>

                        <div>
                            <span className="font-medium">Youtube</span>
                            <input type="text" className="border w-full p-2 rounded" value="www.youtube.com" readOnly />
                        </div>
                    </div>
                </div>
            </div>

            {/* Reviews Section */}
            <div className="mt-6 p-6 bg-gray-50 rounded-lg">
                <h3 className="text-lg font-bold">Đánh giá</h3>
                <div className="mt-4 p-4 border rounded-lg flex items-center gap-4">
                    <img src="Profile.jpg" alt="User" className="w-12 h-12 rounded-full" />
                    <div>
                        <h4 className="font-semibold">Lê Xuân Mạnh</h4>
                        <div className="flex text-yellow-500">
                            {"★★★★★".split("").map((star, index) => (
                                <span key={index}>{star}</span>
                            ))}
                        </div>
                        <p className="text-gray-600">Trả xe sạch sẽ</p>
                    </div>
                    <span className="ml-auto text-gray-400 text-sm">10/10/2024</span>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;