import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { FaIndianRupeeSign } from "react-icons/fa6";
import "./App.css";

const App = () => {
  const [items, setItems] = useState(() => {
    const savedItems = localStorage.getItem("items");
    return savedItems ? JSON.parse(savedItems) : [];
  });
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    description: "",
    price: "",
    image: "",
  });
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editing) {
      setItems(
        items.map((item) => (item.id === formData.id ? formData : item))
      );
      setEditing(false);
    } else {
      setItems([...items, { ...formData, id: Date.now().toString() }]);
    }
    setFormData({ id: "", title: "", description: "", price: "", image: "" });
  };

  const handleEdit = (item) => {
    setFormData(item);
    setEditing(true);
  };

  const handleDelete = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <>
      <div className="container">
        <h1>🛍️ Patel Associates</h1>

        <div className="cards">
          {items.map((item) => (
            <div key={item.id} className="card">
              <img src={item.image} alt={item.title} />
              <h2>{item.title}</h2>
              <p>{item.description}</p>
              <p className="price">
                {" "}
                <FaIndianRupeeSign /> {item.price}
              </p>
              <button className="btn-edit" onClick={() => handleEdit(item)}>
                <span className="btn-icon-container">
                  <FaEdit /> Edit
                </span>
              </button>
              <button
                className="btn-delete"
                onClick={() => handleDelete(item.id)}
              >
                <span className="btn-icon-container">
                  <FaTrash /> Delete
                </span>
              </button>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="form">
          <span>Add items</span>
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={formData.image}
            onChange={handleChange}
            required
          />
          <div className="button-container">
            <button type="submit" className="btn-primary">
              {editing ? "Update Item" : "Add Item"}
            </button>
            <button
              type="button"
              className="btn-secondary"
              onClick={() => {
                setFormData({
                  id: "",
                  title: "",
                  description: "",
                  price: "",
                  image: "",
                });
                setEditing(false);
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>

      <footer className="footer">
        <div className="footerContainer">
          <div className="footerSection">
            <h3>Shop Information</h3>
            <p>
              <strong>Shop Name:</strong> Patel Associates
            </p>
            <p>
              <strong>Contact:</strong> 9824646547
            </p>
            <p>
              <strong>Email:</strong>{" "}
              <a href="mailto:rajeshpatel786@yahoo.com">
                rajeshpatel786@yahoo.com
              </a>
            </p>
          </div>
          <div className="footerSection">
            <h3>Follow Us</h3>
            <p>
              <strong>Facebook:</strong>{" "}
              <a
                href="https://www.facebook.com/share/1ACiUS83Vs/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Facebook Link
              </a>
            </p>
            <p>
              <strong>Instagram:</strong>{" "}
              <a
                href="https://www.instagram.com/patellights2879?igsh=MTZoOHkyNmFhd2M0aA=="
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram Link
              </a>
            </p>
          </div>
          <div className="footerSection">
            <h3>Address</h3>
            <p>Ground Floor 1, C N Chembar,</p>
            <p>Gandhi Road, Near Hanuman Mandir,</p>
            <p>Ahmedabad 380001</p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default App;
