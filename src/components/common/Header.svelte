<script>
    import { links } from "svelte-routing";
    import Icon from '@iconify/svelte';
    import {onMount} from 'svelte';

    let header;
    const handleScroll = () =>{
        let windowTop = window.scrollY;

        if(windowTop>50){
            header.classList.add('active');
        }else{
            header.classList.remove('active');
        }
    }

    //스크롤 이벤트 무한 발생 제거 
    onMount(()=>{
        const timer = setInterval(()=>{
            window.addEventListener('scroll', handleScroll);
        }, 100);

        return () =>{
            clearInterval(timer);
            window.removeEventListener('scroll', handleScroll);
        }
    })
</script>


<header use:links bind:this={header}>
    <h1><a href="/"><img src="./img/moving_logo.svg" alt="무빙로고"/></a></h1>
    <ul>
        <li>
            <a href="/now">
                <Icon icon="ic:round-live-tv" height="28" width="28" />
                현재 상영작
            </a>
        </li>
        <li><a href="/popular">인기영화</a></li>
        <li><a href="/upcoming">개봉예정작</a></li>
        <li><a href="/top">높은 평점</a></li>
    </ul>
</header>
