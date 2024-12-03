import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { addAddress, updateAddress, deleteAddress } from '../../redux/slices/addressSlice';
import { AiOutlineEdit, AiOutlineDelete, AiOutlinePlus } from 'react-icons/ai';

export default function AddressTab() {
  const dispatch = useDispatch();
  const addresses = useSelector((state) => state.address.addresses);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentAddress, setCurrentAddress] = useState({ id: null, name: '', details: '' });

  const handleAddOrUpdate = () => {
    if (currentAddress.id) {
      dispatch(updateAddress(currentAddress));
    } else {
      dispatch(addAddress({ ...currentAddress, id: Date.now() }));
    }
    setIsModalOpen(false);
    setCurrentAddress({ id: null, name: '', details: '' });
  };

  const handleDelete = (id) => {
    dispatch(deleteAddress(id));
  };

  return (
    <div>
      <h3 className="text-xl font-bold mb-4">Saved Addresses</h3>
      <button
        onClick={() => setIsModalOpen(true)}
        className="flex items-center bg-teal text-white px-4 py-2 rounded-md hover:bg-green transition"
      >
        <AiOutlinePlus className="mr-2" />
        Add New Address
      </button>

      {addresses.length > 0 ? (
        <ul className="space-y-4 mt-4">
          {addresses.map((address) => (
            <li
              key={address.id}
              className="p-4 bg-darkBlack text-lightGray rounded-md shadow-md flex justify-between items-center"
            >
              <div>
                <p className="font-bold">{address.name}</p>
                <p className="text-sm">{address.details}</p>
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={() => {
                    setCurrentAddress(address);
                    setIsModalOpen(true);
                  }}
                  className="text-teal hover:scale-110 transition"
                >
                  <AiOutlineEdit />
                </button>
                <button
                  onClick={() => handleDelete(address.id)}
                  className="text-red-500 hover:scale-110 transition"
                >
                  <AiOutlineDelete />
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-lightGray mt-4">No saved addresses.</p>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-lightGray text-darkBlack rounded-md shadow-md p-6 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">
              {currentAddress.id ? 'Edit Address' : 'Add New Address'}
            </h3>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-bold mb-2">
                Address Name
              </label>
              <input
                id="name"
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-teal"
                value={currentAddress.name}
                onChange={(e) => setCurrentAddress({ ...currentAddress, name: e.target.value })}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="details" className="block text-sm font-bold mb-2">
                Address Details
              </label>
              <textarea
                id="details"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-teal"
                value={currentAddress.details}
                onChange={(e) => setCurrentAddress({ ...currentAddress, details: e.target.value })}
              />
            </div>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setCurrentAddress({ id: null, name: '', details: '' });
                }}
                className="px-4 py-2 bg-gray-300 text-darkBlack rounded-md hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleAddOrUpdate}
                className="px-4 py-2 bg-teal text-white rounded-md hover:bg-green transition"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
