<script>
  import {Router, Route} from 'svelte-routing';

  import Header from './components/common/Header.svelte';
  import Footer from './components/common/Footer.svelte';
  
  import MainPage from './pages/MainPage.svelte';
  import NowPage from './pages/NowPage.svelte';
  import PopularPage from './pages/PopularPage.svelte';
  import TopPage from './pages/TopPage.svelte'; 
  import UpcomingPage from './pages/UpcomingPage.svelte';

  import NowSubPage from './pages/NowSubPage.svelte';
  import PopularSubPage from './pages/PopularSubPage.svelte';
  import UpcomingSubPage from './pages/UpcomingSubPage.svelte';
  import TopSubPage from './pages/TopSubPage.svelte';

</script>


<svelte:head>
  <title>OTT</title>
</svelte:head>

<Header/> 
<Router>
  <Route path="/" component={() => MainPage}/>

  <Route path="/popular" component={() => PopularPage}/>
  <Route path="/now" component={() => NowPage}/>
  <Route path="/top" component={() => TopPage}/>
  <Route path="/upcoming" component={() => UpcomingPage}/>

  
  <Route path="/popular/:id" component={() => PopularSubPage}/>
  <Route path="/now/:id" component={() => NowSubPage}/>
  <Route path="/top/:id" component={() => TopSubPage}/>
  <Route path="/upcoming/:id" component={() => UpcomingSubPage}/>

</Router>

<Footer/> 