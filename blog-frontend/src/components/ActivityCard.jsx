import React from 'react'


function ActivityCard({p}) {
  return (
    <section className='ActivityCard'>
        <h2>{p.title}</h2>
        <p>{p.content.slice(0, 30)}...</p>
        <code>{p.upload_date}</code>
    </section>
  )
}

export default ActivityCard