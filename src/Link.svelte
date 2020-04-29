<script>
  import { curRoute, routeParams } from './store';
  export let page;
  export let _class;
  export let text;
  export let icon = false;
  export let icon_name = '';

  function redirectTo(event){
    // change current router path
    curRoute.set(page.name);

    routeParams.set(page.params)
    // push the path into web browser history API
    //window.history.pushState({path: page.path}, '', window.location.origin + page.path);
  }
</script>

<style>
</style>

<a class={_class} href={page.path} on:click|preventDefault={redirectTo}>
  {#if icon}
    <i class="{icon_name}"></i>&nbsp {text}
  {:else}
    {text}
  {/if}
</a>