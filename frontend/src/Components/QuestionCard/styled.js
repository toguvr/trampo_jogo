import styled from 'styled-components'

export const MainQuestionContainer = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
    background: #edf9ff;
    width: 100%;
`

export const HeaderContainer = styled.div`
    display:flex;
    align-items:center;
    justify-content:space-around;
    width:90%;
`

export const HeaderAvatarContainer = styled.div`
    display:flex;
    align-items:center;
    justify-content:space-around;
`

export const FlexTitle = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:space-around;
    margin: 10px;
`

export const TitleAvatar = styled.span`
    font-weight:bold;
    font-size: 18px;
`

export const ClassAvatar = styled.span`
    font-style:italic;
    font-size: 16px;
`

export const QuestionTitle = styled.h2`
`

export const Avatar = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    width:40px;
    height:40px;
    color: white;
    background: #f57f20;
    border-radius:50%;
`