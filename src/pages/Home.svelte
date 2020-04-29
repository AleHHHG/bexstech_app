<script>
	import QuestionList from '../components/questions/List.svelte';
	import Alert from '../components/common/Alert.svelte';
  	import { fade } from 'svelte/transition';
  	let form_visible = false;
  	let error_exist = false;
  	let form_text;
  	let form_user;
	function toggleForm(){
		form_visible = !form_visible;
	}
	async function handleSubmit() {
    const response = await fetch("http://localhost:3000/questions",{
      method: 'post',
      body: JSON.stringify({
        text: form_text,
        user: form_user,
      }),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
    const promisse = await response.json()
    if (response.ok) {
      location.reload();
    }else{
      error_exist = true
   }
  }
</script>

<style>
</style>

<section class="jumbotron text-center">
  <div class="container">
    <h1 class="jumbotron-heading">Bexs FAQ</h1>
    <button on:click={toggleForm} class="btn btn-primary mt-3"><i class="fas fa-plus-circle"></i> Nova Pergunta</button>
  </div>
</section>
<div class="row">
	<div class="container">
		{#if form_visible}
		  {#if error_exist}
		    <Alert kind='danger' icon="true" icon_name='fa fa-exclamation-circle' text='Atenção preencha os campos obrigatórios'/>
		  {/if}
		  <form transition:fade on:submit|preventDefault={handleSubmit}>
		    <div class="form-group">
		      <label>Pergunta <span class="text-danger">*</span></label>
		      <input bind:value={form_text} placeholder="Pergunta" class="form-control">
		    </div>
		    <div class="form-group">
		      <label>Nome <span class="text-danger">*</span></label>
		      <input bind:value={form_user} class="form-control" placeholder="Seu nome" />
		    </div>
		    <button type="submit" class="btn btn-primary">Save</button>
		    <br clear="all">
		    <br clear="all">
		  </form>
		  <small class="text-danger">(*) campos obrigatórios</small>
		{/if}
	</div>
</div>
<div class="album py-5 bg-light">
    <div class="container">
      <QuestionList/>
    </div>
</div>