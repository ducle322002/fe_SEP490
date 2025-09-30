import React, { useEffect, useState } from "react";
import "./AdminDashboard.css";
import { getAllUsers, toggleUserActive, UpdateUsers } from "../../services/userApi";
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showEditAccount, setShowEditAccount] = useState(false);
  const [Account, setAccount] = useState({});
  const navigation = useNavigate();
const handleActive = async(user) => {
    const newValue = !user.isActive;
    const confirmMsg = newValue
    ? `Bạn có chắc muốn mở khóa tài khoản "${user.name}" không?`
    : `Bạn có chắc muốn khóa (ban) tài khoản "${user.name}" không?`;

  if (!window.confirm(confirmMsg)) return;
    try {
        
        await toggleUserActive(user.id, newValue);
        alert(`Tài khoản đã được ${newValue ? "mở khóa" : "khóa"} thành công!`);
        fetchUsers();
    } catch (error) {
        alert("Cập nhật trạng thái thất bại: " + err.message);
    }
    };
  const handleChange = (e) => {
    setAccount({
      ...Account,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditAccount = async (e) => {
    e.preventDefault();
    try {
      await UpdateUsers(Account.id, Account);
      alert("Update successfully!");
      setShowEditAccount(false);
      fetchUsers();
    } catch (err) {
      alert("Update failed: " + err.message);
    }
  };

  const fetchUsers = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getAllUsers();
      setUsers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const openEditPopup = (user) => {
    setAccount(user); 
    setShowEditAccount(true);
  };

  const closePopup = () => {
    setShowEditAccount(false);
    setAccount({});
  };

  return (
    <div className="dashboard-layout">
      <Navbar />
      <div className="dashboard-content">
        <div className="header">
          <h2>Quản Lý Tài Khoản</h2>
          <input
            type="text"
            className="search"
            placeholder="Tìm kiếm "
            ></input>
          <a href="/createuser">
            <button className="create-btn">Tạo Tài Khoản</button>
          </a>
        </div>

        {loading && <p className="loading-text">Đang tải dữ liệu...</p>}
        {error && <p className="error-text">{error}</p>}
        {!loading && !error && (
          <div className="table-wrapper">
            <table className="user-table">
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Họ Và Tên</th>
                  <th>Email</th>
                  <th>Số Điện Thoại</th>
                  <th>Vai Trò</th>
                  <th>Trạng Thái</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {users.length > 0 ? (
                  users.map((user, index) => (
                    <tr key={user.id}>
                      <td>{index + 1}</td>
                      <td className="user-info">
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="avatar"
                        />
                        <span>{user.name}</span>
                      </td>
                      <td>{user.email}</td>
                      <td>{user.phoneNumber}</td>
                      <td>{user.roleName}</td>
                      <td>
  <span
    className={`status-icon ${user.isActive ? "active" : "inactive"}`}
    onClick={() => handleActive(user)}
    style={{ cursor: "pointer" }} 
  >
    {user.isActive ? "👁️" : "🚫"}
  </span>
</td>
                      <td>
                        <button
                          className="update-btn"
                          onClick={() => openEditPopup(user)}
                        >
                          Cập nhật
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="no-data">
                      Không có người dùng nào
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      
      {showEditAccount && (
        <div className="popup-overlay">
          <div className="popup">
            <h3>Cập nhật tài khoản</h3>
            <form onSubmit={handleEditAccount}>
              <input
                type="text"
                name="name"
                value={Account.name || ""}
                onChange={handleChange}
                placeholder="Họ và tên"
              />
              <input
                type="email"
                name="email"
                value={Account.email || ""}
                onChange={handleChange}
                placeholder="Email"
              />
              <input
                type="text"
                name="phoneNumber"
                value={Account.phoneNumber || ""}
                onChange={handleChange}
                placeholder="Số điện thoại"
              />
              <select
                name="roleName"
                value={Account.roleName || ""}
                onChange={handleChange}
              >
                <option value="ADMIN">ADMIN</option>
                <option value="USER">USER</option>
                <option value="MANAGER">MANAGER</option>
                <option value="SALES">SALES</option>
              </select>
              <div className="popup-actions">
                <button type="submit" className="save-btn">
                  Lưu
                </button>
                <button type="button" className="cancel-btn" onClick={closePopup}>
                  Hủy
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
