<script>
  import { onDestroy } from 'svelte';
  import { curRoute, routeParams } from './store';
  import router from './router';

  let component;
  let params;
  const unsubscribe = curRoute.subscribe(value => {
    component = router.filter(r => r.name === $curRoute)[0].component;
  })

  routeParams.subscribe(value => {
    params = value
  })

  onDestroy(unsubscribe);
</script>

<style>
</style>

<div class="main-container">
  <svelte:component this={component} params={params}/>
</div>