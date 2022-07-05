import React, { useEffect } from 'react'
import Form from './components/Form'
import { Payload } from './types'
import './App.css'
import { ToastPreset, useToast } from '@channel.io/bezier-react'
import axios from 'axios'

function App() {
  const { addToast } = useToast()

  const handleSubmit = (payload: Payload) => {
    console.log(payload)

    const promise = new Promise<void>((resolve, reject) => {
      axios.post('', payload)
        .then(() => {
          resolve()
        })
        .catch(error => {
          addToast('error', {
            preset: ToastPreset.Error,
            rightSide: true,
          })
          reject()
      })
    })
    return promise
  }

  useEffect(function initialize() {
    console.log('hi')
    axios.get('/ping')
      .catch(() => {
        addToast('서버가 죽어있어요.', {
          preset: ToastPreset.Error,
          autoDismiss: false,
          rightSide: true,
          actionContent: '새로고침',
        })
      })
  }, [addToast])

  return (
    <div className="App">
      <h1>Dino(한도협)에게 편지 쓰기</h1>
      <Form onSubmit={handleSubmit} />
    </div>
  )
}

export default App
