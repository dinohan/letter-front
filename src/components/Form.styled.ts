import { FormControl as BaseFormControl, Button, Text, styled, Stack } from '@channel.io/bezier-react'

export const FormControl  = styled(BaseFormControl)`
  margin-top: 8px;
`

export const LabelWrapper = styled(Stack)`
  flex-direction: row;
  align-items: center;
  padding: 0.5rem;
`

export const Count = styled(Text)`
  margin-left: auto;
  padding-right: 1.2rem;
`

export const Submit = styled(Button)`
  padding: 0 1.6rem;
`