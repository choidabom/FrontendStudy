import { useEffect, useState } from "react";
import Movie from "../components/Movie";

function Home() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);

  const getMovies = async () => {
    const json = await (
      await fetch(
        `https://yts.mx/api/v2/list_movies.json?minimum_rating=8.8&sort_by=year`
      )
    ).json();
    setMovies(json.data.movies);
    setLoading(false); // fetch, json을 진행 후 로딩을 끝냈기 때문에 반드시 setLoading(false)를 해줘야함.
  };
  useEffect(() => {
    getMovies();
  }, []);
  console.log(movies);
  // 새로운 array의 item들은 이전의 array에서 내가 원하는대로 변형된 item이다.

  return (
    <div>
      {loading ? (
        <h1>Loading…</h1>
      ) : (
        <div>
          {/* map 쓸 때는 key를 꼭 줘야한다는 것만 기억하면 된다 ! */}
          {movies.map((movie) => (
            <Movie
              key={movie.id} // key는 React.js에서만, map 안에서 component들을 render 할 때 사용!
              id={movie.id}
              coverImg={movie.medium_cover_image}
              title={movie.title}
              summary={movie.summary}
              genres={movie.genres}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
