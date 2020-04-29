<script>
  import Link from '../Link.svelte';
  import Alert from '../components/common/Alert.svelte';
  import { fade } from 'svelte/transition';
	export let params;
  let form_visible = false;
  let error_exist = false;
  let form_text;
  let form_user;

  let questionRequest = getQuestion();
  async function getQuestion() {
   const response = await fetch("http://localhost:3000/questions/"+params.id);
   const question_promisse = await response.json();
    if (response.ok) {
      return question_promisse;
    }else{
    throw new Error(question_promisse);
   }
  }

  function toggleForm(){
    form_visible = !form_visible;
  }

  let errors = []
  async function handleSubmit() {
    const response = await fetch("http://localhost:3000/answers",{
      method: 'post',
      body: JSON.stringify({
        text: form_text,
        user: form_user,
        question_id: params.id
      }),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
    const promisse = await response.json()
    if (response.ok) {
      toggleForm()
      error_exist = false;
      questionRequest = getQuestion();
    }else{
      error_exist = true
   }
  }
</script>

<style>
  span{
    margin-right:20px;
  }
</style>
<div class="row">
  <div class="container mt-5">
    <div>
      <button on:click={toggleForm} class="float-right btn btn-primary"><i class="fas fa-plus-circle"></i> Nova resposta</button>
      <Link page={ { path: '/', name: 'Home' } } _class='btn btn-light float-right' text='Voltar' icon=true icon_name="fa fa-chevron-left"/>
    </div>
    {#if form_visible}
      <hr class="mt-5"/>
      {#if error_exist}
        <Alert kind='danger' icon="true" icon_name='fa fa-exclamation-circle' text='Atenção preencha os campos obrigatórios'/>
      {/if}
      <form transition:fade on:submit|preventDefault={handleSubmit}>
        <div class="form-group">
          <label>Resposta <span class="text-danger">*</span></label>
          <input bind:value={form_text} placeholder="Sua resposta para essa pergunta" class="form-control">
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
{#await questionRequest}
  <Alert icon=true icon_name='fas fa-spinner fa-pulse'/>
{:then question}
<section class="jumbotron text-center">
  <div class="container">
    <h1 class="jumbotron-heading">{question.text}</h1>
  </div>
</section>
<div class="album py-5">
  <div class="container">
    {#if question.answers.length == 0}
      <Alert kind='danger' icon_name='fa-exclamation-circle' text='Não existe respostas para essa pergunta, seja o primeiro a responder'/>
    {/if}
    {#each question.answers as answer}
      <div class="card col-md-12 mb-3">
        <div class="card-body">
          <h5 class="card-title">{answer.text}</h5>
          <p class="card-text text-muted">
            <small>
              <span><i class="fa fa-id-badge"></i> {answer.user}</span>
              <span><i class="fa fa-calendar"></i> {answer.created_at}</span>
            </small>
          </p>
        </div>
      </div>
    {/each}
  </div>
</div>
{:catch error}
    <Alert kind='danger' icon_name='fa-exclamation-circle' text='{error}'/>
{/await}

