import styled from 'styled-components'

const LoginButton=styled.button`
    width: 10rem;
    background-color: #5E503F;
    font-size: 20px;
    font-weight: 550;
    color: #F2F4F3;
    padding: .6rem;
    padding-left: 1rem;
    border-radius: 50px;
    box-shadow: 0px 2px #28221b38;
    cursor: pointer;
    border: none;
    transition: all 0.2s ease-out;
    &:hover{
        color: #5E503F;
        background-color: #F2F4F3;
        border: solid 1px #5E503F;
    }
`

export default LoginButton