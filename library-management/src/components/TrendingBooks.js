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
  const [educationBooks, setEducationBooks] = useState([]); // New state for education books

  const [trendingSearchQuery, setTrendingSearchQuery] = useState('');
  const [filteredTrendingBooks, setFilteredTrendingBooks] = useState([]);

  const [horrorSearchQuery, setHorrorSearchQuery] = useState('');
  const [filteredHorrorBooks, setFilteredHorrorBooks] = useState([]);

  const [adventureSearchQuery, setAdventureSearchQuery] = useState('');
  const [filteredAdventureBooks, setFilteredAdventureBooks] = useState([]);

  const [devotionalSearchQuery, setDevotionalSearchQuery] = useState('');
  const [filteredDevotionalBooks, setFilteredDevotionalBooks] = useState([]);

  const [educationSearchQuery, setEducationSearchQuery] = useState(''); // New search query state for education books
  const [filteredEducationBooks, setFilteredEducationBooks] = useState([]); // New filtered state for education books

  useEffect(() => {
    fetchTrendingBooks();
    fetchHorrorBooks();
    fetchAdventureBooks();
    fetchDevotionalBooks();
    fetchEducationBooks(); // Fetch education books on component mount
  }, []);

  useEffect(() => {
    filterBooks(trendingBooks, trendingSearchQuery, setFilteredTrendingBooks);
  }, [trendingSearchQuery, trendingBooks]);

  useEffect(() => {
    filterBooks(horrorBooks, horrorSearchQuery, setFilteredHorrorBooks);
  }, [horrorSearchQuery, horrorBooks]);

  useEffect(() => {
    filterBooks(adventureBooks, adventureSearchQuery, setFilteredAdventureBooks);
  }, [adventureSearchQuery, adventureBooks]);

  useEffect(() => {
    filterBooks(devotionalBooks, devotionalSearchQuery, setFilteredDevotionalBooks);
  }, [devotionalSearchQuery, devotionalBooks]);

  useEffect(() => {
    filterBooks(educationBooks, educationSearchQuery, setFilteredEducationBooks); // Filter education books on search query change
  }, [educationSearchQuery, educationBooks]);

  const fetchTrendingBooks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/books/trending');
      setTrendingBooks(response.data.trendingBooks);
      setFilteredTrendingBooks(response.data.trendingBooks); // Initialize filtered books
    } catch (error) {
      console.error("Error fetching trending books:", error);
    }
  };

  const fetchHorrorBooks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/books/horror');
      setHorrorBooks(response.data.horrorBooks);
      setFilteredHorrorBooks(response.data.horrorBooks); // Initialize filtered books
    } catch (error) {
      console.error("Error fetching horror books:", error);
    }
  };

  const fetchAdventureBooks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/books/adventure');
      setAdventureBooks(response.data.adventureBooks);
      setFilteredAdventureBooks(response.data.adventureBooks); // Initialize filtered books
    } catch (error) {
      console.error("Error fetching adventure books:", error);
    }
  };

  const fetchDevotionalBooks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/books/devotional');
      setDevotionalBooks(response.data.devotionalBooks);
      setFilteredDevotionalBooks(response.data.devotionalBooks); // Initialize filtered books
    } catch (error) {
      console.error("Error fetching devotional books:", error);
    }
  };

  const fetchEducationBooks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/books/education'); // Fetch education books from the backend
      setEducationBooks(response.data.educationBooks);
      setFilteredEducationBooks(response.data.educationBooks); // Initialize filtered books
    } catch (error) {
      console.error("Error fetching education books:", error);
    }
  };

  const filterBooks = (books, query, setFilteredBooks) => {
    if (!query) {
      setFilteredBooks(books);
    } else {
      const filtered = books.filter((book, index, self) =>
        index === self.findIndex((b) => (
          b._id === book._id
        ))
      ).filter(book =>
        book.title.toLowerCase().includes(query.toLowerCase()) ||
        book.genre.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredBooks(filtered);
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

<div className="devotional-books">
        <h2>Devotional Books</h2>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search in Devotional Books"
            value={devotionalSearchQuery}
            onChange={(e) => setDevotionalSearchQuery(e.target.value)}
          />
        </div>
        <Slider {...settings}>
          {filteredDevotionalBooks.map(book => (
            <div key={book._id} className="book-card">
              <img src={`http://localhost:5000/uploads/${book.coverImage}`} alt={book.title} className="book-cover" />
              <h3>{book.title}</h3>
              <p>{book.author}</p>
            </div>
          ))}
        </Slider>
      </div>

      <div className="education-books">
        <h2>Education Books</h2>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search in Education Books"
            value={educationSearchQuery}
            onChange={(e) => setEducationSearchQuery(e.target.value)}
          />
        </div>
        <Slider {...settings}>
          {filteredEducationBooks.map(book => (
            <div key={book._id} className="book-card">
              <img src={`http://localhost:5000/uploads/${book.coverImage}`} alt={book.title} className="book-cover" />
              <h3>{book.title}</h3>
              <p>{book.author}</p>
            </div>
          ))}
        </Slider>
      </div>

      <div className="trending-books">
        <h2>Trending Books</h2>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search in Trending Books"
            value={trendingSearchQuery}
            onChange={(e) => setTrendingSearchQuery(e.target.value)}
          />
        </div>
        <Slider {...settings}>
          {filteredTrendingBooks.map(book => (
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
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search in Horror Books"
            value={horrorSearchQuery}
            onChange={(e) => setHorrorSearchQuery(e.target.value)}
          />
        </div>
        <Slider {...settings}>
          {filteredHorrorBooks.map(book => (
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
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search in Adventure Books"
            value={adventureSearchQuery}
            onChange={(e) => setAdventureSearchQuery(e.target.value)}
          />
        </div>
        <Slider {...settings}>
          {filteredAdventureBooks.map(book => (
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
