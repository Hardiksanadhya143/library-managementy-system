import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import './TrendingBooks.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Custom Arrow Components
const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: 'block', background: 'black' }}
      onClick={onClick}
    />
  );
};

const PrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: 'block', background: 'black' }}
      onClick={onClick}
    />
  );
};

const TrendingBooks = () => {
  const [trendingBooks, setTrendingBooks] = useState([]);

  useEffect(() => {
    fetchTrendingBooks();
  }, []);

  const fetchTrendingBooks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/books/trending');
      setTrendingBooks(response.data.trendingBooks);
    } catch (error) {
      console.error("Error fetching trending books:", error);
    }
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };

  return (
    <div className="trending-books">
      <h2>Trending Books</h2>
      <Slider {...settings}>
        {trendingBooks.map(book => (
          <div key={book._id} className="book-card">
            <img src={`http://localhost:5000/uploads/${book.coverImage}`} alt={book.title} className="book-cover" />
            <h3>{book.title}</h3>
            <p>{book.author}</p>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default TrendingBooks;
