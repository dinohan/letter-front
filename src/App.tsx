import { Button, FormLabel, SemanticNames, Stack, Text, TextArea, TextField, TextFieldType, Typography } from '@channel.io/bezier-react'
import React, { KeyboardEvent, ChangeEvent, FormEvent, useState } from 'react'
import './App.css'
import * as Styled from './App.styled'

function App() {
  const [sender, setSender] = useState('')
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const handleChange =
  (dispatcher: React.Dispatch<React.SetStateAction<string>>) =>
  (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    dispatcher(e.target.value)
  }

  const disableSubmit = !sender || !title || !content || (content.length > 1500)

  const payload = {
    title: `[${sender}] ${title}`,
    content,
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement> ) => {
    e.preventDefault()
    if (disableSubmit) { return }
    console.log(payload)
  }

  const preventSubmitByEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    };
  }

  const countError = content.length > 1500

  const countColor: SemanticNames = countError ? 'bgtxt-orange-dark' : 'txt-black-dark'

  return (
    <div className="App">
      <h1>Dino에게 편지 쓰기</h1>
      <form onSubmit={handleSubmit}>
        <Styled.FormControl>
          <FormLabel>작성자</FormLabel>
          <TextField
            type={TextFieldType.Text}
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
            onChange={handleChange(setTitle)}
            onKeyDown={preventSubmitByEnter}
            maxLength={20}
            interpolation={Typography.Size16}
            placeholder="도협아 잘 지내니"
          />
        </Styled.FormControl>
        <Styled.FormControl>
          <FormLabel>내용</FormLabel>
          <TextArea
            value={content}
            cols={30}
            rows={10}
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
    </div>
  )
}

export default App
