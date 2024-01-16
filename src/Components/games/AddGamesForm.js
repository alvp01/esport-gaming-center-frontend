import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthUser, useAuthHeader } from 'react-auth-kit';
import './AddGameForm.css';
import Navbar from '../Navbar';

function AddGameForm() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const auth = useAuthUser();
  const header = useAuthHeader();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_API_URL}/api/games`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-USER-EMAIL': auth().userEmail,
          'X-USER-TOKEN': header().split(' ')[1],
        },
        body: JSON.stringify({
          game: {
            title,
            description,
            image_url: imageUrl,
          },
          user_id: auth().userId,
        }),
      });

      if (response.ok) {
        navigate('/gamelist');
      }
    } catch (error) {
      console.error('Error adding game:', error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="body-background">
        <div className="formcontainer">
          <h2 className="addgame-title">Add New Game</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="title">
                Title:
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </label>
            </div>
            <div>
              <label htmlFor="description">
                Description:
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </label>
            </div>
            <div>
              <label htmlFor="imageUrl">
                Image URL:
                <input
                  type="text"
                  id="imageUrl"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                />
              </label>
            </div>
            <button type="submit">Add Game</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddGameForm;
