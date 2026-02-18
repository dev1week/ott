<script>
    import { nows } from '../libs/store';
    import Error from '../components/common/Error.svelte';
    import MainLoading from '../components/common/MainLoading.svelte';
    import MainList from '../components/main/MainList.svelte';

    const promise = $nows;
</script>


{#await promise}
<MainLoading />
{:then data}
<MainList datas={data}/>
{:catch error}
<Error/> 
{/await}



