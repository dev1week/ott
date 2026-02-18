<script>
    import { link } from 'svelte-routing';
    import Icon from '@iconify/svelte';
</script>



<div class="error_box">
    <Icon icon="jam:alert" />
    <h3>죄송합니다. <span class="red">에러</span>가 발생했습니다.</h3>
    <p class="basic_explain">
        잠시 후 다시 시도해주세요.
    </p>
    <a href="/" use:link class="page_btn">메인 페이지로 이동</a>
</div>