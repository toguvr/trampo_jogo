import React from "react";
import { MainQuestionContainer, HeaderContainer, HeaderAvatarContainer, Avatar, FlexTitle, TitleAvatar, ClassAvatar, QuestionTitle } from './styled'

const QuestionCard=(props)=>{
    return(
        <MainQuestionContainer>
            <HeaderContainer>
                <HeaderAvatarContainer><Avatar>F4</Avatar><FlexTitle><TitleAvatar>Usuario</TitleAvatar><ClassAvatar>Turma Newton</ClassAvatar></FlexTitle></HeaderAvatarContainer>
                <QuestionTitle>Titulo</QuestionTitle>
                <div></div>
            </HeaderContainer>
        </MainQuestionContainer>
    )
}

export default QuestionCard