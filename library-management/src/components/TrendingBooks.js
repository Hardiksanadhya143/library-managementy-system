import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import './TrendingBooks.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
  const [horrorBooks, setHorrorBooks] = useState([]);
  const [adventureBooks, setAdventureBooks] = useState([]);
  const [devotionalBooks, setDevotionalBooks] = useState([]);

  useEffect(() => {
    fetchTrendingBooks();
    fetchHorrorBooks();
    fetchAdventureBooks();
    fetchDevotionalBooks();
  }, []);

  const fetchTrendingBooks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/books/trending');
      console.log('Trending books:', response.data.trendingBooks);
      setTrendingBooks(response.data.trendingBooks);
    } catch (error) {
      console.error("Error fetching trending books:", error);
    }
  };

  const fetchHorrorBooks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/books/horror');
      console.log('Horror books:', response.data.horrorBooks);
      setHorrorBooks(response.data.horrorBooks);
    } catch (error) {
      console.error("Error fetching horror books:", error);
    }
  };

  const fetchAdventureBooks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/books/adventure');
      console.log('Adventure books:', response.data.adventureBooks);
      setAdventureBooks(response.data.adventureBooks);
    } catch (error) {
      console.error("Error fetching adventure books:", error);
    }
  };

  const fetchDevotionalBooks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/books/devotional');
      console.log('Devotional books:', response.data.devotionalBooks);
      setDevotionalBooks(response.data.devotionalBooks);
    } catch (error) {
      console.error("Error fetching devotional books:", error);
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
    <div>
      <div className="trending-books">
        <h2>Trending Books</h2>
        <Slider {...settings}>
          {trendingBooks?.map(book => (
            <div key={book._id} className="book-card">
              <img src={`http://localhost:5000/uploads/${book.coverImage}`} alt={book.title} className="book-cover" />
              <h3>{book.title}</h3>
              <p>{book.author}</p>
            </div>
          ))}
        </Slider>
      </div>
      <div className="horror-books">
        <h2>Horror Books</h2>
        <Slider {...settings}>
          {horrorBooks?.map(book => (
            <div key={book._id} className="book-card">
              <img src={`http://localhost:5000/uploads/${book.coverImage}`} alt={book.title} className="book-cover" />
              <h3>{book.title}</h3>
              <p>{book.author}</p>
            </div>
          ))}
        </Slider>
      </div>
      <div className="adventure-books">
        <h2>Adventure Books</h2>
        <Slider {...settings}>
          {adventureBooks?.map(book => (
            <div key={book._id} className="book-card">
              <img src={`http://localhost:5000/uploads/${book.coverImage}`} alt={book.title} className="book-cover" />
              <h3>{book.title}</h3>
              <p>{book.author}</p>
            </div>
          ))}
        </Slider>
      </div>
      <div className="devotional-books">
        <h2>Devotional Books</h2>
        <Slider {...settings}>
          {devotionalBooks?.map(book => (
            <div key={book._id} className="book-card">
              <img src={`http://localhost:5000/uploads/${book.coverImage}`} alt={book.title} className="book-cover" />
              <h3>{book.title}</h3>
              <p>{book.author}</p>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default TrendingBooks;
