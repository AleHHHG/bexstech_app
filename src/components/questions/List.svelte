<script type="text/javascript">
  import Link from '../../Link.svelte';
  import Alert from '../common/Alert.svelte';
  let questionRequest = getQuestions();
  async function getQuestions() {
   const response = await fetch('http://localhost:3000/questions');
   const question_promisse = await response.json();
   if (response.ok) {
     return question_promisse;
   } else {
     throw new Error(question_promisse);
   }
  }

</script>

<style type="text/css">
  span{
    margin-right:20px;
  }
</style>

{#await questionRequest}
  <Alert icon=true icon_name='fas fa-spinner fa-pulse'/>
{:then questions}
  <div class="row">
    {#each questions.data as question}
      <div class="card col-md-12 mb-3">
        <div class="card-body">
          <h5 class="card-title">{question.text}</h5>
          <p class="card-text text-muted">
            <small>
              <span><i class="fas fa-comment-dots"></i> Respostas({question.total_answers})</span>
              <span><i class="fa fa-id-badge"></i> {question.user}</span>
              <span><i class="fa fa-calendar"></i> {question.created_at}</span>
            </small>
          </p>
          <Link page={ { path: '/question/'+question.id, name: 'Question', params: { id: question.id } } } _class='btn btn-primary' text='View'  />
        </div>
      </div>
    {/each}
  </div>
{:catch error}
    <Alert kind='danger' icon_name='fa-exclamation-circle' text='{error}'/>
{/await}