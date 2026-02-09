<script>
  import axios from 'axios';


  const options = {
    method: 'GET',
    url: 'https://api.themoviedb.org/3/movie/now_playing',
    params: {
      language: 'ko',
      page: 1,
      api_key: '12f7f88dfa748cf62be62f1ae86e981f',
    },
    headers: {
      accept: 'application/json',
    },
  };

  let movies= [];

  const getMovies = async () => {
    try{
      const response = await axios.request(options); 
      movies = await response.data.results; 

      console.log(movies); 
      return response; 
    }catch(error){
      throw new Error(error); 
    }
  };

  let promise = getMovies(); 
</script>



{#await promise}
  <p> loading </p>
{:then}
  {#each movies as movie}
    <article>
      <h3> 영화명 : {movie.title}</h3>
      <p> 설명 : {movie.overview}</p>
      <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title}/>
    </article>
  {/each}
{:catch}
    <p> 에러가 발생하였습니다. </p>
{/await}
