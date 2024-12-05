import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const Users = () => {
  const { users, deleteUser, startEditingUser } = useContext(UserContext);
  const [modal, setModal] = useState({ show: false, userId: null });
  const navigate = useNavigate();

  const handleDelete = (id) => {
    setModal({ show: true, userId: id });
  };

  const confirmDelete = () => {
    deleteUser(modal.userId);
    setModal({ show: false, userId: null });
    alert("User deleted successfully!");
  };

  const handleEdit = (user) => {
    startEditingUser(user);
    navigate("/create");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-200 to-blue-500">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-2xl p-10">
        <h2 className="text-4xl font-extrabold text-gray-800 text-center mb-8">
          User Management
        </h2>
        <ul className="space-y-6">
          {users.map((user) => (
            <li
              key={user.id}
              className="border border-gray-200 rounded-lg p-6 flex justify-between items-center shadow hover:shadow-lg transition"
            >
              <div>
                <p className="text-xl font-bold text-gray-700">
                  {user.firstname} {user.lastname}
                </p>
                <p className="text-gray-600">Age: {user.age}</p>
                <p className="text-gray-600">Profession: {user.profession}</p>
                <p className="text-gray-600">Gender: {user.gender}</p>
              </div>
              <div className="flex space-x-4">
                <button
                  onClick={() => handleEdit(user)}
                  className="bg-yellow-400 text-gray-800 px-5 py-2 rounded-lg hover:bg-yellow-500 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(user.id)}
                  className="bg-red-400 text-white px-5 py-2 rounded-lg hover:bg-red-500 transition"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>

        {modal.show && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
              <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">
                Confirm Deletion
              </h3>
              <p className="text-gray-600 text-center mb-6">
                Are you sure you want to delete this user? This action cannot be
                undone.
              </p>
              <div className="flex justify-between space-x-4">
                <button
                  onClick={() => setModal({ show: false, userId: null })}
                  className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition w-full"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition w-full"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Users;
