import { SlTrash } from 'react-icons/sl'


function ActivityCard({p}) {

  function toPaperbin(){
    const token = localStorage.getItem('token')
    const post = {
        "user_id": p.user_id,
        "post_id":p.post_id,
        "title": p.title,
        "content": p.content,
        "category": p.category
    }

    fetch('http://localhost:3000/posts/paperbin',
    {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
    body: JSON.stringify(post)
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(err => console.log(err)) 
    /* window.location.reload() */}

  function warningDelete(){
    Swal.fire({
      title: "Deseas enviar esta nota a la papelera?",
      icon: "question",
      showCancelButton: 'true',
      cancelButtonText: 'Mejor no.',
      confirmButtonColor: 'rgb(0, 61, 85)',
      showConfirmButton: 'true',
      confirmButtonText: 'Si, enviar.'
    }).then((result) => {
        if (result.isConfirmed){
        toPaperbin()}
        else if (result.isDismissed){
          Swal.close()
        }
      })
  }
  return (
    <section className='ActivityCard'>
        <h2>{p.title}</h2>
        <p>{p.content.slice(0, 30)}...</p>
        <code>{p.upload_date}</code>
        <i className='btnCard' onClick={warningDelete}><SlTrash/></i>
    </section>
  )
}

export default ActivityCard