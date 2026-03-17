import { useState, useEffect } from "react";
import styles from "../styles/Home.module.css";

export default function Communities() {

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    avatar: ""
  });

  const [communities, setCommunities] = useState([]);
  const [message, setMessage] = useState("");

  // загрузка сообществ
  useEffect(() => {
    fetch("/api/community")
      .then(res => res.json())
      .then(data => setCommunities(data));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("/api/community", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    });

    const data = await response.json();

    setMessage(data.message);

    setCommunities(prev => [...prev, data.community]);

    setFormData({
      name: "",
      description: "",
      avatar: ""
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>

        <h1>Сообщества пользователя</h1>

        <form onSubmit={handleSubmit} className={styles.form}>

          <input
            type="text"
            name="name"
            placeholder="Название сообщества"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <br/>

          <input
            type="text"
            name="description"
            placeholder="Описание"
            value={formData.description}
            onChange={handleChange}
            required
          />
          <br/>

          <input
            type="text"
            name="avatar"
            placeholder="URL аватарки"
            value={formData.avatar}
            onChange={handleChange}
            required
          />
            <br/>

          <button type="submit" className={styles.button}>
            Создать сообщество
          </button>

        </form>

        {message && <p>{message}</p>}

        <div style={{ marginTop: "30px", width: "100%" }}>
          <h2>Список сообществ</h2>

          {communities.length === 0 && <p>Сообществ пока нет</p>}

          {communities.map((community, index) => (
            <div
              key={index}
              style={{
                background: "rgba(0, 0, 0, 0.8)",
                padding: "15px",
                borderRadius: "10px",
                marginTop: "10px"
              }}
            >

              <img
                src={community.avatar}
                width="80"
                style={{ borderRadius: "50%" }}
              />

              <p><b>Название:</b> {community.name}</p>
              <p><b>Описание:</b> {community.description}</p>

            </div>
          ))}

        </div>

      </div>
    </div>
  );
}