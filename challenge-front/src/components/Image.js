import React, { useEffect, useState } from "react";

function Image() {
  const [imageUrl, setImageUrl] = useState("");

  const handleImage = async () => {
    try {
      const response = await fetch(`http://localhost:4000/images/a62db17d-f45a-45a3-8679-eca9dfcad229`);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setImageUrl(url);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleImage();
  }, []);

  return (
    <div>
      <img src={imageUrl} alt="Image" />
    </div>
  );
}

export default Image;