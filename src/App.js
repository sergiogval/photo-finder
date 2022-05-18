import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import './header.css'
import './content.css'
import './article.css'



const App = () => {
  const [photos, setPhotos] = useState([])
  const open = url => window.open(url)
  console.log({ photos })
  return (
    <div>
      <header>
        <div>
          <h1>Buscar una foto de:</h1>
        </div>
        <Formik
        initialValues={{ search: '' }}
        onSubmit={async values => {
          const response = await fetch(`https://api.unsplash.com/search/photos?per_page=20&query=${values.search}`, {
            headers: {
              'Authorization': 'Client-ID _RCoD4kDUIiTTAMqtIFkQKneemK8_1DfdH_5T6h4dGo'
            }
          })
          const data = await response.json()
          // llamar a la api de unsplash
          setPhotos(data.results)
        }}
        >
          <Form>
            <Field name='search' />
          </Form>
        </Formik>
      </header>
      <div className="container">
        <div className="center">
          {photos.map(photo =>
          <article key={photo.id} onClick={() => open(photo.links.html)}>
            <img src={photo.urls.regular} alt={photo.description} />
            <p>{[photo.description, photo.alt_description].join(' - ')}</p>
          </article>)}
        </div>
      </div>
    </div>
  )
}

export default App;
