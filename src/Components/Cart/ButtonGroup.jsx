import React from 'react'
import {ButtonGroup,Button, styled} from '@mui/material';
const Component = styled(ButtonGroup)`
    margin-top: 30px;
`
const StyleButton = styled(Button)`
     border-radius: 50%;
`
export default function GroupedButton() {
  return (
    <Component>
       <StyleButton>-</StyleButton>
       <Button disabled>1</Button>
       <StyleButton>+</StyleButton>
    </Component>
  )
}
