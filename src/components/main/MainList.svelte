<script>
    import {onMount} from 'svelte';
    import {link} from 'svelte-routing';
    import {Autoplay,Pagination, EffectFade } from 'swiper';
    import {Swiper, SwiperSlide} from 'swiper/svelte';
    import 'swiper/css';
    import 'swiper/css/pagination';
    import 'swiper/css/effect-fade';

    export let datas = [];
    let mains = [];

    $: if (Array.isArray(datas) && datas.length > 0) {
        const random = Math.floor(Math.random() * datas.length);        
        mains = datas.slice(random, random + 5);
    } else {
        mains = [];
    }

    //일시정지와 재생 버튼 
    let swiper;
    let btnPause;
    let btnPlay;
    let isPause = false; 

    //처음 페이지 로딩 시 이미지 스와이퍼 생성 
    //Swiper는 컴포넌트가 마운트 된 후에 실행되기 때문에 바로 작성하면 명령 적용이 안됨. 
    //따라서 onMount 함수로 마운트한 후에 swiper를 담아야한다. 
    onMount(() => {
        //bind를 통해 선택해도 선택이 잘안된다. -> 쿼리 셀렉터로 직접 선택한다. 
        const swiperInstance = document.querySelector('.mainSwiper').swiper;
        swiper = swiperInstance;
    });


    //일시정지 / 재생 버튼 이벤트 
    const onHandleClick = () => {
        if(isPause){
            btnPause.classList.remove('active');
            btnPlay.classList.add('active');
            swiper.autoplay.start(); 
        }else{
            btnPause.classList.add('active');
            btnPlay.classList.remove('active'); 
            swiper.autoplay.stop(); 
        }
        isPause = !isPause; 
    }
</script>


<main>
    <Swiper modules = {[Autoplay, Pagination, EffectFade]} 
    effect={'fade'}
    autoplay={{
        delay: 3000,
        ableOnInteraction: false,
    }}
    pagination={{
        clickable: true,
    }}
    bind:this={swiper}
    class="mainSwiper">
>
    {#each mains as main}
    <SwiperSlide>
        <img src={`https://image.tmdb.org/t/p/original/${main.backdrop_path}`} alt={main.title}>
        <h3>{main.title}</h3>
        <p>
            {#if main.overview === ''}
                새롭게 개봉한 [{main.title}]를 확인해보세요!
            {:else}
                {main.overview}
            {/if}
        </p>
        <a href={`/now/${main.id}`} use:link class="page_btn">자세히 보기</a>
    </SwiperSlide>
    {/each}
</Swiper>
<!-- 재생 / 정지 버튼 처리 -->
 <div class="swiper-playpause">
<button
    bind:this={btnPause}
    class="btn_pause"
    on:click={onHandleClick}
    aria-label="슬라이드 일시정지"
>
        
    </button>
<button
    bind:this={btnPlay}
    class="btn_play active"
    on:click={onHandleClick}
    aria-label="슬라이드 재생"
>
        
    </button>
</div>
</main>