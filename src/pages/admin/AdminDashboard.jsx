import React, { useEffect, useState } from "react";
import "./AdminDashboard.css";
import { getAllUsers } from "../../services/userApi";
import Navbar from "../../components/Navbar";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
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

    fetchUsers();
  }, []);

  return (
    <div className="dashboard-layout">
      <Navbar />
      <div className="dashboard-content">
        <div className="header">
          <h2>Quản Lý Tài Khoản</h2>
          <button className="create-btn">Tạo Tài Khoản</button>
        </div>
        <div className="filter-section">
          <input type="text" placeholder="Search" className="search-input" />
          <select className="role-filter">
            <option>All Roles</option>
            <option>ADMIN</option>
            <option>USER</option>
          </select>
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
                  <th>Hành Động</th>
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
                          className={`status-icon ${
                            user.isActive ? "active" : "inactive"
                          }`}
                        >
                          {user.isActive ? "👁️" : "🚫"}
                        </span>
                      </td>
                      <td>
                        <button className="update-btn">Update</button>
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
        <div className="pagination">
          <button className="page-btn">1</button>
          <button className="page-btn active">2</button>
          <button className="page-btn">3</button>
          
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
