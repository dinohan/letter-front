import { Button, FormLabel, SemanticNames, Stack, Text, TextArea, TextField, TextFieldType, Typography } from '@channel.io/bezier-react'
import React, { KeyboardEvent, ChangeEvent, FormEvent, useState, useEffect } from 'react'
import { Payload } from '../types'
import * as Styled from './Form.styled'

function Form({
  canSend,
  onSubmit,
}: {
  canSend: boolean
  onSubmit: (payload: Payload) => Promise<void>
}) {
  const [sender, setSender] = useState(window.localStorage.getItem('sender') ?? '')
  const [title, setTitle] = useState(window.localStorage.getItem('title') ?? '')
  const [content, setContent] = useState(window.localStorage.getItem('content') ?? '')

  const disableSubmit = (
    !canSend ||
    !sender ||
    !title ||
    !content ||
    (content.length > 1500)
  )

  const handleChange =
  (dispatcher: React.Dispatch<React.SetStateAction<string>>) =>
  (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    dispatcher(e.target.value)
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement> ) => {
    const payload: Payload = {
      title: `[${sender}] ${title}`,
      content,
    }
    e.preventDefault()
    if (disableSubmit) { return }
    onSubmit(payload)
      .then(() => setContent(''))
      .catch(console.error)
  }

  const preventSubmitByEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    };
  }

  useEffect(function saveOnLocalStorage() {
    const timer = setTimeout(() => {
      window.localStorage.setItem('sender', sender)
      window.localStorage.setItem('title', title)
      window.localStorage.setItem('content', content)
    }, 300)

    return () => {
      clearTimeout(timer)
    }
  }, [content, sender, title])

  const countError = content.length > 1500
  const countColor: SemanticNames = countError ? 'bgtxt-orange-dark' : 'txt-black-dark'

  return (
    <form onSubmit={handleSubmit}>
      <Styled.FormControl>
        <FormLabel>작성자</FormLabel>
        <TextField
          type={TextFieldType.Text}
          value={sender}
          onChange={handleChange(setSender)}
          onKeyDown={preventSubmitByEnter}
          maxLength={10}
          interpolation={Typography.Size16}
          placeholder="이름"
        />
      </Styled.FormControl>
      <Styled.FormControl>
        <FormLabel>제목</FormLabel>
        <TextField
          type={TextFieldType.Text}
          value={title}
          onChange={handleChange(setTitle)}
          onKeyDown={preventSubmitByEnter}
          maxLength={30}
          interpolation={Typography.Size16}
          placeholder="도협아 잘 지내니"
        />
      </Styled.FormControl>
      <Styled.FormControl>
        <FormLabel>내용</FormLabel>
        <TextArea
          value={content}
          cols={30}
          minRows={5}
          maxRows={15}
          onChange={handleChange(setContent)}
          hasError={countError}
          placeholder="어쩌구 저쩌구"
        />
        <Stack direction='horizontal' justify='end'>
          <Text marginTop={6} typo={Typography.Size14} color={countColor}>
            {content.length}/1500
          </Text>
        </Stack>
      </Styled.FormControl>
      
      <Button disabled={disableSubmit} type="submit" text="전송" />
    </form>
  )
}

export default Form
