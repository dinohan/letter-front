import React, { useEffect, useState } from 'react'
import Form from './components/Form'
import { Payload } from './types'
import './App.css'
import { ToastOptions, ToastPreset, useToast } from '@channel.io/bezier-react'
import axios from 'axios'

const END_POINT = 'https://camp.api.exp.channel.io'

const defaultErrorHandling: Pick<ToastOptions, 'actionContent' | 'onClick'> = {
  actionContent: '오류 보고하기',
  onClick: () => {
    window.location.href = "mailto:max@channel.io?cc=dugi@channel.io&subject=인편에러있어요"
  }
}

function App() {
  const { addToast } = useToast()

  const [canSend, setCanSend] = useState(false)

  const handleSubmit = (payload: Payload) => {
    const promise = new Promise<void>((resolve, reject) => {
      axios.post(`${END_POINT}/send`, payload)
        .then(() => {
          resolve()
        })
        .catch(error => {
          addToast(error.message, {
            preset: ToastPreset.Error,
            rightSide: true,
          })
          reject(error)
      })
    })
    return promise
  }

  useEffect(function initialize() {
    console.log('hi')
    axios.get(`${END_POINT}/ping`)
      .then(() => {
        setCanSend(true)
      })
      .catch(() => {
        setCanSend(false)
        addToast('서버가 죽어있어요.', {
          preset: ToastPreset.Error,
          autoDismiss: false,
          rightSide: true,
          ...defaultErrorHandling,
        })
      })
  }, [addToast])

  return (
    <div className="App">
      <h1>Dino(한도협)에게 편지 쓰기</h1>
      <Form
        canSend={canSend}
        onSubmit={handleSubmit}
      />
    </div>
  )
}

export default App
